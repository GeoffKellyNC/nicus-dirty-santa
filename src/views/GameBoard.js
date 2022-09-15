import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as playerActions from '../store/playerState/playerState.actions'

import AddPrizeForm from '../components/gameBoard/AddPrize.form'
import PlayersList from '../components/gameBoard/PlayersList'
import PlayerOrder from '../components/gameBoard/PlayerOrder'

const GameBoard = (props) => {
  const { players, getPlayers } = props

  useEffect(() => {
    getPlayers()
  },[getPlayers, players])


  return (
    <GameBoardStyled>
      <div className='gameboard-header'>
        <h1 className='gameboard-text'>Nicus Dirty Santa GameBoard</h1>
      </div>
      <div className='gameboard-body'>
        <div className='gameboard-right'>
          <PlayersList players = {players} />
        </div>
        <div className='gameboard-left'>
          <PlayerOrder players = {players} />
        </div>
        <AddPrizeForm />
      </div>
    </GameBoardStyled>
  )
}

const mapStateToProps = state => {
  return({
    players: state.players
  })
}

export default connect(mapStateToProps, playerActions) (GameBoard)

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


`