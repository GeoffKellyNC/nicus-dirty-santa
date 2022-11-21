import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as prizeActions from '../../store/prizeState/prizeState.actions'

const initialFormValues = {
    prizeName: '',
    prizeImage: '',
    prizeValue: '',
    prizeDescription: ''
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
        const { prizeName, prizeImage, prizeValue, prizeDescription } = formValues
        console.log('PrizeName: ', prizeName)
        console.log('PrizeImage: ', prizeImage)
        console.log('PrizeValue: ', prizeValue)
        await setPrize(prizeName, prizeImage, prizeValue, prizeDescription)
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
            <textarea 
                name = 'prizeDescription'
                value = {formValues.prizeDescription}
                onChange = {onChange}
                className = 'prize-description-input'
                placeholder='Prize Description'
            />
            <button type = 'submit' className='prize-submit'>Add Gift</button>
        </AddPrizeStyled>
    )
    }



export default connect(null, prizeActions) (AddPrizeForm)

const AddPrizeStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    width: 600px;
    height: 300px;

    & > input {
        width: 80%;
        height: 30px;
        margin: 5px auto;
        border-radius: 8px;
        border: none;
        padding-left: 10px;
        font-size: 1.2rem;
    }

    & > textarea {
        width: 80%;
        height: 100px;
        margin: 5px auto;
        border-radius: 8px;
        border: none;
        padding-left: 10px;
        font-size: 1.2rem;
        font-family: ${pr => pr.theme.fonts.family.nicus};
    }

    & > .prize-submit {
        width: 80%;
        height: 30px;
        margin: 5px auto;
        border-radius: 8px;
        border: none;
        background: white;
        color: ${pr => pr.theme.colors.green};
        font-size: ${pr => pr.theme.fonts.size.medium};
        font-family: ${pr => pr.theme.fonts.family.nicus};
        font-weight: bold;
        cursor: pointer;
    }


`