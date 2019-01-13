import { graphql } from "gatsby"
import get from "lodash/get"
import React from "react"
import Helmet from "react-helmet"
import Layout from "../../components/Layout"

class PortfolioIndex extends React.Component<any, any> {
  public render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")

    const pageTitle = "Avo calculator"
    const metaDescription = "How many avo breakfasts will your house cost"
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: metaDescription }]}
          title={pageTitle + " - " + +siteTitle}
        />
        <h1>{pageTitle}</h1>
        <h2>Simple-As house deposits</h2>
        <p>
          Ever wonder how many avocado breakfasts it will take you to buy a
          house? Just use our handy calculator to figure it out for New Zealand.
        </p>

        <h2>Check it out</h2>
        <p>
          You can see it running here:{" "}
          <a href="http://avocalc.darraghoriordan.com/">
            http://avocalc.darraghoriordan.com/
          </a>
        </p>
        <p>
          The code is here:{" "}
          <a href="https://github.com/darraghoriordan/how-many-avos">
            https://github.com/darraghoriordan/how-many-avos
          </a>
        </p>
        <h2>Thanks</h2>
        <p>Design by Billie Charlton</p>
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
