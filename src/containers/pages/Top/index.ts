import { compose, pure } from 'recompose'
import { withRouter } from 'react-router-dom'

import Top from '../../../components/templates/Top'

const enhancer = compose(
  withRouter,
  pure
)

export default enhancer(Top)
