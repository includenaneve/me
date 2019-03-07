import React from 'react'
import { Redirect } from 'react-router-dom'

const createAuth = () => {
  const name = prompt('请输入您的名字')
  localStorage.setItem('__gatsbyId', name)
  return name
}

export default function LoginPage(props) {
  const name = createAuth()
  return name && name.length > 0 ? <Redirect to={props.path}/> : <div onClick={createAuth}>登录失败,点击重试</div>
}