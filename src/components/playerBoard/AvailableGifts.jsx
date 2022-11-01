import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const AvailableGifts = ({
  prizes, 
  setPlayerPrize, 
  setChooseGiftToggle, 
  playerData, 
  ioSocket,
  setNextPlayer }) => {

    const [ availableGifts, setAvailableGifts] = useState([])


    useEffect(() => {
        setAvailableGifts(prizes.filter(prize => prize.prize_current_owner === null))
    },[prizes])

    const chooseGift = async (giftId, playerId) => {
        await setPlayerPrize(giftId, playerId)
        const playerName = playerData.player_name
        const giftName = prizes.find(prize => prize.prize_id === giftId).prize_name
        setNextPlayer()
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
                            <button onClick = {() => chooseGift(gift.prize_id, playerData.player_id)}> Choose Gift </button>
                        </div>
                    </div>
                )
            })
        }
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
    height: 50%;
    padding: 5%;
    border: 1px solid ${pr => pr.theme.colors.berry};
    text-align: center;
    font-size: 1.5rem;
    z-index: 10;
    height: auto;
    font-family: ${pr => pr.theme.fonts.primary};
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    overflow: scroll;
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    flex-wrap: wrap;


  .available-gift-container {
    background-color: red;
    width: 300px;
    height: 300px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${pr => pr.theme.fonts.family.nicus};
    border-radius: 16px;
    margin-top: 1%;
  }

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


`