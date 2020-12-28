import { Link } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import SEOConfiguration from '../../components/SEOConfiguration'

class PortfolioIndex extends React.Component<any, any> {
  public render() {
    const pageTitle = 'Work'
    const metaDescription = "Some of the things I've built"
    return (
      <Layout>
        <SEOConfiguration description={metaDescription} title={pageTitle} />
        <h1>{pageTitle}</h1>
        <h2>Organizations I've worked with</h2>
        <ul>
          <li>Blackberry</li>
          <li>Trade Me Ltd</li>
          <li>Cornerstone</li>
          <li>Zenith Technologies</li>
          <li>Cin7</li>
          <li>Roam Digital</li>
          <li>Other SLAd organizations...</li>
        </ul>
        <h2>Side projects</h2>
        <p>
          The following is a list of the personal and side projects that I've
          done. These are done in my spare time over the last 10 years. I
          created them all to either solve a personal problem or for exploring
          technologies.
        </p>
        <h4>Ontario Craft Beer</h4>
        <p>
          I have a passive directory of breweries in Ontario to bump up SEO for
          a domain. I want to sell the domain later.
        </p>
        <p>
          Visit the site here:{' '}
          <a href="https://ontariocraftbeer.com">
            https://ontariocraftbeer.com
          </a>
        </p>
        <h4>Packing Calculator</h4>
        <p>
          A quick calculator for my trips so I know what to pack and how much to
          bring. This one is mostly for me!
        </p>
        <p>
          <Link to={'/onebag-calculator'}>Go right there</Link>
        </p>
        <h4>New Leader List</h4>
        <p>
          Improve your team with instant references to content from your
          favorite leadership books, blogs and podcasts. Monitor the happiness
          of your team and get ideas on how to engage them. Effectively track
          those tasks that surface throughout the day - on mobile and in the
          cloud.
        </p>
        <p>
          <Link to={'/portfolio/newleaderlist/'}>More Details</Link>
        </p>
        <h4>Customer workshop course</h4>
        <p>
          The customer workshop is a week long event for forging incredible
          relationships between product delivery teams and their customers. This
          course saves you up to 6 weeks of time planning for the event.
        </p>
        <p>
          <Link to={'/portfolio/customer-workshop-week-course/'}>
            More Details
          </Link>
        </p>
        <h4>Cruhahore chrome extension</h4>
        <p>
          A chrome extension to help prevent the psychological hooks used by
          social media sites.
        </p>
        <p>
          <Link to={'/portfolio/cruhahore/'}>More Details</Link>
        </p>
        <h4>Dealer gms screen display</h4>
        <p>
          A data visualization to show my team how much impact their work has on
          our customers. This counts the total GMS for our customers.
        </p>
        <p>
          <Link to={'/portfolio/dealer-gms/'}>More Details</Link>
        </p>
        <h4>Avo calculator</h4>
        <p>
          Ever wonder how many avocado breakfasts it will take you to buy a
          house? Just use our handy calculator to figure it out for New Zealand.
        </p>
        <p>
          <Link to={'/portfolio/avo-calculator/'}>More Details</Link>
        </p>
        <h4>Pulse</h4>
        <p>
          A data visualization to show my team how much impact their work has on
          our customers. This shows geographic activity on our site.
        </p>
        <p>
          <Link to={'/portfolio/pulse/'}>More Details</Link>
        </p>
        <p>More random stuff on repos</p>
        <ul>
          <li>
            <a
              href="https://github.com/darraghoriordan"
              rel="nofollow noopener noreferrer"
            >
              https://github.com/darraghoriordan
            </a>
          </li>
          <li>
            <a
              href="https://bitbucket.org/darragh/"
              rel="nofollow noopener noreferrer"
            >
              https://bitbucket.org/darragh/
            </a>
          </li>
        </ul>
        <p>
          You can see my resume here: <Link to={'/resume'}>Resume</Link>
        </p>
      </Layout>
    )
  }
}

export default PortfolioIndex
