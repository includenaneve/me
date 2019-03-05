import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { footerArr } from '@constants/constants'
import Footer from '@components/Footer/Footer'
import HomePageData from './HomePageData'
import './style.less'

@observer
class HomePage extends React.Component {
  @observable data = new HomePageData()

  componentDidMount = async() => {
    this.data.getArticles()
  }

  render() {
    const labels = [ '技术博客', '个人经验', '文章', '热门4', '热门5' ]
    const articleExist = this.data.articles && this.data.articles.length > 0
    return (
      <div className="homepage-wrapper">
        <div className="homepage-utils">
          <div className="new-article" onClick={() => this.props.history.push('edit')}>+</div>
          <div className="search-article">
            <div className="labels-wrapper">
              {
                labels.map((item, index) => {
                  return (
                    <div key={index} className="label-item">{item || <Skeleton/> }</div>
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
            articleExist && this.data.articles.map(item => {
              return (
                <div className="article-wrapper">
                  <div className="article-title">{item.article_title  || <Skeleton/> }</div>
                  <div className="article-content">{item.article_content || <Skeleton count="3"/>}</div>
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