import React from 'react'
import { observable, action, computed, when, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { stages, all } from './constants'
import API from '@api/api'
import { default as mask } from '@images/mediaFatherDay/mask.svg'
// import { resourcePreloading } from '@utils/utils'
import wxjssdk from '@utils/wxjssdk'
import * as pics from '@images/mediaFatherDay/stages'
import { default as music } from '@images/mediaFatherDay/music.mp3'
import ReactAudioPlayer from 'react-audio-player'

import './style.less'
@observer
class MediaFatherDay extends React.Component {
  @observable loading = true
  @observable stageIndex = ''
  @observable animationName = ''
  @observable circleMoveSpeed = 0
  @observable loadingPercent = 0;
  @action setLoadingPercent = num => {
    this.loadingPercent = num
  }
  @action setCircleMoveSpeed = (precent) => {
    this.circleMoveSpeed + precent
  }

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

  wxShareConfig = () => {
    wxjssdk.config()
    const wxTool = wxjssdk
    // eslint-disable-next-line
    wx.ready(() => {
      wxTool.share(window.location.origin,
        '有一种爱，不会被风吹散',
        '每一份爱，都值得被温柔以待',
        'http://qiniu.liujiajian.top/share.jpg',
        () => {
          console.log('father')
      })
    })
  }

  resetMaskAnimation = async() => {
    const stagePics = document.getElementsByClassName('stage-pic')
    if (this.stageIndex) {
      stagePics[this.stageIndex].scrollIntoView()
      document.getElementById('mask').className = 'mask-pic'
      await this.timeout(3000)
      document.getElementById('mask').className = 'fixed-mask-pic'
    }
  }

  circleMove = async() => {
    document.getElementById('mask').style.top = '50%'
    const timer = setInterval(() => {
      document.getElementById('mask').style.top = parseInt(document.getElementById('mask').style.top.substring(0,2)) - 1 + '%'
    }, 10)
    await this.timeout(700)
    clearInterval(timer)
    const stagePics = document.getElementsByClassName('stage-pic')
    if (this.stageIndex < 6) {
      stagePics[this.stageIndex + 1].scrollIntoView()
      document.getElementById('mask').style.top = '50%'
      this.animation1AutoPlay(this.stageIndex + 1)
    }
  }

  animation1AutoPlay = async(index) => {
    document.getElementById('mask').className = 'mask-pic'
    this.setStageIndex(index)
    await this.timeout(2000)
    document.getElementById('mask').className = 'fixed-mask-pic'
    this.circleMove()
  }

  resourcePreloading = loadpics => {
    const funs = loadpics.map(item => {
      const pic = new Image()
      pic.src = item
      return new Promise((resolve, reject) => {
        if (pic.complete || pic.readyState === 4) {
          resolve(0)
        } else {
          pic.onload = () => {
            resolve(1)
          }
        }
      })
    })
    return new Promise((resolve, reject) => {
      Promise.all(funs).then((res) => {
        resolve(true)
      })
    })
  }

  componentDidMount = async() => {
    this.wxShareConfig()
    let loadingPercentTimer = setInterval(() => {
      this.setLoadingPercent(this.loadingPercent + 1)
    }, 300)
    const res = await this.resourcePreloading(all)
    if (res) {
      loadingPercentTimer = setInterval(() => {
        const precent = this.loadingPercent + 1 >= 100 ? 100 : this.loadingPercent + 1
        this.setLoadingPercent(precent)
      }, 1)
      when(() => this.loadingPercent === 100, () => {
        clearInterval(loadingPercentTimer)
        this.setLoadingPercent(100)
        this.setLoading(false)
        this.animation1AutoPlay(0)
      })
    }
    document.getElementById('animation2').className='displayNone'
    when(() => this.stageIndex === 6, async() => {
      document.getElementById('animation1').className='displayNone'
      document.getElementById('animation2').className='animation2'
      document.getElementById('many').className='many'
      await this.timeout(1900)
      document.getElementById('many').className='manyNone'
      document.getElementById('air').className='air'
      await this.timeout(1000)
      document.getElementById('air').className='airNone'
      document.getElementById('father').className='father'
      document.getElementById('mask2').className='mask2'
      await this.timeout(2000)
      document.getElementById('a26').className='animation2-6'
      await this.timeout(2000)
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
    document.getElementById('music').play()
    event.preventDefault()
    event.stopPropagation()
    document.getElementById('all').addEventListener('touchmove', e => {
      e.preventDefault()
      e.stopPropagation()
    })
  }

  stop = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    return (
      <div id="all" className="media-father-day" onTouchStart={this.handleTouchStart}>
        <audio src={music} id="music" autoPlay />
        {
          this.loading && <div className="loading"
          onTouchStart={this.stop}
          onTouchMove={this.stop}
          onTouchEnd={this.stop}
          onClick={this.stop}>
          <div>
            <div>{this.loadingPercent}%</div>
            <div>Loading...</div>
          </div>
          </div>
        }
        <div id="animation1" onTouchStart={this.handleTouchStart}>
          {
            stages.map(item => {
              return <img key={item} className="stage-pic" src={item} alt="" onTouchStart={this.handleTouchStart}/>
            })
          }
          <img id="mask" src={mask} alt=""/>
          <div id="text" className={this.textCls}>{this.text}</div>
        </div>
        <div id="animation2" onTouchStart={this.handleTouchStart}>
          <img id="many" className="animation2-none" src={pics.many} alt=""/>
          <img id="air" className="animation2-none" src={pics.air} alt=""/>
          <img id="father" className="animation2-none" src={pics.father} alt=""/>
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