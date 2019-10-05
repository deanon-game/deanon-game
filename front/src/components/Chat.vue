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
import ChatModule from '@/store/modules/server-chat'

@Component({
  components: {
    ChatMessage
  }
})
export default class Chat extends Vue {
  get messages () {
    return ChatModule.messages
  }
}
</script>

<style scoped>

</style>
