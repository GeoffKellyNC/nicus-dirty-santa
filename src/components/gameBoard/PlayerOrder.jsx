import React, { useState, useEffect } from 'react'

const PlayerOrder = ({players}) => {
    const [shuffled, setShuffled] = useState(false)
    const [shuffledPlayers, setShuffledPlayers] = useState(localStorage.getItem('shuffledPlayers') ? JSON.parse(localStorage.getItem('shuffledPlayers')) : [])

    useEffect(() => {}, [players])

    const shufflePlayers = () => {
        const playerNames = players.map(player => player.player_name)
        const shuffledNames = playerNames.sort(() => Math.random() - 0.5)
        setShuffledPlayers(shuffledNames)
        localStorage.setItem('shuffledPlayers', JSON.stringify(shuffledNames))
        setShuffled(true)
    }


  return (
    <div>
        <button onClick={() => shufflePlayers()}>Shuffle Players</button>
        <div>
            { !shuffled ? 'Not Shuffled':
                shuffledPlayers.map((player, idx) => {
                return (
                    <div key={idx}>{player}</div>
                )
            })}
        </div>
    </div>
  )
}

export default PlayerOrder