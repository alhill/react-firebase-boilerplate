import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../context/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authUser = JSON.parse(localStorage.getItem("auth"))

    return <Route 
        {...rest}
        render={props => (
            !authUser ? <Redirect to={{ pathname: "/", state: { from: props.location }}}/> : <Component {...props} />
        )}
    />
    
}

export default PrivateRoute