import React from 'react'
import styled from 'styled-components'
import * as gameActions from '../../store/gameState/gameState.actions'
import * as prizeActions from '../../store/prizeState/prizeState.actions'
import * as playerActions from '../../store/playerState/playerState.actions'
import { connect } from 'react-redux'


const GameStream = (props) => {
    const { 
        players,
        currentTurn,
        moveMade,
        playerMove,
        stealMade,
        playerSteal } = props

    const getPlayerNameById = (id) => {
        if(players.length < 1) return ''
        const player = players.find(player => player.player_id === id)
        return player.player_name ? player.player_name : ''

      }

    return (
        <GameStreamStyled>
            <div className='current-turn'>
                <span className='current-turn-title'> Current Turn: </span>
                <span className='current-turn-text'>
                    {
                        currentTurn ? getPlayerNameById(currentTurn) : 'Not Started'
                    }
                </span>
            </div>
            <div className='moves-made-container'>
                {
                    moveMade && (
                        <span className='move-feed'>
                            { playerMove.player } choose { playerMove.prize }
                        </span>
                    )
                }
                {
                    stealMade && (
                        <span className='move-feed'>
                            { playerSteal.player } stole { playerSteal.prize } from { playerSteal.oldPlayer }
                        </span>
                    )

                }
            </div>
        </GameStreamStyled>
    )
}

const mapStateToProps = state => {
    return({
        players: state.players,
        currentTurn: state.currentTurn
    })
}

export default connect(mapStateToProps, {...gameActions, ...prizeActions, ...playerActions}) (GameStream)

const GameStreamStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${pr => pr.theme.fonts.family.nicus};
    font-size: ${pr => pr.theme.fonts.size.xlarge};
    margin: 2rem 0;

    .moves-made-container {
        margin: 2rem 0;

    }

`