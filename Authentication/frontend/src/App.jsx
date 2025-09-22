import React from 'react'
import { Routes,Route } from 'react-router-dom'
import {SignUp} from './pages/signup'
import {SignIn} from './pages/sigin'
import {Dashboard} from './pages/dashboard'
export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

      </Routes>
    </div>
  )
}
