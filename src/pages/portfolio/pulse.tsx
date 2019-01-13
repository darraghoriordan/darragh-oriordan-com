import { graphql } from "gatsby"
import get from "lodash/get"
import * as React from "react"
import Helmet from "react-helmet"
import Layout from "../../components/Layout"

class PortfolioIndex extends React.Component<any, any> {
  public render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")

    const pageTitle = "Portfolio"
    const metaDescription = "Some things I've built"
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: metaDescription }]}
          title={pageTitle + " - " + +siteTitle}
        />
        <h1>{pageTitle}</h1>
        <h2>Highlighting the team’s impact</h2>
        <p>
          Pulse is designed to show activity on Trade Me on our office monitor
          screens. I created this to show my team the impact they have on the
          lives of kiwis every day.
        </p>

        <p>
          I had an awesome team at Trade Me’s FedEx day helping make this come
          to life. You can see a video of our process here:{" "}
        </p>
        <p>
          <a href="https://www.youtube.com/watch?v=60raK84QOKw">
            https:// www.youtube.com/watch?v=60raK84QOKw
          </a>
        </p>
        <h2>Check it out</h2>
        <p>
          You can see it running here (with fake data):{" "}
          <a href="http://darraghpulseapp.azurewebsites.net/">
            http:// darraghpulseapp.azurewebsites.net/
          </a>
        </p>
        <p>
          The code is here:{" "}
          <a href="https://github.com/darraghoriordan/PulseMap">
            https:// github.com/darraghoriordan/PulseMap
          </a>
        </p>
        <h2>Thanks</h2>
        <p>Design and video by Anthony Au-Yeung</p>
        <p>Dapper work by Anastasia Stanovova</p>
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
