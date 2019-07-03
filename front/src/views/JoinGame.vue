<template>
  <div>
    <label class="settings__label">
      Ваш псевдоним в игре
      <v-text-field type="text" placeholder="Не заполняйте чтоб получить случайный никнэйм" v-model="gameSettings.nickname"/>
    </label>
    <v-btn @click="joinGame">Присоединиться</v-btn>
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
        nickname: ''
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
    joinGame () {
      axios.post(`${this.$store.getters.getAPI_URL}join`, this.gameSettings)
        .then((response) => {
          const token = response.data.token
          if (!token) {
            this.errorList.push('Сервер не вернул токен для игры :(')
          } else {
            localStorage.setItem('token', token)
            this.$router.push({ name: 'lobby', params: { id: this.$route.params.id } })
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
