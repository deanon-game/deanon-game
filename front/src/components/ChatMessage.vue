<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col cols="1">
      <v-avatar>
        <img
          v-if="message.avatar"
          :src="message.avatar"
          alt="user avatar"
        >
      </v-avatar>
    </v-col>
    <v-col cols="11">
      {{ message.name }}
      {{ message.text }}
    </v-col>
  </v-row>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import Message from '@/models/Message'

@Component
export default class Chat extends Vue {
 @Prop({
   type: Object,
   default: () => {}
 }) readonly message!: {}
}
</script>

<style scoped>

</style>
