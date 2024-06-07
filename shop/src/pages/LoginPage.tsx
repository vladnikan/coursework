import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <div className='loginStyle'>
      <h1>Вход</h1>
      <Login/>
      <p>
        Нет аккаунта? <Link to = "/register"> Регистрация </Link>
      </p>
    </div>
  )
}

export default LoginPage
