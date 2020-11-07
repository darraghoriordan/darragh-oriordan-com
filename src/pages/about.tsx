import { graphql } from "gatsby"
import React from "react"
// tslint:disable-next-line
import mountainPic from '../../static/mountain.jpg'
import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEOConfiguration from "../components/SEOConfiguration"

class AboutPage extends React.Component<any, any> {
  public render() {
    const pageTitle = "About"
    return (
      <Layout>
        <SEOConfiguration title={pageTitle} image={"/mountain.jpg"} />
        <h1 className="title is-1">{pageTitle}</h1>
        <Bio />

        <img src={mountainPic} alt={`Me on a mountain`} />
        <h3 className="title is-3">Hi, I'm Darragh ORiordan</h3>
        <p>
          I was lucky enough to have access to a computer early through my
          school and eventually my family got a computer. I grew up breaking and
          rebuilding PC’s, running IRC daemons and messing around on the
          internet in general. I love it.
        </p>
        <p>
          I studied applied physics at Cork Institute of Technology. After that
          I moved to Canada to work for Blackberry for a while. I found myself
          building web apps rather than control systems and have continued doing
          that.
        </p>
        <p>
          I grew a bit tired of the long winter after four years in Ontario. I
          traveled for a while – I cycled through Africa, visited friends in
          Europe and drove across Canada and drove a motorcycle up to the Arctic
          Circle. I eventually landed in New Zealand and lived in Auckland for 6 years.
        </p>
        <p>
          I moved to Sydney, Australia in March 2020 to help build an app for a customer and I'm looking forward to exploring another beautiful country!
        </p>
        <p>
          I love to try new things, learn new topics and skills. I'm always
          trying to improve myself. I like to see new places and meet new
          people. I’m particularly fond of the mountains, the oceans and outdoor
          places.
        </p>
        <p>
          I read all the time. I still play with Lego and in general I’d rather
          be on my paddle board, especially in the warm ocean around New
          Zealand.
        </p>

        <p>
          I drive my motorcycle to work most days to beat the traffic. I love
          cycling on longer trips and on sunny days. I only drive my car when I
          need to get boards to the surf.
        </p>
        <p>
          I bloody love chocolate and beer. I drink reds mostly. I don’t like
          salad dressing, butter or creamy white sauces.
        </p>
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
