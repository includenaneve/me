import { observable, action } from 'mobx'
import API from '@api/api'

class HomePageData {
  @observable articles = null

  @action getArticles = async() => {
    try {
      const res = await API.getArticle()
      if (res.errorCode === 0) {
        const newData = res.data.sort((a, b) => {
          return a.submit_date >= b.submit_date ? -1 : 1
        })
        this.articles = newData
      }
    } catch (e) {
      console.log(e)
    }
  }
  
}

export default HomePageData