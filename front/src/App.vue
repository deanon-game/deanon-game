<template>
  <v-app>
    <v-container fluid>
      <router-view />
    </v-container>
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
