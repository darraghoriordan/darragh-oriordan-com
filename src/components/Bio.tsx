import React from "react"
import styled from "styled-components"
import profilePic from "./profile-pic.png"

const BioContainer = styled.div`
  display: flex;
  margin-bottom: 2em;
`
const BioImage = styled.img`
  height: 3em;
  margin-bottom: 0;
  margin-right: 1em;
  width: 3em;
`
class Bio extends React.Component<any, any> {
  public render() {
    return (
      <BioContainer>
        <BioImage src={profilePic} alt={`Darragh ORiordan`} />
        <p>
          Hi! I'm <strong>Darragh ORiordan</strong>. I live and work in
          Auckland, New Zealand 🥝 enjoying the ocean 🏄 and building things on
          the web 💻 Contact me{" "}
          <a href="https://twitter.com/darraghor">on Twitter</a>!
        </p>
        <br />
      </BioContainer>
    )
  }
}

export default Bio
