import React from 'react'
import styled from 'styled-components'

const StealGift = () => {
  return (
    <StealGiftStyled>
        <div>Gifts to Steal</div>
    </StealGiftStyled>
  )
}

export default StealGift


const StealGiftStyled = styled.div`
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


`