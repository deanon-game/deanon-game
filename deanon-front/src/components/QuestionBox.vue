<template>
    <div>
      <label class="question__settings">
        <textarea v-model="question" placeholder="Ваш вопрос"></textarea>
      </label>
      <button @click="addQuestion()">Добавить вопрос</button>
    </div>
</template>

<script>
export default {
  name: 'QuestionBox',
  data () {
    return {
      question: ''
    }
  },
  methods: {
    addQuestion () {
      // ..... отправляем на бек
    }
  }
}
</script>

<style scoped>

</style>
