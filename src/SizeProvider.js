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

    return onlyNode(children) || h()
  }
}

function onlyNode(vnodes) {
  if (!Array.isArray(vnodes)) {
    return vnodes
  }

  if (process.env.NODE_ENV !== 'production' && vnodes.length > 1) {
    console.warn('[vue-size-provider] <SizeProvider> slot must be only element')
  }

  return vnodes[0]
}
