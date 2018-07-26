import { compose, pure } from 'recompose'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../../modules'
import { requestSelector } from '../../../modules/selector'
import { RequestSettings, Response } from '../../../modules/request/types'

import HistoryList from '../../../components/organisms/HistoryList'

interface OuterProps {
  handleOpenQuery: (settings: RequestSettings) => void
}

interface InnerProps {
  handleOpenQuery: (settings: RequestSettings) => void
  history: Array<{
    level: string
    settings: RequestSettings
    response: Response
  }>
}

const connector = connect((state: RootState) => ({
  history: requestSelector.getHistory(state)
}))

const enhancer = compose<InnerProps, OuterProps>(
  withRouter,
  connector,
  pure
)

export default enhancer(HistoryList)
