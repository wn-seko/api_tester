// tslint:disable:jsx-no-lambda
import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Top from './containers/pages/Top'

const Routes = () => {
  return (
    <Switch>
      <Route exact={true} path="/" render={() => <Redirect to="/top" />} />
      <Switch>
        <Route exact={true} path="/top" component={Top} />
      </Switch>
      <Route path="*" render={() => <Redirect to="/top" />} />
    </Switch>
  )
}

export default Routes
