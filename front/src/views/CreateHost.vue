<template>
  <div class="settings">
    <div v-if="linkToConnect">
      <v-alert>
        Чат создан и доступен по адресу
        <a
          :href="linkToConnect"
          target="_blank"
          @click.prevent
        >{{ linkToConnect }}</a>
      </v-alert>

      <JoinChat :server-id="existingHostId" />
    </div>
    <div v-else>
      Генерация ссылки...
    </div>
  </div>
</template>

<script lang="ts">
import JoinChat from '@/components/JoinChat.vue'
import User from '@/models/server/User'
import nanoid from 'nanoid'

import Server from '@/models/server/Server'

import ServerModule from '@/store/modules/server-core'

import { Vue, Component, Watch } from 'vue-property-decorator'
import { isNil, get } from 'lodash-es'

@Component({
  components: {
    JoinChat
  }
})
export default class CreateHost extends Vue {
  created () {
    this.createChat()
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
  private createChat () {
    if (!isNil(this.existingHostId)) {
      ServerModule.create(this.existingHostId)
    } else {
      ServerModule.create()
    }
  }
}

</script>
