import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as gameActions from '../../store/gameState/gameState.actions'

const CurrentGame = (props) => {
    const { gameStatus, currentTurn, players } = props


    const getPlayerName = (playerId) => {
        if(players.length < 1) return 'No Player'
        const playerName = players.filter(player => player.player_id === playerId)[0].player_name
        return playerName
    }


    useEffect(() => {
        
    
    }, [])



  return (
    <CurrentGameStyled>
        <div>
            {
                gameStatus ? <span>Game Started</span> : <span>Not Started</span>
            }
        </div>
        <div>
            {
                currentTurn ? <span> {getPlayerName(currentTurn)}</span> : <span>NO PLAYER</span>
            }
        </div>
    </CurrentGameStyled>
  )
}

const mapStateToProps = state => {
    return({
        gameStatus: state.gameStatus,
        currentTurn: state.currentTurn,
        players: state.players
    })
}

export default connect(mapStateToProps, gameActions) (CurrentGame)



const CurrentGameStyled = styled.div`
    background: ${pr => pr.theme.colors.green};
    width: calc(100% + 200px);
    color: black;



`