import React, { useState, useEffect, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    Container,
    Field
} from '../components'
import { 
    UserContext 
} from '../context'
import { Input, Button, message } from 'antd'
import firebase from 'firebase'

const Register = ({ history }) => {
    const authUser = useContext(UserContext)
    const reset = { email: "", password: "", password2: "" }
    const [credentials, setCredentials] = useState(reset)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(authUser){
            history.push("/private")
        }
    }, [authUser, history])

    const register = async () => {
        try{
            if(credentials.password !== credentials.password2){
                throw new Error("The passwords doesn't match")
            }
            setLoading(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            if(resp.user){
                message.success("The user has been successfully registered")
                setCredentials(reset)
                history.push("/auth/login")
            }
        }
        catch(err){
            console.log(err)
            message.error(err.message)
        }
        setLoading(false)
    }

    return (
        <Container>
            <Field>
                <label htmlFor="email">Email</label>
                <Input name="email" type="email" value={credentials.email} onChange={e => setCredentials({ ...credentials, email: e.target.value})} onPressEnter={register} />
            </Field>
            <Field>
                <label htmlFor="password">Password</label>
                <Input.Password name="password" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value})} onPressEnter={register} />
            </Field>
            <Field>
                <label htmlFor="password2">Confirm Password</label>
                <Input.Password name="password2" value={credentials.password2} onChange={e => setCredentials({ ...credentials, password2: e.target.value})} onPressEnter={register} />
            </Field>
            <Field>
                <Button type="primary" onClick={register} loading={loading}>Register</Button>
            </Field>
            <Field>
                <Link to="/auth/login">Go back to login</Link>
            </Field>
        </Container>
    )
}

export default withRouter(Register)