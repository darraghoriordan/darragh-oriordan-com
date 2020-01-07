import React from 'react'
import styled from 'styled-components'
import Bio from './Bio'
import EmailListForm from './EmailListForm'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2em;
`

const BioContainer = styled.div`
  flex: 2 1 60%;
  margin-right: 2em;
`
const EmailListFormContainer = styled.div`
  flex: 1 1;
  min-width: 260px;
`

class ArticleHeader extends React.Component<any, any> {
  public render() {
    return (
      <Container>
        <BioContainer>
          <Bio />
        </BioContainer>
        <EmailListFormContainer>
          <EmailListForm />
        </EmailListFormContainer>
      </Container>
    )
  }
}

export default ArticleHeader
