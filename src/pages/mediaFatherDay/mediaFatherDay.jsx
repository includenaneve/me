import React from 'react'
import { observable, action, computed, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { stages } from './constants'
import API from '@api/api'
import { default as mask } from '@images/mediaFatherDay/mask.svg'
import { resourcePreloading } from '@utils/utils'

import './style.less'
@observer
class MediaFatherDay extends React.Component {
  @observable loading = true
  @observable stageIndex = ''

  @computed get textCls() {
    return 'text' + this.stageIndex
  }

  @computed get text() {
    const textArr = [
      <div>
        <div>你不知道</div>
        <div>外表坚强的他，第一次在产房看到你时，</div>
        <div>还是偷偷地流了泪</div>
        <div className="grey">you would never know slient tears wa streaming in his eyes this first time he met you.</div>
      </div>,
      <div>
        <div>你不知道</div>
        <div>为了不吵醒你，他轻敲键盘处理工作。</div>
        <div className="grey">you would never know he handle prject with only slient keystrokes to keep you asleep.</div>
      </div>,
        <div>
        <div>你不知道，</div>
        <div>和你吵完架后，他在暗自自责。</div>
        <div className="grey">you would never know he blame himself everytime he fight with you.</div>
      </div>,
      <div>
        <div>你不知道，</div>
        <div>教堂的25米路，是他陪你走了25年。</div>
        <div className="grey">you would never know it took hime 25 years to walk you to the 25-meter-long church aisle.</div>
      </div>,
      <div>
        <div>你不知道，</div>
        <div>他也会对你撒谎。</div>
        <div className="grey">you would never know he would also lie to you.</div>
      </div>,
      <div>
        <div>你不知道，</div>
        <div>他的相册里，都是你。</div>
        <div className="grey">you would never know it was you who filled up his photo album.</div>
      </div>,
        <div>
        <div>你不知道，</div>
        <div>在他眼里，你仍然是个孩子。</div>
        <div className="grey">you would never know you are and always will be a child in his eye</div>
      </div>
    ]
    return textArr[this.stageIndex]
  }

  @action setStageIndex = index => {
    this.stageIndex = index
  }

  @action setLoading = bool => {
    this.loading = bool
  }

  resetMaskAnimation = () => {
    document.getElementById('mask').className = 'mask-pic'
    setTimeout(() => {
      document.getElementById('mask').className = 'fixed-mask-pic'
    }, 2000)
  }

  componentDidMount = async() => {
    const res = await resourcePreloading(stages)
    if (res) {
      this.setLoading(false)
      this.resetMaskAnimation()
      this.setStageIndex(0)
    }
  }

  handleTouchStart = (event) => {
    // 检测屏幕滑动事件
    document.getElementById('all').addEventListener('touchmove', e => {
      // 获取场景图片节点(7张图)
      const stagePics = document.getElementsByClassName('stage-pic')
      // 转化成数组。遍历。达到切换条件的时候记录当前图片索引。
      Object.values(stagePics).forEach((stage, index) => {
        const top = stagePics[this.stageIndex].getBoundingClientRect().top
        if (top <= -750) {
          this.setStageIndex(index)
        }
      })
      // 记录当前图片的偏移量
      const currentStageTop = stagePics[this.stageIndex].getBoundingClientRect().top
      // 计算圆形区域距离顶部的百分比（做视差滚动）
      const IntPercent = Math.floor((0.5 - Math.abs(currentStageTop) / 750) * 100)
      console.log(IntPercent)
      if (IntPercent <= -12) {
        this.setStageIndex(this.stageIndex + 1)
        document.getElementById('mask').style.top = '50%'
        stagePics[this.stageIndex].scrollIntoView()
        this.resetMaskAnimation()
      } else {
        const percent = IntPercent + '%'
        document.getElementById('mask').style.top = percent
      }
    })
  }

  stop = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    return (
      <div id="all" className="media-father-day" onTouchStart={this.handleTouchStart}>
        {
          stages.map(item => {
            return <img key={item} className="stage-pic" src={item} alt=""/>
          })
        }
        <img id="mask" src={mask} alt=""/>
        {
          this.loading && <div className="loading"
          onTouchStart={this.stop}
          onTouchMove={this.stop}
          onTouchEnd={this.stop}
          onClick={this.stop}>
          Loading...</div>
        }
        <div className={this.textCls}>{this.text}</div>
      </div>
    )
  }
}

export default MediaFatherDay