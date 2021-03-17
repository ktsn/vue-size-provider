# vue-size-provider

Declarative element size observer and provider.

## Motivation

Sometimes you may want to animate an element height when its content is changed. In that case, you need to directly read height value from DOM because Virtual DOM cannot acquire element size. Since it is low-level manipulation, the code would become messier.

vue-size-provider solves this problem by hiding low-level code with abstract helper components - `<SizeProvider>` and `<SizeObserver>`. The following gif is an example to show how vue-size-provider works:

![Simple demo of vue-size-provider](vue-size-provider.gif)

## Install

Install it via npm:

```sh
$ npm install vue-size-provider
```

Then, notify Vue to use it:

```js
import Vue from 'vue'
import VueSizeProvider from 'vue-size-provider'

Vue.use(VueSizeProvider)
```

Or you can directly use the components:

```vue
<script>
import { SizeProvider, SizeObserver } from 'vue-size-provider'

export default {
  components: {
    SizeProvider,
    SizeObserver
  }
}
</script>
```

## Usage

First, wrap elements that you would like to observe their size by `<SizeObserver>`.

```vue
<template>
  <!-- observe content size -->
  <SizeObserver>

    <!-- arbitrary contents that you want to observe their size -->

  </SizeObserver>
</template>

<script>
import { SizeProvider, SizeObserver } from 'vue-size-provider'

export default {
  components: {
    SizeProvider,
    SizeObserver
  }
}
</script>
```

Then, wrap them by `<SizeProvider>` and any element that you want to animate its size when the contents size is changed.

```vue
<template>
  <!-- provide observed content size via scoped slot -->
  <SizeProvider v-slot="{ width, height }">
    <div class="wrapper" :style="{ height: height + 'px' }">

      <!-- observe content size -->
      <SizeObserver>

        <!-- arbitrary contents that you want to observe their size -->

      </SizeObserver>

    </div>
  </SizeProvider>
</template>

<script>
import { SizeProvider, SizeObserver } from 'vue-size-provider'

export default {
  components: {
    SizeProvider,
    SizeObserver
  }
}
</script>
```

Finally, you need to write some animation code. In this example, we simply use CSS transition:

```vue
<template>
  <!-- provide observed content size via scoped slot -->
  <SizeProvider v-slot="{ width, height }">
    <div class="wrapper" :style="{ height: height + 'px' }">

      <!-- observe content size -->
      <SizeObserver>

        <!-- arbitrary contents that you want to observe their size -->

      </SizeObserver>

    </div>
  </SizeProvider>
</template>

<script>
import { SizeProvider, SizeObserver } from 'vue-size-provider'

export default {
  components: {
    SizeProvider,
    SizeObserver
  }
}
</script>

<style scoped>
.wrapper {
  box-sizing: content-box;
  border: 1px solid #000;
  
  /* animate content height smoothly */
  transition: height 300ms ease-out;
}
</style>
```

Note that you may want to specify `box-sizing: content-box;` to the animating element because the provided `width` and `height` are content size of the observed element. i.e. They do not include padding and border size.

## License

MIT
