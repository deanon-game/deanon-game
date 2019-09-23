<template>
    <v-list avatar flat disabled three-line>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-avatar>
            <img alt="user logo" :src="logo" />
            аватар
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>

<script lang="ts">
import Vue from 'vue'

import logo from '../assets/anonymous.svg'

export default Vue.extend({
  data () {
    return {
      logo: logo
    }
  }
})
</script>

<style scoped>

</style>
