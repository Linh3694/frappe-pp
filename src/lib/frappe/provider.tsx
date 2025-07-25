import { FrappeProvider as Provider } from 'frappe-react-sdk'
import React, { PropsWithChildren } from 'react'
import Cookies from 'js-cookie'

export default function FrappeProvider({ children }: PropsWithChildren) {
  const getSiteName = () => {
    if (
      // @ts-ignore
      window.frappe?.boot?.versions?.frappe &&
      // @ts-ignore
      (window.frappe.boot.versions.frappe.startsWith('15') ||
        // @ts-ignore
        window.frappe.boot.versions.frappe.startsWith('16'))
    ) {
      // @ts-ignore
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
    }
    return import.meta.env.VITE_SITE_NAME
  }

  // Helper để lấy CSRF token
  const getCSRFToken = () => {
    // Thử lấy từ các nguồn khác nhau
    const methods = [
      () => (window as any).csrf_token,
      () => (window as any).frappe?.csrf_token, 
      () => Cookies.get('csrf_token'),
      () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    ]
    
    for (const method of methods) {
      try {
        const token = method()
        if (token) {
          console.log('🔑 Found CSRF token via:', method.name || 'method')
          return token
        }
      } catch (e) {
        // Continue to next method
      }
    }
    
    console.warn('⚠️ No CSRF token found')
    return null
  }

  return (
    <Provider
      url={import.meta.env.VITE_FRAPPE_PATH ?? ""}
      enableSocket={false}
      socketPort={import.meta.env.VITE_SOCKET_PORT}
      siteName={getSiteName()}
      swrConfig={{
        fetcher: (url: string) => {
          // Debug cookies trước khi gửi request
          const userId = Cookies.get('user_id')
          const sid = Cookies.get('sid')
          const fullName = Cookies.get('full_name')
          
          console.log('🍪 Cookies before API call:', {
            url: url.substring(0, 100) + '...',
            userId,
            sid: sid ? '***' + sid.slice(-4) : 'missing',
            fullName,
            hasSession: !!(userId && sid && userId !== 'Guest')
          })

          // Chuẩn bị headers
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }

          // Thêm CSRF token nếu có hoặc từ cookies
          const csrfToken = getCSRFToken() || Cookies.get('csrf_token')
          if (csrfToken) {
            headers['X-Frappe-CSRF-Token'] = csrfToken
            console.log('🔑 Using CSRF token:', csrfToken.substring(0, 10) + '...')
          } else {
            console.warn('⚠️ No CSRF token available for request')
          }

          return fetch(url, {
            headers,
            credentials: 'include', // Đảm bảo cookies được gửi kèm
          }).then(res => {
            console.log('📡 API Response:', {
              url: url.substring(0, 50) + '...',
              status: res.status,
              statusText: res.statusText,
              headers: Object.fromEntries(res.headers.entries()),
            })

            if (!res.ok) {
              console.error('❌ API Failed:', {
                url,
                status: res.status,
                statusText: res.statusText,
                userId,
                hasSession: !!(userId && sid && userId !== 'Guest'),
                hasCSRFToken: !!headers['X-Frappe-CSRF-Token']
              })
              
              // Log detailed error for debugging
              if (res.status === 403) {
                console.error('🚫 403 Forbidden - Possible CSRF or session issue')
                console.log('📋 Request headers sent:', headers)
                console.log('🍪 Available cookies:', Object.fromEntries(
                  document.cookie.split(';').map(c => {
                    const [name, value] = c.trim().split('=');
                    return [name, value ? 'present' : 'empty'];
                  })
                ))
              }
            }

            return res.json()
          }).catch(error => {
            console.error('💥 Fetch Error:', {
              url,
              error: error.message,
              userId,
              hasSession: !!(userId && sid && userId !== 'Guest')
            })
            throw error
          })
        },
        errorRetryCount: 1, // Giảm retry để tránh spam
        revalidateOnFocus: false,
        revalidateIfStale: false,
      }}
    >
      {children}
    </Provider>
  )
}
