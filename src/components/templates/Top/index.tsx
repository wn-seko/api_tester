import * as React from 'react'
import { Container, Dimmer, Form, Header, Loader, Message } from 'semantic-ui-react'
import { InjectedFormikProps } from 'formik'
import styled from 'styled-components'

import JsonEditor from '../../../components/organisms/JsonEditor'
import HistoryList from '../../../containers/organisms/HistoryList'
import { RequestSettings } from '../../../modules/request/types'

interface Props {
  level: string
  loading: {
    access: boolean
  }
  response: {
    status: number
    data: any
  }
  handleOpenQuery: (settings: RequestSettings) => void
}

interface FormValue {
  headers: string
  body: string
  baseUrl: string
  path: string
}

export type FormProps = InjectedFormikProps<Props, FormValue>

const WordBreakContent = styled(Message.Content)`
  word-break: break-all;
`

const Top = (props: FormProps) => {
  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    response,
    level,
    loading,
    handleOpenQuery
  } = props

  const onClickSubmit = (e: any) => {
    handleSubmit(e)
  }

  const responseData = JSON.stringify(response.data, null, '\t')

  return (
    <Container>
      <Header as="h1">Api Tester</Header>
      <Form>
        <Form.Field width="12">
          <label>BaseUrl</label>
          <Form.Input id="baseUrl" value={values.baseUrl} onChange={handleChange} onBlur={handleBlur} />
        </Form.Field>
        <Form.Field width="12">
          <label>Path</label>
          <Form.Input id="path" value={values.path} onChange={handleChange} onBlur={handleBlur} />
        </Form.Field>
        <Form.Field>
          <label>Header</label>
          <JsonEditor name="headers" value={values.headers} setFieldValue={setFieldValue} />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <JsonEditor name="body" value={values.body} setFieldValue={setFieldValue} />
        </Form.Field>
        <Form.Group inline={true}>
          <Form.Field>
            <Form.Button primary={true} onClick={onClickSubmit}>
              Submit
            </Form.Button>
          </Form.Field>
          <Form.Field>
            <Form.Button onClick={handleReset}>Reset</Form.Button>
          </Form.Field>
        </Form.Group>
      </Form>
      {level === 'success' && (
        <Message success={true}>
          <Message.Header>{`Success: ${response.status}`}</Message.Header>
          <WordBreakContent>{responseData}</WordBreakContent>
        </Message>
      )}
      {level === 'error' && (
        <Message error={true}>
          <Message.Header>{`Error: ${response.status}`}</Message.Header>
          <WordBreakContent>{responseData}</WordBreakContent>
        </Message>
      )}
      <Header as="h2">History</Header>
      <HistoryList handleOpenQuery={handleOpenQuery} />
      <Dimmer active={loading.access} inverted={true}>
        <Loader inverted={true}>Loading</Loader>
      </Dimmer>
    </Container>
  )
}

export default Top
