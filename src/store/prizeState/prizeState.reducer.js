import * as types from './prizeState.types';



export function prizes(state = [], action) {
    switch(action.type){
        case types.GET_PRIZES:
            return action.payload;
        case types.SET_PRIZE:
            return [...state, action.payload];
        default:
            return state
    }
}