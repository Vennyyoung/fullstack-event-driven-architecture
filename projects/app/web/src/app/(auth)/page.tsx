'use client'

// Imports
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

// UI imports
import { IconCheck } from '@packages/ui/build/icons'
import style from './page.module.scss'

// Common imports
import { params } from '@packages/common/build/params'

// Local imports
import { api } from '@/common/config/api'
import { isDevelopment, notify } from '@/common/helpers/utils'
import { userAuth } from '@/modules/user/state/auth'
import { routes } from '@/common/routes'

// Component
const Login = () => {
  // router
  const router = useRouter()

  // state
  const [{ isAuthenticated }, setAuth] = useAtom(userAuth)
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [user, setUser] = useState({
    email: isDevelopment() ? 'admin@purro.ai' : '',
    password: isDevelopment() ? '123456' : '',
  })

  // effect
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(routes.users.path)
    }
  }, [isAuthenticated])

  // onSubmit
  const onSubmit = async (event) => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      // api
      const data = await api.user.adminAuthLogin.query({
        email: user.email,
        password: user.password,
      })

      // notification
      notify({
        success: data.success,
        message: data.message,
      })

      if (data && data.success) {
        // state
        setAuth({
          isAuthenticated: true,
          ...data.data,
        })
      }
    } catch (error) {
      console.log(error)

      // notification
      notify({
        success: false,
        message: error.message,
      })
    } finally {
      isSubmittingToggle(false)
    }
  }

  // on change
  const onChange = (event) => {
    setUser((user) => ({ ...user, [event.target.name]: event.target.value }))
  }

  // render
  return (
    <form className={style.login} onSubmit={onSubmit}>
      <h1>Login</h1>

      <label>
        Email
        <input
          type='email'
          name='email'
          value={user.email}
          onChange={onChange}
          required
          placeholder='Enter your email'
          maxLength={params.common.limits.email}
          autoFocus
        />
      </label>

      <label>
        Password
        <input
          type='password'
          name='password'
          value={user.password}
          onChange={onChange}
          required
          placeholder='Enter password'
          className='animation fade-in'
          maxLength={params.common.limits.password}
        />
      </label>

      <button type='submit' disabled={isSubmitting}>
        <IconCheck /> Submit
      </button>
    </form>
  )
}

export default Login
