import { ResizeObserver } from 'vue-resize'

const resizeObserverStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  'z-index': '-1',
  width: '100%',
  height: '100%',
  border: 'none',
  'background-color': 'transparent',
  'pointer-events': 'none',
  display: 'block',
  overflow: 'hidden',
  opacity: '0'
}

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

  mounted() {
    this.saveSize()
  },

  render(h) {
    const children =
      this.$scopedSlots.default && this.$scopedSlots.default(this.size)

    const child = onlyNode(children)
    if (!child) {
      return h()
    }

    child.children = (child.children || []).concat([
      h(ResizeObserver, {
        style: resizeObserverStyle,
        on: {
          notify: this.saveSize
        }
      })
    ])

    return child
  }
}

function onlyNode(vnodes) {
  if (!Array.isArray(vnodes)) {
    return vnodes
  }

  if (process.env.NODE_ENV !== 'production' && vnodes.length > 1) {
    console.warn('[vue-size-provider] slot must be only element')
  }

  return vnodes[0]
}
