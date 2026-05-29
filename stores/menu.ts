import type { MenuItem, MenuForm, PaginatedResponse } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useApi} from '~/composables/useApi'

export const useMenuStore = defineStore('menu', () => {
  const api = useApi()

  const menuItems = ref<MenuItem[]>([])
  const menuTree = ref<MenuItem[]>([])
  const menuCache = ref<Record<number, MenuItem[]>>({})
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  })

  const fetchMenuItems = async (page: number = 1) => {
    try {
      const response = await api.get<PaginatedResponse<MenuItem>>(`/menus?page=${page}&limit=${pagination.value.limit}`)

      if (response.success && response.data) {
        menuItems.value = response.data.items
        const pag = response.data.pagination
        if (pag) {
          pagination.value = {
            page: pag.page,
            limit: pag.limit,
            total: pag.total,
            totalPages: pag.totalPages,
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
    }
  }

  const fetchMenuTree = async (langId: number) => {
    if (menuCache.value[langId]) {
      menuTree.value = menuCache.value[langId]
      return
    }

    try {
      const response = await api.get<MenuItem[]>(`/menus`)
      if (response.success && response.data ) {
        const tree = buildMenuTree(response.data.items || response.data)
        menuTree.value = tree

        menuCache.value[langId] = tree
        
      }
    } catch (error) {
      console.error('Failed to fetch menu tree:', error)
    }
  }

  const buildMenuTree = (items: MenuItem[]): MenuItem[] => {
    const map = new Map<number, MenuItem>()
    const roots: MenuItem[] = []

    items.forEach(item => {
      map.set(item.item_id, { ...item, children: [] })
    })

    items.forEach(item => {
      const node = map.get(item.item_id)
      if (!node) return

      if (item.parent_id === 0) {
        roots.push(node)
      } else {
        const parent = map.get(item.parent_id)
        if (parent) {
          if (!parent.children) parent.children = []
          parent.children.push(node)
        }
      }
    })

    return roots
  }

  const fetchMenuItem = async (id: number) => {
    try {
      const response = await api.get<MenuItem>(`/menus/${id}`)

      if (response.success && response.data) {
        return response.data
      }

      return null
    } catch (error) {
      console.error('Failed to fetch menu item:', error)
      return null
    }
  }

  const addMenuItem = async (data: MenuForm): Promise<{ success: boolean; id?: number }> => {
    try {
      const response = await api.post<{ item_id: number }>('/menus', data)

      if (response.success && response.data) {
        await refreshLanguageCache(data.lang_id)
        return { success: true, id: response.data.item_id }
      }

      return { success: false }
    } catch (error) {
      console.error('Failed to add menu item:', error)
      return { success: false }
    }
  }

  const updateMenuItem = async (id: number, data: Partial<MenuForm>): Promise<boolean> => {
    try {
      const response = await api.put(`/menus/${id}`, data)

      if (response.success) {
        const item = menuItems.value.find(m => m.item_id === id)
        if (item && data.lang_id) {
          await refreshLanguageCache(data.lang_id)
        }
        return true
      }

      return false
    } catch (error) {
      console.error('Failed to update menu item:', error)
      return false
    }
  }

  const deleteMenuItem = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/menus/${id}`)

      if (response.success) {
        menuItems.value = menuItems.value.filter(m => m.item_id !== id)

        for (const langId of Object.keys(menuCache.value)) {
          await clearCacheForLanguage(Number(langId))
        }

        return true
      }

      return false
    } catch (error) {
      console.error('Failed to delete menu item:', error)
      return false
    }
  }

  const reorderMenu = async (id: number, direction: 'up' | 'down'): Promise<boolean> => {
    try {
      const response = await api.put(`/menus/${id}/order`, { direction })
      return response.success
    } catch (error) {
      console.error('Failed to reorder menu:', error)
      return false
    }
  }

  const refreshLanguageCache = async (langId: number) => {
    try {
      const response = await api.get<MenuItem[]>(`/menus`)

      if (response.success && response.data) {
        const tree = buildMenuTree(response.data.items || response.data)
        menuCache.value[langId] = tree
      }
    } catch (error) {
      console.error('Failed to refresh language cache:', error)
    }
  }

  const clearCacheForLanguage = (langId: number) => {
    delete menuCache.value[langId]
  }

  const clearCache = () => {
    menuCache.value = {}
  }

  const fetchAllMenuTree = async () => {
    try {
      const response = await api.get<MenuItem[]>(`/menus`)

      if (response.success && response.data) {
        menuTree.value = buildMenuTree(response.data.items || response.data)
      }
    } catch (error) {
      console.error('Failed to fetch all menu tree:', error)
    }
  }

  const findMenuItemInTree = (id: number, tree: MenuItem[] = menuTree.value): MenuItem | null => {
    for (const item of tree) {
      if (item.item_id === id) {
        return item
      }
      if (item.children && item.children.length > 0) {
        const found = findMenuItemInTree(id, item.children)
        if (found) return found
      }
    }
    return null
  }

  return {
    menuItems: readonly(menuItems),
    menuTree: readonly(menuTree),
    menuCache: readonly(menuCache),
    pagination: readonly(pagination),
    fetchMenuItems,
    fetchMenuTree,
    fetchMenuItem,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    reorderMenu,
    clearCache,
    fetchAllMenuTree,
    findMenuItemInTree,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
}
