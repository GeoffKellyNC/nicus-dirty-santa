import React from 'react'
import styled from 'styled-components'

const Player = ({playerData}) => {
  return (
    <PlayerStyled>
        <span>{playerData.player_name.toUpperCase()}</span>
    </PlayerStyled>
  )
}

export default Player


const PlayerStyled = styled.div`
    padding: 5px;
    font-family: ${pr => pr.theme.fonts.family.nicus}


`