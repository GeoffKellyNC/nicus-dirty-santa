import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import * as gameActions from '../../store/gameState/gameState.actions'
import { connect } from 'react-redux'

const RejoinGame = (props) => {
    const { rejoinGame } = props
    const [ formValues, setFormValues ] = useState({userName: '', pin: ''})
    const [rejoinError, setRejoinError] = useState(false)

    const nav = useNavigate()


    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { userName, pin} = formValues
        const rejoin = await rejoinGame(userName, pin)
        setFormValues({userName: '', pin: ''})
        if(!rejoin){
            setRejoinError(true)
            setTimeout(() => {
                setRejoinError(false)
            }, 3000);
            return
        }
        nav('/playerBoard')

    }

  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input 
                type = 'text'
                name = 'userName'
                value = {formValues.userName}
                onChange = {handleChange}
                placeholder = 'UserName'
                className='userName-input'
            />
            <input 
                type = 'text'
                name = 'pin'
                value = {formValues.pin}
                onChange = {handleChange}
                placeholder = 'Enter Pin'
                className='pin-input'
            />
            <button type='submit'>Return to Game </button>
        </form>
        {
            rejoinError && (
                <div className='rejoin-error'>
                    <span> Error (REJOIN) </span>
                </div>
            )
        }
    </div>
  )
}

export default connect(null, gameActions) (RejoinGame)