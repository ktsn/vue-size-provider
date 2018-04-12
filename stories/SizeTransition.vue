<template>
  <size-provider>
    <div
      class="block-wrapper"
      slot-scope="{ height }"
      :style="{ height: height + 'px' }"
    >
      <size-observer>
        <div class="block-inner">
          <div class="block-buttons">
            <button @click="addBlock">Add Block</button>
            <button @click="resetBlock">Reset</button>
          </div>

          <ul class="block-list">
            <li
              v-for="(b, i) in blocks"
              class="block"
              :class="b.type"
              :style="{ width: b.width + 'px' }"
              :key="i"
            />
          </ul>
        </div>
      </size-observer>
    </div>
  </size-provider>
</template>

<script>
function initialBlocks() {
  return [
    {
      type: 'blue',
      width: 50
    },
    {
      type: 'red',
      width: 60
    },
    {
      type: 'green',
      width: 30
    }
  ]
}

export default {
  name: 'SizeTransition',

  data() {
    return {
      blocks: initialBlocks()
    }
  },

  methods: {
    addBlock() {
      const block = {
        type: this.randomType(),
        width: this.randomWidth()
      }
      this.blocks.push(block)
    },

    resetBlock() {
      this.blocks = initialBlocks()
    },

    randomType() {
      const types = ['red', 'green', 'blue']
      const index = Math.floor(Math.random() * 3)
      return types[index]
    },

    randomWidth() {
      return Math.floor(Math.random() * 70 + 30)
    }
  }
}
</script>

<style scoped>
.block-wrapper {
  overflow: hidden;
  width: 500px;
  box-shadow: 0 3px 15px 1px rgba(0, 0, 0, 0.2);
  transition: height 300ms cubic-bezier(0.4, 0.96, 0.86, 1);
}

.block-inner {
  padding: 20px;
}

.block-buttons {
  display: block;
  margin-bottom: 20px;
}

.block-list {
  display: flex;
  flex-wrap: wrap;
  margin: -10px 0 0 -10px;
  padding: 0;
  list-style: none;
}

.block {
  margin: 10px 0 0 10px;
  height: 30px;
}

.block.red {
  background-color: red;
}

.block.green {
  background-color: green;
}

.block.blue {
  background-color: blue;
}
</style>
