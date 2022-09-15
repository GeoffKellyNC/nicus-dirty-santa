import React from 'react'
import Player from './Player'
import styled from 'styled-components'

const PlayersList = ({players}) => {
  return (
    <PlayersStyled>
        <span className='players-header-text'>Players</span>
        {players.length < 1 ? 'No Players':
          players.map((player, idx) => {
            return (
              <Player key = {idx} playerData = {player} />
            )
          })
        }
      </PlayersStyled>
  )
}

export default PlayersList


const PlayersStyled = styled.div`
    background: red;
    width: 14%;
    border-radius: 15px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;


    .players-header-text{
        color: ${pr => pr.theme.fonts.color.green};
        font-weight: bold;
        font-size: ${pr => pr.theme.fonts.size.xlarge};
        font-family: ${pr => pr.theme.fonts.family.nicus};
        border-bottom: 3px solid ${pr => pr.theme.colors.green};

    }
    



`