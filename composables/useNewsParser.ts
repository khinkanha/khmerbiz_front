export const parseNewsItem = (item: any): any => {
  if (!item.description || typeof item.description !== 'string') return item
  try {
    const parsed = JSON.parse(item.description)
    return {
      ...item,
      title: parsed.title || item.title || '',
      short_description: parsed.shortdes || item.short_description || '',
      description: parsed.longdes || parsed.longdescription || item.description,
      photo: parsed.photo || item.photo || null,
      publish_date: parsed.publish || parsed.publish_date || item.publish_date || null,
    }
  } catch {
    return item
  }
}

export const parseNews = (news: any[]): any[] => news.map(parseNewsItem)
