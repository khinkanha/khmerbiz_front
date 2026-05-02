# How to Access API from khmerbiz_front

## Overview

All API calls go through a single centralized client: `composables/useApi.ts`. The base URL is configured in `nuxt.config.ts` → `runtimeConfig.public.apiBaseUrl` (default: `http://khmerbiz-api.localhost/api/v1`).

---

## Step-by-Step: Making an API Call

### Step 1 — Import `useApi`

```typescript
import { useApi } from '~/composables/useApi'
const api = useApi()
```

This works in any `<script setup>` block in a `.vue` page or component, or inside a Pinia store, or inside another composable.

### Step 2 — Call a method

```typescript
// GET
const response = await api.get<User>('/users/me')

// POST (JSON body)
const response = await api.post<AuthResponse>('/auth/login', { username, password })

// POST (FormData / file upload)
const formData = new FormData()
formData.append('title', 'Hello')
const response = await api.post<{ content_id: number }>('/content', formData)

// PUT
const response = await api.put<User>('/users/me', { full_name: 'New Name' })

// DELETE
const response = await api.delete('/content/123')
```

### Step 3 — Handle the response

Every call returns `ApiResponse<T>`:

```typescript
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}
```

```typescript
const response = await api.get<User>('/users/me')

if (response.success && response.data) {
  // use response.data (typed as User)
} else {
  // show response.message or response.errors
}
```

### Step 4 — For paginated endpoints

```typescript
interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
```

```typescript
const response = await api.get<PaginatedResponse<Content>>(`/content?page=1&limit=20`)
if (response.success && response.data) {
  const items = response.data.items
  const { total, page, totalPages } = response.data.pagination
}
```

---

## Authentication (automatic)

- After login, tokens are stored in `localStorage` (`accessToken`, `refreshToken`)
- `useApi` auto-attaches `Authorization: Bearer <token>` to every request
- On 401, it auto-calls `POST /auth/refresh` and retries the request once
- To manually set/clear tokens: `api.setTokens(access, refresh)` / `api.clearTokens()`

---

## Where to put API logic

### Option A — Inside a Pinia store (recommended for admin pages)

Best when multiple components share the same data.

```typescript
// stores/myFeature.ts
import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export const useMyFeatureStore = defineStore('myFeature', () => {
  const api = useApi()
  const items = ref<any[]>([])

  const fetchItems = async () => {
    const response = await api.get<any[]>('/my-endpoint')
    if (response.success && response.data) {
      items.value = response.data
    }
  }

  return { items, fetchItems }
})
```

### Option B — Inside a composable (recommended for reusable logic)

Best for self-contained flows like file uploads.

```typescript
// composables/useMyFeature.ts
export const useMyFeature = () => {
  const api = useApi()

  const doSomething = async (data: any) => {
    return await api.post('/my-endpoint', data)
  }

  return { doSomething }
}
```

### Option C — Directly in a page (one-off calls)

Best for simple pages that don't share state.

```typescript
// pages/admin/my-page.vue
<script setup lang="ts">
import { useApi } from '~/composables/useApi'
const api = useApi()

onMounted(async () => {
  const res = await api.get('/my-endpoint')
  if (res.success) { /* ... */ }
})
</script>
```

---

## Available API Endpoints

All endpoints below are relative to `apiBaseUrl` (`/api/v1`).

### Public (no auth)

| Method | Endpoint | Cache TTL |
|--------|----------|-----------|
| GET | `/health` | — |
| GET | `/site/config` | 120s |
| GET | `/site/menu` | 3600s |
| GET | `/site/home` | 300s |
| GET | `/site/pages/:domainId/:menuItemId` | 300s |
| GET | `/site/news/:newsId` | 1200s |
| GET | `/site/article/:contentId` | 300s |
| GET | `/site/banners` | 120s |
| GET | `/site/feature-news/:contentId` | 120s |

### Auth (rate limited)

| Method | Endpoint | Notes |
|--------|----------|-------|
| POST | `/auth/login` | Returns `{ user, accessToken, refreshToken }` |
| POST | `/auth/signup` | Returns same as login |
| POST | `/auth/logout` | Blacklists token |
| POST | `/auth/refresh` | Body: `{ refreshToken }` |
| POST | `/auth/verify-account` | Body: `{ code }` |

