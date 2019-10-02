
<template>
  <v-container>
    <v-btn @click="onJoin">
      Присоединиться
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ChatMessage from './ChatMessage.vue'

import ClientModule, { ConnectionPayload } from '@/store/modules/client-core'
import Data from '@/models/api/Data'
import { UserDataParams } from '@/models/server/User'

@Component({
  components: {
    ChatMessage
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
    const data = new Data<UserDataParams, never>({
      query: 'server/auth?updateOwnClientData',
      params: {
        name: 'называйте меня ИВАН'
      }
    })
    ClientModule.send(data)
  }
}
</script>

<style scoped>

</style>
