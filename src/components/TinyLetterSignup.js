import React from 'react'
import styled from "styled-components"

const TinyLetterForm = styled.form`
border: "1px solid #ccc",
padding: "3px",
textAlign: "center"
`;

const TinyLetterInput =  styled.input`
width: "140px"
`;

class TinyLetterSignup extends React.Component {

    tinyLetterFormOnClick = () => {
        window.open('https://tinyletter.com/darraghor', 'popupwindow', 'scrollbars=yes,width=800,height=600');
        return true;
      }

  render() {
    return (
        <div>
        <h2>Subscribe to my Tiny Letter</h2>
        <p>Get monthly updates and interesting tech news that I come across. I read heaps and pop the best stuff in a monthly email.</p>
          <TinyLetterForm
            action="https://tinyletter.com/darraghor"
            method="post"
            target="popupwindow"
            onSubmit={this.tinyLetterFormOnClick}
          >
            <p>
              <label htmlFor="tlemail">Enter your email address</label>
            </p>
            <p>
              <TinyLetterInput
                type="text"
                name="email"
                id="tlemail"
              />
            </p>
            <input type="hidden" value="1" name="embed" />
            <input type="submit" value="Subscribe" />
            <p>
              <a href="https://tinyletter.com" rel="noopener noreferrer" target="_blank">
                powered by TinyLetter
              </a>
            </p>
          </TinyLetterForm></div>
    )
  }
}

export default TinyLetterSignup