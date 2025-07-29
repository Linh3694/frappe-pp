import env from '@/config/env'

/**
 * Tạo API URL sử dụng backend server từ env config
 */
export function getApiUrl(endpoint: string): string {
  // Remove leading slash nếu có
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  
  // Sử dụng absolute URL với backend server từ env
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