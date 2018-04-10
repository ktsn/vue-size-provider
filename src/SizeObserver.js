import ResizeObserver from 'resize-observer-polyfill'
import { sizeProviderContext } from './SizeProvider'

export default {
  name: 'SizeObserver',

  inject: {
    context: sizeProviderContext
  },

  mounted() {
    const { context } = this
    context.notifySize({
      width: this.$el.clientWidth,
      height: this.$el.clientHeight
    })

    const ro = new ResizeObserver(entries => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      context.notifySize({
        width,
        height
      })
    })

    ro.observe(this.$el)

    this.$once('hook:beforeDestroy', () => {
      ro.disconnect()
    })
  },

  render(h) {
    return h('div', [this.$slots.default])
  }
}
