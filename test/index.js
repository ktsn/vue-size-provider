import assert from 'power-assert'
import Vue from 'vue'
import install from '../src/index'

Vue.config.devtools = false
Vue.config.productionTip = false

Vue.use(install)

describe('SizeProvider', () => {
  let wrapper, app

  beforeEach(() => {
    wrapper = document.createElement('div')
    wrapper.style.width = '800px'

    app = document.createElement('div')
    app.setAttribute('id', 'app')

    wrapper.appendChild(app)
    document.body.appendChild(wrapper)
  })

  afterEach(() => {
    wrapper.remove()
    wrapper = app = undefined
  })

  it('provides current element size', async () => {
    const vm = new Vue({
      template: `<size-provider>
        <div
          ref="test"
          slot-scope="{ width, height }"
          :style="{ width: width + 'px', height: height + 'px' }"
        >
          <size-observer style="height: 50px; width: 100px;" />
        </div>
      </size-provider>
      `
    }).$mount(app)

    const el = vm.$refs.test

    // initial render
    assert(el.clientWidth === 0)
    assert(el.clientHeight === 0)

    // next render
    await nextFrame()
    assert(el.clientWidth === 100)
    assert(el.clientHeight === 50)
  })

  it('re-renders if the element size is changed', async () => {
    const vm = new Vue({
      data: {
        value: 100
      },

      template: `<size-provider>
        <div
          ref="test"
          slot-scope="{ width, height }"
          :style="{ width: width + 'px', height: height + 'px' }"
        >
          <size-observer style="height: 50px;" :style="{ width: value + 'px' }" />
        </div>
      </size-provider>
      `
    }).$mount(app)

    const el = vm.$refs.test

    await nextFrame()
    assert(el.clientWidth === 100)
    assert(el.clientHeight === 50)

    vm.value = 150
    await nextFrame()
    assert(el.clientWidth === 150)
    assert(el.clientHeight === 50)
  })
})

function nextFrame() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve)
  })
}
