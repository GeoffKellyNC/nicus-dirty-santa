import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as prizeActions from '../../store/prizeState/prizeState.actions'

const initialFormValues = {
    prizeName: '',
    prizeImage: '',
    prizeValue: '',
}
const AddPrizeForm = (props) => {
    const [formValues, setFormValues] = useState(initialFormValues)

    const { setPrize } = props

    const onChange = (e) => {
        if (e.target.value < 0) return
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const { prizeName, prizeImage, prizeValue } = formValues
        console.log('PrizeName: ', prizeName)
        console.log('PrizeImage: ', prizeImage)
        console.log('PrizeValue: ', prizeValue)
        await setPrize(prizeName, prizeImage, prizeValue)
        setFormValues(initialFormValues)

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



export default connect(null, prizeActions) (AddPrizeForm)

const AddPrizeStyled = styled.form`


`