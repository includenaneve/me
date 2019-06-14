export const resourcePreloading = (pics) => {
  const funs = pics.map(item => {
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