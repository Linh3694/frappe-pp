import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { Button } from '@atoms/button'
import clsx from 'clsx'
import React, { HTMLAttributes, useCallback, useContext } from 'react'
import { AuthContext } from '@/lib/auth/auth-provider'
type Props = HTMLAttributes<HTMLDivElement> & {}

export default function LogOut({ className }: Props) {
  const { currentUser, logout } = useContext(AuthContext)

  const handleLogout = useCallback(async () => {
    try {
      await logout()
      // window.location.replace('/auth')
    } catch {
      // TODO: Handle error
    }
  }, [])
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="flex gap-2">
        <Avatar className="h-16 w-16 shadow-sm">
          <AvatarImage src="https://github.com/shadcn.png " />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-lg font-semibold">Do Hai Minh</div>
          <div className="text-sm text-gray-500">parent@gmail.com</div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        className="w-fit font-semibold text-white [background:var(--gradient-o-y)] hover:opacity-90"
      >
        Logout
      </Button>
    </div>
  )
}
