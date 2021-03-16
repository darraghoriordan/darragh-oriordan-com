require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    {
      options: {
        path: `./src/data/`,
      },
      resolve: `gatsby-source-filesystem`,
    },
    {
      options: {
        endpoint:
          'https://51summers.us2.list-manage.com/subscribe/post?u=9e6fb921b4a08e820c996f2c1&amp;id=18939a5501',
      },
      resolve: 'gatsby-plugin-mailchimp',
    },
    {
      options: { name: 'pages', path: `${__dirname}/src/pages` },
      resolve: `gatsby-source-filesystem`,
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      options: {
        excerpt_separator: `<!-- end excerpt -->`,
        plugins: [
          {
            options: {
              maxWidth: 590,
            },
            resolve: `gatsby-remark-images`,
          },
          {
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
            resolve: `gatsby-remark-responsive-iframe`,
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
      resolve: `gatsby-transformer-remark`,
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      options: {
        // trackingId: 'UA-88937812-1', //process.env.GOOGLE_ANALYTICS_ID,
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
      resolve: `gatsby-plugin-google-analytics`,
    },
    {
      options: {
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/assets/blog-icon.png`,
        name: `Darraghor`,
        short_name: `Darraghor`,
        start_url: `/`,
        theme_color: `#663399`,
      },
      resolve: `gatsby-plugin-manifest`,
    },
    {
      options: {
        feeds: [
          {
            output: '/rss.xml',
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                  date: edge.node.frontmatter.date,
                  description: edge.node.excerpt,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                })
              })
            },
            title: 'DarraghORiordan.com RSS Feed',
          },
        ],
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      },
      resolve: `gatsby-plugin-feed`,
    },
    `gatsby-plugin-sitemap`,
    // `gatsby-plugin-offline`,
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-react-helmet`,
  ],
  siteMetadata: {
    author: 'Darragh ORiordan',
    description:
      'Darragh is a software developer and people leader from Ireland and living in New Zealand',
    image: '/favicon.png',
    siteUrl: 'https://darraghoriordan.com',
    title: 'Darragh ORiordan',
    titleTemplate: '%s - Darragh ORiordan',
    twitterUsername: '@darraghor',
  },
}
