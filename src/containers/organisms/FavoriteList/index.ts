import { compose, pure } from 'recompose'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions, RootState } from '../../../modules'
import { requestSelector } from '../../../modules/selector'
import { RequestSettings } from '../../../modules/request/types'

import FavoriteList from '../../../components/organisms/FavoriteList'

interface OuterProps {
  handleOpenQuery: (settings: RequestSettings) => void
}

interface InnerProps {
  handleRemoveFavorite: (timestamp: number) => void
  favorite: Array<{
    settings: RequestSettings
    timestamp: number
  }>
}

const connector = connect(
  (state: RootState) => ({
    favorite: requestSelector.getFavorite(state)
  }),
  dispatch => {
    const handleRemoveFavorite = actions.request.removeFavorite
    return bindActionCreators({ handleRemoveFavorite }, dispatch)
  }
)

const enhancer = compose<InnerProps, OuterProps>(
  withRouter,
  connector,
  pure
)

export default enhancer(FavoriteList)
