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
      refreshGameData,
      gameStatus,
      setGameData,
      setLocalCurrentTurn } = props

      const [gameStatusLocal, setGameStatusLocal] = useState(localStorage.getItem('gameData') || false)



    const nav = useNavigate()

    const refreshData = () => {
      const playerData = JSON.parse(localStorage.getItem('PlayerData'))
      const playerId = playerData.player_id
      refreshPlayerData(playerId)
    }

    setTimeout(() => {
      (() => {
        try {
          ioSocket.on('startGame', (data) => {
          localStorage.setItem('gameData', JSON.stringify(data.gameData))
          setGameStatusLocal(true)
          setGameData(data.gameData)
        })
  
        ioSocket.on('moveMade', (data) => {
          refreshData()
          refreshGameData()
          refreshPlayerData()
        })
        ioSocket.on('gameData', (data) => {
          localStorage.setItem('gameData', JSON.stringify(data))
        })
        ioSocket.on('shuffled', (data) => {
          localStorage.setItem('shuffledPlayers', JSON.stringify(data.shuffledPlayers))
          localStorage.setItem('currentTurn' , JSON.stringify(data.shuffledPlayers[0].playerId))
        })
        ioSocket.on('sendNextPlayer', (data) => {
          const { playerId } = data
          setLocalCurrentTurn(playerId)
          localStorage.setItem('currentTurn', JSON.stringify(playerId))

        })
        ioSocket.on('sendPlayerOrder', (data) => {
          const { playerList } = data
          localStorage.setItem('shuffledPlayers', JSON.stringify(playerList))
        })
        } catch (error) {
          console.log(error)
        }
      })()
    }, 1000);

    // const runSocket = async () => {
      
    // }


    useEffect(() => {
      refreshData()
      getAllPrizes()
      refreshGameData()
      refreshPlayerData()

    }, [])

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
            gameStatusLocal || gameStatus ? 
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
        gameData: state.gameData,
        gameStatus: state.gameStatus
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