import SizeProvider from './SizeProvider'

export { SizeProvider }

export default function install(Vue) {
  Vue.component('size-provider', SizeProvider)
}
