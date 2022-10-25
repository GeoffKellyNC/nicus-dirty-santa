import * as gameTypes from './gameState.types';
import * as playerTypes from '../playerState/playerState.types'
import axios from 'axios'

const USE_LOCAL = false

const START_GAME_EP =  USE_LOCAL ? 'http://localhost:9001/game/startGame' : 'https://nicus-dirty-christmas.herokuapp.com/game/startGame'
const REJOIN_GAME_EP = USE_LOCAL ? 'http://localhost:9001/game/rejoinGame' : 'https://nicus-dirty-christmas.herokuapp.com/game/rejoinGame'
const SET_PLAYER_ORDER_EP = USE_LOCAL ? 'http://localhost:9001/game/setPlayerOrder' : 'https://nicus-dirty-christmas.herokuapp.com/game/setPlayerOrder'
const GET_GAME_DATA_EP = USE_LOCAL ? 'http://localhost:9001/game/getGameData' : 'https://nicus-dirty-christmas.herokuapp.com/game/getGameData'
const SET_PLAYER_TURN_EP =  USE_LOCAL ? 'http://localhost:9001/game/setPlayerTurn': 'https://nicus-dirty-christmas.herokuapp.com/game/setPlayerTurn'



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

        return gameData


    } catch (error) {
        console.log('gameStateActions startGame Error: ', error)
    }
}

export const setGameData = (gameData) => async (dispatch) => {
    try {
        dispatch({
            type: gameTypes.SET_GAME_DATA,
            payload: gameData
        })
    } catch (error) {
        console.log('gameStateActions setGameData Error: ', error)
    }
}

export const refreshGameData = (gameId) => async (dispatch) => {
    try {
        const res = await axios.post(GET_GAME_DATA_EP, { data: { gameId }})
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

export const setLocalCurrentTurn = (currentTurn) => async (dispatch) => {
    try {
        dispatch({
            type: gameTypes.SET_CURRENT_TURN,
            payload: currentTurn
        })
    } catch (error) {
        console.log('gameStateActions setLocalCurrentTurn Error: ', error)
    }
}


export const setCurrentTurn = (playerId, gameId) => async (dispatch) => {
    try{

        await axios.post(SET_PLAYER_TURN_EP, {data: {playerId, gameId}})

        dispatch({
            type: gameTypes.SET_CURRENT_TURN,
            payload: playerId
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

export const setPlayerOrder = (playerArray, gameId) => async (dispatch) => {
    try {
        console.log('gameState.actions gameId: ', gameId) //! REMOVE
        const res = await axios.post(SET_PLAYER_ORDER_EP, { data: {playerArray, gameId}})
        const playerOrder = res.data.message

        dispatch({
            type: gameTypes.SET_PLAYER_ORDER,
            payload: playerOrder
        })
    } catch (error) {
        console.log('gameStateActions setPlayerOrder Error: ', error)
    }
}
