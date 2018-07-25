import * as React from 'react'
import { Container, Form, Header, Message } from 'semantic-ui-react'
import { InjectedFormikProps } from 'formik'

import JsonEditor from '../../../components/organisms/JsonEditor'

interface Props {
  level: string
  loading: {
    access: boolean
  }
  response: {
    status: number
    data: any
  }
}

interface FormValue {
  headers: string
  body: string
  baseUrl: string
  path: string
}

export type FormProps = InjectedFormikProps<Props, FormValue>

const Top = (props: FormProps) => {
  const { values, setFieldValue, handleChange, handleBlur, handleSubmit, handleReset, response, level } = props

  const onClickSubmit = (e: any) => {
    handleSubmit(e)
  }

  const responseData = JSON.stringify(response.data, null, '\t')

  return (
    <Container>
      <Header as="h1">Http Tester</Header>
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
          <Message.Content>{responseData}</Message.Content>
        </Message>
      )}
      {level === 'error' && (
        <Message error={true}>
          <Message.Header>{`Error: ${response.status}`}</Message.Header>
          <Message.Content>{responseData}</Message.Content>
        </Message>
      )}
    </Container>
  )
}

export default Top
