import { graphql, StaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

interface IProps {
  title?: string
  description?: string
  image?: string
  pathname?: string
  article?: boolean
}

interface IQueryResponse {
  site: {
    siteMetadata: {
      defaultTitle: string
      titleTemplate: string
      defaultDescription: string
      siteUrl: string
      defaultImage: string
      twitterUsername: string
    }
  }
}

const SEOConfiguration = (props: IProps) => (
  <StaticQuery
    query={query}
    render={(queryResponse: IQueryResponse) => {
      const valuesToSet = {
        description:
          props.description ||
          queryResponse.site.siteMetadata.defaultDescription,
        image: `${queryResponse.site.siteMetadata.siteUrl}${props.image ||
          queryResponse.site.siteMetadata.defaultImage}`,
        title: props.title || queryResponse.site.siteMetadata.defaultTitle,
        url: `${queryResponse.site.siteMetadata.siteUrl}${props.pathname ||
          "/"}`,
      }

      return (
        <Helmet
          title={valuesToSet.title}
          titleTemplate={queryResponse.site.siteMetadata.titleTemplate}
          htmlAttributes={{ lang: "en" }}
        >
          {valuesToSet.description && (
            <meta name="description" content={valuesToSet.description} />
          )}
          {valuesToSet.description && (
            <meta
              name="twitter:description"
              content={valuesToSet.description}
            />
          )}
          {valuesToSet.description && (
            <meta property="og:description" content={valuesToSet.description} />
          )}
          {valuesToSet.image && (
            <meta name="twitter:image" content={valuesToSet.image} />
          )}
          {valuesToSet.image && (
            <meta name="image" content={valuesToSet.image} />
          )}{" "}
          {valuesToSet.image && (
            <meta property="og:image" content={valuesToSet.image} />
          )}
        </Helmet>
      )
    }}
  />
)

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
        twitterUsername
      }
    }
  }
`

export default SEOConfiguration
