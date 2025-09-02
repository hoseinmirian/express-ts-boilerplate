import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

console.log(document.cookie.includes('jwt'))
// it's not accessible in the browser as httpOnly is set to true in server

const response = fetch('/api/v1/cities', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include'
  }
})

response
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error('Error:', error)
  })

createApp(App).use(router).mount('#app')
