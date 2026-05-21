# Vue.js with Nuxt: Stores & Composables Guide
## From Beginner to Expert

---

## Table of Contents

1. [Introduction](#introduction)
2. [Vue.js Fundamentals](#vuejs-fundamentals)
3. [Nuxt.js Fundamentals](#nuxtjs-fundamentals)
4. [Composables](#composables)
   - [Beginner](#composables-beginner)
   - [Intermediate](#composables-intermediate)
   - [Advanced](#composables-advanced)
   - [Expert](#composables-expert)
5. [Pinia Stores](#pinia-stores)
   - [Beginner](#pinia-beginner)
   - [Intermediate](#pinia-intermediate)
   - [Advanced](#pinia-advanced)
   - [Expert](#pinia-expert)
6. [Best Practices & Patterns](#best-practices-patterns)
7. [Common Pitfalls](#common-pitfalls)
8. [Real-World Examples](#real-world-examples)

---

## Introduction

Vue.js is a progressive JavaScript framework for building user interfaces. Nuxt.js builds on Vue.js, providing a full-stack framework with features like SSR, file-based routing, and auto-imports.

### Key Concepts Overview

| Concept | Vue.js | Nuxt.js |
|---------|--------|---------|
| Component System | ✅ Core | ✅ Enhanced |
| Reactivity | ✅ Ref/Reactive | ✅ + Server-Side |
| Routing | Vue Router | Auto File-Based |
| State Management | Pinia/Vuex | Pinia (Auto-import) |
| Composables | ✅ | ✅ + Server Composables |

---

## Vue.js Fundamentals

### The Composition API

The Composition API is the modern way to write Vue components. It's built on top of JavaScript's reactivity system.

#### Core Reactivity Primitives

**ref()** - For primitive values
- Creates a reactive reference
- Access value with `.value`
- Auto-unwraped in templates

**reactive()** - For objects
- Makes entire object reactive
- No `.value` needed
- Deep reactivity by default

**computed()** - Derived state
- Cached based on dependencies
- Read-only by default
- Lazy evaluation

**watch()** & **watchEffect()** - Side effects
- `watch()`: Explicit dependencies
- `watchEffect()`: Auto-tracked dependencies

---

## Nuxt.js Fundamentals

### Auto-Imports

Nuxt automatically imports:
- Vue composables (`ref`, `computed`, `watch`, etc.)
- Nuxt composables (`useFetch`, `useAsyncData`, `useRoute`, etc.)
- Components from `~/components/`

### Server vs Client

```javascript
// Server-side only
export default defineNuxtRouteMiddleware((to, from) => {
  // Runs on server during SSR
})

// Client-side only
onMounted(() => {
  // Only runs in browser
})

// Both (with careful handling)
const isClient = process.client
const isServer = process.server
```

---

## Composables

### Composables - Beginner

#### What is a Composable?

A composable is a function that uses Vue's composition API to encapsulate and reuse stateful logic.

#### Basic Pattern

```javascript
// composables/useCounter.js
export const useCounter = (initialValue = 0) => {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

#### Usage in Component

```vue
<script setup>
const { count, increment } = useCounter(10)
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">+</button>
</template>
```

#### Key Principles

1. **Single Responsibility** - Do one thing well
2. **Return Reactive State** - Always return refs/reactive objects
3. **No Side Effects on Creation** - Initialize lazily if needed
4. **Clear Naming** - Use `use` prefix

---

### Composables - Intermediate

#### Lifecycle Integration

```javascript
export const useWindowResize = () => {
  const width = ref(0)
  const height = ref(0)
  
  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  
  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })
  
  return { width, height }
}
```

#### Async Operations

```javascript
export const useUserData = (userId) => {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  
  const fetch = async () => {
    loading.value = true
    error.value = null
    
    try {
      data.value = await $fetch(`/api/users/${userId}`)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  
  // Auto-fetch on mount
  onMounted(fetch)
  
  return { data, error, loading, fetch }
}
```

#### Composable Chaining

```javascript
export const useAuth = () => {
  const { data, fetch, loading } = useUserData('current')
  
  const isAuthenticated = computed(() => !!data.value)
  const user = computed(() => data.value)
  
  return {
    isAuthenticated,
    user,
    loading,
    refresh: fetch
  }
}
```

---

### Composables - Advanced

#### State Persistence

```javascript
export const useLocalStorage = (key, defaultValue) => {
  const stored = localStorage.getItem(key)
  const value = ref(stored ? JSON.parse(stored) : defaultValue)
  
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })
  
  return value
}
```

#### Debounce/Throttle Patterns

```javascript
export const useDebounce = (fn, delay = 300) => {
  let timeoutId = null
  
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Usage
export const useSearch = () => {
  const query = ref('')
  const results = ref([])
  
  const search = useDebounce(async (q) => {
    results.value = await $fetch('/api/search', { query: q })
  })
  
  watch(query, (newQuery) => {
    if (newQuery) search(newQuery)
  })
  
  return { query, results }
}
```

#### Shared State (Singleton Pattern)

```javascript
// State is shared across all instances
let sharedState = null

export const useSharedModal = () => {
  if (!sharedState) {
    sharedState = {
      isOpen: ref(false),
      content: ref(null)
    }
  }
  
  const open = (content) => {
    sharedState.content.value = content
    sharedState.isOpen.value = true
  }
  
  const close = () => {
    sharedState.isOpen.value = false
  }
  
  return {
    isOpen: readonly(sharedState.isOpen),
    content: readonly(sharedState.content),
    open,
    close
  }
}
```

---

### Composables - Expert

#### Provider/Inject Pattern

```javascript
// Parent composable
export const provideTheme = () => {
  const theme = ref('light')
  const toggle = () => theme.value = theme.value === 'light' ? 'dark' : 'light'
  
  provide('theme', { theme, toggle })
  
  return { theme, toggle }
}

// Child composable
export const useTheme = () => {
  const context = inject('theme')
  
  if (!context) {
    throw new Error('useTheme must be used within provideTheme')
  }
  
  return context
}
```

#### Composable Factory with Options

```javascript
export const useFetchWithCache = (options = {}) => {
  const {
    ttl = 5 * 60 * 1000, // 5 minutes
    key,
    transform = (data) => data
  } = options
  
  const cache = new Map()
  
  return async (url, fetchOptions = {}) => {
    const cacheKey = key || url
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data
    }
    
    const data = await $fetch(url, fetchOptions)
    const transformed = transform(data)
    
    cache.set(cacheKey, {
      data: transformed,
      timestamp: Date.now()
    })
    
    return transformed
  }
}

// Usage
const fetchWithCache = useFetchWithCache({ ttl: 60000 })
const data = await fetchWithCache('/api/data')
```

#### Server-Side Composables

```javascript
// composables/server/useServerSession.server.ts
export const useServerSession = async (event) => {
  const session = await requireUserSession(event)
  
  return {
    user: session.user,
    id: session.user.id,
    roles: session.user.roles
  }
}

// Middleware usage
export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = await useServerSession()
  
  if (!user) {
    return navigateTo('/login')
  }
})
```

#### Type-Safe Composables

```typescript
// types/api.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface ApiResponse<T> {
  data: T
  error: string | null
}

// composables/useApi.ts
export const useApi = <T>(url: string) => {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  
  const fetch = async () => {
    try {
      const response = await $fetch<ApiResponse<T>>(url)
      data.value = response.data
    } catch (e: any) {
      error.value = e.message
    }
  }
  
  return { data, error, fetch } as const
}

// Usage with type inference
const { data } = useApi<User>('/api/user')
// data is Ref<User | null>
```

#### Composable with Cleanup

```javascript
export const useWebSocket = (url) => {
  const socket = ref(null)
  const messages = ref([])
  const connected = ref(false)
  
  const connect = () => {
    socket.value = new WebSocket(url)
    
    socket.value.onopen = () => {
      connected.value = true
    }
    
    socket.value.onmessage = (event) => {
      messages.value.push(JSON.parse(event.data))
    }
    
    socket.value.onclose = () => {
      connected.value = false
    }
  }
  
  const send = (data) => {
    socket.value?.send(JSON.stringify(data))
  }
  
  const disconnect = () => {
    socket.value?.close()
  }
  
  // Auto-cleanup
  tryOnScopeDispose(disconnect)
  
  return { connect, disconnect, send, messages, connected }
}
```

#### Async Composable Pattern

```javascript
export const useAsyncResource = (loader) => {
  const resource = shallowRef(null)
  const error = ref(null)
  const status = ref('idle') // idle | loading | success | error
  
  const load = async (...args) => {
    status.value = 'loading'
    error.value = null
    
    try {
      resource.value = await loader(...args)
      status.value = 'success'
    } catch (e) {
      error.value = e
      status.value = 'error'
    }
  }
  
  return {
    resource: readonly(resource),
    error: readonly(error),
    status: readonly(status),
    load
  }
}
```

---

## Pinia Stores

### Pinia - Beginner

#### What is Pinia?

Pinia is Vue's official state management library. It replaces Vuex with a simpler, more intuitive API.

#### Basic Store Definition

```javascript
// stores/counter.js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  
  getters: {
    doubleCount: (state) => state.count * 2
  },
  
  actions: {
    increment() {
      this.count++
    }
  }
})
```

#### Setup Store Syntax (Recommended)

```javascript
// stores/user.js
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref('')
  
  const isLoggedIn = computed(() => !!token.value)
  
  const login = async (credentials) => {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: credentials
    })
    
    user.value = response.user
    token.value = response.token
  }
  
  const logout = () => {
    user.value = null
    token.value = ''
  }
  
  return {
    user,
    token,
    isLoggedIn,
    login,
    logout
  }
})
```

#### Using Stores in Components

```vue
<script setup>
// Auto-imported by Nuxt
const counter = useCounterStore()

// Direct access
console.log(counter.count)
counter.increment()

// Destructure (loses reactivity)
const { count } = counter // ❌ Not reactive

// Destructure with storeToRefs
const { count, doubleCount } = storeToRefs(counter) // ✅ Reactive
const { increment } = counter // Actions don't need storeToRefs
</script>

<template>
  <div>{{ count }}</div>
  <div>{{ doubleCount }}</div>
  <button @click="increment">Increment</button>
</template>
```

#### Key Concepts

| Concept | Description |
|---------|-------------|
| `state` | Reactive data |
| `getters` | Computed properties |
| `actions` | Methods to modify state |
| `defineStore` | Store definition function |
| `storeToRefs` | Destructure while keeping reactivity |

---

### Pinia - Intermediate

#### Actions with Async

```javascript
export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const fetchProducts = async (category) => {
    loading.value = true
    error.value = null
    
    try {
      products.value = await $fetch(`/api/products?category=${category}`)
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }
  
  return {
    products,
    loading,
    error,
    fetchProducts
  }
})
```

#### Store Persistence

```javascript
export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('light')
  const language = ref('en')
  
  // Load from localStorage
  const loadFromStorage = () => {
    const saved = localStorage.getItem('settings')
    if (saved) {
      const { theme: savedTheme, language: savedLang } = JSON.parse(saved)
      theme.value = savedTheme
      language.value = savedLang
    }
  }
  
  // Save to localStorage on changes
  watch([theme, language], ([newTheme, newLang]) => {
    localStorage.setItem('settings', JSON.stringify({
      theme: newTheme,
      language: newLang
    }))
  }, { deep: true })
  
  loadFromStorage()
  
  return {
    theme,
    language
  }
})
```

#### Computed Getters with Arguments

```javascript
export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })
  
  // Getter with argument (returns a function)
  const getItemById = computed(() => (id) => {
    return items.value.find(item => item.id === id)
  })
  
  const addItem = (product) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }
  
  return {
    items,
    total,
    getItemById,
    addItem
  }
})
```

---

### Pinia - Advanced

#### Store Composition

```javascript
// stores/auth.js
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref('')
  
  const isAuthenticated = computed(() => !!token.value)
  
  const login = async (credentials) => {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })
    user.value = response.user
    token.value = response.token
  }
  
  const logout = () => {
    user.value = null
    token.value = ''
  }
  
  return { user, token, isAuthenticated, login, logout }
})

