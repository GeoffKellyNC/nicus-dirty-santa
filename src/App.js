import React from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css';

import Home from './views/Home'
import GameBoard from './views/GameBoard'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Home />}/>
        <Route path = '/gameboard' element = {<GameBoard />}/>
      </Routes>
    </div>
  );
}

export default App;
