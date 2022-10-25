/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as prizeActions from '../store/prizeState/prizeState.actions'
import * as playerActions from '../store/playerState/playerState.actions'

import PrizeItem from '../components/masterPrizes/PrizeItem'

const MasterPrizes = (props) => {
    const { playerData, prizes, getAllPrizes, players } = props

    const nav = useNavigate()

    useEffect(() => {
        getAllPrizes()
    }, [getAllPrizes])


    return (
        <StyledMasterPrizes>
            <button onClick = {() => nav('/playerBoard')}> Back To Board </button>
            <div className='prize-list'>
                {
                    prizes.length > 0 ? (
                        prizes.map((item,idx) => {
                            return (
                                <PrizeItem 
                                    key = {idx} 
                                    prizeInfo = {item} 
                                    players = {players}
                                    />
                            )
                        })
                    ) : 'No Prizes'
                }
            </div>
        </StyledMasterPrizes>
    )
}

const mapStateToProps = state => {
    return({
        prizes: state.prizes,
        playerData: state.playerData,
        players: state.players
    })
}

export default connect(mapStateToProps, {...prizeActions, ...playerActions}) (MasterPrizes)

const StyledMasterPrizes = styled.div`



    .prize-list {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        flex-wrap: wrap;
    }

`