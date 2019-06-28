<template>
  <div class="settings">
    <label class="settings__label">
      Название игры
      <input type="text" placeholder="Случайное название" v-model="gameSettings.gameName">
    </label>
    <label class="settings__label">
      Количество попыток для угадывания каждому игроку
      <input type="number" v-model="gameSettings.tryCount">
    </label>
    <label class="settings__label">
      Дополнительные правила для ваших игроков
      <textarea v-model="gameSettings.additionalRules" disabled/>
    </label>
    <label class="settings__label">
       Пожелания игрокам перед игрой
      <textarea v-model="gameSettings.additionalWishes" disabled/>
    </label>
    <label class="settings__label">
       Поздравление победителя
      <textarea v-model="gameSettings.winnerCongratulateMsg" disabled/>
    </label>
    <button @click="createGame()">Создать</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      gameSettings: {
        gameName: '',
        tryCount: 3,
        additionalRules: '',
        additionalWishes: 'Игра началась!',
        winnerCongratulateMsg: 'Поздравляем победителя!'
      }
    }
  },
  methods: {
    createGame () {
      axios.post('http://localhost:3000/create', this.gameSettings)
        .then(() => {
          this.$router.push('/lobby' /* + lobby id  */)
        })
        .catch((e) => console.log(e))
    }
  }
}
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.settings__label {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}
</style>
