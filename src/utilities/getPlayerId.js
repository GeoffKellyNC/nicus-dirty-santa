


const getPlayerId = (playerData, playerName) => {
    const player = playerData.find(player => player.player_name === playerName)
    return player.player_id
}