import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { stages } from './constants'
import API from '@api/api'
import { default as mask } from '@images/mediaFatherDay/mask.svg'
import { resourcePreloading } from '@utils/utils'

import './style.less'

class MediaFatherDay extends React.Component {
  componentDidMount = async() => {
    const res = await resourcePreloading(stages)
    if (res) {
      document.getElementById('mask').style.animationPlayState = 'running'
    }
  }
  render() {
    return (
      <div className="media-father-day">
        {
          stages.map(item => {
            return <img key={item} className="stage-pic" src={item} alt=""/>
          })
        }
        <img id="mask" className="mask-pic" src={mask} alt=""/>
      </div>
    )
  }
}

export default MediaFatherDay