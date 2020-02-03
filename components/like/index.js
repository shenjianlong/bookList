Component({

  properties: {
    isLike: {
      type: Boolean,
    },
    count:{
      type: Number
    }
  },

  data: {
  },

  methods: {
    onLike(event) {
      let isLike = this.properties.isLike
      let count = this.properties.count
      this.setData({
        count: isLike ? count - 1 : count + 1,
        isLike: !isLike
       })
       let behavior = this.properties.isLike ? 'like' : 'cancel'
       this.triggerEvent('like',{
        behavior:behavior
      })
    }
  }
})
