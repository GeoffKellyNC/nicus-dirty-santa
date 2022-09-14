import axios from 'axios';
import * as playerTypes from './playerState.types';

const SET_PLAYER_EP = 'localhost:9001/player/setPlayer'
const GET_PLAYERS_EP = 'localhost:9001/player/getPlayers'


export const setPlayer = (playerName) => async (dispatch) => {
    try {
        const setPlayerRes = await axios.post(SET_PLAYER_EP, { data: {playerName}})
        const newPlayer = setPlayerRes.data.message

        dispatch({
            type: playerTypes.SET_PLAYER,
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