import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import RejoinGame from '../components/home/RejoinGame.form'

const Home = () => {
    const [rejoin, setRejoin] = useState(false)

    const navigate = useNavigate()
  return (
    <HomeStyled>
        <div className='home-header'>
            <h1 className='home-title'> NICUS DIRTY CHRISTMAS </h1>
            <button onClick={() => {
                localStorage.clear()
            }}> Clear Storage </button>
        </div>
        <div className = 'home-body'>
            <div className='game-master choice-container'>
                <button onClick ={() => navigate('/gameboard')} className='game-master-btn choice-btn'> GAME MASTER </button>
                <button onClick={() => navigate('/register')} className='player-btn choice-btn'> PLAYERS </button>
                <button onClick = {() => setRejoin(!rejoin)} className = 'rejoin-btn choice-btn'> REJOIN </button>
                {
                    rejoin && <RejoinGame />
                }
            </div>
        </div>
    </HomeStyled>
  )
}

export default Home


const HomeStyled = styled.div`
    height: 100vh;
    overflow-y: hidden;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(0,211,230,1) 61%);   



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
        height: 50%;
        width: 100%

        
    }

    .choice-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-family: ${pr => pr.theme.fonts.family.nicus};
        font-size: ${pr => pr.theme.fonts.size.large};
        color: ${pr => pr.theme.fonts.color.green};
    }

    .choice-btn {
        width: 350px;
        height: 100px;
        font-family: ${pr => pr.theme.fonts.family.nicus};
        font-size: ${pr => pr.theme.fonts.size.large};
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        transition: all 0.3s ease-in-out;

        &:hover {
            background: rgba( 255, 255, 255, 0.35 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.47 );
            backdrop-filter: blur( 6px );
            scale: 1.1;
        }

    }



`