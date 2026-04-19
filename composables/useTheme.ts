import type { Setting, MenuItem, ContentSection, Banner, SocialMedia, Domain, Language } from '~/types'

export interface ThemeProps {
  menuTree: MenuItem[]
  contentSections: ContentSection[]
  banners: Banner[]
  settings: Setting
  domain: Domain
  socialMedia: SocialMedia[]
  language: Language
}

export const useTheme = () => {
  const THEME_COMPONENTS: Record<number, string> = {
    0: 'ClassicMultiPage',
    1: 'ScrollingSinglePage',
    2: 'MagazineGrid',
    3: 'FullscreenHero',
  }

  const resolveThemeComponent = (pageStyle: number): string => {
    return THEME_COMPONENTS[pageStyle] || 'ClassicMultiPage'
  }

  const getThemeClass = (theme: number): string => {
    const classes: Record<number, string> = {
      0: 'theme-default',
      1: 'theme-inverse',
      2: 'theme-red',
      3: 'theme-green',
      4: 'theme-purple',
      5: 'theme-yellow',
    }
    return classes[theme] || 'theme-default'
  }

  return {
    resolveThemeComponent,
    getThemeClass,
  }
}
