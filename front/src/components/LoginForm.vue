
<template>
  <v-container>
    <v-form
      v-if="isJoinedToServer"
      @submit.prevent="onLogin"
    >
      <v-text-field v-model="name" />
      <v-btn type="submit">
        login
      </v-btn>
    </v-form>
    <span v-else>Подключение к серверу</span>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import ChatModule from '@/store/modules/client-chat'
import { IClientRequest } from '@/models/client/ClientRequest'

@Component({})
export default class LoginFrom extends Vue {
  @Prop() private isJoinedToServer: boolean = false

  private name: string = ''

  @Emit('on-join')
  onJoin () {}

  onLogin () {
    this.onJoin()
    ChatModule.renameMe(this.name)
  }
}
</script>

<style scoped>

</style>
