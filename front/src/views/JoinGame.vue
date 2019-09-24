<template>
  <div>
    <label class="settings__label">
      Ваш псевдоним в игре
      <v-text-field
        v-model="gameSettings.nickName"
        type="text"
        placeholder="Не заполняйте чтоб получить случайный никнэйм"
      />
    </label>
    <label class="settings__label">
      Настоящее имя
      <v-text-field
        v-model="gameSettings.realName"
        type="text"
        placeholder="Не заполняйте чтоб получить случайный никнэйм"
      />
    </label>
    <v-btn @click="onJoin">
      Присоединиться
    </v-btn>
    <ErrorMassage :error-list="errorList" />
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
  created () {
    this.joinGame()
  },
  methods: {
    joinGame () {
      this.$store.dispatch('client/connect', this.$route.params.id)
    },
    onJoin () {
      this.$store.dispatch('client/send', {
        type: 'chat',
        message: 'hello :)'
      })
    }
  }
}
</script>
