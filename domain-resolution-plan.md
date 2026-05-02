# Domain Resolution Plan for Nuxt Frontend

## How the old PHP system works

### Public site (DomainController)
- Reads `$_SERVER['HTTP_HOST']` → strips `www.` → looks up domain in DB by name
- Loads languages, menus, banners for that domain

### Admin (BackendController extends DomainController)
- **Does NOT rely on HTTP_HOST for domain resolution**
- Uses the logged-in user's `domain_id` from session:
  ```php
  $this->user = Security::getUser();
  $this->manage_domain->pull_by_id($this->user->domain_id);
  ```
- Loads languages from cache or DB using `domain_id`
- All admin content operations are scoped to that domain

## How the Nuxt frontend currently works

### Public site
- Server middleware reads `Host` header → calls `GET /site/config` with `X-Forwarded-Host`
- Domain store hydrates client-side with same API
- Works correctly for public SSR pages

### Admin (the problem)
- Also calls `domainStore.resolveDomain()` which calls `GET /site/config` with `X-Forwarded-Host`
- When accessed via `localhost:8080`, the host doesn't match any backend domain → API returns "Domain not found"
- Result: `domainStore.languages` is empty → language dropdown shows nothing

## The fix

### 1. Modify the API to support `domain_id` parameter on `/site/config`

Backend API endpoint `GET /site/config` should accept an optional `domain_id` query parameter:
- If `domain_id` is provided → return config for that domain (for admin use)
- If `X-Forwarded-Host` is provided → return config for that host (for public use)
- Auth token is already sent → can validate user owns that domain

### 2. Modify `stores/domain.ts` — add `resolveAdminDomain()`

New method that passes the authenticated user's `domain_id`:

```ts
const resolveAdminDomain = async (domainId: number) => {
  const response = await api.get('/site/config', { domain_id: domainId })
  // same population logic as resolveDomain()
}
```

### 3. Modify admin pages to use `resolveAdminDomain()`

In content form (`pages/admin/content/[id].vue`) and any other admin page that needs domain data:

```ts
onMounted(async () => {
  const authStore = useAuthStore()
  if (authStore.user?.domain_id) {
    await domainStore.resolveAdminDomain(authStore.user.domain_id)
  }
})
```

### 4. Keep public domain resolution unchanged

Server middleware and public pages continue using `X-Forwarded-Host` — no changes needed.

## Files to change

| File | Change |
|------|--------|
| `stores/domain.ts` | Add `resolveAdminDomain(domainId)` method |
| `pages/admin/content/[id].vue` | Use `resolveAdminDomain` with user's `domain_id` |
| Other admin pages using `domainStore.resolveDomain()` | Same pattern |
| Backend API: `/site/config` | Accept `domain_id` param (backend change) |

## Summary

The admin should resolve domain using the **user's `domain_id`** (like the old `BackendController`), not the host header. The public site continues to use host-based resolution.
