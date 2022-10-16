import * as gameTypes from './gameState.types';
import * as playerTypes from '../playerState/playerState.types'
import axios from 'axios'

const START_GAME_EP = 'http://localhost:9001/game/startGame'
const REJOIN_GAME_EP = 'http://localhost:9001/game/rejoinGame'

export const startGame = () => async (dispatch) => {
    try {
        const res = await axios.post(START_GAME_EP, { data: {message: 'startGame'}})
        const gameData = res.data.message

        localStorage.setItem('gameId', gameData.game_id)
        localStorage.setItem('gameStatus', gameData.game_status)
        localStorage.setItem('gameStatus', true)
        dispatch({
            type: gameTypes.START_GAME,
            payload: true
        })

        dispatch({
            type: gameTypes.SET_GAME_DATA,
            payload: gameData
        })

        return gameData.game_id


    } catch (error) {
        console.log('gameStateActions startGame Error: ', error)
    }
}

export const refreshGameData = (gameId) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:9001/game/getGameData', { data: { gameId }})
        const gameData = res.data.message

        if (gameData){
            dispatch({
                type: gameTypes.SET_GAME_DATA,
                payload: gameData
            })
            return
        }
        dispatch({
            type: gameTypes.SET_GAME_DATA,
            payload: null
        })

    } catch (error) {
        console.log('gameStateActions refreshGameData Error: ', error)
    }
}

export const setCurrentTurn = (playerId, gameId) => async (dispatch) => {
    try{
        const res = await axios.post('http://localhost:9001/game/setCurrentTurn', {data: {playerId, gameId}})
        const currentTurn = res.data.message

        dispatch({
            type: gameTypes.SET_CURRENT_TURN,
            payload: currentTurn
        })
    } catch (error) {
        console.log('gameStateActions setCurrentTurn Error: ', error)

    }
}

export const rejoinGame = (userName, pin) => async (dispatch) => {
    const rejoinRes = await axios.post(REJOIN_GAME_EP, { data: {userName, pin}})
    const playerData = rejoinRes.data.message

    if(playerData === 401) return false


    localStorage.setItem('playerData', JSON.stringify(playerData))

    dispatch({
        type: playerTypes.SET_PLAYER_DATA,
        payload: playerData
    })

    return true

}

export const setIoSocket = (socket) => async (dispatch) => {
    dispatch({
        type: gameTypes.SET_SOCKET,
        payload: socket
    })
}
