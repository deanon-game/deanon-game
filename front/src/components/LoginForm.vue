
<template>
  <div>
    <form
      @submit.prevent="onLogin"
    >
      <v-text-field
        v-model="name"
        placeholder="Ваше Имя"
      />
      <v-btn type="submit">
        Войти в чат
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component({})
export default class LoginFrom extends Vue {
  private name: string = ''

  @Emit('join')
  onJoin () {
    return {
      name: this.name
    }
  }

  onLogin () {
    this.onJoin()
  }
}
</script>

<style scoped>

</style>
