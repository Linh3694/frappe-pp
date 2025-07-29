import env from '@/config/env'

/**
 * Tạo API URL dựa trên môi trường
 * - Development: sử dụng relative URL (Vite proxy sẽ xử lý)  
 * - Production: cũng sử dụng relative URL (server proxy sẽ xử lý)
 */
export function getApiUrl(endpoint: string): string {
  // Remove leading slash nếu có
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  
  // Luôn sử dụng relative URL để tránh CORS issues
  // Server proxy (nginx/PM2) sẽ xử lý việc proxy về backend
  return `/${cleanEndpoint}`
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