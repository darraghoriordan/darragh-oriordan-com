import React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import 'typeface-lato'
import FullWidthHeader from './FullWidthHeader'

const SiteContainer = styled.div`
  width: 100%;
`
const ContentContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(30)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`
class Layout extends React.Component {
  render() {
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
