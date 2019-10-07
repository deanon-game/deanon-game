
<template>
  <v-container>
    <Chat v-if="isLogined" />
    <LoginForm
      v-else
      :is-joined-to-server="isJoined"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ChatMessage from './ChatMessage.vue'

import ClientModule, { ConnectionPayload } from '@/store/modules/client-core'
import ClientChatModule from '@/store/modules/client-chat'
import { IClientRequest } from '@/models/client/ClientRequest'
import Chat from '@/components/Chat.vue'
import LoginForm from '@/components/LoginForm.vue'

@Component({
  components: {
    ChatMessage,
    Chat,
    LoginForm
  }
})
export default class JoinChat extends Vue {
  @Prop({
    type: String,
    required: true
  }) readonly serverId!: string

  get isLogined () {
    return ClientChatModule.isLogined
  }

  created () {
    this.joinChat()
  }

  private isJoined: boolean = false
  joinChat () {
    const payload: ConnectionPayload = {
      serverId: this.serverId
    }
    ClientModule.connect(payload).then(() => {
      this.isJoined = true
    })
  }
}
</script>

<style scoped>

</style>
