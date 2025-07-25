import { enGB, vi } from 'date-fns/locale'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { linearGradient } from 'polished'
import _ from 'lodash'

export const getInitials = (str: string) => {
  const words = str.split(' ')
  const initials = words.map((word) => word[0]).join('')
  return initials.slice(words.length - 2, words.length)
}

export const getShortName = (str: string) => {
  const words = str.split(' ')
  return words.slice(words.length - 2, words.length).join(' ')
}

/** Get date-fns locale object from i18n locale code.
 * @default enGB
 */
export const getDateLocale = (locale: string) => {
  if (locale === 'en') return enGB
  if (locale === 'vn') return vi
  return enGB
}

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  let kb = bytes / 1024
  if (kb < 1024) return kb.toFixed(2) + ' KB'
  let mb = kb / 1024
  if (mb < 1024) return mb.toFixed(2) + ' MB'
  let gb = mb / 1024
  return gb.toFixed(2) + ' GB'
}

export const stringHashToNumber = (str: string, length: number) => {
  // Simple hash function to convert string to a number
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Ensure the hash is positive
  hash = Math.abs(hash)

  // Map the hash to a number between 0 and 20
  return hash % length
}

export const cleanPath = (path: string) => {
  let cleanedPath = path.replace(/^\/+|\/+$/g, '')
  cleanedPath = cleanedPath.split('/').filter(Boolean).join('/')
  return '/' + cleanedPath
}

export const toCapitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const capitalizeAllWords = (text: string) => {
  return text
    .split(' ')
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(' ')
}

export const genAvatarDefault = (name?: string) => {
  // return `https://robohash.org/${name}`
  // return `https://ui-avatars.com/api/?background=random&size=128&bold=true&color=fff&name=${getInitials(name || '?')}`
  const avatar = createAvatar(initials, {
    seed: getInitials(name || '?'),
    fontSize: 40,
    // ... other options
  }).toDataUri()
  return avatar
}

export function removeAccents(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f|\s]/g, '')
    .toLowerCase()
}

export function replaceUndefinedWithNull(obj: object): object {
  return _.mapValues(obj, (value:any) => {
    if (_.isPlainObject(value)) {
      return replaceUndefinedWithNull(value)
    }
    if (value instanceof Date) {
      return new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString()
    }
    return _.isUndefined(value) ? null : value
  })
}
