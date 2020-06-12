
<template>
  <div>
    <JoinChat :server-id="serverId" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JoinChat from '@/components/JoinChat.vue'

@Component({
  components: {
    JoinChat
  }
})
export default class JoinGame extends Vue {
  get serverId () {
    return this.$route.params.id
  }
}
</script>
