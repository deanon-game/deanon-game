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
import ChatMessage from './ChatMessage.vue'

@Component({
  components: {
    ChatMessage
  }
})
export default class Chat extends Vue {
  get messages () {
    return this.$store.getters['server/messages']
  }
}
</script>

<style scoped>

</style>
