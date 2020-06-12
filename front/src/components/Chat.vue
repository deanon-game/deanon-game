<template>
  <div
    class="chat"
  >
    <div
      v-chat-scroll="{always: false, smooth: true}"
      class="message-box"
    >
      <ChatMessage
        v-for="(message, key) in messages"
        :key="key"
        :message="message"
      />
    </div>
    <form
      class="chat__form"
      @submit.prevent="sendMsg"
    >
      <section>
        <v-textarea
          v-model="newMessage"
          solo
          autofocus
          no-resize
          label="Ваше сообщение..."
          @keyup.ctrl.enter="sendMsg"
        />
      </section>
      <section>
        <v-btn
          type="submit"
        >
          Отправить
        </v-btn>
        <v-btn
          type="button"
          @click="deleteAllMessages"
        >
          Удалить все сообщения
        </v-btn>
      </section>
    </form>
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

  private deleteAllMessages () {
    ClientModule.send({
      query: 'server/chat?clearAllMessages'
    })
  }

  private sendMsg () {
    if (this.newMessage.length === 0) return

    ClientChatModule.addMyClientMessage(this.newMessage).then(() => {
      this.clearChatForm()
    })
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.message-box {
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 1 1 auto;
}

.chat__form {
  /* display: flex; */
  /* width: 100%; */
}
</style>
