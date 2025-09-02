/* eslint-disable */
// load Vue widget in vue hydrate page
const mountVueWidget = () => {
  const { createApp } = Vue

  const { date, caption } = window.__INITIAL_SERVER_STATES__ || {}

  createApp({
    data() {
      return {
        date,
        caption
      }
    },
    template: `
      <div>
        <p>{{ caption }}</p>
        <p>Selected date: {{ date }}</p>
        <input type="date" v-model="date" />
      </div>
    `
  }).mount('#some-vue-widget')
}

const vueWidget = document.querySelector('#some-vue-widget')
if (vueWidget) {
  mountVueWidget()
}
