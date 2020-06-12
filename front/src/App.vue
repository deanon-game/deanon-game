<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  body {
    overflow: hidden;
    max-height: calc(100vh - 10px);
  }
</style>
