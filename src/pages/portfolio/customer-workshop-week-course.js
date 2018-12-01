import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'

class PortfolioIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    const pageTitle = 'The Customer Workshop'
    const metaDescription =
      'A week long event for forging incredible relationships between product delivery teams and their customers'
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: metaDescription }]}
          title={pageTitle + ' - ' + +siteTitle}
        />
        <h1>{pageTitle}</h1>
        <h2>The Story</h2>
        <p>
          I created this course based on my experience running{' '}
          <a href="">The Customer Workshop</a> . A friend requested some
          information on how we organised it and I’ve wanted to try creating a
          course on the teachable platform since hearing about it on Side Hustle
          School.
        </p>
        <p>
          You can check out the course for FREE! here:{' '}
          <a href="https://fuzzyminds.teachable.com/p/the-customer-workshop">
            https://fuzzyminds.teachable.com/p/the-customer-workshop
          </a>
        </p>
        <h2>The Details</h2>
        <p>
          The customer workshop is a week long event for forging incredible
          relationships between product delivery teams and their customers.
        </p>

        <p>
          You’ill invite customers in to your workplace for an entire day,
          you’ll work with them to identify how you can help them and then for
          the rest of the week you’ll work to solve those problems.
        </p>
        <p>
          This course is a D.I.Y. guide for running your own customer workshop.
          I will provide you all the checklists you need to ensure you don’t
          forget anything and promotional materiel to sell the idea to your team
          and your leaders.
        </p>
        <p>
          You will save anywhere up to 6 weeks of planning by following my
          course.
        </p>
        <p>If you want your customers to feel…</p>
        <ul>
          <li>that you care deeply about their business and their problems.</li>
          <li>that you are competent and understand their business.</li>
          <li>that you provide value for money.</li>
        </ul>
        <p>If you want the developers in your team to have…</p>
        <ul>
          <li>
            increased empathy for your customers by associating their work with
            real people rather than personas.
          </li>
          <li>
            a chance to hack and hustle to get shit done outside of their
            structured day-to-day agile practice.
          </li>
        </ul>
        <p>…then you will benefit from this course!</p>
        <h2>The Course</h2>
        <p>
          You can check out the course for FREE! here:{' '}
          <a href="https://fuzzyminds.teachable.com/p/the-customer-workshop">
            https://fuzzyminds.teachable.com/p/the-customer-workshop
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
