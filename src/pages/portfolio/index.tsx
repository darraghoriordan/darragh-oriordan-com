import { graphql, Link } from "gatsby"
import get from "lodash/get"
import React from "react"
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
          title={pageTitle + " - " + siteTitle}
        />
        <h1>{pageTitle}</h1>
        <h3>New Leader List</h3>
        <p>
          Improve your team with instant references to content from your
          favorite leadership books, blogs and podcasts. Monitor the happiness
          of your team and get ideas on how to engage them. Effectively track
          those tasks that surface throughout the day - on mobile and in the
          cloud.
        </p>
        <p>
          <Link to={"/portfolio/newleaderlist/"}>More Details</Link>
        </p>
        <h3>Customer workshop course</h3>
        <p>
          The customer workshop is a week long event for forging incredible
          relationships between product delivery teams and their customers. This
          course saves you up to 6 weeks of time planning for the event.
        </p>
        <p>
          <Link to={"/portfolio/customer-workshop-week-course/"}>
            More Details
          </Link>
        </p>
        <h3>Cruhahore chrome extension</h3>
        <p>
          A chrome extension to help prevent the psychological hooks used by
          social media sites.
        </p>
        <p>
          <Link to={"/portfolio/cruhahore/"}>More Details</Link>
        </p>
        <h3>Dealer gms screen display</h3>
        <p>
          A data visualization to show my team how much impact their work has on
          our customers. This counts the total GMS for our customers.
        </p>
        <p>
          <Link to={"/portfolio/dealer-gms/"}>More Details</Link>
        </p>
        <h3>Avo calculator</h3>
        <p>
          Ever wonder how many avocado breakfasts it will take you to buy a
          house? Just use our handy calculator to figure it out for New Zealand.
        </p>
        <p>
          <Link to={"/portfolio/avo-calculator/"}>More Details</Link>
        </p>
        <h3>Pulse</h3>
        <p>
          A data visualization to show my team how much impact their work has on
          our customers. This shows geographic activity on our site.
        </p>
        <p>
          <Link to={"/portfolio/pulse/"}>More Details</Link>
        </p>
        <p>More random stuff on repos</p>
        <ul>
          <li>
            <a
              href="https://github.com/darraghoriordan"
              rel="nofollow noopener noreferrer"
            >
              https://github.com/darraghoriordan
            </a>
          </li>
          <li>
            <a
              href="https://bitbucket.org/darragh/"
              rel="nofollow noopener noreferrer"
            >
              https://bitbucket.org/darragh/
            </a>
          </li>
        </ul>
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
