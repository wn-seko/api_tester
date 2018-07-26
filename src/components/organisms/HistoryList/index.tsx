import * as React from 'react'
import { Accordion, Message, Button } from 'semantic-ui-react'
import { RequestSettings, Response } from '../../../modules/request/types'
import styled from 'styled-components'

interface Props {
  handleOpenQuery: (settings: RequestSettings) => void
  history: Array<{
    level: string
    settings: RequestSettings
    response: Response
  }>
}

const WordBreakContent = styled(Message.Content)`
  word-break: break-all;
`

const HistoryList = (props: Props) => {
  const { history, handleOpenQuery } = props

  if (history.length === 0) {
    return null
  }

  return (
    <Accordion
      styled={true}
      fluid={true}
      panels={history.reverse().map((item, i) => ({
        key: `history-${i}`,
        title: {
          content: `${item.settings.url} - ${item.response.status}`
        },
        content: {
          content: (
            <div>
              <Message success={item.level === 'success'} error={item.level === 'error'}>
                <Message.Header>{`Status: ${item.response.status}`}</Message.Header>
                <WordBreakContent>{JSON.stringify(item.response.data)}</WordBreakContent>
                <Message.Header>BaseUrl</Message.Header>
                <WordBreakContent>{item.settings.baseURL}</WordBreakContent>
                <Message.Header>Path</Message.Header>
                <WordBreakContent>{item.settings.url}</WordBreakContent>
                <Message.Header>Headers</Message.Header>
                <WordBreakContent>{JSON.stringify(item.settings.headers)}</WordBreakContent>
                <Message.Header>body</Message.Header>
                <WordBreakContent>{JSON.stringify(item.settings.data)}</WordBreakContent>
              </Message>
              <Button
                onClick={() => {
                  handleOpenQuery(item.settings)
                }}
              >
                Open Query
              </Button>
            </div>
          )
        }
      }))}
    />
  )
}

export default HistoryList
