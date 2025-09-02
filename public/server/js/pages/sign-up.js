/* eslint-disable */
import { signUp } from '../shared/auth.js'

const signUpForm = document.querySelector('.form--signup')
if (signUpForm) {
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    await signUp(name, email, password)
  })
}
