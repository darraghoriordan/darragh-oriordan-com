import { Link } from "@reach/router"
import React from "react"
import Layout from "../components/Layout"

class NotFoundPage extends React.Component<any, any> {
  public render() {
    return (
      <Layout location={this.props.location}>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
        <p>
          You can <Link to="/">click here</Link> to return to the homepage
        </p>
      </Layout>
    )
  }
}

export default NotFoundPage
