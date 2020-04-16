import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = ({ authUser }) => {
    const isLogged = !!authUser
    return (
        <OuterWrapper>
            <Left>
                <Link to="/">
                    <h1>Firebase Test</h1>
                </Link>
            </Left>
            <Right>
                <Link to="/">
                    <NavItem>Home</NavItem>
                </Link>
                {
                    isLogged ? (
                        <Link to="/auth/logout">
                            <NavItem>Logout</NavItem>
                        </Link>
                    ) : (
                        <Link to="/auth/login">
                            <NavItem>Login</NavItem>
                        </Link>
                    )
                }
            </Right>
        </OuterWrapper>
    )
}

const OuterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid gainsboro;
    margin-bottom: 2em;
`
const Left = styled.div`
    display: flex;
    flex: 1;
    padding-left: 1em;
    & h1{
        margin: 0;
    }
`
const Right = styled.div`
    display: flex;
`
const NavItem = styled.div`
    padding: 1em;
    height: 50px;
    transition: all 200ms;
    color: #222;
    &:hover{
        background-color: rgba(0, 0, 0, 0.05);
    }
`

export default Header