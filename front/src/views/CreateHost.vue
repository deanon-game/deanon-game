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
    <DeChat />
  </div>
</template>

<script lang="ts">
import DeChat from '@/components/Chat.vue'
import User from '@/models/server/User.ts'
import nanoid from 'nanoid'

import ServerModule from '@/store/modules/server-core'

import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  components: {
    DeChat
  }
})
export default class App extends Vue {
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
    this.changePath(this.server.id)
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
    const user1 = new User(nanoid(), 'Вася')
    const user2 = new User(nanoid(), 'Петя')

    user1.rename(this.$store, user1, 'Фёдор').then(() => {
      console.log('user1 now is ', user1)
    })

    const hostId = this.$route.query.hostId

    if (typeof (hostId) === 'string') {
      ServerModule.create(hostId)
    } else {
      ServerModule.create()
    }
  }
}

</script>
