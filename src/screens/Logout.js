import React, { useEffect, useContext, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Container
} from '../components'
import firebase from 'firebase'
import { message } from 'antd'

const Logout = ({ history }) => {
    const logout = useCallback(async () => {
        try{
            const resp = await firebase.auth().signOut()
            console.log({ resp })
            history.push("/auth/login")
        }
        catch(err){
            console.log(err)
            message.error(err.message)
        }
    }, [history])

    useEffect(() => {
        logout()
    }, [history, logout])

    return (
        <Container>
            <h2>Logging out...</h2>
        </Container>
    )
}

export default withRouter(Logout)
