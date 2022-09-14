import * as types from './playerState.types';



export function players(state = [], action) {
    switch(action.type){
        case types.GET_PLAYERS:
            return action.payload;
        case types.SET_PLAYER:
            return [...state, action.payload];
        default:
            return state
    }
}

