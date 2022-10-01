import axios from 'axios'




export const getPlayerInfo =  (id) => {
    let data
    axios.post('http://localhost:9001/player/getSinglePlayer', { data: { playerId: id}})
    .then(res => {
        console.log('getPlayerInfo res: ', res.data.message)
        data = res.data.message
    })
    .catch(err => {
        console.log('getPlayerInfo Error: ', err)
    })
    return data

}