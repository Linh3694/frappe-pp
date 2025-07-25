import { useEffect, useCallback, useState } from 'react'
import { useAuthContext } from './auth-provider'
import { useRouter } from '../../core/hooks/use-router'
import { useNavigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const navigate = useNavigate()

  const { currentUser } = useAuthContext()

  const [checked, setChecked] = useState(false)

  const check = useCallback(() => {
    if (!currentUser) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString()

      const loginPath = '/auth/login'

      const href = `${loginPath}?${searchParams}`

      navigate(href)
    } else {
      setChecked(true)
    }
  }, [currentUser])

  useEffect(() => {
    check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!checked) {
    return null
  }

  return <>{children}</>
}
