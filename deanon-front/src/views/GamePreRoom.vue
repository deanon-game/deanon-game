<template>
  <div>
    Тут будет подготовка к игре
    {{players}}
  </div>
</template>

<script>
import firestore from '../firebase.js'
import firebase from 'firebase'

export default {
  beforeMount () {
    this.playerName = prompt('Username', 'player1')
  },
  mounted () {
    firestore.collection('games').doc(this.$route.params.id)
      .update({
        currentPlayers: firebase.firestore.FieldValue.arrayUnion(this.playerName)
      })
    firestore.collection('games').doc(this.$route.params.id)
      .get().then(doc => {
        this.players = doc.data().currentPlayers
      })
  },
  created () {
    firestore.collection('games').doc(this.$route.params.id)
      .onSnapshot(doc => {
        this.players = doc.data().currentPlayers
      })
  },
  data () {
    return {
      playerName: '',
      gameName: '',
      gameID: '',
      players: []
    }
  },
  beforeDestroy () {
    firestore.collection('games').doc(this.$route.params.id)
      .update({
        currentPlayers: firebase.firestore.FieldValue.arrayRemove(this.playerName)
      })
  }
}
</script>

<style scoped>
</style>
