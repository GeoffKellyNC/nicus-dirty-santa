import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import * as playerActions from '../store/playerState/playerState.actions'
import * as prizeActions from '../store/prizeState/prizeState.actions'
import * as gameActions from '../store/gameState/gameState.actions'
import styled from 'styled-components'

import PlayerCurrent from '../components/playerBoard/PlayerCurrent'
import PlayerActions from '../components/playerBoard/PlayerActions.jsx'

const PlayerBoard = (props) => {
    const { 
      players, 
      playerData, 
      getAllPrizes, 
      refreshPlayerData,
      ioSocket,
      gameData,
      refreshGameData } = props

      const [gameStatus, setGameStatus] = useState(false)



    const nav = useNavigate()

    const refreshData = () => {
      console.log('Refreshing Data')
      const playerData = localStorage.getItem('playerData')
      const playerId = JSON.parse(playerData).player_id
      refreshPlayerData(playerId)
    }

    setTimeout(() => {
      (() => {
        try {
          console.log('Player Board socket', ioSocket) //!REMOVE
          ioSocket.on('startGame', (data) => {
          console.log('startGame', data) //!REMOVE
          setGameStatus(true)
        })
  
        ioSocket.on('moveMade', (data) => {
          console.log('moveMade Refreshing') //!REMOVE
          refreshData()
          refreshGameData()
          refreshPlayerData()
        })
        } catch (error) {
          console.log(error)
        }
      })()
    }, 1000);

    // const runSocket = async () => {
      
    // }


    useEffect(() => {
      getAllPrizes()
      refreshGameData()
      refreshPlayerData()

    }, [getAllPrizes, refreshGameData, refreshPlayerData])

    // setTimeout(() => {
    //   refreshPlayerData(localStorage.getItem('playerId'))
    // }, 3000);


  return (
    <PlayerBoardStyled>
        <button onClick={() => nav('/masterPrizes')}> View Prizes </button>
        <button onClick = {() => nav('/')}> Home </button>
        <div className='player-board-header'>
          <span> Welcome {playerData.player_name} to Nicus Dirty Santa</span>
          {
            gameStatus ? 
            <h1 className='playerboard-text'>Game is in progress</h1>
            :
            <h1 className='playerboard-text'>Waiting for game to start</h1>
        }
        </div>
        <PlayerCurrent />
        <PlayerActions />
    </PlayerBoardStyled>
  )
}

const mapStateToProps = state => {
    return({
        players: state.players,
        playerData: state.playerData,
        ioSocket: state.ioSocket,
        gameData: state.gameData
      })
}

export default connect(mapStateToProps, {...playerActions, ...prizeActions, ...gameActions}) (PlayerBoard)


const PlayerBoardStyled = styled.div`
  background: ${pr => pr.theme.colors.background_black};
  height: 100vh;
  overflow-y: hidden;

  .player-board-header {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      font-family: ${pr => pr.theme.fonts.family.christmas};
      font-size: ${pr => pr.theme.fonts.size.heading};
    }
  }


`