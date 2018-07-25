import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { ThemeProvider } from 'styled-components'

import { store } from './modules/store'
import history from './modules/store/history'
import Routes from './Routes'

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={{ mode: 'light' }}>
        <Routes />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
)

export default App
