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
        case types.STEAL_GIFT:
            return state.map( player => {
                if (player.player_id === action.payload){
                    return {
                        ...player,
                        player_prize: null
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
            return {
                ...state,
                player_prize: action.payload.prizeId
            }
        case types.REFRESH_PLAYER_DATA:
            console.log('Refreshing User Data') //!REMOVE
            return action.payload
        default:
            return state
    }
}


