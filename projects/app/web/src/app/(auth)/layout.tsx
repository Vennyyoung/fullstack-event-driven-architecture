'use client'

// Imports
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'

// UI imports
import style from './layout.module.scss'

// Local imports
import { userAuth } from '@/modules/user/state/auth'
import { routes } from '@/common/routes'
import { params } from '@packages/common/build/params'

// Component
const Layout = ({ children }) => {
  // router
  const router = useRouter()

  // state
  const { isAuthenticated } = useAtomValue(userAuth)

  // effect
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(routes.login.path)
    }
  }, [isAuthenticated])

  // render
  return (
    <div className={style.auth}>
      <div className={style.left}>{children}</div>

      <div className={style.right}>
        <h1>{params.site.tagline}</h1>
        <p>{params.site.description}</p>
      </div>
    </div>
  )
}

export default Layout