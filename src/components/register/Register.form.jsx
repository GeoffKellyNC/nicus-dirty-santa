import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as playerActions from '../../store/playerState/playerState.actions'
import styled from 'styled-components'



const RegisterForm = (props) => {
    const { setPlayer } = props
    const [formValues, setFormValues] = useState({playerName: '', pin: ''})

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await setPlayer(formValues.playerName, formValues.pin)
        setFormValues({playerName: '', pin: ''})
        // setTimeout(() => {
        //     navigate('/playerboard')
        // }, 1000);
        navigate('/playerboard')
    }


    return (
        <Register onSubmit={(e) => onSubmit(e)}>
            <input
                type = 'text'
                name = 'playerName'
                value = {formValues.playerName}
                onChange = {onChange}
                className = 'player-name-input'
                placeholder='Enter Your Name'
             />
             <input 
                type = 'text'
                name = 'pin'
                value = {formValues.pin}
                onChange = {onChange}
                className = 'player-pin-input'
                placeholder = 'Enter a 4 digit pin.'
             />
             <button type = 'submit'>Submit</button>
        </Register>
    )
}

export default connect(null, playerActions) (RegisterForm)


const Register = styled.form`



`