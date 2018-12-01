import React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'

const NavUl = styled.ul`
    display: flex;
    list-style: none;
    padding: 0px;
    margin: 0px;
`
const NavElement = styled.li`
    padding-left:${rhythm(1/2)};
    padding-right:${rhythm(1/2)};
    background-color:white;
    &:hover {
        border-bottom: 5px solid
        }
    
`
const NavAnchor = styled.a`
font-weight:900;
font-size:${rhythm(2/3)};
    text-transform: uppercase;
    letter-spacing: 3px;
    display: block;
    text-decoration: none;
    box-shadow:none;
    color:black;
    line-height: ${rhythm(2)};
`

class NavMenu extends React.Component {
  render() {
    return (
        <nav>
        <NavUl>
        <NavElement>
                <NavAnchor
                href="/">
                    Posts
                </NavAnchor>
            </NavElement>
            <NavElement>
                <NavAnchor
                href="/about">
                    About
                </NavAnchor>
            </NavElement>
            <NavElement>
                <NavAnchor
                href="/portfolio">
                    Portfolio
                </NavAnchor>
            </NavElement>
            <NavElement>
                <NavAnchor 
                href="/resume">
                    Resume
                </NavAnchor>
            </NavElement>
            <NavElement>
                <NavAnchor
                href="/contact">
                    Contact
                </NavAnchor>
            </NavElement>
        </NavUl>
    </nav>
    )
  }
}

export default NavMenu



