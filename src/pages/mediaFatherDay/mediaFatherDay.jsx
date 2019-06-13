import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { stages } from './constants'

import './style.less'
class MediaFatherDay extends React.Component {
  render() {
    return (
      <div className="media-father-day">
        {
          stages.map(item => {
            return <img className="stage-pic" src={item} alt=""/>
          })
        }
        <div className="mask">
          <div className="circle"></div>
        </div>
      </div>
    )
  }
}

export default MediaFatherDay