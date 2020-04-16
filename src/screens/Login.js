import React, { useState, useEffect, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    Container,
    Field
} from '../components'
import { FirebaseContext, UserContext } from '../context'
import { Input, Button, message } from 'antd'

const Login = ({ history }) => {
    const firebase = useContext(FirebaseContext)
    const authUser = useContext(UserContext)
    const reset = { email: "", password: "" }
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState(reset)

    const login = async () => {
        try{
            setLoading(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            if(resp.user){
                setCredentials(reset)
                message.success("Welcome back!")
                history.push("/private")
            }
        }
        catch(err){
            console.log(err)
            message.error(err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if(authUser){
            history.push("/private")
        }
    }, [authUser, history])

    return (
        <Container>
            <Field>
                <label htmlFor="email">Email</label>
                <Input name="email" type="email" value={credentials.email} onChange={e => setCredentials({ ...credentials, email: e.target.value})} onPressEnter={login} 
                />
            </Field>
            <Field>
                <label htmlFor="password">Password</label>
                <Input.Password name="password" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value})} onPressEnter={login} 
                />
            </Field>
            <Field>
                <Button type="primary" loading={loading} onClick={login}>Login</Button>
            </Field>
            <Field>
                <Link to="/auth/register">Sign up</Link>
                <br />
                <Link to="/auth/forgot-password">Forgot password</Link>
            </Field>
        </Container>
    )
}

export default withRouter(Login)