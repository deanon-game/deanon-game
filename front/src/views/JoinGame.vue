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
      this.$store.dispatch('client/connect', $route.)
    }
  }
}
</script>
