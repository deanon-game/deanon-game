
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

@Component({
  components: {
    ChatMessage
  }
})
export default class JoinChat extends Vue {
  @Prop({
    type: String,
    required: true
  }) readonly id!: string

  created () {
    this.joinChat()
  }
  joinChat () {
    this.$store.dispatch('client/connect', this.id)
  }
  onJoin () {
    this.$store.dispatch('client/send', {
      type: 'chat',
      message: 'hello :)'
    })
  }
}
</script>

<style scoped>

</style>
