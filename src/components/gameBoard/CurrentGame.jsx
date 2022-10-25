import React, { useEffect } from 'react'
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
                currentTurn ? 
                <>
                    <span className='current-turn-title'> Current Turn: </span> 
                    <span className='current-turn-text'> {getPlayerName(currentTurn)}</span> 
                </>
                : 
                <span>Waiting for Game to Start...</span>
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
    width: calc(100% + 400px);
    height: 200px;
    color: black;
    margin-left: -200px;

    .current-turn-title {
        font-weight: bold;
        font-size: ${pr => pr.theme.fonts.size.heading};
        color: white;
        font-family: ${pr => pr.theme.fonts.family.nicus};
    }

    .current-turn-text {
        font-size: ${pr => pr.theme.fonts.size.heading};
        color: ${pr => pr.theme.colors.red};
        font-family: ${pr => pr.theme.fonts.family.nicus};
    }




`