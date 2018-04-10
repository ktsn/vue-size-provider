import SizeProvider from './SizeProvider'
import SizeObserver from './SizeObserver'

export { SizeProvider, SizeObserver }

export default function install(Vue) {
  Vue.component('size-provider', SizeProvider)
  Vue.component('size-observer', SizeObserver)
}