### Users (JWT required)

| Method | Endpoint | Auth Level |
|--------|----------|------------|
| GET | `/users/me` | Any |
| PUT | `/users/me` | Any |
| PUT | `/users/me/password` | Any |
| GET | `/users` | WebAdmin+ |
| POST | `/users` | WebAdmin+ |
| GET | `/users/:userId` | WebAdmin+ |
| PUT | `/users/:userId/password` | WebAdmin+ |
| PUT | `/users/:userId/domain` | SuperAdmin |

### Domains (JWT required)

| Method | Endpoint | Auth Level |
|--------|----------|------------|
| GET | `/domains` | SuperAdmin |
| POST | `/domains` | SuperAdmin |
| POST | `/domains/register` | Any |
| GET | `/domains/:domainId` | Any |
| PUT | `/domains/:domainId` | Any |
| PUT | `/domains/:domainId/status` | SuperAdmin |
| DELETE | `/domains/:domainId/cache` | Any |

### Content + Items + News (JWT required)

| Method | Endpoint |
|--------|----------|
| GET | `/content` |
| POST | `/content` |
| GET | `/content/:contentId` |
| PUT | `/content/:contentId` |
| DELETE | `/content/:contentId` |
| GET | `/content/:contentId/items` |
| POST | `/content/:contentId/items` |
| PUT | `/content/:contentId/items/:itemId` |
| DELETE | `/content/:contentId/items/:itemId` |
| PUT | `/content/:contentId/map` |
| GET | `/content/:contentId/news` |
| POST | `/content/:contentId/news` |
| GET | `/content/:contentId/news/:newsId` |
| PUT | `/content/:contentId/news/:newsId` |
| DELETE | `/content/:contentId/news/:newsId` |

### Menus (JWT required)

| Method | Endpoint |
|--------|----------|
| GET | `/menus` |
| POST | `/menus` |
| GET | `/menus/:itemId` |
| PUT | `/menus/:itemId` |
| DELETE | `/menus/:itemId` |
| PUT | `/menus/:itemId/order` |
| POST | `/menus/clear-cache` |

### Banners (JWT required)

| Method | Endpoint |
|--------|----------|
| GET | `/banners` |
| POST | `/banners` |
| DELETE | `/banners/:bannerId` |

### Media (JWT required)

| Method | Endpoint |
|--------|----------|
| GET | `/media` |
| POST | `/media/upload-url` | Body: `{ fileName, fileType, folder }` |
| POST | `/media/confirm` | Body: `{ key, originalName }` |
| GET | `/media/:mediaId/url` |
| DELETE | `/media/:mediaId` |

### Settings (JWT required)

| Method | Endpoint |
|--------|----------|
| GET | `/settings` |
| PUT | `/settings/general` |
| PUT | `/settings/menu` |
| PUT | `/settings/banner` |
| PUT | `/settings/logo` |
| GET | `/settings/social-media` |
| POST | `/settings/social-media` |
| DELETE | `/settings/social-media/:smid` |
| GET | `/settings/languages` |
| POST | `/settings/languages` |
| DELETE | `/settings/languages/:langId` |
| PUT | `/settings/languages/:langId/default` |

---

## File Upload Flow

1. Call `POST /media/upload-url` with `{ fileName, fileType, folder }`
2. Backend returns `{ uploadUrl, key }`
3. Upload file directly to S3 using the presigned URL (`PUT` to `uploadUrl`)
4. Call `POST /media/confirm` with `{ key, originalName }`
5. Backend returns `{ media_id }`

Or use the composable which handles the full flow:

```typescript
const { uploadFile } = useUpload()
const mediaId = await uploadFile(file, 'uploads', (progress) => {
  console.log(`${progress}%`)
})
```

---

## Not Implemented (backend needs these)

These endpoints are called by the frontend but don't exist in the backend yet:

| Method | Endpoint | Used by |
|--------|----------|---------|
| PUT | `/banners/:bannerId` | `stores/setting.ts` → `updateBanner` |
| PUT | `/settings/social-media/:smid` | `stores/setting.ts` → `updateSocialMedia` |
| DELETE | `/users/:userId` | `stores/user.ts` → `deleteUser` |
| POST | `/domains/announce` | `pages/admin/super/announcing/` |
