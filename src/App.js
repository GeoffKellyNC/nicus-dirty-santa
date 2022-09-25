import React from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css';

import Home from './views/Home'
import GameBoard from './views/GameBoard'
import Register from './views/Register'
import PlayerBoard from './views/PlayerBoard'
import MasterPrizes from './views/MasterPrizes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Home />}/>
        <Route path = '/gameboard' element = {<GameBoard />}/>
        <Route path = '/register' element = {<Register />} />
        <Route path = '/playerboard' element = {<PlayerBoard />} />
        <Route path = '/masterprizes' element = {<MasterPrizes />} />
      </Routes>
    </div>
  );
}

export default App;
