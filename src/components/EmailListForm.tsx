import { navigate } from '@reach/router'
import { Form, Formik, useField } from 'formik'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import React, { SFC } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
interface IEmailFormTextInputProps {
  label: string
}

const ErrorContainer = styled.div`
  color: #ff7d87;
  margin-top: 0.25rem;
  font-size: 0.6em;
`

const EmailSignupHeaderText = styled.h3`
  color: #fff !important;
  font-size: 1em !important;
  line-height: 1.25em !important;
`

const StyledTextInput = styled.input`
  border: 0 none;
  border-radius: 2px;
  color: #333 !important;
  font-size: 1rem;
  padding: 0.7em;
  display: block;
  width: 100%;
  max-width: 400px;
  &:invalid {
    border: 2px solid #ff7d87;
    box-shadow: none;
  }
`
const FormElementContainer = styled.div`
  margin-bottom: 0.6666em;
`

const EmailFormButton = styled.button`
  background-color: #007acc;
  width: 100%;
  line-height: 1.4em;
  color: #fff;
  padding: 0.6em 2em;
  margin: 0;
  border: 0;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
`
const EmailSignupCheckBoxLabel = styled.label`
  font-size: 0.8em;
  color: #fff;
  font-weight: normal;
  margin: 0.4em;
`
interface IEmailFormValues {
  email: string
  acceptedTerms: boolean
}
const EmailFormTextInput: SFC<IEmailFormTextInputProps &
  React.HTMLProps<HTMLInputElement>> = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <FormElementContainer>
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      <StyledTextInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorContainer>{meta.error}</ErrorContainer>
      ) : null}
    </FormElementContainer>
  )
}

interface IEmailFormCheckboxProps {
  label: string
}
const EmailFormCheckbox: SFC<IEmailFormCheckboxProps &
  React.HTMLProps<HTMLInputElement>> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <FormElementContainer>
      <input {...field} {...props} type="checkbox" />
      <EmailSignupCheckBoxLabel>{children}</EmailSignupCheckBoxLabel>
      {meta.touched && meta.error ? (
        <ErrorContainer>{meta.error}</ErrorContainer>
      ) : null}
    </FormElementContainer>
  )
}
const FormContainer = styled.div`
  background-color: #222;
  padding: 1.5em;
  line-height: 1em;
`

// And now we can use these
const EmailListForm: React.SFC<{}> = () => {
  return (
    <FormContainer>
      <EmailSignupHeaderText>
        Get new posts, curated tech articles and coding tips!
      </EmailSignupHeaderText>
      <Formik
        initialValues={{
          acceptedTerms: false,
          email: '',
        }}
        validationSchema={Yup.object({
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the privacy policy.'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        })}
        onSubmit={(values: IEmailFormValues, { setSubmitting }) => {
          addToMailchimp(values.email)
            .then(() => {
              setSubmitting(false)
              navigate('/email-thanks')
            })
            .catch(() => {
              // Errors in here are network or client side
              // Mailchimp always returns a 200
            })
        }}
      >
        <Form>
          <EmailFormTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Type your email address"
          />
          <EmailFormCheckbox name="acceptedTerms" label="">
            Yes sign me up for the newsletter, I accept the{' '}
            <a href="/privacy-policy">privacy policy</a>.
          </EmailFormCheckbox>
          <EmailFormButton type="submit">Sign me Up!</EmailFormButton>
        </Form>
      </Formik>
    </FormContainer>
  )
}

export default EmailListForm
