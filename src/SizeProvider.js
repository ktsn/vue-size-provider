export default {
  name: 'SizeProvider',

  data() {
    return {
      size: {
        width: 0,
        height: 0
      }
    }
  },

  methods: {
    saveSize() {
      this.size.width = this.$el.scrollWidth
      this.size.height = this.$el.scrollHeight
    }
  },

  updated() {
    this.saveSize()
  },

  mounted() {
    this.saveSize()
  },

  render(h) {
    const children =
      this.$scopedSlots.default && this.$scopedSlots.default(this.size)

    const child = onlyNode(children)
    return child || h()
  }
}

function onlyNode(vnodes) {
  if (!vnodes) {
    return
  }

  if (!Array.isArray(vnodes)) {
    return vnodes
  }

  if (vnodes.length > 1) {
    console.warn('[vue-size-watcher] <SizeProvider> slot must be only element')
  }

  return vnodes[0]
}
