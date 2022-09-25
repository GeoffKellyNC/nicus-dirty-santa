import React from 'react'
import styled from 'styled-components'

const PrizeItem = ({prizeInfo, players}) => {



  return (
    <PrizeItemStyled>
        <div>
            <img 
              src = {prizeInfo.prize_image} 
              alt = 'prize'
              className='prizeItem-image' />
        </div>
        <div className='prizeItem-info'>
            <span className='prizeItem-name'> {prizeInfo.prize_name} </span>
            <div className='prizeItem-value'>
              <span> Value: </span>
              <span> ${prizeInfo.prize_value}</span>
            </div>
            <div className='prizeItem-current-owner'>
              <span> Current Owner: </span>
              <span>
                {
                  prizeInfo.prize_current_owner ? (
                    players.filter(player => player.player_id === prizeInfo.prize_current_owner)[0].player_name
                  ) : (
                    'AVAILABLE'
                  )
                }
              </span>
            </div>
            <div className='prizeInfo-num-steals'>
              <span> Stolen: </span>
              <span>
                {
                  prizeInfo.prize_num_steals ? prizeInfo.prize_num_steals : '0'
                }
              </span>
            </div>

        </div>
    </PrizeItemStyled>
  )
}

export default PrizeItem


const PrizeItemStyled = styled.div `
  background: black;
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


  .prizeItem-image{
    height: 100px;
    width: 100px;
  }

  .prizeItem-info {
    display: flex;
    flex-direction: column;
  }


`