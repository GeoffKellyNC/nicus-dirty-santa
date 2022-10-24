import axios from 'axios';
import * as playerTypes from './playerState.types';


const SET_PLAYER_EP = 'http://localhost:9001/player/setPlayer'
const GET_PLAYERS_EP = 'http://localhost:9001/player/getPlayers'


export const setPlayer = (playerName, pin) => async (dispatch) => {
    try {
        const setPlayerRes = await axios.post(SET_PLAYER_EP, { data: {playerName, pin}})
        const newPlayer = setPlayerRes.data.message

        localStorage.setItem('playerId', newPlayer.player_id)
        localStorage.setItem('PlayerData', JSON.stringify(newPlayer))

        dispatch({
            type: playerTypes.SET_PLAYER,
            payload: newPlayer
        })
        dispatch({
            type: playerTypes.SET_PLAYER_DATA,
            payload: newPlayer
        })

    } catch (error) {
        console.log('PlayerState.actions setPlayer Error: ', error)
    }
}

export const getPlayers = () => async dispatch => {
    try {
        const getPlayersRes = await axios.get(GET_PLAYERS_EP)
        const players = getPlayersRes.data.message

        dispatch({
            type: playerTypes.GET_PLAYERS,
            payload: players
        })

        
    } catch (error) {
        console.log('PlayerState.actions getPlayers Error: ', error)

    }
}

export const refreshPlayerData = (playerId) => async dispatch => {
    try {
        const newDataRes = await  axios.post('http://localhost:9001/player/getSinglePlayer', { data: { playerId }})

        const newData = newDataRes.data.message



        dispatch({
            type: playerTypes.REFRESH_PLAYER_DATA,
            payload: newData
        })

    } catch (error) {
        console.log('PlayerState.actions refreshPlayerData Error: ', error)
    }
}

