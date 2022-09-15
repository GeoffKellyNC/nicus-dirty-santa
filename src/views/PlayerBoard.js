import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as playerActions from '../store/playerState/playerState.actions'

const PlayerBoard = (props) => {
    const { players, playerData } = props
  return (
    <div>
        <span> Welcome {playerData.player_name}</span>
    </div>
  )
}

const mapStateToProps = state => {
    return({
        players: state.players,
        playerData: state.playerData
    })
}

export default connect(mapStateToProps, playerActions) (PlayerBoard)