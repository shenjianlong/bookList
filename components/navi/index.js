Component({

  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  data: {
    leftWhite: 'images/left@white.png',
    leftBlack: 'images/left@black.png',
    rightWhite: 'images/right@white.png',
    rightBlack: 'images/right@black.png'
  },

  methods: {
    onLeft(event) {
      if(!this.properties.latest) {
        this.triggerEvent('left', {})
      }
    },
    onRight(event) {
      if(!this.properties.first) {
        this.triggerEvent('right', {})
      }
    }
  }
})
