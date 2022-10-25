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
    background: rgba( 248, 0, 3, 0.45 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    width: 18em;
    height: auto;
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