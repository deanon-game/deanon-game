<template>
  <div class="app">
    <div id="nav">
      <router-link to="/create">Создать игру</router-link> |
      <router-link to="/join">Присоединиться</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {}
</script>

<style>
.app {
  padding: 10px;
}
</style>
