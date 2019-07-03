<template>
  <div class="settings">
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
    <v-btn @click="createGame">Создать</v-btn>

    <v-snackbar
      v-model="isNeedToShowErrors"
      color="error"
      :timeout="2000"
      multi-line
    >
      <template v-for="error in errorList">
        {{error}}
      </template>
    </v-snackbar>
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
      },
      errorList: []
    }
  },
  computed: {
    isNeedToShowErrors: {
      set (value) {
        this.errorList = value ? this.errorList : []
      },
      get () {
        return !!this.errorList.length
      }
    }
  },
  methods: {
    createGame () {
      axios.post(`${this.$store.getters.getAPI_URL}create`, this.gameSettings)
        .then((response) => {
          console.log(response)
          if (!response.data.id) {
            this.errorList.push('Не было получено id игры :(')
          } else {
            const gameId = response.data.id
            this.$router.push({ name: 'join', params: { id: gameId } })
          }
        })
        .catch((e) => {
          this.errorList = []
          this.errorList.push(e)
        })
    }
  }
}
</script>
