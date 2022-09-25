import * as types from './prizeState.types';



export function prizes(state = [], action) {
    switch(action.type){
        case types.GET_PRIZES:
            return action.payload;
        case types.SET_PRIZE:
            return [...state, action.payload];
        case types.SET_PLAYER_PRIZE:
            return state.map(prize => {
                if(prize.prize_id === action.payload.prizeId){
                    return {
                        ...prize,
                        prize_current_owner: action.payload.playerId
                    }
                } else {
                    return prize
                }
            })
        default:
            return state
    }
}