<template>
  <div>
  Название игры: {{gameInfo.gameName}}
  </div>
</template>

<script>
import axios from 'axios'
// import io from 'socket.io-client'

export default {
  data () {
    return {
      gameInfo: {}
    }
  },
  created () {
  //  const socket = io('http://localhost:8000')
  //  socket.emit('join room', 'Pitoshka', 'eNwGmea1561096180238')
  //  socket.on('new data', doc => {
  //    console.log(doc)
  //  })
  },
  methods: {
    getGameInfo () {
      return new Promise((resolve) => {
        axios.get(`${this.$store.getters.getAPI_URL}game/${this.$route.params.id}/info`)
          .then((response) => {
            const gameInfo = response.data.token
            if (!gameInfo) {
              this.errorList.push('Сервер не вернул данные игры :(')
            } else {
              resolve(gameInfo)
            }
          })
          .catch((e) => {
            this.errorList = []
            this.errorList.push(e)
          })
      })
    }
  }
}
</script>

<style scoped>
</style>
