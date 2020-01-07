import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import React from 'react'

import styled from 'styled-components'
import ArticleHeader from '../components/ArticleHeader'
import Layout from '../components/Layout'
import SEOConfiguration from '../components/SEOConfiguration'

const PostItem = styled.div`
  margin-bottom: 3em;
`

class BlogIndex extends React.Component<any, any> {
  public render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout>
        <SEOConfiguration
          title={'I help you build awesome web applications and happy teams'}
        />
        <ArticleHeader />
        <h2>Articles</h2>
        {posts.map(({ node }: any) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <PostItem key={node.fields.slug}>
              <h3 className="title">
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <h4 className="title is-6">{node.frontmatter.date}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
              <Link to={node.fields.slug}>read more...</Link>
            </PostItem>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          htmlExcerpt: excerpt(format: HTML, pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
