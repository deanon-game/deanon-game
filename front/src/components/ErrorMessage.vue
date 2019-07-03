<template>
  <v-snackbar
      v-model="isNeedToShowErrors"
      color="error"
      :timeout="2000"
      multi-line
    >
      <template v-for="error in errorList">
        {{error}}
      </template>
    </v-snackbar>
</template>

<script>
export default {
  props: {
    errorList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isNeedToShowErrors: false
    }
  },
  watch: {
    errorList (newValue) {
      this.isNeedToShowErrors = !!this.errorList.length
    }
  }
}
</script>
