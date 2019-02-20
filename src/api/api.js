import axios from 'axios'
let API = {}
const domain = 'http://101.132.158.2:9777'

API.gm = async(url) => {
  const { status, data } = await axios.get(domain + url);
  return new Promise((resolve, reject) => {
    if (status === 200) {
      resolve(data)
    } else {
      reject(new Error('请求失败! 状态码:' + status))
    }
  })
}

API.pm = async(url, obj) => {
  let params = new URLSearchParams();
  for(let key in obj) {
    params.append(key, obj[key]);
  }
  const { status, data } = await axios.post(domain + url, params);
  return new Promise((resolve, reject) => {
    if (status === 200) {
      resolve(data)
    } else {
      reject(new Error('请求失败! 状态码:' + status))
    }
  })
}

API.getArticle = () => {
  return API.gm('/article')
}

API.editArticle = (obj) => {
  return API.pm('/edit', obj)
}

export default API