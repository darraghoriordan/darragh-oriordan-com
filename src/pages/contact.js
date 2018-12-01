import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

class ContactPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    const pageTitle = "Contact"
    const metaDescription = "Contact me on linked in or twitter"
    return (
    
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: metaDescription }]}
          title={pageTitle + " - " + + siteTitle}
        />
        <h1>{pageTitle}</h1>
        <p>
        Feel free to get in touch with me on{" "}
        <a href="https://www.linkedin.com/in/darraghoriordan/">LinkedIn</a> 
        {" "}or{" "}<a href="https://twitter.com/darraghor">Twitter</a></p> 
      </Layout>
    )
  }
}

export default ContactPage

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
