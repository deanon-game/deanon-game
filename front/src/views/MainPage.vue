<template>
  <main class="main">
    <section class="intro">
      <h1>
        Pygmalemon 🍋 – безопасный чат.
      </h1>
      <img
        width="100%"
        src="@/assets/stockfresh_id1508151_6c9f7f.jpg"
        class="intro__image"
      >
    </section>
    <section>
      <v-btn :to="{name:'create'}">
        Создать комнату
      </v-btn>
    </section>
  </main>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;

  flex-direction: column;
  justify-content: center;

  min-height: 90vh;
}
.intro {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.intro__image {
  object-fit: contain;
  min-height: 300px;
  max-width: 600px;
}
</style>
