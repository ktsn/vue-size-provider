import Vue from 'vue'
import { configure } from '@storybook/vue'
import plugin from '../src/'

Vue.use(plugin)

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
