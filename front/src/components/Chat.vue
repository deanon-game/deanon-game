<template>
  <div
    class="chat-container"
  >
    <div
      v-chat-scroll="{always: false, smooth: true}"
      class="messages-container"
    >
      <ChatMessage
        v-for="(message, key) in messages"
        :key="key"
        :message="message"
      />
    </div>
    <v-row>
      <v-form
        class="chat-form"
        @submit.prevent="sendMsg"
      >
        <v-col sm="10">
          <v-textarea
            v-model="newMessage"
            solo
            autofocus
            no-resize
            label="Ваше сообщение..."
            @keyup.ctrl.enter="sendMsg"
          />
        </v-col>
        <v-col>
          <v-btn
            type="submit"
          >
            send
          </v-btn>
        </v-col>
      </v-form>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ChatMessage from '@/components/ChatMessage.vue'
import ClientChatModule from '@/store/modules/client-chat'
import Message from '@/models/server/Message'
import ClientModule, { ConnectionPayload } from '@/store/modules/client-core'
import { IClientRequest } from '@/models/client/ClientRequest'

@Component({
  components: {
    ChatMessage
  }
})
export default class Chat extends Vue {
  private newMessage: string = ''

  get messages (): Message[] {
    return ClientChatModule.clientMessages
  }

  private clearChatForm () {
    this.newMessage = ''
  }

  private sendMsg () {
    if (this.newMessage.length === 0) return

    ClientChatModule.addMyMessage(this.newMessage).then(() => {
      this.clearChatForm()
    })
  }
}
</script>

<style scoped>
.chat-container {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.messages-container {
  max-height: 70vh;
  min-height: 70vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.chat-form {
  display: flex;
  width: 100%;
}
</style>
