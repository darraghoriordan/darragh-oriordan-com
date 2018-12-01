import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import mountainPic from '../../static/mountain.jpg'

import Layout from '../components/Layout'


class AboutPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    const pageTitle = "About"
    
    const metaDescription = " I’m a full stack web developer and people leader. I use javascript and C# to build things customers love. I'm a servant leader, I hire and work with great people and get out of their way."
    return (
    
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: metaDescription }]}
          title={pageTitle + " - " + + siteTitle}
        />
        <h1>{pageTitle}</h1>
        <p>Hi, I’m Darragh. I’m a full stack web developer and people leader from Cork, Ireland. 
            I’ve been writing apps for a decade. On the client, then on the server and now on the client again.</p>
            <img
          src={mountainPic}
          alt={`Me on a mountain`} />
        <h3>Digital // Teams // Learning</h3>
        <p>I studied applied physics at Cork Institute of Technology. After that I moved to Canada to work for Blackberry (1 year after Apple opened the App Store and there was still hope!).</p>
        <p>I grew tired of winter after four years in Ontario, I traveled for a while – I cycled through Africa, visited friends in Europe and drove across Canada and up to the Arctic Circle. I eventually landed in New Zealand and I've been living in Auckland since.</p>
        <p>I love to try new things, see new places and meet new people. I’m particularly fond of the mountains, the oceans and outdoor places. I’ve never stopped playing with Lego.</p>
        <p>In general I’d rather be on my paddle board.</p>
        <p>I was lucky enough to have access to a computer early through my school and eventually my family got a computer. I grew up breaking and rebuilding PC’s, running IRC daemons and messing around on the internet in general. I love it.</p>
        <p>I drive my motorcycle to work most days to beat the traffic. I love cycling on longer trips. I only drive a car when I need to get boards to the surf.</p>
        <p>I bloody love chocolate. I drink reds generally. I don’t like salad dressing.</p>
    </Layout>
    )
  }
}

export default AboutPage

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
