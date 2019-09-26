<template>
  <v-container>
    <ChatMessage
      v-for="(message, key) in messages"
      :key="key"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ChatMessage from './ChatMessage.vue'

import logo from '../assets/anonymous.svg'

@Component({
  components: {
    ChatMessage
  }
})
export default class Chat extends Vue {
  public logo: any = logo
  get messages () {
    return [
      {
        avatar: this.logo,
        name: 'Имя человека',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.`
      },
      {
        avatar: this.logo,
        name: 'Имя человека',
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.`
      }

    ]
  }
}
</script>

<style scoped>

</style>
