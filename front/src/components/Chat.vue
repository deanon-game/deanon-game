<template>
  <v-container>
    <ChatMessage
      v-for="(message, key) in messages"
      :key="key"
      :message="message"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ChatMessage from '@/components/ChatMessage.vue'
import ClientChatModule from '@/store/modules/client-chat'
import Message from '@/models/server/Message'
import { IChatMessages } from '@/models/api/ChatMessages'

@Component({
  components: {
    ChatMessage
  }
})
export default class Chat extends Vue {
  get messages (): IChatMessages {
    return ClientChatModule.clientMessages
  }
}
</script>

<style scoped>

</style>
