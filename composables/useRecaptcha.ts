export const useRecaptcha = () => {
  const config = useRuntimeConfig()
  const siteKey = config.public.recaptchaSiteKey as string
  const widgetId = ref<number | null>(null)

  const render = (containerId: string): Promise<number> => {
    return new Promise((resolve) => {
      const tryRender = () => {
        if (typeof window === 'undefined' || !(window as any).grecaptcha) {
          setTimeout(tryRender, 200)
          return
        }

        const el = document.getElementById(containerId)
        if (!el) {
          setTimeout(tryRender, 200)
          return
        }

        el.innerHTML = ''
        const id = (window as any).grecaptcha.render(el, {
          sitekey: siteKey,
          size: 'normal',
        })
        widgetId.value = id
        resolve(id)
      }
      tryRender()
    })
  }

  const getResponse = (): string | null => {
    if (typeof window === 'undefined' || !(window as any).grecaptcha || widgetId.value === null) {
      return null
    }
    return (window as any).grecaptcha.getResponse(widgetId.value)
  }

  const reset = () => {
    if (typeof window !== 'undefined' && (window as any).grecaptcha && widgetId.value !== null) {
      (window as any).grecaptcha.reset(widgetId.value)
    }
  }

  return {
    widgetId,
    render,
    getResponse,
    reset,
  }
}
