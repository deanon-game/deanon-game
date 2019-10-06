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
import { isNil, get } from 'lodash-es'

@Component({
  components: {
    Chat
  }
})
export default class CreateHost extends Vue {
  mounted () {
    this.createGame()
  }

  get linkToConnect () {
    return ServerModule.linkToConnect
  }
  get server () {
    return ServerModule.server
  }
  get existingHostId () {
    return get(this.$route, 'query.hostId', null)
  }

  @Watch('server')
  function () {
    if (this.server && isNil(this.existingHostId)) {
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
    if (!isNil(this.existingHostId)) {
      ServerModule.create(this.existingHostId)
    } else {
      ServerModule.create()
    }
  }
}

</script>
