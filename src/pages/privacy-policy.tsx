import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import SEOConfiguration from '../components/SEOConfiguration'

class PrivacyPolicyPage extends React.Component<any, any> {
  public render() {
    const pageTitle = 'Privacy Policy'
    return (
      <Layout>
        <SEOConfiguration title={pageTitle} />
        <h1 className="title is-1">{pageTitle}</h1>
        I'm just one person so there isn't much legalize here. I keep your email
        address in an email provider if you provide one to me. I use Google
        Analytics to understand what people are reading. That's about it.
        <h3 className="title is-3">Information I collect</h3>
        <p>
          I collect email addresses. Note: You must be over 18 years of age to
          provide your email address for any of the services on this site
          including, but not limited to, the newsletter.
        </p>
        <p>
          I collect IP adresses and other technical data through cookies (using
          Google Analytics and other third party tools)
        </p>
        <h3 className="title is-3">What I do with it</h3>
        <p>Send you service emails to any provided email address.</p>
        <p>I use technical data to provide better services.</p>
        <h3 className="title is-3">Retention</h3>
        <p>You will be on the email list unless you unsubscribe.</p>
        <p>
          You can unsubscribe at any time but when you unsubscribe you will not
          receive services from this website anymore.
        </p>
        <h3 className="title is-3">GDPR or request for deletion</h3>
        <p>
          I will do what I can to remove any PII for these kinds of requests.
          You can also control what google does with your information yourself
          and if you're worried about this kind of thing you should do that with
          google so they don't track you on any site.
        </p>
        <p>
          Please <a href="/contact">contact me</a> with any quieries!
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
