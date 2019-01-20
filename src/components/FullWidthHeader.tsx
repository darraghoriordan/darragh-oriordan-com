import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import styled, { keyframes } from "styled-components"
import colors from "../utils/colors"
import NavMenu from "./NavMenu"

const HeaderTitle = styled.h1`
  top: 0px;
  &:hover,
  &:active,
  &:visited {
    text-decoration: none;
    color: black;
  }
  position: absolute;
  display: none;
  margin-bottom: 0;
  margin-top: 2px;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 4px;
  background-color: white;
  transform: translate3d(-100%, 0px, 0px);
  font-size: 2em;
  line-height: 1.8em;
  @media (min-width: 68em) {
    display: block;
  }
`
const HeaderLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  &:hover,
  &:active,
  &:visited {
    text-decoration: none;
    color: black;
  }
  font-size: 1em;
`

const titleAnimation = keyframes`
0% {
    transform: translate3d(-100%, 0px, 0px);
}
100% {
    transform: translate3d(20%, 0px, 0px);
}
`
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  flex-wrap: nowrap;
  background-color: white;
  justify-content: space-between;
  top: 0px;
  z-index: 90;
  width: 100%;
  &:hover ${HeaderTitle} {
    animation: ${titleAnimation} 0.3s ease-in-out 0s 1;
    animation-fill-mode: both;
  }
`

const HeaderLogo = styled.span`
  text-transform: uppercase;
  position: relative;
  font-weight: 900;
  font-size: 2em;
  letter-spacing: 2px;
  line-height: 2em;
  width: 2em;
  padding-left: 0.2em;
  padding-right: 0.2em;
  z-index: 100;
  display: block;
  background: ${colors.mainBlue};
  overflow: hidden;
  &:before {
    content: '{D}';
  }
`
interface IQueryResponse {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const FullWidthHeader = () => (
  <StaticQuery
    query={query}
    render={(queryResponse: IQueryResponse) => {
      return (
        <HeaderContainer>
          <HeaderLink to={"/"}>
            <HeaderLogo />
            <HeaderTitle>{queryResponse.site.siteMetadata.title}</HeaderTitle>
          </HeaderLink>
          <NavMenu />
        </HeaderContainer>
      )
    }}
  />
)

const query = graphql`
  query FullWidthHeader {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default FullWidthHeader
