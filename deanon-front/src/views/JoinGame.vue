<template>
  <div class="home">
    join
    <div class="games-list">
      <ul>
        <li v-for="game in games" :key="game.id">
          {{ game.data.params.gameName }} {{ game.id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    axios.get('http://localhost:3000')
    .then((res) => {
      this.games = res.data
    })
    .catch((e) => {
      console.log(e)
    })
  },
  data () {
    return {
      games: []
    }
  }
}
</script>
