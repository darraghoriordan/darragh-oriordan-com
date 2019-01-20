import { graphql } from "gatsby"
import React from "react"
import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEOConfiguration from "../components/SEOConfiguration"

class ContactPage extends React.Component<any, any> {
  public render() {
    const pageTitle = "Contact"
    const metaDescription =
      "I ❤️ questions and helping interesting projects! Please get in touch..."
    return (
      <Layout>
        <SEOConfiguration description={metaDescription} title={pageTitle} />
        <Bio />
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
