import React from "react"
import Layout from "../../components/Layout"
import SEOConfiguration from "../../components/SEOConfiguration"

class PortfolioIndex extends React.Component<any, any> {
  public render() {
    const pageTitle = "New Leader List"
    const metaDescription = "An app to help you connect better with your team"
    return (
      <Layout>
        <SEOConfiguration description={metaDescription} title={pageTitle} />
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
