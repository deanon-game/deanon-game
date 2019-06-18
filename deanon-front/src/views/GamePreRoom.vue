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
  created () {
    if (!this.playerName) {
      this.playerName = prompt('Username', 'user')
    }
    this.initLobby()
    firestore.collection('games').doc(this.$route.params.id)
      .onSnapshot(doc => {
        this.players = doc.data().currentPlayers
      })
  },
  data () {
    return {
      playerName: null,
      gameName: '',
      gameID: '',
      players: null
    }
  },
  computed: {
  },
  methods: {
    // Перекинуть говно ниже на бек, реализовать только отправку пользовательского никнейма
    initLobby () {
      firestore.collection('games').doc(this.$route.params.id)
        .update({
          currentPlayers: firebase.firestore.FieldValue.arrayUnion(this.playerName)
        })
      // Сформировать дату из дока с необходимой инфой, кинуть на бек
      firestore.collection('games').doc(this.$route.params.id)
        .get().then(doc => {
          this.players = doc.data().currentPlayers
          this.gameName = doc.data().paramas.gameName
        })
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