// stores/profile.js - uses auth store
export const useProfileStore = defineStore('profile', () => {
  const auth = useAuthStore()
  const profile = ref(null)
  
  const fetchProfile = async () => {
    if (!auth.token.value) return
    profile.value = await $fetch('/api/profile', {
      headers: {
        Authorization: `Bearer ${auth.token.value}`
      }
    })
  }
  
  // Watch auth changes
  watch(() => auth.token.value, (newToken) => {
    if (newToken) fetchProfile()
    else profile.value = null
  })
  
  return { profile, fetchProfile }
})
```

#### Actions with Multiple Stores

```javascript
export const useCheckoutStore = defineStore('checkout', () => {
  const cart = useCartStore()
  const auth = useAuthStore()
  const order = ref(null)
  
  const placeOrder = async (shippingAddress) => {
    if (!auth.isAuthenticated.value) {
      throw new Error('Must be logged in')
    }
    
    if (cart.items.value.length === 0) {
      throw new Error('Cart is empty')
    }
    
    order.value = await $fetch('/api/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token.value}`
      },
      body: {
        items: cart.items.value,
        shipping: shippingAddress,
        total: cart.total.value
      }
    })
    
    // Clear cart after successful order
    cart.clear()
  }
  
  return { order, placeOrder }
})
```

#### Store Subscriptions

```javascript
export const useAuditStore = defineStore('audit', () => {
  const logs = ref([])
  
  const logAction = (store, actionType, payload) => {
    logs.value.push({
      store,
      action: actionType,
      payload,
      timestamp: new Date().toISOString()
    })
  }
  
  // Subscribe to all store changes
  const setupAudit = () => {
    const auth = useAuthStore()
    
    auth.$onAction(({ name, args, after, onError }) => {
      logAction('auth', name, args)
      
      after((result) => {
        console.log(`Action ${name} completed with result:`, result)
      })
      
      onError((error) => {
        console.error(`Action ${name} failed:`, error)
      })
    })
  }
  
  return { logs, logAction, setupAudit }
}
```

#### Dynamic Store Registration

```javascript
// Register stores dynamically
export const useDynamicStore = (storeId, initialState) => {
  // Check if store already exists
  if (hasStore(storeId)) {
    return useStore(storeId)
  }
  
  // Define and register new store
  return defineStore(storeId, () => {
    const state = reactive(initialState)
    
    const update = (newState) => {
      Object.assign(state, newState)
    }
    
    const reset = () => {
      Object.assign(state, initialState)
    }
    
    return {
      ...toRefs(state),
      update,
      reset
    })
  })()
}
```

---

### Pinia - Expert

#### Type-Safe Stores

```typescript
// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

