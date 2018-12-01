import React from 'react'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import styled, {keyframes} from 'styled-components'
import colors from '../utils/colors'
import NavMenu from './NavMenu'

const rootPath = `${__PATH_PREFIX__}/`

const HeaderTitle= styled.h1`
top: 0px;
position: absolute;
display: none;
    margin-bottom:0;
    margin-top:${rhythm(-1/12)};
    text-transform:uppercase;
    letter-spacing: 3px;
    background-color:white;
    transform: translate3d(-100%, 0px, 0px);
    font-size:${rhythm(1)};
    line-height: ${rhythm(2)};
    @media (min-width: 68em) {
    display: block;
}
`
const HeaderLink = styled(Link)`
    box-shadow: none;
    text-decoration: none;
    color: inherit;

    font-size:${rhythm(1)};
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
    flex-wrap: wrap;
    justify-content: space-between;
    top: 0px;
    z-index:90;
    width: 100%;
    &:hover ${HeaderTitle} {
        animation: ${titleAnimation} 0.3s ease-in-out 0s 1;
        animation-fill-mode: both;
      }
    `

const HeaderLogo = styled.span`
    text-transform: uppercase;
    position: relative;
    font-weight:900;
    font-size:${rhythm(1)};
    letter-spacing:1px;   
    line-height: ${rhythm(2)};
    height: ${rhythm(2)};
    width: ${rhythm(2)};
    padding-left:${rhythm(1/5)};
    padding-right:${rhythm(1/5)};
    z-index:100;
    display: block;
    background:${colors.mainBlue};
    overflow: hidden;
    &:before {
        content: "{D}";
      }
    `

class FullWidthHeader extends React.Component {

    render() {
        const { title, location } = this.props
      return (
        <HeaderContainer>
              <HeaderLink to={'/'}>
            <HeaderLogo />
            <HeaderTitle>           
                {title}             
            </HeaderTitle>
            </HeaderLink>
            <NavMenu />
        </HeaderContainer>
        )       
      }
}

export default FullWidthHeader
