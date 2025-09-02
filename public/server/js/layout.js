/* eslint-disable */
import { logout } from './shared/auth.js'

console.log('layout globally used by all pages')

// logout button is part of layout and is used in all pages so its included here
const logOutButton = document.querySelector('.logout-btn')
if (logOutButton) logOutButton.addEventListener('click', logout)
