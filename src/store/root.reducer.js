import { combineReducers } from 'redux';

import { players } from './playerState/playerState.reducer'
import { prizes } from './prizeState/prizeState.reducer'
import { playerData } from './playerState/playerState.reducer'
import { gameStatus } from './gameState/gameState.reducer'
import { currentTurn } from './gameState/gameState.reducer'
import { ioSocket } from './gameState/gameState.reducer';
import { gameData } from './gameState/gameState.reducer';




export default combineReducers({
    players,
    prizes,
    playerData,
    gameStatus,
    currentTurn,
    ioSocket,
    gameData
})