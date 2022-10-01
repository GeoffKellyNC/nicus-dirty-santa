import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import * as playerActions from '../store/playerState/playerState.actions'
import * as prizeActions from '../store/prizeState/prizeState.actions'
import styled from 'styled-components'

import PlayerCurrent from '../components/playerBoard/PlayerCurrent'
import PlayerActions from '../components/playerBoard/PlayerActions.jsx'

const PlayerBoard = (props) => {
    const { players, playerData, getAllPrizes, refreshPlayerData } = props



    const nav = useNavigate()


   

    useEffect(() => {
      getAllPrizes()
    }, [getAllPrizes])

    useEffect(() => {
      refreshPlayerData(localStorage.getItem('playerId'))
    }, [])

    setTimeout(() => {
      refreshPlayerData(localStorage.getItem('playerId'))
    }, 3000);


  return (
    <PlayerBoardStyled>
        <button onClick={() => nav('/masterPrizes')}> View Prizes </button>
        <button onClick = {() => nav('/')}> Home </button>
        <div className='player-board-header'>
          <span> Welcome {playerData.player_name} to Nicus Dirty Santa</span>
        </div>
        <PlayerCurrent />
        <PlayerActions />
    </PlayerBoardStyled>
  )
}

const mapStateToProps = state => {
    return({
        players: state.players,
        playerData: state.playerData
    })
}

export default connect(mapStateToProps, {...playerActions, ...prizeActions}) (PlayerBoard)


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