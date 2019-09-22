<template>
  <div class="settings">
    <div v-if="gameUrl">
      Ваша игра будет доступна по адресу <a :href="gameUrl" target="_blank">{{gameUrl}}</a>
    </div>
    <div v-else>
      Генерация ссылки...
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      gameSettings: {
        gameName: '',
        tryCount: 3,
        additionalRules: '',
        additionalWishes: 'Игра началась!',
        winnerCongratulateMsg: 'Поздравляем победителя!'
      },
      errorList: []
    }
  },
  computed: {
    ...mapGetters({
      serverId: 'server/peerId'
    }),
    gameUrl () {
      if (this.serverId) {
        return `${window.location.origin}/join/${this.serverId}`
      } else {
        return false
      }
    }
  },
  created () {
    this.createGame()
  },
  methods: {
    createGame () {
      this.$store.dispatch('server/create', this.$route.query.hostId || null).then((newHostId) => {
        console.log('newHostId', newHostId)
        this.$router.push({
          ...this.$route,
          query: {
            hostId: newHostId
          }
        })
      })
    }
  }
}
</script>
