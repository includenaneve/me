import React from 'react'
import './style.less'
class EditPage extends React.Component {
  render() {
    return (
      <div className="article-edit-wrapper">
        <input className="input" type="text" placeholder="标题"/>
        <textarea className="textarea"  name="" id="" placeholder="文章内容"></textarea>
      </div>
    )
  }
}

export default EditPage