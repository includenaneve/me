import React from 'react'
import { observable, action, computed, when } from 'mobx'
import { observer } from 'mobx-react'
import { stages, all } from './constants'
import API from '@api/api'
import { default as mask } from '@images/mediaFatherDay/mask.svg'
import { resourcePreloading } from '@utils/utils'
import * as pics from '@images/mediaFatherDay/stages'
import { default as music } from '@images/mediaFatherDay/music.mp3'

import './style.less'
@observer
class MediaFatherDay extends React.Component {
  @observable loading = true
  @observable stageIndex = ''
  @observable animationName = ''

  @action setAnimationName = name => {
    this.animationName = name
  }

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
    const res = await resourcePreloading(all)
    const audio = document.getElementById('music')
    audio.play()
    if (res) {
      this.setLoading(false)
      this.resetMaskAnimation()
      this.setStageIndex(0)
    }
    document.getElementById('animation1').className = 'animation1'
    when(() => this.stageIndex === 6, async() => {
      document.getElementById('animation1').className = 'displayNone'
      document.getElementById('animation2').className = 'animation2'
      await this.timeout(2000)
      document.getElementById('a21').className='animation2-1'
      await this.timeout(2000)
      document.getElementById('a21').className='animation2-1Disappear'
      document.getElementById('a22').className='animation2-2'
      await this.timeout(1000)
      document.getElementById('a22').className='animation2-2Disappear'
      document.getElementById('a23').className='animation2-3'
      await this.timeout(1000)
      document.getElementById('a23').className='animation2-3Disappear'
      document.getElementById('a24').className='animation2-4'
      await this.timeout(2000)
      document.getElementById('a24').className='animation2-4Disappear'
      document.getElementById('a25').className='animation2-5'
      await this.timeout(2000)
      document.getElementById('mask2').className='mask2'
      await this.timeout(2000)
      document.getElementById('a26').className='animation2-6'
      await this.timeout(2000)
      // document.getElementById('a25').className='animation2-5Disappear'
      // document.getElementById('mask2').className='mask2Disappear'
      // document.getElementById('a26').className='animation2-6Disappear'
      document.getElementById('a27').className='animation2-7'
    })
  }

  timeout = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  handleTouchStart = async(event) => {
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
        <audio loop src={music} id="music" autoPlay preload="auto"></audio>
        {
          this.loading && <div className="loading"
          onTouchStart={this.stop}
          onTouchMove={this.stop}
          onTouchEnd={this.stop}
          onClick={this.stop}>
          Loading...</div>
        }
        <div id="animation1">
          {
            stages.map(item => {
              return <img key={item} className="stage-pic" src={item} alt=""/>
            })
          }
          <img id="mask" src={mask} alt=""/>
          <div id="text" className={this.textCls}>{this.text}</div>
        </div>
        <div id="animation2">
          <img id="a21" className="animation2-none" src={pics.scan2} alt=""/>
          <img id="a22" className="animation2-none" src={pics.scan3} alt=""/>
          <img id="a23" className="animation2-none" src={pics.scan4} alt=""/>
          <img id="a24" className="animation2-none" src={pics.air} alt=""/>
          <img id="a25" className="animation2-none" src={pics.father} alt=""/>
          <img id="mask2" className="animation2-none" id="mask2" src={mask} alt=""/>
          <img id="a26" className="animation2-none" src={pics.fatherText} alt=""/>
          <div id="a27" className="animation2-none">
            <img className="a27-pic" src={pics.media} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default MediaFatherDay