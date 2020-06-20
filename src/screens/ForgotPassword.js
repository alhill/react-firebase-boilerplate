import React, { useState, useEffect, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    Container,
    Field
} from '../components'
import { UserContext } from '../context'
import { Input, Button, message } from 'antd'
import firebase from 'firebase'

const ForgotPassword = ({ history }) => {
    const authUser = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const forgotPassword = async () => {
        try{
            setLoading(true)
            await firebase.auth().sendPasswordResetEmail(email)
            message.success("You will receive an email for recovering your password in a few moments")
            setEmail("")
            history.push("/private")
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
                <Input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} onPressEnter={forgotPassword} 
                />
            </Field>
            <Field>
                <Button type="primary" loading={loading} onClick={forgotPassword}>Recover password</Button>
            </Field>
            <Field>
                <Link to="/auth/login">Go back to login</Link>
            </Field>
        </Container>
    )
}

export default withRouter(ForgotPassword)