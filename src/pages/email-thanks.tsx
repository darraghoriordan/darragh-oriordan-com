import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import SEOConfiguration from '../components/SEOConfiguration'

class PrivacyPolicyPage extends React.Component<any, any> {
  public render() {
    const pageTitle = 'Thank you for signing up!'
    return (
      <Layout>
        <SEOConfiguration title={pageTitle} />
        <h1 className="title is-1">{pageTitle}</h1>
        <p>
          I'll let you know if there are any new posts on here roughly once
          every fortnight.
        </p>
        <p>
          I usually add some of the most interesting and entertaining things
          I've seen this week. Articles, ideas, quotes, new toys or
          observations.
        </p>
        <p>
          My emails are in plaintext and in bullet form - short and to the
          point.
        </p>
        <p>
          {' '}
          <strong>- Darragh</strong>
        </p>

        <p>
          Return to the <a href="/">home page</a>
        </p>
      </Layout>
    )
  }
}

export default PrivacyPolicyPage

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
