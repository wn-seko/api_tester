import * as React from 'react'
import { Accordion, Message, Button } from 'semantic-ui-react'
import { RequestSettings, Response } from '../../../modules/request/types'
import styled from 'styled-components'

interface HistoryProps {
  level: string
  settings: RequestSettings
  response: Response
  timestamp: number
}

interface Props {
  handleOpenQuery: (settings: RequestSettings) => void
  handleAddFavorite: (settings: RequestSettings) => void
  history: Array<HistoryProps>
}

const WordBreakContent = styled(Message.Content)`
  word-break: break-all;
`

const getDataTitle = (method: string) => {
  if (/get|delete/.test(method)) {
    return 'Query'
  }

  if (/post|put/.test(method)) {
    return 'Body'
  }

  return 'Data'
}

const HistoryList = (props: Props) => {
  const { history, handleOpenQuery, handleAddFavorite } = props

  if (history.length === 0) {
    return <Message info={true}>No history</Message>
  }

  const sortedHistory = history.sort((ah: HistoryProps, bh: HistoryProps) => (ah.timestamp < bh.timestamp ? 1 : -1))

  return (
    <Accordion
      styled={true}
      fluid={true}
      panels={sortedHistory.map(item => ({
        key: `history-${item.timestamp}`,
        title: {
          content: `${item.settings.method.toUpperCase()} ${item.settings.url} - ${item.response.status}`
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
                <Message.Header>{getDataTitle(item.settings.method)}</Message.Header>
                <WordBreakContent>{JSON.stringify(item.settings.data)}</WordBreakContent>
              </Message>
              <Button
                onClick={() => {
                  handleOpenQuery(item.settings)
                }}
              >
                Open Query
              </Button>
              <Button
                onClick={() => {
                  handleAddFavorite(item.settings)
                }}
              >
                Add Favorite
              </Button>
            </div>
          )
        }
      }))}
    />
  )
}

export default HistoryList
