
<template>
  <v-container>
    <v-btn @click="onJoin">
      Присоединиться
    </v-btn>
    <Chat />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ChatMessage from './ChatMessage.vue'

import ClientModule, { ConnectionPayload } from '@/store/modules/client-core'
import { IClientRequest } from '@/models/client/ClientRequest'
import Chat from '@/components/Chat.vue'

@Component({
  components: {
    ChatMessage,
    Chat
  }
})
export default class JoinChat extends Vue {
  @Prop({
    type: String,
    required: true
  }) readonly serverId!: string

  created () {
    this.joinChat()
  }
  joinChat () {
    const payload: ConnectionPayload = {
      serverId: this.serverId
    }
    ClientModule.connect(payload).then(() => {
      this.onJoin()
    })
  }
  onJoin () {
    const data: IClientRequest = {
      query: 'server/auth?renameMe',
      data: {
        params: {
          name: 'называйте меня ИВАН'
        }
      }
    }
    ClientModule.send(data)
  }
}
</script>

<style scoped>

</style>
