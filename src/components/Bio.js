import React from 'react'

import profilePic from './profile-pic.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Kyle Mathews`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          This site is written by <strong>Darragh ORiordan</strong> who lives and works in
          Auckland, New Zealand building things on the web.{' '}You should {' '}
          <a href="https://twitter.com/darraghor">
             follow him on Twitter
          </a>
        </p>
        <br />        
      </div>
    )
  }
}

export default Bio
