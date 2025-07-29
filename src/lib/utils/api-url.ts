import env from '@/config/env'

/**
 * Tạo API URL dựa trên môi trường
 * - Development: sử dụng relative URL (Vite proxy sẽ xử lý)
 * - Production: sử dụng absolute URL tới backend
 */
export function getApiUrl(endpoint: string): string {
  // Remove leading slash nếu có
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  
  // Trong development mode, sử dụng relative URL để Vite proxy xử lý
  if (import.meta.env.DEV) {
    return `/${cleanEndpoint}`
  }
  
  // Trong production, sử dụng absolute URL tới backend
  return `${env.FRAPPE_PATH}/${cleanEndpoint}`
}

/**
 * Shorthand cho login API
 */
export function getLoginUrl(): string {
  return getApiUrl('api/method/login')
}

/**
 * Shorthand cho user profile API
 */
export function getUserProfileUrl(): string {
  return getApiUrl('api/method/parent_portal.api.user_availability.get_person_by_current_user')
} 