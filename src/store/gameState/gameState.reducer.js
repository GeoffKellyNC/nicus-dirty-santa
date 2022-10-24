import * as types from './gameState.types'


export function gameStatus (state = false, action){
    switch(action.type){
        case types.START_GAME:
            return action.payload
        default:
            return localStorage.getItem('gameData') || state
    }
}

export const playerOrder = (state = [], action) => {
    switch(action.type){
        case types.SET_PLAYER_ORDER:
            return action.payload
        default:
            return state
    }
}


export function currentTurn (state = null, action){
    switch(action.type){
        case types.SET_CURRENT_TURN:
            return action.payload
        default:
            const currentTurn = localStorage.getItem('currentTurn')
            return currentTurn ? JSON.parse(currentTurn) : state
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
            return localStorage.getItem('gameData') ? JSON.parse(localStorage.getItem('gameData')) : state
    }
}

