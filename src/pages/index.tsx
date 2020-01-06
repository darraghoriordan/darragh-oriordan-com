import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import React from 'react'

import styled from 'styled-components'
import Bio from '../components/Bio'
import EmailListForm from '../components/EmailListForm'
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
          title={'Darragh ORiordan helps you build awesome web applications'}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2em',
          }}
        >
          <div style={{ flex: '2 1 70%', marginRight: '2em' }}>
            <Bio />
          </div>
          <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
            <EmailListForm />
          </div>
        </div>
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
