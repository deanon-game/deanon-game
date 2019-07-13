<template>
  <div>
    <label class="settings__label">
      Ваш псевдоним в игре
      <v-text-field type="text" placeholder="Не заполняйте чтоб получить случайный никнэйм" v-model="gameSettings.nickName"/>
    </label>
    <label class="settings__label">
      Настоящее имя
      <v-text-field type="text" placeholder="Не заполняйте чтоб получить случайный никнэйм" v-model="gameSettings.realName"/>
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
        nickName: '',
        realName: ''
      },
      errorList: []
    }
  },
  methods: {
    joinGame () {
      axios.post(`${this.$store.getters.getAPI_URL}games/connect`, { nickName: this.gameSettings.nickName,
        realName: this.gameSettings.realName,
        token: localStorage.token,
        id: this.$route.params.id
      })
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
