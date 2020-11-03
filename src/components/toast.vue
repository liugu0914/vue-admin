<template>
  <v-snackbar
    v-model="active"
    content-class="toast-content"
    :timeout="timeout"
    app
    top
  >
    <div class="d-flex">
      <span class="mr-2">📚</span>
      <span>{{ text }}</span>
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="active = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      text: '',
      icon: '',
      color: 'dark',
      timeout: 3000,
      close: true,
      application: {}
    }
  },
  methods: {
    show(options = {}) {
      if (this.active) {
        this.reomve()
        this.$nextTick(() => this.show(options))
        return
      }
      Object.keys(options).forEach(field => (this[field] = options[field]))
      this.active = true
      console.log(JSON.stringify(this.$data))
      console.log('snackbar snackbar snackbar')
    },
    reomve() {
      this.active = false
    }
  }
}
</script>
<style lang="scss" scoped>
.toast-content{
    word-wrap:break-word;
    max-width: 320px;
    min-width: 200px;
}
</style>
