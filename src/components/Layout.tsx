import React from "react"
import styled from "styled-components"
import FullWidthHeader from "./FullWidthHeader"

const SiteContainer = styled.div`
  width: 100%;
`
const ContentContainer = styled.div`
  margin-top: 6em;
  @media (min-width: 900px) {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  margin-left: 20px;
  margin-right: 20px;

  font-size: 20px;
`
class Layout extends React.Component<any, any> {
  public render() {
    const { children } = this.props

    return (
      <SiteContainer>
        <FullWidthHeader />
        <ContentContainer className="container content">
          {children}
        </ContentContainer>
      </SiteContainer>
    )
  }
}

export default Layout
