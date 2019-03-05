import React from 'react'
import './style.less'

export default function Footer(props) {
  let { configArr } = props
  // 传入的config是个数组，元素个数最大为4
  if (configArr && configArr.length > 4) {
    configArr = configArr.splice(0, 4)
    console.error('Footer组件传入的数组长度大于4，仅显示前4个')
  }
  const configArrExist = configArr && configArr.length > 0
  return (
    <div className="footer-wrapper">
      {
        configArrExist && configArr.map((item, index) => {
          return (
            <div className="item-wrapper" key={index}>{item.text}</div>
          )
        })
      }
    </div>
  )
}