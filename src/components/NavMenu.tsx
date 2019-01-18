import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const NavUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
  margin: 0px;
  & li {
    margin-top: 0.4em;
  }
  @media (max-width: 700px) {
    margin-top: 0.5em;
  }
`
const NavElement = styled.li`
  padding-left: 0.8em;
  padding-right: 0.8em;

  &:hover {
    border-bottom: 5px solid;
  }
`
const NavAnchor = styled(Link)`
  font-weight: 900;
  &:hover,
  &:active,
  &:visited {
    text-decoration: none;
    color: inherit;
  }
  font-size: 1.5em;
  text-transform: uppercase;
  letter-spacing: 3px;
  display: block;
  text-decoration: none;
  box-shadow: none;
  color: black;
  line-height: 2em;
  @media (max-width: 700px) {
    //line-height: 1em;
    font-size: 1em;
  }
`

class NavMenu extends React.Component<any, any> {
  public render() {
    return (
      <nav>
        <NavUl>
          <NavElement>
            <NavAnchor to={"/"}>Posts</NavAnchor>
          </NavElement>
          <NavElement>
            <NavAnchor to={"/about"}>About</NavAnchor>
          </NavElement>
          <NavElement>
            <NavAnchor to={"/portfolio"}>Portfolio</NavAnchor>
          </NavElement>
          <NavElement>
            <NavAnchor to={"/contact"}>Contact</NavAnchor>
          </NavElement>
        </NavUl>
      </nav>
    )
  }
}

export default NavMenu
