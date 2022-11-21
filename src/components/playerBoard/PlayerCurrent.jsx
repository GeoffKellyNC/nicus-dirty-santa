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
            <div className='current-prize'>
                <span className='current-prize-title'>Current Prize: </span>
                <span className='current-prize-text'>{currentPrize ? `${currentPrize.prize_name} - $${currentPrize.prize_value}` : 'No Prize'}</span>
                <img 
                    className='current-prize-image'
                    src={currentPrize ? currentPrize.prize_image : null}
                    alt={currentPrize ? currentPrize.prize_name : null}
                />
            </div>
            {/* <div className = 'player-stats'>
                <span> Times Stolen From: </span>
                <span>{playerData.player_stolen_from ? playerData.player_stolen_from : '0'}</span>
            </div> */}
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
    background: rgba( 65, 163, 11, 0.3 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    width: 35%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;

    .current-prize {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
        span {
            font-size: 1.2rem;
        }
    }

    .current-prize-title {
        font-weight: bold;
        font-size: ${pr => pr.theme.fonts.size.heading};
        font-family: ${pr => pr.theme.fonts.family.nicus};
        color: ${pr => pr.theme.fonts.color.red};
    }

    .current-prize-text {
        font-weight: bold;
        font-size: ${pr => pr.theme.fonts.size.heading};
        font-family: ${pr => pr.theme.fonts.family.nicus};
        color: ${pr => pr.theme.fonts.color.white};
    }

    .current-prize-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid ${pr => pr.theme.colors.green};
    }




`