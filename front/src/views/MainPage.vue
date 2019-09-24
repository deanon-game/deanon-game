<template>
  <v-layout
    align-center
    justify-center
    row
    fill-height
  >
    <v-btn :to="{name:'create'}">
      Создать игру
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>
