import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <div>  
      <Routes> 
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
      </Routes> 
    </div>  
  )
}

export default App 

//Setup React Router with auth routes for Start, User Login/Signup, and Captain Login/Signup
//we have to manage user & captain on same app, so create 1 Routefor captain logout & 1 for user