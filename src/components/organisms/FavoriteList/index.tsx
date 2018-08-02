import * as React from 'react'
import { Accordion, Message, Button } from 'semantic-ui-react'
import { RequestSettings } from '../../../modules/request/types'
import styled from 'styled-components'

interface FavoriteProps {
  settings: RequestSettings
  timestamp: number
}

interface Props {
  handleOpenQuery: (settings: RequestSettings) => void
  handleRemoveFavorite: (timestamp: number) => void
  favorite: Array<FavoriteProps>
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

const FavoriteList = (props: Props) => {
  const { favorite, handleOpenQuery, handleRemoveFavorite } = props

  if (favorite.length === 0) {
    return <Message info={true}>No favorite</Message>
  }

  const sortedFavorite = favorite.sort((ah: FavoriteProps, bh: FavoriteProps) => (ah.timestamp < bh.timestamp ? 1 : -1))

  return (
    <Accordion
      styled={true}
      fluid={true}
      panels={sortedFavorite.map(item => ({
        key: `favorite-${item.timestamp}`,
        title: {
          content: `${item.settings.method.toUpperCase()} ${item.settings.url}`
        },
        content: {
          content: (
            <div>
              <Message info={true}>
                <Message.Header>BaseUrl</Message.Header>
                <WordBreakContent>{item.settings.baseURL}</WordBreakContent>
                <Message.Header>Path</Message.Header>
                <WordBreakContent>{item.settings.url}</WordBreakContent>
                <Message.Header>Headers</Message.Header>
                <WordBreakContent>{JSON.stringify(item.settings.headers)}</WordBreakContent>
                <Message.Header>{getDataTitle(item.settings.method)}</Message.Header>
                <WordBreakContent>{JSON.stringify(item.settings.data)}</WordBreakContent>
              </Message>
              <Button onClick={() => handleOpenQuery(item.settings)}>Open Query</Button>
              <Button onClick={() => handleRemoveFavorite(item.timestamp)}>Remove Favorite</Button>
            </div>
          )
        }
      }))}
    />
  )
}

export default FavoriteList
