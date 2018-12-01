import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'

class PortfolioIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    const pageTitle = "Dealer GMS"
    const metaDescription = "Big screen display to show your teams impact on their customers"
    return (
    
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: metaDescription }]}
          title={pageTitle + " - " + + siteTitle}
        />
        <h1>{pageTitle}</h1>
        <h2>Highlighting the team’s impact</h2>
<p>I made this data visualization animation and counter as a screen display to show my team how much impact their work has on our customers.</p>

<h2>Check it out</h2>
<p>You can see it running here (with fake data): <a href="http://darraghpulseapp.azurewebsites.net/motors">http://darraghpulseapp.azurewebsites.net/motors</a></p>
<p>The code is here: <a href="https://github.com/darraghoriordan/PulseMap">https://github.com/darraghoriordan/PulseMap</a></p>
<h2>Thanks</h2>
<p>The design was kindly done by Billie Charlton</p>
<p>The code and technique is heavily based on Mark Nelson’s fantastic codepen… <a href="https://codepen.io/marknelson/pen/KwJmjj">https://codepen.io/marknelson/pen/KwJmjj</a></p>
      </Layout>
    )
  }
}

export default PortfolioIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }    
  }
`