export interface AuthState {
  user: User | null
  token: string
  permissions: string[]
}

// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const state = reactive<AuthState>({
    user: null,
    token: '',
    permissions: []
  })
  
  const hasPermission = (permission: string): boolean => {
    return state.permissions.includes(permission)
  }
  
  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(p => state.permissions.includes(p))
  }
  
  const hasRole = (role: User['role']): boolean => {
    return state.user?.role === role
  }
  
  return {
    ...toRefs(state),
    hasPermission,
    hasAnyPermission,
    hasRole
  }
})

// Type-safe usage
const auth = useAuthStore()
if (auth.hasRole('admin')) {
  // TypeScript knows this is safe
}
```

#### Store Plugins

```javascript
// plugins/pinia-logger.js
export const piniaLoggerPlugin = ({ store }) => {
  store.$onAction(({ name, args, after, onError }) => {
    const startTime = Date.now()
    console.log(`[Action] ${store.$id}.${name}`, args)
    
    after((result) => {
      const duration = Date.now() - startTime
      console.log(`[Action Complete] ${store.$id}.${name} (${duration}ms)`, result)
    })
    
    onError((error) => {
      console.error(`[Action Error] ${store.$id}.${name}`, error)
    })
  })
  
  store.$subscribe((mutation, state) => {
    console.log(`[State Changed] ${store.$id}`, {
      type: mutation.type,
      storeId: mutation.storeId,
      payload: mutation.payload
    })
  })
}

