import React from 'react'
import {useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div>
        {
            currentUser ? <Outlet/> : <Navigate to='/signin' />
        }
    </div>
  )
}

export default PrivateRoutes