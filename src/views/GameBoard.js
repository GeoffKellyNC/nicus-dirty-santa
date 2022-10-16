import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as playerActions from '../store/playerState/playerState.actions'
import * as gameActions from '../store/gameState/gameState.actions'

import AddPrizeForm from '../components/gameBoard/AddPrize.form'
import PlayersList from '../components/gameBoard/PlayersList'
import PlayerOrder from '../components/gameBoard/PlayerOrder'
import CurrentGame from '../components/gameBoard/CurrentGame'



const GameBoard = (props) => {
  const { players, getPlayers, ioSocket, startGame  } = props
  const [started, setStarted] = useState(false)
  const [ moveMade, setMoveMade ] = useState(false)
  const [playerMove, setPlayerMove] = useState({player: '', prize: ''})

  const nav = useNavigate()

  setTimeout(() => {
    (() => {
      console.log('ioSocket: ', ioSocket)
      ioSocket.on('startGame', (data) => {
        setStarted(true)
      })
      ioSocket.on('giftChosen', (data) => {
        console.log('GiftChosen', data)
        console.log('IT WORKED!!!!') //!REMOVE
        setPlayerMove({...playerMove, player: data.playerName, prize: data.giftName})
        setMoveMade(true)
      })
    })()
  }, 1000);


  useEffect(() => {
    getPlayers()

    // setTimeout(() => {
    //   ioSocket.on('startGame', (data) => {
    //     setStarted(true)
    //   })
    //   ioSocket.on('giftChosen', (data) => {
    //     console.log('GiftChosen', data)
    //     console.log('IT WORKED!!!!') //!REMOVE
    //     setPlayerMove({...playerMove, player: data.playerName, prize: data.giftName})
    //     setMoveMade(true)
    //   })
    // }, 1000);

  },[getPlayers])



  const handleStart = async () => {
    const gameId = await startGame()
    ioSocket.emit('startGame', { gameId })
    
  }




  return (
    <GameBoardStyled>
      <div className='gameboard-header'>
        <h1 className='gameboard-text'>Nicus Dirty Santa GameBoard</h1>
      </div>
      <button onClick={() => nav('/masterprizes')}> View Prizes </button>
      <div className='gameboard-body'>
        <div className='gameboard-right'>
          <PlayersList players = {players} />
        </div>
        <div className='gameboard-middle'>
          <CurrentGame />
        </div>
        <div className='gameboard-left'>
          <PlayerOrder players = {players} />
        </div>
      </div>
      {
        started ? <span> Started! </span> : <span> Not Started! </span>
      }
      <button onClick = {handleStart}> Start Game </button>
      <AddPrizeForm />
      {
        moveMade && <span> {playerMove.player} chose {playerMove.prize} </span>
      }
    </GameBoardStyled>
  )
}

const mapStateToProps = state => {
  return({
    players: state.players,
    ioSocket: state.ioSocket
  })
}

export default connect(mapStateToProps, {...playerActions, ...gameActions}) (GameBoard)

const GameBoardStyled = styled.div`
  background: ${pr => pr.theme.colors.background_black};
  height: 100vh;
  overflow-y: hidden;
  color: white;

  .gameboard-header {
    display: flex;
    justify-content: center;
    margin: 2%;
    font-family: ${pr => pr.theme.fonts.family.christmas};
    font-size: ${pr => pr.theme.fonts.size.heading};
    color: ${pr => pr.theme.fonts.color.green};
  }

  .gameboard-body {
    display: flex;
    justify-content: space-between;
    ${'' /* margin: 2%; */}

  }


`