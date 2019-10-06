<template>
  <v-container>
    <VirtualList
      :size="70"
      :remain="8"
      :variable="true"
    >
      <ChatMessage
        v-for="(message, key) in messages"
        :key="key"
        :message="message"
      />
    </VirtualList>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ChatMessage from '@/components/ChatMessage.vue'
import ClientChatModule from '@/store/modules/client-chat'
import Message from '@/models/server/Message'
import { IChatMessages } from '@/models/api/ChatMessages'
import VirtualList from 'vue-virtual-scroll-list'

@Component({
  components: {
    ChatMessage,
    VirtualList
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
