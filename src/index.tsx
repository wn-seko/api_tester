import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Redbox from 'redbox-react'

import 'semantic-ui-css/semantic.min.css'
import App from './App'

const render = (Component: React.ComponentType) => {
  ReactDOM.render(
    <AppContainer errorReporter={Redbox}>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)
