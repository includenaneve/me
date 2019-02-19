import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import DefaultPage from '@pages/DefaultPage/DefaultPage'

class Root extends React.Component {
  render() {
    return (
      <Switch>
        <Route component={DefaultPage}/>
      </Switch>
    )
  }
}

export default withRouter(Root)