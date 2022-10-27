import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as playerActions from '../../store/playerState/playerState.actions'
import styled from 'styled-components'



const RegisterForm = (props) => {
    const { setPlayer, ioSocket } = props
    const [formValues, setFormValues] = useState({playerName: '', pin: ''})

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        await ioSocket.emit('player-joined', {playerName: formValues.playerName})
        e.preventDefault()
        await setPlayer(formValues.playerName, formValues.pin)
        setFormValues({playerName: '', pin: ''})
        navigate('/playerboard')
    }


    return (
        <Register onSubmit={(e) => onSubmit(e)}>
            <input
                type = 'text'
                name = 'playerName'
                value = {formValues.playerName}
                onChange = {onChange}
                className = 'player-name-input input'
                placeholder='Enter Your Name'
             />
             <input 
                type = 'text'
                name = 'pin'
                value = {formValues.pin}
                onChange = {onChange}
                className = 'player-pin-input input'
                placeholder = 'Enter a 4 digit pin.'
             />
             <button type = 'submit'>Submit</button>
        </Register>
    )
}

const mapStateToProps = state => {
    return({
        ioSocket: state.ioSocket
    })
}

export default connect(mapStateToProps, playerActions) (RegisterForm)


const Register = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .input {
        width: 40%;
        height: 40px;
        margin: 10px;
        border-radius: 5px;
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        font-size: ${props => props.theme.fonts.size.medium};
        color: ${props => props.theme.colors.green};
        text-align: center;
        font-family: ${props => props.theme.fonts.family.nicus};
    }



`