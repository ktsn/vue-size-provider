export const sizeProviderContext = '__size_provider__'

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
    notifySize({ width, height }) {
      this.size.width = width
      this.size.height = height
    }
  },

  provide() {
    return {
      [sizeProviderContext]: {
        notifySize: this.notifySize
      }
    }
  },

  render(h) {
    const children =
      this.$scopedSlots.default && this.$scopedSlots.default(this.size)
    return h('div', [children])
  }
}
