<template>
  <div>
    <label class="settings__label">
      Ваш псевдоним в игре
      <v-text-field type="text" placeholder="Не заполняйте чтоб получить случайный никнэйм" v-model="gameSettings.nickname"/>
    </label>
    <label class="settings__label">
      Ваш псевдоним в игре
      <v-text-field type="text" placeholder="Не заполняйте чтоб получить случайный никнэйм" v-model="gameSettings.nickname"/>
    </label>
    <v-btn @click="joinGame">Присоединиться</v-btn>
    <ErrorMassage :errorList="errorList"/>
  </div>
</template>

<script>
import axios from 'axios'
import ErrorMassage from '@/components/ErrorMessage.vue'

export default {
  components: {
    ErrorMassage
  },
  data () {
    return {
      gameSettings: {
        nickname: ''
      },
      errorList: []
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
