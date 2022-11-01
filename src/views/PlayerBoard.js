/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import * as playerActions from '../store/playerState/playerState.actions'
import * as prizeActions from '../store/prizeState/prizeState.actions'
import * as gameActions from '../store/gameState/gameState.actions'
import styled from 'styled-components'

import GameStream from '../components/playerBoard/GameStream'
import PlayerCurrent from '../components/playerBoard/PlayerCurrent'
import PlayerActions from '../components/playerBoard/PlayerActions.jsx'
import Snowflake from '../components/playerBoard/Snowflake'

const PlayerBoard = (props) => {
    const { 
      playerData, 
      getAllPrizes, 
      refreshPlayerData,
      ioSocket,
      refreshGameData,
      gameStatus,
      setGameData,
      setLocalCurrentTurn } = props

      const [gameStatusLocal, setGameStatusLocal] = useState(localStorage.getItem('gameData') || false)
      const [moveMade, setMoveMade] = useState(false);
      const [playerMove, setPlayerMove] = useState({ player: "", prize: "" });
      const [stealError, setStealError] = useState(false);

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
          console.log('moveMade refreshing data!') //! REMOVE
          refreshData()
          refreshGameData()
          refreshPlayerData()
          getAllPrizes()
        })
        ioSocket.on('gameData', (data) => {
          localStorage.setItem('gameData', JSON.stringify(data))
        })
        ioSocket.on('shuffled', (data) => {
          localStorage.setItem('shuffledPlayers', JSON.stringify(data.shuffledPlayers))
          localStorage.setItem('currentTurn' , JSON.stringify(data.shuffledPlayers[0].playerId))
          setLocalCurrentTurn(data.shuffledPlayers[0].playerId)
        })
        ioSocket.on('sendNextPlayer', (data) => {
          const { playerId } = data
          console.log('got next player', playerId) //!remove
          setLocalCurrentTurn(playerId)
          localStorage.setItem('currentTurn', JSON.stringify(playerId))

        })
        ioSocket.on('sendPlayerOrder', (data) => {
          const { playerList } = data
          console.log('got Player Order', data) //! REMOVE
          localStorage.setItem('shuffledPlayers', JSON.stringify(playerList))
        })

        ioSocket.on("giftChosen", (data) => {
          setPlayerMove({
            ...playerMove,
            player: data.playerName,
            prize: data.giftName,
          });
          setMoveMade(true);
        });


        } catch (error) {
          console.log(error)
        }
      })()
    }, 1000);


    useEffect(() => {
      refreshData()
      getAllPrizes()
      refreshGameData()
      refreshPlayerData()

    }, [])



  return (
    <PlayerBoardStyled>
      <Snowflake />
      <div className='nav-controls'>
        <button onClick={() => nav('/masterPrizes')}> View Prizes </button>
        <button onClick = {() => nav('/')}> Home </button>
      </div>
      <div className='player-board-header'>
        <span> Welcome {playerData.player_name} to Nicus Dirty Santa</span>
        {
          gameStatusLocal || gameStatus ? 
          <h1 className='playerboard-text game-active'>Game is in progress</h1>
          :
          <h1 className='playerboard-text'>Waiting for game to start</h1>
      }
      </div>
      <PlayerCurrent />
      {
        stealError && (
          <div className="steal-error">
            <p> You can't steal this! </p>
          </div>
        )
      }
      <PlayerActions setStealError = { setStealError } />
      <GameStream 
        moveMade = { moveMade } 
        playerMove = { playerMove } />
    </PlayerBoardStyled>
  )
}

const mapStateToProps = state => {
    return({
        players: state.players,
        playerData: state.playerData,
        ioSocket: state.ioSocket,
        gameData: state.gameData,
        gameStatus: state.gameStatus,
        currentTurn: state.currentTurn
      })
}

export default connect(mapStateToProps, {...playerActions, ...prizeActions, ...gameActions}) (PlayerBoard)


const PlayerBoardStyled = styled.div`
  background: rgb(47,109,211);
  background: linear-gradient(0deg, rgba(47,109,211,1) 6%, rgba(80,148,228,1) 60%, rgba(47,109,211,1) 100%);
  height: 100vh;
  overflow-y: hidden;
  color: white;

  .player-board-header {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      font-family: ${pr => pr.theme.fonts.family.christmas};
      font-size: ${pr => pr.theme.fonts.size.title};
    }
  }

  .playerboard-text {
    font-family: ${pr => pr.theme.fonts.family.nicus};
    font-size: ${pr => pr.theme.fonts.size.heading};
    margin-top: 2%;
    color: ${pr => pr.theme.fonts.color.red};

  }

  .game-active {
    color: ${pr => pr.theme.fonts.color.green};
  }


`