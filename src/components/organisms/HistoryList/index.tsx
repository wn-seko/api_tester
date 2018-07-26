import * as React from 'react'
import { Accordion, Message } from 'semantic-ui-react'
import { RequestSettings, Response } from '../../../modules/request/types'

interface Props {
  history: Array<{
    level: string
    settings: RequestSettings
    response: Response
  }>
}

const HistoryList = (props: Props) => {
  const { history } = props

  if (history.length === 0) {
    return null
  }

  return (
    <Accordion
      styled={true}
      fluid={true}
      panels={history.map((item, i) => ({
        key: `history-${i}`,
        title: {
          content: `${item.settings.url} - ${item.response.status}`
        },
        content: {
          content: (
            <Message success={item.level === 'success'} error={item.level === 'error'}>
              <Message.Header>{`Status: ${item.response.status}`}</Message.Header>
              <Message.Content>{JSON.stringify(item.response.data)}</Message.Content>
              <Message.Header>BaseUrl</Message.Header>
              <Message.Content>{item.settings.baseURL}</Message.Content>
              <Message.Header>Path</Message.Header>
              <Message.Content>{item.settings.url}</Message.Content>
              <Message.Header>Headers</Message.Header>
              <Message.Content>{JSON.stringify(item.settings.headers)}</Message.Content>
              <Message.Header>body</Message.Header>
              <Message.Content>{JSON.stringify(item.settings.data)}</Message.Content>
            </Message>
          )
        }
      }))}
    />
  )
}

export default HistoryList
