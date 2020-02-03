Component({

  properties: {
    index: {
      type:String,
      observer(newVal, oldVal, changePath) {
        let val = newVal < 10 ? "0" + newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  data: {
    months: [
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'    
    ],
    year: 0,
    month: '',
    _index: ''
  },

  attached() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    
    this.setData({
      year:year,
      month: this.data.months[month]
    })
  },
  
  methods: {

  }
})
