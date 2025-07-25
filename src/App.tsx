import '@/core/locales/i18n'
import RootRouter from './app/router'
import { ReactNode, Suspense, type FC } from 'react'
import FrappeProvider from '@/lib/frappe/provider'
import { AuthProvider } from '@/lib/auth/auth-provider'
import FullPageLoaderTemplate from '@templates/full-page-loader.template'
import { ThemeProvider } from '@/lib/shadcn/theme-provider'

function App() {
  return (
    <Suspense fallback={<FullPageLoaderTemplate />}>
      <FrappeProvider>
        <AuthProvider>
          <ThemeProvider>
            <RootRouter />
          </ThemeProvider>
        </AuthProvider>
      </FrappeProvider>
    </Suspense>
  )
}

export default App
