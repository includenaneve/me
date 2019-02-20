import React from 'react'
import './style.less'
import API from '@api/api'

class EditPage extends React.Component {
  state = {
    article_title: '',
    article_content: ''
  }
  changeTitle = e => {
    this.setState({
      article_title: e.target.value
    })
  }
  changeContent = e => {
    this.setState({
      article_content: e.target.value
    })
  }
  handleSubmit = async() => {
    try {
      const res = await API.editArticle({
        article_title: this.state.article_title,
        article_content: this.state.article_content,
      })
      if (res.errorCode === 0) {
        alert('提交成功')
        this.props.history.push('home')
      }
    } catch (e) {
      console.err(e)
    }
  }
  render() {
    return (
      <div className="article-edit-wrapper">
        <input className="input" type="text" placeholder="标题" value={this.state.article_title} onChange={this.changeTitle}/>
        <textarea className="textarea"  name="" id="" placeholder="文章内容" value={this.state.article_content} onChange={this.changeContent}></textarea>
        <button className="submit" onClick={this.handleSubmit}>提交</button>
      </div>
    )
  }
}

export default EditPage