import assert from 'power-assert'
import Vue from 'vue'
import { SizeProvider } from '../src/index'

Vue.config.devtools = false
Vue.config.productionTip = false

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
      components: {
        SizeProvider
      },

      template: `<SizeProvider>
        <div
          slot-scope="{ width, height }"
          :style="{ width: width + 'px', height: height + 'px' }"
        >
          <div style="height: 50px; width: 100px;"></div>
        </div>
      </SizeProvider>
      `
    }).$mount(app)

    // initial render
    assert(vm.$el.style.width === '0px')
    assert(vm.$el.style.height === '0px')

    // next render
    await vm.$nextTick()
    assert(vm.$el.style.width === '100px')
    assert(vm.$el.style.height === '50px')
  })

  it('re-renders if the element size is changed', async () => {
    const vm = new Vue({
      components: {
        SizeProvider
      },

      data: {
        value: 100
      },

      template: `<SizeProvider>
        <div
          slot-scope="{ width, height }"
          :style="{ width: width + 'px', height: height + 'px' }"
        >
          <div style="height: 50px;" :style="{ width: value + 'px' }"></div>
        </div>
      </SizeProvider>
      `
    }).$mount(app)

    await vm.$nextTick()
    assert(vm.$el.style.width === '100px')
    assert(vm.$el.style.height === '50px')

    vm.width = 150
    await vm.$nextTick()
    assert(vm.$el.style.width === '100px')
    assert(vm.$el.style.height === '50px')
  })
})
