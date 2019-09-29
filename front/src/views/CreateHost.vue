<template>
  <div class="settings">
    <div v-if="linkToConnect">
      Ваша игра будет доступна по адресу <a
        :href="linkToConnect"
        target="_blank"
      >{{ linkToConnect }}</a>
    </div>
    <div v-else>
      Генерация ссылки...
    </div>
    <DeChat />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeChat from '@/components/Chat.vue'
import User from '@/models/server/User.ts'
import nanoid from 'nanoid'

export default {
  components: {
    DeChat
  },
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
      linkToConnect: 'server/linkToConnect'
    })
  },
  created () {
    this.createGame()
  },
  methods: {
    createGame () {
      const user1 = new User(nanoid(), 'Вася')
      const user2 = new User(nanoid(), 'Петя')

      user1.rename(this.$store, user2, 'Фёдор').then(() => {
        console.log('user1 now is ', user1)
      })

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
