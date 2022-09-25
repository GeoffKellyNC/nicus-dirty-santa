import * as types from './playerState.types';



export function players(state = [], action) {
    switch(action.type){
        case types.GET_PLAYERS:
            return action.payload;
        case types.SET_PLAYER:
            return [...state, action.payload];
        case types.SET_PRIZE_PLAYER:
            return state.map(player => {
                if(player.player_id === action.payload.playerId){
                    return {
                        ...player,
                        player_prize: action.payload.prizeId
                    }
                } else {
                    return player
                }
            })
        default:
            return state
    }
}


export function playerData(state = {}, action) {
    switch(action.type){
        case types.SET_PLAYER_DATA:
            return action.payload;
        case types.SET_PRIZE_PLAYER:
            const currentLocalData = JSON.parse(localStorage.getItem('playerData'))
            const newLocalData = {
                ...currentLocalData,
                player_prize: action.payload.prizeId
            }
            localStorage.setItem('playerData', JSON.stringify(newLocalData))
            return {
                ...state,
                player_prize: action.payload.prizeId
            }
        default:
            return localStorage.getItem('playerData') ? JSON.parse(localStorage.getItem('playerData')) : state
    }
}


