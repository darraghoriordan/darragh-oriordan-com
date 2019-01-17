import { graphql, Link } from "gatsby"
import get from "lodash/get"
import React from "react"
import Helmet from "react-helmet"

import styled from "styled-components"
import Bio from "../components/Bio"
import Layout from "../components/Layout"

const PostItem = styled.div`
  margin-bottom: 3em;
`

class BlogIndex extends React.Component<any, any> {
  public render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    )
    const posts = get(this, "props.data.allMarkdownRemark.edges")

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: siteDescription }]}
          title={siteTitle}
        />
        <Bio />
        {posts.map(({ node }: any) => {
          const title = get(node, "frontmatter.title") || node.fields.slug
          return (
            <PostItem key={node.fields.slug}>
              <h3 className="title">
                <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <h4 className="title is-6">{node.frontmatter.date}</h4>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
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
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 400)
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
