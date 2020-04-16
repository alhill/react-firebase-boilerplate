import React, { useEffect, useContext, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Container
} from '../components'
import FirebaseContext from '../context/FirebaseContext'
import { message } from 'antd'

const Logout = ({ history }) => {
    const Firebase = useContext(FirebaseContext)

    const logout = useCallback(async () => {
        try{
            const resp = await Firebase.auth().signOut()
            console.log({ resp })
            history.push("/auth/login")
        }
        catch(err){
            console.log(err)
            message.error(err.message)
        }
    }, [history, Firebase])

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
