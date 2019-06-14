/* global wx */
import API from '@api/api'
const wxjssdk = {}
wxjssdk.config = async() => {
  const res = await API.getSign()
  console.log(res)
  wx.config({
    debug: false,
    appId: 'wx91933abf3c5b792d',
    timestamp: res.timestamp,
    nonceStr: res.nonceStr,
    signature: res.signature,
    jsApiList: [
      'chooseWXPay',
      'openLocation',
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'downloadVoice',
      'translateVoice',
      'getNetworkType',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage'
    ]
  })
}

wxjssdk.share = function(url, title, desc, img, success, cancel) {
  wx.onMenuShareAppMessage && wx.onMenuShareAppMessage({
    title: title,
    desc: desc,
    link: url,
    imgUrl: img,
    type: '',
    dataUrl: '',
    success: function() {
      success && success()
    },
    cancel: function() {
      cancel && cancel()
    }
  })

  wx.updateAppMessageShareData && wx.updateAppMessageShareData({
    title: title,
    desc: desc,
    link: url,
    imgUrl: img,
    type: '',
    dataUrl: '',
    success: function() {
      success && success()
    },
    cancel: function() {
      cancel && cancel()
    }
  })

  wx.onMenuShareWeibo({
    title: title,
    desc: desc,
    link: url,
    imgUrl: img,
    success: function() {
      success && success()
    },
    cancel: function() {
      cancel && cancel()
    }
  })

  wx.onMenuShareTimeline && wx.onMenuShareTimeline({
    title: title,
    link: url,
    imgUrl: img,
    success: function() {
      success && success()
    },
    cancel: function() {
      cancel && cancel()
    }
  })

  wx.updateTimelineShareData && wx.updateTimelineShareData({
    title: title,
    link: url,
    imgUrl: img,
    success: function() {
      success && success()
    },
    cancel: function() {
      cancel && cancel()
    }
  })
}

export default wxjssdk
