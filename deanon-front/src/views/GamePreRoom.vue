<template>
  <div>
    Тут будет подготовка к игре
    {{players}}
    <form v-if="isFormActive">
      <label class="input__label">
        Введите никнейм
        <input type="text" placeholder="Nickname" v-model="playerName">
      </label>
      <label class="input__label">
        Настоящее имя
        <input type="text" placeholder="Реальное имя" v-model="trueName">
      </label>
      <button @click.prevent="connectToLobby">Подтвердить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    if (localStorage.name && localStorage.realName) {
      this.playerName = localStorage.name
      this.trueName = localStorage.realName
      if (this.isDataValid) {
        this.isFormActive = false
        this.initLobby()
      }
    }
  },
  data () {
    return {
      isFormActive: true,
      playerName: null,
      trueName: null,
      gameName: '',
      gameID: '',
      players: null
    }
  },
  computed: {
  },
  methods: {
    /* Здесь мы инициализируем лобби при помощии @post запроса, на бек уходят данные в виде объекта
     @param id - gameID(doc id in firebase)
     @param name - player name
     */
    initLobby () {
      axios.post('http://localhost:3000/connect', { id: this.$route.params.id, name: this.playerName, realName: this.trueName })
        .then(res => {
          this.players = res.data.players
          this.gameName = res.data.params.gameName
        })
    },
    /* Подтверждаем данные из формы и вызываем initLobby */
    connectToLobby () {
      localStorage.name = this.playerName
      localStorage.realName = this.trueName
      this.isFormActive = false
      this.initLobby()
    },
    isDataValid () {
      if (this.isFormActive && this.trueName) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
</style>
