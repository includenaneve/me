import React from 'react'
import Loadable from 'react-loadable'
import { Spinner } from 'react-spinkit'
import LoginPage from '@pages/LoginPage/LoginPage'
import { Route, Redirect } from 'react-router-dom'

export default function AuthRoute({ path, component: originComponents, authKeys }) {
  const authArr = authKeys.map(key => {
    return localStorage.getItem(key) || null
  })
  return <Route render={
    authArr.includes('null')
      ? <Redirect to={path}/>
      : props => <originComponent/>
  }/>
}