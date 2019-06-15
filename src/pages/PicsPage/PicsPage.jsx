import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import * as qiniu from 'qiniu-js'
import API from '@api/api'
@observer
export default class PicsPage extends React.Component {
  @observable picUrl = null
  getInfo = async() => {
    const file = document.getElementsByName('fileinput')[0].files[0]
    const key = file.name
    const uptoken = await API.getUptoken()
    const config = {
      useCdnDomain: true, // 是否使用CDN域名 默认false
      region: null, // 华东区域
      uphost: 'qiniu.liujiajian.top', // 上传 host，类型为 string， 如果设定该参数则优先使用该参数作为上传地址
      disableStatisticsReport: false, // 是否不允许上报日志 默认false
      retryCount: 3, // 上传自动重试次 默认3
      // concurrentRequestLimit: 3, // 分片上传的并发请求量 默认3
      // checkByMD5: false, // 是否开启 MD5 校验，为布尔值；在断点续传时，开启 MD5 校验会将已上传的分片与当前分片进行 MD5 值比对，若不一致，则重传该分片，避免使用错误的分片。读取分片内容并计算 MD5 需要花费一定的时间，因此会稍微增加断点续传时的耗时，默认为 false，不开启。
      // forceDirect: false, // 是否上传全部采用直传方式，为布尔值；为 true 时则上传方式全部为直传 form 方式，禁用断点续传，默认 false。
    }
    const putExtra = {
      fname: '',
      params: {},
      mimeType: [] || null,
    }
    const upObservable = qiniu.upload(file, key, uptoken.data, putExtra, config)
    const upObserver = {
      next: res => { console.log('next', res) },
      error: err => { console.log('error', err) },
      complete: res => { console.log('complete', res) }
    }
    const subscription = upObservable.subscribe(upObserver)
  }
  render() {
    return (
      <div className="aaa">
        <div>
          <img src={this.picUrl} alt="没有图片"/>
        </div>
        <input type='file' id='fileInput' name='fileinput'/>
        <div onClick={this.getInfo}>获取文件信息</div>
      </div>
    )
  }
}