import React from 'react'
import styled from 'styled-components'

import RegisterForm from '../components/register/Register.form'

const Register = () => {


  return (
    <RegisterStyled>
      <RegisterForm />
    </RegisterStyled>
  )
}



export default Register

const RegisterStyled = styled.div`
      background: rgb(255,255,255);
      background: linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(0,211,230,1) 61%);   
      height: 100vh;
      overflow-y: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      



`