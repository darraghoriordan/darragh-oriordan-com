---
title: How to add Bulma and PrismJs to a Gatsby project avoiding CSS conflicts
subTitle: Avoiding conflicts with Bulma and PrismJs
category: 'development'
cover: header.jpg
date: '2019-01-20T17:12:33'
---

Bulma is a popular CSS library like bootstrap. It's not too difficult to add to Gatsby but there are some tricky bits where you need some plugins and the CSS classes can conflict.<!-- end excerpt -->

First add all the required libraries from npm

```shell
> yarn add bulma gatsby-plugin-sass prismjs
> yarn add -D node-sass
```

Add the new plugin to gatsby-config.js. Notice "gatsby-plugin-sass" and "gatsby-remark-prismjs"

```javascript
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
```

Create a global sass file to import the classes. I put mine in /src/styles. Import this way so sass loader correctly imports all the required sass from Bulma.

```scss
@charset "utf-8";
@import '~bulma/sass/utilities/initial-variables';
// Edit your Bulma variables here
@import '~bulma';
```

create gatsby-browser.js and import the new sass file there.

```javascript
import './src/styles/global.scss'
```

Just remember that all Bulma textual content like h1 and p tags only get styles in a container with the class name "content". If it looks like Bulma isn't imported correctly, check that your text content is in some kind of container like this.

```html
<div class="content"><p>my text</p></div>
```

Bulma and Prism Js have some conflicting classes so you need to override this in the global sass file (/src/styles/\_global.scss in my example)

```css
.token.tag,
.token.content,
.token.number {
  display: inline;
  padding: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
  vertical-align: inherit;
  border-radius: inherit;
  font-weight: inherit;
  white-space: inherit;
  background: inherit;
  margin: inherit;
}
```

You can see this in action on my blog source code @ <https://github.com/darraghoriordan/darragh-oriordan-com>
