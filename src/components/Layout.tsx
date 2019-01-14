import React from "react"
import styled from "styled-components"
import "typeface-lato"
import { rhythm } from "../utils/typography"
import FullWidthHeader from "./FullWidthHeader"

const SiteContainer = styled.div`
  width: 100%;
`
const ContentContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(30)};
  margin-top: 6em;
`
class Layout extends React.Component<any, any> {
  public render() {
    const { location, title, children } = this.props

    return (
      <SiteContainer>
        <FullWidthHeader title={title} location={location} />
        <ContentContainer>{children}</ContentContainer>
      </SiteContainer>
    )
  }
}

export default Layout
