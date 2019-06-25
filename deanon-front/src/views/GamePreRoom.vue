<template>
  <div>
    Тут будет подготовка к игре
    <div>
     PLAYERS: {{players}}
    </div>
    <div>
     GAME NAME: {{ gameName }}
    </div>
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
import io from 'socket.io-client'

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
      gameName: null,
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
          //this.players = res.data.players
          this.gameName = res.data.gameName
          console.log(this.gameName)
          this.openSocket()
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
    },

    // method opens socket connection
    // client socket will join to the game room with room id ( room.id == doc.id )
    // while joinig socket also sends player name and lobby id 
    // Room id is the lobby id
    openSocket() {
      const socket = io('http://localhost:3000')
      socket.emit('join room', this.playerName, this.$route.params.id)
      socket.on('new data', data => {
      console.log(data)
      this.players = data.currentPlayers
      })
    }
  }
}
</script>

<style scoped>
</style>
