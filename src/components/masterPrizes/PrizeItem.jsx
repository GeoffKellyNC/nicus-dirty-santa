import React from 'react'
import styled from 'styled-components'

const PrizeItem = ({prizeInfo, players}) => {

  const getPrizeOwner = (prizeId) => {
    
    const prizeOwner = players.find(player => {
      return player.player_id === prizeId
    }) 

    return prizeOwner
  }



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
            <div className='prizeItem-description'>
              <span className = 'desc-text'> {prizeInfo.prize_description}</span>
            </div>
            <div className='prizeItem-current-owner'>
              <span> Current Owner: </span>
              <span>
                {
                  getPrizeOwner(prizeInfo.prize_current_owner) ?
                    getPrizeOwner(prizeInfo.prize_current_owner).player_name
                  : (
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
  background: rgba( 248, 0, 3, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  width: 700px;
  height: 700px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${pr => pr.theme.fonts.family.nicus};
  border-radius: 16px;
  margin-top: 1%;


  .prizeItem-image{
    height: 400px;
    width: 400px;
  }

  .prizeItem-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    font-size: 1.2rem;
    font-family: ${pr => pr.theme.fonts.family.nicus};
    margin-top: 1%;

  }

  .prizeItem-name {
    font-size: 2rem;
    font-family: ${pr => pr.theme.fonts.family.nicus};
    margin-bottom: 10px;
    border-bottom: 3px solid ${pr => pr.theme.colors.green};
    color: ${pr => pr.theme.colors.green};
  }

  .prizeItem-description {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${pr => pr.theme.colors.background_black};

    & > span {
      text-align: center;
      margin: 10px;
    }
    
  }


`