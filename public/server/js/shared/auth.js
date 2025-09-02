/* eslint-disable */
const baseAuthUrl = '/api/v1/auth'

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${baseAuthUrl}/login`,
      data: {
        email,
        password
      }
    })

    if (res.data.status === 'success') {
      window.location.assign('/dashboard')
    }
  } catch (err) {
    console.error(err.response.data)
  }
}
const signUp = async (name, email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${baseAuthUrl}/sign-up`,
      data: {
        name,
        email,
        password
      }
    })

    if (res.data.status === 'success') {
      window.location.assign('/dashboard')
    }
  } catch (err) {
    console.error(err.response.data)
  }
}
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseAuthUrl}/log-out`
    })
    if (res.data.status === 'success') location.reload()
  } catch (err) {
    console.error(err.response)
  }
}

export { login, signUp, logout }
