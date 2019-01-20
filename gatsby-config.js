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
        head: true,
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
      resolve: `gatsby-plugin-google-analytics`,
    },
    `gatsby-plugin-feed`,
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
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
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
