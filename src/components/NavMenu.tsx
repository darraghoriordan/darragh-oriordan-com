import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"

const NavUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
  margin: 0px;
  @media (max-width: 660px) {
    margin-top: 0.2em;
  }
`
const NavElement = styled.li`
  padding-left: ${rhythm(1 / 2)};
  padding-right: ${rhythm(1 / 2)};

  &:hover {
    border-bottom: 5px solid;
  }
`
const NavAnchor = styled(Link)`
  font-weight: 900;
  font-size: ${rhythm(2 / 3)};
  text-transform: uppercase;
  letter-spacing: 3px;
  display: block;
  text-decoration: none;
  box-shadow: none;
  color: black;
  line-height: ${rhythm(2)};
  @media (max-width: 660px) {
    line-height: ${rhythm(2 / 3)};
    letter-spacing: 2px;
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
            <NavAnchor to={"/resume"}>Resume</NavAnchor>
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
