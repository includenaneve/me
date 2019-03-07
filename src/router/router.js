import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import DefaultPage from '@pages/DefaultPage/DefaultPage'
import HomePage from '@pages/HomePage/HomePage'
import EditPage from '@pages/EditPage/EditPage'
import AuthRoute from './AuthRoute/AuthRoute'
import LoginPage from '@pages/LoginPage/LoginPage'

class Root extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/home' component={HomePage}/>
        <Route path='/login' component={LoginPage}/>
        <AuthRoute path='/edit' component={EditPage} authKeys={[ '__gatsbyId' ]}/>
        <Route component={DefaultPage}/>
      </Switch>
    )
  }
}

export default withRouter(Root)