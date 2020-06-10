<template>
  <v-container>
    <Chat v-if="isLogined" />
    <LoginForm
      v-else
      :is-joined-to-server="isJoinedToServer"
      @join="joinChat"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Chat from '@/components/Chat.vue'
import LoginForm from '@/components/LoginForm.vue'

import ClientModule, { ConnectionPayload } from '@/store/modules/client-core'
import ClientChatModule from '@/store/modules/client-chat'
import { IClientRequest } from '@/models/client/ClientRequest'

@Component({
  components: {
    Chat,
    LoginForm
  }
})
export default class JoinChat extends Vue {
  private isLogined: boolean = false

  get serverId (): string {
    return `${this.$route.query.hostId}`
  }

  private isJoinedToServer: boolean = false

  async created () {
    const payload: ConnectionPayload = {
      serverId: this.serverId
    }
    await ClientModule.connect(payload)
    this.isJoinedToServer = true
  }

  async joinChat ({ name }: {name: string}) {
    await ClientChatModule.loginMe(name)
    this.isLogined = true
  }
}
</script>

<style scoped>

</style>
