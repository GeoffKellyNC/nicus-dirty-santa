import { combineReducers } from 'redux';

import { players } from './playerState/playerState.reducer'
import { prizes } from './prizeState/prizeState.reducer'



export default combineReducers({
    players,
    prizes
})