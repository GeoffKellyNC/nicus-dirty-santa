import axios from 'axios'
import * as prizeTypes from './prizeState.types'
import * as playerTypes from '../playerState/playerState.types'


const SET_PRIZE_EP = 'http://localhost:9001/prize/setPrize'
const GET_ALL_PRIZES_EP = 'http://localhost:9001/prize/getAllprizes'
const SET_PLAYER_PRIZE_EP = 'http://localhost:9001/prize/setPlayerPrize'


export const setPrize = ( prizeName, prizeImg, prizeValue) => async (dispatch) => {
    try {
        await axios.post(SET_PRIZE_EP, { data: {prizeName, prizeImg, prizeValue}})

        dispatch({
            type: prizeTypes.SET_PRIZE,
            payload: {
                prize_name: prizeName,
                prize_image: prizeImg,
                prize_value: prizeValue,
                prize_current_owner: null,
                prize_previous_owner: null,
                prize_num_steals: null
            }
        })
    } catch (error) {
        console.log('prizeState.actions setPrize Error: ', error)
    }
}


export const getAllPrizes = () => async (dispatch) => {
    try {
        const prizeRes = await axios.get(GET_ALL_PRIZES_EP)
        console.log('prizeRes: ', prizeRes.data.message) //! REMOVE

        dispatch({
            type: prizeTypes.GET_PRIZES,
            payload: prizeRes.data.message
        })
    } catch (error) {
        console.log('prizeState.actions getAllPrizes Error: ', error)
    }
}

export const setPlayerPrize = (prizeId, playerId) => async (dispatch) => {
    try {
        await axios.post(SET_PLAYER_PRIZE_EP, { data: {prizeId, playerId}})

        dispatch({
            type: prizeTypes.SET_PLAYER_PRIZE,
            payload: { prizeId, playerId }
        })

        dispatch({
            type: playerTypes.SET_PRIZE_PLAYER,
            payload: prizeId
        })


    } catch (error) {
        console.log('prizeState.actions setPlayerPrize error: ', error)
    }
}