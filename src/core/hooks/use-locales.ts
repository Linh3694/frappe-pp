import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ALLOWED_LANGUAGES = ['en', 'vn']

export const useLocales = () => {
  const { t, i18n } = useTranslation()

  return { t, currentLanguage: i18n.language }
}
