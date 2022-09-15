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


export function playerData(state = {}, action) {
    switch(action.type){
        case types.SET_PLAYER_DATA:
            return action.payload;
        default:
            return localStorage.getItem('playerData') ? JSON.parse(localStorage.getItem('playerData')) : state
    }
}


