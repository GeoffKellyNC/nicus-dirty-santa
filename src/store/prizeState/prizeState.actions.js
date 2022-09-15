import axios from 'axios'
import * as prizeTypes from './prizeState.types'


const SET_PRIZE_EP = 'http://localhost:9001/prize/setPrize'


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