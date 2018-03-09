<template>
  <div id="indexP">
    <ol>
      <li v-for="todo in todos" v-bind="todo.text">
      </li>
    </ol>
    <button @click="eClick()" type="button" name="button">事件</button>
  </div>
</template>

<script>
export default {
  name: 'indexP',
  data() {
    return {
      todos: [
        {
          text: '324324'
        },
        {text: '2343242'},
        {text: '24324'}
      ]
    }
  },
  methods: {
    eClick() {
      console.log('some message...');
    }
  }
}
</script>

<style lang="css">
</style>
