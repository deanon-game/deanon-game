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
      this.$emit('addQuestion', this.question)
    }
  }
}
</script>

<style scoped>

</style>
