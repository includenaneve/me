import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'

import { footerArr } from '@constants/constants'
import Footer from '@components/Footer/Footer'
import BlogPage from '@pages/BlogPage/BlogPage'
import API from '@api/api'
import './style.less'

class HomePage extends React.Component {
  state = {
    articles: null
  } 
  componentDidMount = async() => {
    const res = await API.getArticle()
    if (res.errorCode === 0) {
      const newData = res.data.sort((a, b) => {
        return a.submit_date >= b.submit_date ? -1 : 1
      })
      this.setState({
        articles: newData
      })
    }
  }
  render() {
    const labels = ['技术博客', '个人经验', '文章', '热门4', '热门5']
    const articleExist = this.state.articles && this.state.articles.length > 0
    return (
      <div className="homepage-wrapper">
        <div className="homepage-utils">
          <div className="new-article" onClick={() => this.props.history.push('edit')}>+</div>
          <div className="search-article">
            <div className="labels-wrapper">
            {
              labels.map(item => {
                return (
                  <div className="label-item">{item}</div>
                )
              })
            }
            <br/>
            </div>
            <input className="search-input" type="text" placeholder="输入你想要搜索的文章"/>
          </div>
        </div>
        <div className="homepage-view">
        {
           articleExist && this.state.articles.map(item => {
             return (
              <div className="article-wrapper">
                <div className="article-title">{item.article_title}</div>
                <div className="article-content">{item.article_content}</div>
                <div className="article-pics"></div>
              </div>
             )
           })
        }
        </div>
        <Footer configArr={footerArr}/>
      </div>
    )
  }
}

export default HomePage