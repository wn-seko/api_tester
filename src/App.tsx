import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { ThemeProvider } from 'styled-components'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './modules/store'
import history from './modules/store/history'
import Routes from './Routes'

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={{ mode: 'light' }}>
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>
)

export default App
