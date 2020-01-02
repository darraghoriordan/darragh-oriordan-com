import addToMailchimp from 'gatsby-plugin-mailchimp'
import React, { useState } from 'react'

const EmailListForm: React.FunctionComponent<{}> = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addToMailchimp(email)
      .then(data => {
        setSubscribed(true)
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
      })
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Subscribe for updates</h2>
      <div>
        <input
          placeholder="Type your email address"
          name="email"
          type="email"
          onChange={handleEmailChange}
        />
        <button type="submit">Get Updates</button>
        {subscribed && <}
      </div>
    </form>
  )
}

export default EmailListForm
