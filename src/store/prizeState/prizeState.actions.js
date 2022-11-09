import axios from 'axios'
import * as prizeTypes from './prizeState.types'
import * as playerTypes from '../playerState/playerState.types'

const USE_LOCAL = true

const SET_PRIZE_EP = USE_LOCAL ? 'http://localhost:9001/prize/setPrize' : 'https://nicus-dirty-christmas.herokuapp.com/prize/setPrize'
const GET_ALL_PRIZES_EP = USE_LOCAL ? 'http://localhost:9001/prize/getAllprizes' : 'https://nicus-dirty-christmas.herokuapp.com/prize/getAllprizes'
const SET_PLAYER_PRIZE_EP = USE_LOCAL ? 'http://localhost:9001/prize/setPlayerPrize' : 'https://nicus-dirty-christmas.herokuapp.com/prize/setPlayerPrize'
const STEAL_PRIZE_EP = USE_LOCAL ? 'http://localhost:9001/prize/stealPrize' : 'https://nicus-dirty-christmas.herokuapp.com/prize/stealPrize'


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
            payload: { prizeId, playerId }
        })


    } catch (error) {
        console.log('prizeState.actions setPlayerPrize error: ', error)
    }
}

export const stealPrize = (prizeId, oldPlayer, newPlayer, currentGift ) => async (dispatch) => {
    try {


       await axios.post(STEAL_PRIZE_EP, { data: { prizeId, oldPlayer, newPlayer, currentGift}})


       
        dispatch({
            type: prizeTypes.SET_PLAYER_PRIZE,
            payload: { prizeId, playerId: newPlayer }
        })

        dispatch({
            type: playerTypes.SET_PRIZE_PLAYER,
            payload: { prizeId, playerId: newPlayer}
        })

        dispatch({
            type: playerTypes.STEAL_GIFT,
            payload: oldPlayer
        })

    } catch (error) {
        console.log('prizeState Actions stealPrize Error: ', error)
    }
}