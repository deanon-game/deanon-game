<template>
  <div class="settings">
    <div v-if="gameUrl">
      Ваша игра будет доступна по адресу <a :href="gameUrl" target="_blank">{{gameUrl}}</a>
    </div>
    <div v-else>
      Генерация ссылки...
    </div>
    <label class="settings__label">
      Название игры
      <v-text-field type="text" placeholder="Случайное название" v-model="gameSettings.gameName"/>
    </label>
    <label class="settings__label">
      Количество попыток для угадывания каждому игроку
      <v-text-field type="number" v-model="gameSettings.tryCount"/>
    </label>
    <label class="settings__label">
      Дополнительные правила для ваших игроков
      <v-textarea v-model="gameSettings.additionalRules" disabled/>
    </label>
    <label class="settings__label">
       Пожелания игрокам перед игрой
      <v-textarea v-model="gameSettings.additionalWishes" disabled/>
    </label>
    <label class="settings__label">
       Поздравление победителя
      <v-textarea v-model="gameSettings.winnerCongratulateMsg" disabled/>
    </label>
    <v-btn class="create-btn" @click="createGame">Создать</v-btn>

    <ErrorMassage :errorList="errorList"/>
  </div>
</template>

<script>
import ErrorMassage from '@/components/ErrorMessage.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ErrorMassage
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
      this.$store.dispatch('server/create', this.$route.params.hostId || null).then((newHostId) => {
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
