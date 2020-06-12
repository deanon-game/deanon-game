<template>
  <section class="full-parrent">
    <Chat
      v-if="isLogined"
      class="full-parrent"
    />
    <LoginForm
      v-else
      class="full-parrent"
      :is-joined-to-server="isJoinedToServer"
      @join="joinChat"
    />
  </section>
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

  @Prop({ type: String, required: true }) serverId!: string

  private isJoinedToServer: boolean = false

  async created () {
    const payload: ConnectionPayload = {
      serverId: this.serverId
    }
    await ClientModule.connect(payload)
    this.isJoinedToServer = true
  }

  mounted () {
    window.addEventListener('beforeunload', (event) => {
      let evt = event || window.event
      evt.preventDefault()
      evt.returnValue = ''
      return ''
    })
  }

  async joinChat ({ name }: {name: string}) {
    await ClientChatModule.loginMe(name)
    this.isLogined = true
  }
}
</script>

<style scoped>
.full-parrent {
  display: flex;
  flex: 1 1 auto;
}
</style>
