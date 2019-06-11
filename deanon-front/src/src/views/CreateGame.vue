<template>
  <div class="settings">
    <label class="settings__label">
      Название игры 
      <input type="text" placeholder="Случайное название" v-model="gameName">
    </label>
    <label class="settings__label">
      Количество попыток для угадывания каждому игроку 
      <input type="number" v-model="tryCount">
    </label>
    <label class="settings__label"> 
      Дополнительные правила для ваших игроков 
      <textarea v-model="additionalRules" disabled/>
    </label>
    <label class="settings__label">
       Пожелания игрокам перед игрой
      <textarea v-model="additionalWishes" disabled/>
    </label>
    <label class="settings__label">
       Поздравление победителя
      <textarea v-model="winnerCongratulateMsg" disabled/>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CreateGame extends Vue {
  public gameName: string = '';
  public tryCount: number = 3;
  public additionalRules: string = '';
  public additionalWishes: string = 'Игра началась!';
  public winnerCongratulateMsg: string = 'Поздравляем победителя!';
}
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.settings__label {
  display: flex;
  flex-direction: column;
  padding: 10px 0; 
}
</style>
