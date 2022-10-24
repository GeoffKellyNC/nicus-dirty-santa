import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const PlayerOrder = ({players, setPlayerOrder, gameData, ioSocket}) => {
    const [shuffled, setShuffled] = useState(false)
    const [shuffledPlayers, setShuffledPlayers] = useState([])


    const shufflePlayers = async () => {
        const playerNames = players.map(player => { 
            return {
                    playerName: player.player_name, 
                    playerId: player.player_id
                }
            })
        const shuffledNames = playerNames.sort(() => Math.random() - 0.5)
        setShuffledPlayers(shuffledNames)
        localStorage.setItem('shuffledPlayers', JSON.stringify(shuffledNames))
        localStorage.setItem('currentTurn', JSON.stringify(shuffledNames[0].playerId))
        await ioSocket.emit('shuffled', {shuffledNames})
        await setPlayerOrder(shuffledNames, gameData.game_id)
        setShuffled(true)
    }

    useEffect(() => {
        if (localStorage.getItem('shuffledPlayers')) {
            setShuffledPlayers(JSON.parse(localStorage.getItem('shuffledPlayers')))
            setShuffled(true)
        }
    }
    , [])

    
  return (
    <Order>
        <button onClick={() => shufflePlayers()}>Shuffle Players</button>
        <div>
            { !shuffled ? 'Not Shuffled':
                shuffledPlayers.map((player, idx) => {
                return (
                    <div className='player-name-text' key={idx}>{player.playerName}</div>
                )
            })}
        </div>
    </Order>
  )
}

export default PlayerOrder


const Order = styled.div`
    background: ${pr => pr.theme.colors.red};
    width: 18em;
    border-radius: 15px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    .player-name-text{
        color: ${pr => pr.theme.fonts.color.green};
        font-weight: bold;
        font-size: ${pr => pr.theme.fonts.size.xlarge};
        font-family: ${pr => pr.theme.fonts.family.nicus};
    }





`