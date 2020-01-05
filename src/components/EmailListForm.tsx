import { Form, Formik, useField } from 'formik'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import React, { SFC } from 'react'
import * as Yup from 'yup'

interface IEmailFormTextInputProps {
  label: string
}
const EmailFormTextInput: SFC<IEmailFormTextInputProps &
  React.HTMLProps<HTMLInputElement>> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

interface IEmailFormCheckboxProps {
  label: string
}
const EmailFormCheckbox: SFC<IEmailFormCheckboxProps &
  React.HTMLProps<HTMLInputElement>> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

// And now we can use these
const EmailListForm: React.SFC<{}> = () => {
  return (
    <>
      <h1>Subscribe for updates!</h1>
      <Formik
        initialValues={{
          acceptedTerms: false,
          email: '',
        }}
        validationSchema={Yup.object({
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          email: Yup.string()
            .email('Invalid email addresss`')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          addToMailchimp(values.email)
            .then(() => {
              // redirect to thanks
              setSubmitting(false)
            })
            .catch(() => {
              // Errors in here are client side
              // Mailchimp always returns a 200
            })
        }}
      >
        <Form>
          <EmailFormTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <EmailFormCheckbox name="acceptedTerms" label="">
            I accept the terms and conditions
          </EmailFormCheckbox>

          <button type="submit">Get Updates</button>
        </Form>
      </Formik>
    </>
  )
}

export default EmailListForm
