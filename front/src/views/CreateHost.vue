<template>
  <div class="settings">
    <div v-if="linkToConnect">
      Ваша игра будет доступна по адресу <a
        :href="linkToConnect"
        target="_blank"
      >{{ linkToConnect }}</a>
    </div>
    <div v-else>
      Генерация ссылки...
    </div>
    <Chat />
  </div>
</template>

<script lang="ts">
import Chat from '@/components/Chat.vue'
import User from '@/models/server/User.ts'
import nanoid from 'nanoid'

import Server from '@/models/server/Server'

import ServerModule from '@/store/modules/server-core'

import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  components: {
    Chat
  }
})
export default class CreateHost extends Vue {
  created () {
    this.createGame()
  }

  get linkToConnect () {
    return ServerModule.linkToConnect
  }
  get server () {
    return ServerModule.server
  }

  @Watch('server')
  function () {
    if (this.server) {
      this.changePath(this.server.id)
    }
  }

  private changePath (newHostId: string) {
    this.$router.push({
      ...this.$route,
      query: {
        hostId: newHostId
      }
    })
  }
  private createGame () {
    const hostId = this.$route.query.hostId

    if (typeof (hostId) === 'string') {
      ServerModule.create(hostId)
    } else {
      ServerModule.create()
    }
  }
}

</script>