// nuxt.config.ts
export default defineNuxtConfig({
  pinia: {
    plugins: [
      () => import('./plugins/pinia-logger')
    ]
  }
})
```

#### Hydration Strategy

```javascript
// stores/hydratable.js
export const createHydratableStore = (id, setup) => {
  return defineStore(id, () => {
    const { state, ...rest } = setup()
    
    // Hydrate from server state
    const hydrate = (serverState) => {
      if (serverState[id]) {
        Object.assign(state, serverState[id])
      }
    }
    
    // Dehydrate for server
    const dehydrate = () => {
      return { [id]: toRaw(state) }
    }
    
    return {
      ...toRefs(state),
      ...rest,
      hydrate,
      dehydrate
    }
  })
}

// Usage
export const useSessionStore = createHydratableStore('session', () => {
  const user = ref(null)
  const preferences = ref({})
  
  const setUser = (userData) => {
    user.value = userData
  }
  
  return {
    user,
    preferences,
    setUser
  }
})
```

#### Store Testing

```javascript
// tests/stores/auth.test.js
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('initializes with empty state', () => {
    const store = useAuthStore()
    expect(store.user).toBeNull()
    expect(store.token).toBe('')
  })
  
  it('logs in successfully', async () => {
    const mockResponse = {
      user: { id: '1', name: 'Test' },
      token: 'test-token'
    }
    
    global.$fetch = vi.fn().mockResolvedValue(mockResponse)
    
    const store = useAuthStore()
    await store.login({ email: 'test@test.com', password: 'pass' })
    
    expect(store.user).toEqual(mockResponse.user)
    expect(store.token).toBe(mockResponse.token)
  })
  
  it('computed isAuthenticated returns correct value', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    
    store.token = 'some-token'
    expect(store.isAuthenticated).toBe(true)
  })
})
```

#### Server-Side Store

```javascript
// stores/server-config.server.js
export const useServerConfigStore = defineStore('server-config', () => {
  const config = ref(null)
  const loaded = ref(false)
  
  const loadConfig = async (event) => {
    if (loaded.value) return config.value
    
    // Read from runtime config or environment
    config.value = {
      apiUrl: useRuntimeConfig().public.apiBaseUrl,
      features: {
        auth: process.env.FEATURE_AUTH === 'true',
        payments: process.env.FEATURE_PAYMENTS === 'true'
      },
      timestamp: Date.now()
    }
    
    loaded.value = true
    return config.value
  }
  
  return {
    config: readonly(config),
    loadConfig
  }
})
```

#### Store with WebSocket Integration

```javascript
export const useRealtimeStore = defineStore('realtime', () => {
  const messages = ref([])
  const connectionStatus = ref('disconnected')
  let socket = null
  
  const connect = (url) => {
    socket = new WebSocket(url)
    
    socket.onopen = () => {
      connectionStatus.value = 'connected'
    }
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      messages.value.push(data)
    }
    
    socket.onclose = () => {
      connectionStatus.value = 'disconnected'
    }
    
    socket.onerror = () => {
      connectionStatus.value = 'error'
    }
  }
  
  const send = (message) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    }
  }
  
  const disconnect = () => {
    socket?.close()
    socket = null
  }
  
  // Cleanup on store disposal
  onScopeDispose(() => {
    disconnect()
  })
  
  return {
    messages,
    connectionStatus,
    connect,
    send,
    disconnect
  }
}
```

---

## Best Practices & Patterns

### Composables Best Practices

1. **Use `use` prefix** - Clear naming convention
2. **Return refs, not values** - Maintain reactivity
3. **Accept options objects** - Flexible configuration
4. **Lazy initialization** - Don't run on creation
5. **Cleanup side effects** - Use `onUnmounted` or `tryOnScopeDispose`
6. **Make them SSR-safe** - Check `process.client`/`process.server`
7. **Keep them focused** - Single responsibility
8. **Use TypeScript** - Better DX and safety

### Store Best Practices

1. **Prefer setup syntax** - More flexible than options API
2. **Use `storeToRefs` for destructuring** - Preserve reactivity
3. **Keep actions simple** - Complex logic in composables
4. **Normalize state** - Store data in efficient structure
5. **Use computed for derived state** - Don't duplicate data
6. **Persist only what's needed** - Minimize localStorage usage
7. **Type your stores** - TypeScript for type safety
8. **Test stores independently** - Unit test logic

### When to Use What

| Scenario | Composable | Store |
|----------|-----------|-------|
| UI-specific state | ✅ | ❌ |
| Global app state | ⚠️ | ✅ |
| Reusable logic | ✅ | ⚠️ |
| Complex state management | ❌ | ✅ |
| API calls | ✅ | ⚠️ |
| Authentication | ⚠️ | ✅ |
| Form state | ✅ | ❌ |
| Settings/Preferences | ⚠️ | ✅ |

---

## Common Pitfalls

### Composable Pitfalls

1. **Losing Reactivity**
   ```javascript
   // ❌ Wrong - destructuring loses reactivity
   const { value } = useSomething()
   
   // ✅ Correct - use storeToRefs for stores
   const { value } = storeToRefs(useSomething())
   
   // ✅ Or keep the whole ref
   const something = useSomething()
   ```

2. **Multiple Instances Issues**
   ```javascript
   // ❌ Shared state across components
   let shared = null
   export const useBad = () => {
     if (!shared) shared = ref(0)
     return shared
   }
   
   // ✅ Each component gets own state
   export const useGood = () => {
     const state = ref(0)
     return state
   }
   ```

3. **SSR Hydration Mismatches**
   ```javascript
   // ❌ Browser-only values
   export const useBad = () => {
     return ref(window.innerWidth)
   }
   
   // ✅ SSR-safe
   export const useGood = () => {
     const width = ref(0)
     
     onMounted(() => {
       width.value = window.innerWidth
     })
     
     return width
   }
   ```

4. **Memory Leaks**
   ```javascript
   // ❌ No cleanup
   export const useBad = () => {
     const interval = setInterval(() => {}, 1000)
     return ref(0)
   }
   
   // ✅ Proper cleanup
   export const useGood = () => {
     const data = ref(0)
     const interval = setInterval(() => data.value++, 1000)
     
     onUnmounted(() => clearInterval(interval))
     
     return data
   }
   ```

### Store Pitfalls

1. **Mutating Directly Outside Actions**
   ```javascript
   // ❌ Direct mutation
   store.user = newUser
   
   // ✅ Through action
   store.setUser(newUser)
   ```

2. **Overusing Stores**
   ```javascript
   // ❌ Everything in a store
   const useFormStore = defineStore('form', () => ({
     name: ref(''),
     email: ref('')
   }))
   
   // ✅ Local state in component
   const form = reactive({
     name: '',
     email: ''
   })
   ```

3. **Circular Dependencies**
   ```javascript
   // ❌ Store A imports Store B, Store B imports Store A
   import { useB } from './b'
   export const useA = defineStore('a', () => {
     const b = useB() // Potential issue
   })
   
   // ✅ Use actions to avoid circular deps
   export const useA = defineStore('a', () => {
     const setBData = (data) => { /* ... */ }
   })
   ```

4. **Ignoring TypeScript**
   ```javascript
   // ❌ No types
   const user = ref(null)
   
   // ✅ With types
   const user = ref<User | null>(null)
   ```

---

## Real-World Examples

### Example 1: Complete Authentication Flow

**Composables:**

```javascript
// composables/useAuth.js
export const useAuth = () => {
  const { token, user, isAuthenticated } = storeToRefs(useAuthStore())
  
  const login = async (credentials) => {
    const store = useAuthStore()
    await store.login(credentials)
  }
  
  const logout = () => {
    const store = useAuthStore()
    store.logout()
    navigateTo('/login')
  }
  
  const requireAuth = () => {
    if (!isAuthenticated.value) {
      navigateTo('/login')
    }
  }
  
  return {
    token: readonly(token),
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    login,
    logout,
    requireAuth
  }
}
```

**Store:**

```javascript
// stores/auth.js
export const useAuthStore = defineStore('auth', () => {
  const token = useLocalStorage('auth_token', '')
  const user = ref(null)
  
  const fetchUser = async () => {
    if (!token.value) return
    
    try {
      user.value = await $fetch('/api/user', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
    } catch {
      token.value = ''
      user.value = null
    }
  }
  
  const login = async (credentials) => {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: credentials
    })
    
    token.value = response.token
    user.value = response.user
  }
  
  const logout = () => {
    token.value = ''
    user.value = null
  }
  
  // Initialize
  onMounted(fetchUser)
  
  return {
    token,
    user,
    isAuthenticated: computed(() => !!token.value),
    login,
    logout,
    fetchUser
  }
})
```

### Example 2: Data Fetching with Caching

```javascript
// composables/useResource.js
export const useResource = (url, options = {}) => {
  const {
    immediate = true,
    transform = (data) => data,
    key = url
  } = options
  
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  
  const cache = useNuxtData(key)
  
  const fetch = async () => {
    if (cache.data.value) {
      data.value = cache.data.value
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      const response = await useAsyncData(key, () => $fetch(url))
      data.value = transform(response.data.value)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  
  const refresh = async () => {
    await refreshNuxtData(key)
    await fetch()
  }
  
  if (immediate) {
    fetch()
  }
  
  return {
    data: readonly(data),
    error: readonly(error),
    loading: readonly(loading),
    fetch,
    refresh
  }
}
```

### Example 3: Multi-Step Form Wizard

```javascript
// composables/useFormWizard.js
export const useFormWizard = (steps) => {
  const currentStep = ref(0)
  const formData = ref({})
  const validationErrors = ref({})
  
  const currentStepConfig = computed(() => steps[currentStep.value])
  
  const isFirstStep = computed(() => currentStep.value === 0)
  const isLastStep = computed(() => currentStep.value === steps.length - 1)
  
  const nextStep = async () => {
    const valid = await validateCurrentStep()
    if (!valid) return false
    
    if (!isLastStep.value) {
      currentStep.value++
    }
    return true
  }
  
  const prevStep = () => {
    if (!isFirstStep.value) {
      currentStep.value--
    }
  }
  
  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) {
      currentStep.value = index
    }
  }
  
  const validateCurrentStep = async () => {
    const config = currentStepConfig.value
    if (!config.validate) return true
    
    const errors = await config.validate(formData.value)
    validationErrors.value = errors
    
    return Object.keys(errors).length === 0
  }
  
  const submit = async () => {
    const valid = await validateCurrentStep()
    if (!valid) return false
    
    try {
      await $fetch('/api/submit', {
        method: 'POST',
        body: formData.value
      })
      return true
    } catch (e) {
      validationErrors.value = { submit: e.message }
      return false
    }
  }
  
  return {
    currentStep,
    formData,
    validationErrors,
    currentStepConfig,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    submit
  }
}
```

---

## Summary

### Key Takeaways

1. **Composables** are for reusable logic and component-level state
2. **Stores** are for global state and complex state management
3. **Use TypeScript** for better development experience
4. **Test your code** - both composables and stores should be tested
5. **Consider SSR** - make sure your code works on server and client
6. **Clean up** - prevent memory leaks by cleaning up side effects
7. **Keep it simple** - don't over-engineer solutions

### Learning Path

1. **Start with basics** - refs, computed, watch
2. **Move to composables** - simple reusable functions
3. **Add stores** - for shared state
4. **Learn patterns** - advanced techniques
5. **Master TypeScript** - type-safe code
6. **Practice** - build real applications

### Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Nuxt.js Documentation](https://nuxt.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/) - Collection of Vue composables

---

*This guide covers Vue.js with Nuxt stores and composables from beginner to expert level. Practice each concept and build projects to solidify your understanding.*
