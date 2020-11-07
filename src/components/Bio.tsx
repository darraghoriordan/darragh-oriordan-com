import React from 'react'
import styled from 'styled-components'
import profilePic from './profile-pic.jpg' // test

const BioContainer = styled.div`
  display: flex;
  margin-bottom: 2em;
`
const BioImage = styled.img`
  height: 9em;
  margin-bottom: 0;
  margin-right: 1em;
  width: 9em;
`
class Bio extends React.Component<any, any> {
  public render() {
    return (
      <BioContainer>
        <BioImage src={profilePic} alt={`Darragh ORiordan`} />
        <div>
          <p>
            Hi! I'm <strong>Darragh ORiordan</strong>.{' '}
          </p>
          <p>
            I live and work in Sydney, Australia enjoying the mountains and
            the ocean.
          </p>{' '}
          <p>
            I build and support <strong>happy teams</strong> that create{' '}
            <strong>high quality software</strong> for the web.
          </p>
          <p>
            Contact me <a href="https://twitter.com/darraghor">on Twitter</a>!
          </p>
        </div>
        <br />
      </BioContainer>
    )
  }
}

export default Bio
