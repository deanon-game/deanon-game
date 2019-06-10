<template>
  <div class="app">
    <div id="nav">
      <router-link to="/create">Создать игру</router-link> |
      <router-link to="/join">Присоединиться</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import 'normalize.css';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>


<style>
.app {
  padding: 10px;
}
</style>
