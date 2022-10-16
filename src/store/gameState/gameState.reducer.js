import * as types from './gameState.types'


export function gameStatus (state = false, action){
    switch(action.type){
        case types.START_GAME:
            return action.payload
        default:
            return localStorage.getItem('gameStatus') || state
    }
}


export function currentTurn (state = null, action){
    switch(action.type){
        case types.SET_CURRENT_TURN:
            return action.payload
        default:
            return state
    }
}

export function ioSocket (state = null, action){
    switch(action.type){
        case types.SET_SOCKET:
            return action.payload
        default:
            return state
    }
}

export function gameData (state = null, action){
    switch(action.type){
        case types.SET_GAME_DATA:
            return action.payload
        default:
            return state
    }
}

