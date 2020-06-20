import React, { useState, useEffect, useContext } from 'react'
import firebase from 'firebase'
import {
    Container
} from '../components'

const PrivatePage = () => {
    const [fetchito, setFetchito] = useState()

    return (
        <Container>
            <h1>Here is where magic should happen</h1>
        </Container>
    )
}

export default PrivatePage