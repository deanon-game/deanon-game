<template>
  <div>
  Название игры: {{gameInfo.gameName}}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      gameInfo: {},
      error: ''
    }
  },
  created () {
    // const socket = io('http://localhost:8000')
    // socket.emit('join room', localStorage.token, 'eNwGmea1561096180238')
    // socket.on('new data', doc => {
    //   this.gameInfo = doc.params
    // })
    // socket.on('err', data => {
    //   this.error = data
    //   console.log(this.error)
    // })
  },
  methods: {
    loadPlayer () {
      axios.post(`${this.$store.getters.getAPI_URL}games/loadPlayer`)
    }
  }
}
</script>

<style scoped>
</style>
