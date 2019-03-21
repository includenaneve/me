import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import DefaultPage from '@pages/DefaultPage/DefaultPage'
import HomePage from '@pages/HomePage/HomePage'
import EditPage from '@pages/EditPage/EditPage'
import AuthRoute from './AuthRoute/AuthRoute'
import LoginPage from '@pages/LoginPage/LoginPage'
import PicsPage from '@pages/PicsPage/PicsPage'

class Root extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/home' component={HomePage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/pics' component={PicsPage}/>
        <AuthRoute path='/edit' component={EditPage} authKeys={[ '__gatsbyId' ]}/>
        <Route component={DefaultPage}/>
      </Switch>
    )
  }
}

export default withRouter(Root)