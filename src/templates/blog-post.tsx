import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Layout from '../components/Layout'
import SEOConfiguration from '../components/SEOConfiguration'
import ArticleHeader from '../components/ArticleHeader'

class BlogPostTemplate extends React.Component<any, any> {
  public render() {
    const post = this.props.data.markdownRemark

    const { previous, next } = this.props.pageContext

    return (
      <Layout>
        <SEOConfiguration
          description={post.excerpt}
          title={post.frontmatter.title}
          //   image={post.frontmatter.cover.publicURL}
        />
        <h1 className="title is-1">{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <ArticleHeader />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← BACK TO: {previous.frontmatter.title}
              </Link>
            )}
          </li>{' '}
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                FORWARD TO: {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
