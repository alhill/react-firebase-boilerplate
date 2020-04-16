import React from 'react'
import styled from 'styled-components'

const Field = ({ children }) => {
    return (
        <OuterWrapper>
            <InnerWrapper>
                { children }
            </InnerWrapper>
        </OuterWrapper>
    )
}

const OuterWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
`

const InnerWrapper = styled.div`
    max-width: 500px;
    width: 100%;
    & > input {
        margin-top: 5px;
    }
    & > button{
        margin-top: 1em;
    }
`

export default Field