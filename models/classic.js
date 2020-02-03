import HTTP from '../util/http.js'

class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        callback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index, nextOrPrevious, callback) {
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          callback(res)
        }          
      })
    } else {
      callback(classic)
    }
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._gettLatestIndex()
    return latestIndex === index ? true : false 
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _gettLatestIndex() {
    return wx.getStorageSync('latest')
  }

  _getKey(index) {
    let key = 'classic' + index
    return key
  }
}

export default ClassicModel