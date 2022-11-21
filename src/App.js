import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css';

import Home from './views/Home'
import GameBoard from './views/GameBoard'
import Register from './views/Register'
import PlayerBoard from './views/PlayerBoard'
import MasterPrizes from './views/MasterPrizes';

// import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import { connect } from 'react-redux'
import * as gameActions from './store/gameState/gameState.actions'




const LOCAL = false


function App (props) {
  const { setIoSocket } = props

  const ENDPOINT = LOCAL ? 'http://localhost:9001' : "https://nicus-dirty-christmas.herokuapp.com/";

  useEffect(() => {
    const socket = io(ENDPOINT);
    setIoSocket(socket)
    
  }, [ENDPOINT, setIoSocket]);

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


export default connect(null, gameActions) (App);
