import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Home = () => {

    const navigate = useNavigate()
  return (
    <HomeStyled>
        <div className='home-header'>
            <h1 className='home-title'> NICUS DIRTY CHRISTMAS </h1>
        </div>
        <div className = 'home-body'>
            <div className='game-master choice-container'>
                <span className='game-master-text'>Game Master</span>
                <button onClick ={() => navigate('/gameboard')} className='game-master-btn'> Click Here </button>
            </div>
            <div className='player choice-container'>
                <span className='player-text'>Players</span>
                <button onClick={() => navigate('/players')} className='player-btn'>Click Here</button>
            </div>
        </div>
    </HomeStyled>
  )
}

export default Home


const HomeStyled = styled.div`
    background: ${pr => pr.theme.colors.background};
    height: 100vh;
    overflow-y: hidden;



    .home-header{
        display: flex;
        justify-content: center;
        align-content: center;
        padding: 5% 0;
    }
    
    .home-header h1{
        font-family: ${pr => pr.theme.fonts.family.christmas};
        font-size: ${pr => pr.theme.fonts.size.title};
        color: ${pr => pr.theme.fonts.color.red};
    }


    .home-body {
        display: flex;
        color: white;
        justify-content: space-around;
        height: 100%;
    }

    .choice-container {
        background: black;
        padding: 1rem;
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        width: 20%;
        height: 20%;
        justify-content: flex-start;
        align-items: center;
        font-family: ${pr => pr.theme.fonts.family.nicus};
        font-size: ${pr => pr.theme.fonts.size.large};
        color: ${pr => pr.theme.fonts.color.green};
    }



`