<template>
  <div>
    ТУТ инфа о лобби
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      gameInfo: {}
    }
  },
  created () {
    this.getGameInfo().then((gameInfo) => {
      this.gameInfo = gameInfo
    })
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
