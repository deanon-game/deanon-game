<template>
  <div>
    Тут будет подготовка к игре
    {{players}}
    <form v-if="!isNoNickname">
      <label class="input__label">
        Для начала введите имя
        <input type="text" placeholder="Nickname" v-model="playerName">
      </label>
      <button @click.prevent="connectToLobby">Подтвердить</button>
    </form>
  </div>
</template>

<script>
import firestore from '../firebase.js'
import firebase from 'firebase'
import axios from 'axios'

export default {
  created () {
    if (localStorage.name) {
      this.playerName = localStorage.name
      this.initLobby()
    }
    if (this.playerName == null) {
      this.isNoNickname = !this.isNoNickname
    }
  },
  data () {
    return {
      isNoNickname: true,
      playerName: null,
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
      axios.post('http://localhost:3000/connect', { id: this.$route.params.id, name: this.playerName })
        .then(res => {
          this.players = res.data.players
          this.gameName = res.data.params.gameName
        })
    },
    /* Подтверждаем данные из формы и вызываем initLobby */
    connectToLobby () {
      localStorage.name = this.playerName
      this.isNoNickname = !this.isNoNickname
      this.initLobby()
    }
  },
  // Не работает и пофиг
  beforeDestroy () {
    firestore.collection('games').doc(this.$route.params.id)
      .update({
        currentPlayers: firebase.firestore.FieldValue.arrayRemove(this.playerName)
      })
  }
}
</script>

<style scoped>
</style>
