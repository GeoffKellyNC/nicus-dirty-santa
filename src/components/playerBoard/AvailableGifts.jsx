import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const AvailableGifts = ({
  prizes, 
  setPlayerPrize, 
  setChooseGiftToggle, 
  playerData, 
  ioSocket,
  updatePlayerOrder }) => {

    const [ availableGifts, setAvailableGifts] = useState([])


    useEffect(() => {
        setAvailableGifts(prizes.filter(prize => prize.prize_current_owner === null))
    },[prizes])

    const chooseGift = async (giftId, playerId) => {
        await setPlayerPrize(giftId, playerId)
        const playerName = playerData.player_name
        const giftName = prizes.find(prize => prize.prize_id === giftId).prize_name
        await updatePlayerOrder('choose', playerId)
        // await ioSocket.emit('sendGiftChosen', {playerName, giftName})
        await ioSocket.emit('moveMadeServer', {type: 'choose',playerName, giftName})

        setChooseGiftToggle(false)
    }
    
    return (
        <StyledAvailGifts>
            {   prizes.length < 1 ? <div>No Gifts Set </div> :
                availableGifts.map((gift, idx) => {
                    return(
                        <div key = {idx} className = 'avail-gift-container'>
                            <div className='gift-header'>
                                <span className='gift-name'>{gift.prize_name}</span>
                                <img 
                                    src = {gift.prize_image}
                                    alt = 'gift'
                                    className='gift-img'
                                />
                            </div>
                            <div className='gift-body'>
                                <button className = 'choose-btn' onClick = {() => chooseGift(gift.prize_id, playerData.player_id)}> Choose Gift </button>
                            </div>
                        </div>
                    )
                })
            }
            <button 
                className = 'close-btn' 
                onClick = {() => setChooseGiftToggle(false)}> Close </button>
        </StyledAvailGifts>
    )
}

export default AvailableGifts


const StyledAvailGifts = styled.div`
    color: white; 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 80%;
    padding: 5%;
    text-align: center;
    font-size: 1.5rem;
    z-index: 10;
    font-family: ${pr => pr.theme.fonts.primary};
    box-sizing: border-box;
    overflow-y: scroll;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    background: rgba( 23, 11, 163, 0.4 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 3px );
    -webkit-backdrop-filter: blur( 3px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );


    .gift-header { 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .gift-img{
        height: 100px;
        width: 100px;
    }

    .avail-gift-container {
        background: rgba( 248, 0, 3, 0.25 );
        width: 200px;
        height: 250px;
        border-radius: 10px;
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 3px );
        -webkit-backdrop-filter: blur( 3px );
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .gift-name {
        font-family: ${pr => pr.theme.fonts.family.nicus};
        padding: .5rem;
    }

    .choose-btn {
        background: ${pr => pr.theme.colors.green};
        border: none;
        border-radius: 5px;
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 3px );
        -webkit-backdrop-filter: blur( 3px );
        padding: 5px;

        &:hover {
            background: ${pr => pr.theme.colors.red};
        }
    }


`