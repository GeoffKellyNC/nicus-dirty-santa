import React, { useState } from 'react'
import styled from 'styled-components'

const initialFormValues = {
    prizeName: '',
    prizeImage: '',
    prizeValue: '',
}
const AddPrizeForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues)

    const onChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <AddPrizeStyled onSubmit={onSubmit}>
            <input 
                type = 'text'
                name = 'prizeName'
                value = {formValues.prizeName}
                onChange = {onChange}
                className = 'prize-name-input'
                placeholder='Prize Name'
            />
            <input 
                type = 'text'
                name = 'prizeImage'
                value = {formValues.prizeImage}
                onChange = {onChange}
                className = 'prize-image-input'
                placeholder='Image Link'
            />
            <input 
                type = 'number'
                name = 'prizeValue'
                value={formValues.prizeValue}
                onChange = {onChange}
                className = 'prize-value-input'
                placeholder='Prize Value $'
            />
            <button type = 'submit' className='prize-submit'>Add Gift</button>
        </AddPrizeStyled>
    )
    }

export default AddPrizeForm

const AddPrizeStyled = styled.form`


`