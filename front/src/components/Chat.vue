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
      <v-col :sm="10">
        <v-textarea
          v-model="newMessage"
          solo
          autofocus
          no-resize
          label="Ваше сообщение..."
        />
      </v-col>
      <v-col>
        <v-btn @click.native="sendMsg">
          send
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ChatMessage from '@/components/ChatMessage.vue'
import ClientChatModule from '@/store/modules/client-chat'
import Message from '@/models/server/Message'
import { IChatMessages } from '@/models/api/ChatMessages'
import VirtualList from 'vue-virtual-scroll-list'
import ClientModule, { ConnectionPayload } from '@/store/modules/client-core'
import { IClientRequest } from '@/models/client/ClientRequest'

@Component({
  components: {
    ChatMessage,
    VirtualList
  }
})
export default class Chat extends Vue {
  private newMessage: string = ''

  get messages (): IChatMessages {
    return ClientChatModule.clientMessages
  }

  private sendMsg () {
    const data: IClientRequest = {
      query: 'server/chat?addMyMessage',
      data: {
        params: {
          newMessage: this.newMessage
        }
      }
    }
    ClientModule.send(data)
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
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
