import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'

import { footerArr } from '@constants/constants'
import Footer from '@components/Footer/Footer'
import BlogPage from '@pages/BlogPage/BlogPage'
import './style.less'

class HomePage extends React.Component {
  render() {
    return (
      <div className="homepage-wrapper">
        <div className="homepage-utils">
          <div className="new-article">+</div>
          <div className="search-article">
            <div className="labels-wrapper">
            </div>
            <div className="search-input"></div>
          </div>
        </div>
        <div className="homepage-view">
          <div className="article-wrapper">
            <div className="article-title">使用Cmder替换cmd，让开发更高效</div>
            <div className="article-content">一、为什么要更换为cmder 在做项目时，有些时候我想复制控制台上面的代码时，cmd有的时候复制粘贴很麻烦，Cmder则不会，并且Cmder可以...</div>
            <div className="article-pics"></div>
          </div>
        </div>
        <Footer configArr={footerArr}/>
      </div>
    )
  }
}

export default HomePage