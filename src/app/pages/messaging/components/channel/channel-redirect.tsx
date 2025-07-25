import { useResponsive } from '@/core/hooks'
import { Navigate } from 'react-router-dom'
import ForbiddenState from '@features/states/forbbiden-state'
/**
 * Redirects to the last channel visited by the user
 * If last channel is not found, redirects to general channel
 */
export const ChannelRedirect = () => {
  const lastChannel = localStorage.getItem('ppLastChannel') ?? 'general'
  console.log('REDIRECT')
  const { isDesktop } = useResponsive()
  // if(!isDesktop) return <Navigate to={`/messaging`} replace />;
  if (lastChannel) return <Navigate to={`/messaging/${lastChannel}`} replace />
  return <ForbiddenState />
}
