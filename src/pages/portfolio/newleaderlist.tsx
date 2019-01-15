import { graphql } from "gatsby"
import get from "lodash/get"
import React from "react"
import Helmet from "react-helmet"
import Layout from "../../components/Layout"

class PortfolioIndex extends React.Component<any, any> {
  public render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")

    const pageTitle = "New Leader List"
    const metaDescription = "An app to help you connect better with your team"
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: metaDescription }]}
          title={pageTitle + " - " + siteTitle}
        />
        <h1>{pageTitle}</h1>
        <h2>Helping new people leaders</h2>
        <p>
          A list of techniques and the books they’re from, categorised and easy
          to reference.
        </p>
        <p>
          An app to help you connect better with your team by tracking
          sentiments of interactions, the development tasks assigned to them and
          stuff you need to do for them all in one place.
        </p>

        <h2>Check it out</h2>
        <p>
          You can see it running here:{" "}
          <a href="http://www.newleaderlist.com">
            http://www.newleaderlist.com
          </a>
        </p>
        <p>
          The code is here:{" "}
          <a href="https://gitlab.com/darragh.oriordan/managenow/tree/master">
            https://gitlab.com/darragh.oriordan/managenow/tree/master
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
