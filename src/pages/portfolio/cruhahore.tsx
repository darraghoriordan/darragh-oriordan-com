import { graphql } from "gatsby"
import get from "lodash/get"
import React from "react"
import Helmet from "react-helmet"
import Layout from "../../components/Layout"

class PortfolioIndex extends React.Component<any, any> {
  public render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")

    const pageTitle = "Cruhahore"
    const metaDescription = "Use less social media"
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: metaDescription }]}
          title={pageTitle + " - " + siteTitle}
        />
        <h1>{pageTitle}</h1>
        <h2>A chrome pluhin to help you use less social media</h2>
        <p>
          What could you could create with 1.5 hours extra time every day? Who
          could you help with 10 extra hours per week? What could you learn this
          year with 500 extra hours? Stop consuming &amp; start creating.
        </p>
        <p>
          Cruhahore is a chrome extension to help you get un-hooked from social
          media! Social media companies use psychology to keep you hooked but
          their hold can be broken. I don’t block the sites, I just (try to)
          prevent the hooks.
        </p>

        <h2>Check it out</h2>
        <p>
          You can install the extension from the Chrome Web Store:{" "}
          <a href="https://chrome.google.com/webstore/detail/cruhahore/dgbcchgknbaelgkocedkhclhcomnhmjh?utm_source=chrome-app-launcher-info-dialog">
            https://chrome.google.com/webstore/detail/cruhahore/dgbcchgknbaelgkocedkhclhcomnhmjh?utm_source=chrome-app-launcher-info-dialog
          </a>
        </p>
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
