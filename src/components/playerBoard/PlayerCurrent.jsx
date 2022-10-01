import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as playerActions from '../../store/playerState/playerState.actions'

const PlayerCurrent = (props) => {
    const { playerData, prizes, getPlayers } = props
    const [ currentPrize, setCurrentPrize ] = useState(null)


    useEffect(() => {
        setCurrentPrize(prizes.length < 1 ? null : prizes.find(prize => prize.prize_id === playerData.player_current_prize))
        getPlayers()
        
    }, [getPlayers, playerData.player_current_prize, prizes, setCurrentPrize])

    return (
        <PlayerStatus>
        <div>
            <span>Current Prize: </span>
            <span>{currentPrize ? currentPrize.prize_name : 'No Prize'}</span>
        </div>
        <div>
            <span> Times Stolen From: </span>
            <span>{playerData.player_stolen_from ? playerData.player_stolen_from : '0'}</span>
        </div>
        </PlayerStatus>
    )
}

const mapStateToProps = state => {
    return({
        playerData: state.playerData,
        prizes: state.prizes
    })
}

export default connect(mapStateToProps, playerActions) (PlayerCurrent)

const PlayerStatus = styled.div`
    color: white;



`