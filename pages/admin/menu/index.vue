<template>
  <div class="row">
    <div class="col-md-3">
      <ul class="nav nav-pills nav-stacked">
        <li :class="{ active: true }">
          <NuxtLink to="/admin/menu">{{ $t('menuManager.listMenu') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/menu/add">{{ $t('menuManager.addMenu') }}</NuxtLink>
        </li>
        <li><a href="#" @click.prevent="handleClearCache">Clear Cache</a></li>
      </ul>
    </div>
    <div class="col-md-9">
      <div v-if="clearMsg" class="alert alert-success">Menu Cache has been cleared.</div>

      <div class="text-right" style="margin-bottom:10px">
        <NuxtLink to="/admin/menu/add" class="btn btn-success"><i class="fa fa-plus"></i></NuxtLink>
      </div>

      <div class="text-right" style="margin-bottom:10px">
        <Dropdown v-model="selectedLangId" :options="languageOptions" optionLabel="lang_name" optionValue="lang_id"
          placeholder="Select language" />
      </div>

      <DataTable :value="flatMenuItems" :loading="loading" :paginator="true" :rows="10"
        :rowsPerPageOptions="[10, 20, 50]" stripedRows>
        <Column header="#" :style="{ width: '80px' }">
          <template #body="{ index }">
            {{ index + 1 }}
          </template>
        </Column>
        <Column :header="$t('menuManager.menuName')">
          <template #body="{ data }">
            <NuxtLink :to="`/admin/menu/${data.item_id}`" :style="{ paddingLeft: `${data._depth * 1.5}rem` }">
              <i v-if="data._depth > 0" class="fa fa-angle-right" style="color:#a0aec0;margin-right:4px"></i>
              {{ data.item_name }}
            </NuxtLink>
            <NuxtLink v-if="data.content_id" :to="`/admin/content/${data.content_id}`" style="margin-left:6px">
              <i class="fa fa-eye" style="color:#3b82f6"></i>
            </NuxtLink>
          </template>
        </Column>
        <Column :header="$t('menuManager.parentMenu')">
          <template #body="{ data }">
            {{ data.parent_name || '—' }}
          </template>
        </Column>
        <Column field="item_order" :header="$t('menuManager.menuOrder')" :style="{ width: '100px' }" />
        <Column :header="$t('menuManager.reorder')" :style="{ width: '90px' }">
          <template #body="{ data }">
            <div class="reorder-btns">
              <a href="#" @click.prevent="handleReorder(data, 'up')"
                :class="['btn btn-xs btn-default', { disabled: loading }]" v-tooltip.top="$t('menuManager.moveUp')">
                <i class="fa fa-arrow-up"></i>
              </a>
              <a href="#" @click.prevent="handleReorder(data, 'down')"
                :class="['btn btn-xs btn-default', { disabled: loading }]" v-tooltip.top="$t('menuManager.moveDown')">
                <i class="fa fa-arrow-down"></i>
              </a>
            </div>
          </template>
        </Column>
        <Column :header="$t('menuManager.language')" :style="{ width: '80px' }">
          <template #body="{ data }">
            <img v-if="getLanguageByLangId(data.lang_id)"
              :src="`/flag/${flagMap(getLanguageByLangId(data.lang_id).flag)}`"
              style="width:20px;height:14px;border-radius:2px" />
          </template>
        </Column>
        <Column :style="{ width: '80px' }">
          <template #body="{ data }">
            <a href="#" @click.prevent="confirmDelete(data)" class="text-danger">{{ $t('menuManager.delete') }}</a>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useMenuStore } from '~/stores/menu'
import { useDomainStore } from '~/stores/domain'
import { useAuthStore } from '~/stores/auth'
import type { Language } from '~/types'

const menuStore = useMenuStore()
const domainStore = useDomainStore()
const authStore = useAuthStore()

const api = useApi()
const loading = ref(false)
const selectedLangId = ref<number>(0)
const clearMsg = ref(false)
const allMenus = ref<any[]>([])

const languageOptions = computed(() => domainStore.languages as Language[])

// Fetch every menu for the domain (high limit, not the default page of 10), then
// filter client-side by the selected language — the /menus endpoint has no
// lang_id filter of its own.
const fetchAllMenus = async () => {
  loading.value = true
  try {
    const res = await api.get<any>('/menus?limit=1000')
    if (res.success && res.data) {
      allMenus.value = res.data.items || res.data
    }
  } catch (e) {
    console.error('Failed to fetch menus:', e)
  } finally {
    loading.value = false
  }
}

const flatMenuItems = computed(() => {
  const seen = new Set<number>()
  return allMenus.value
    .filter(m => selectedLangId.value && m.lang_id === selectedLangId.value)
    .filter(m => { if (seen.has(m.item_id)) return false; seen.add(m.item_id); return true })
    .sort((a, b) => (a.item_order || 0) - (b.item_order || 0))
    .map(m => ({ ...m, _depth: 0 }))
})

const flagMap = (flag: number) => {
  const flags: Record<number, string> = {
    0: 'kh.svg',
    1: 'en.svg',
    2: 'ch.svg',
    3: 'th.svg',
    4: 'vn.svg',
    5: 'fr.svg',
  }
  return flags[flag] || 'kh.svg'
}

const getLanguageByLangId = (langId: number): Language | undefined => {
  return domainStore.languages.find(l => l.lang_id === langId)
}

const handleClearCache = async () => {
  await api.post(`/menus/clear-cache`, { domainId: domainStore.domain?.domain_id })
  menuStore.clearCache()
  domainStore.clearCache()
  clearMsg.value = true
  await fetchAllMenus()
  setTimeout(() => { clearMsg.value = false }, 3000)
}

const confirmDelete = async (item: any) => {
  if (confirm('Are you sure?')) {
    await menuStore.deleteMenuItem(item.item_id)
    await fetchAllMenus()
  }
}

const handleReorder = async (item: any, direction: 'up' | 'down') => {
  if (loading.value) return
  const ok = await menuStore.reorderMenu(item.item_id, direction)
  if (ok) {
    // Ordering changed — invalidate cached menu trees so the public site reflects it
    menuStore.clearCache()
    domainStore.clearCache()
    await fetchAllMenus()
  }
}

onMounted(async () => {
  await domainStore.resolveDomain(authStore.user?.domain_id)
  // default to the domain's default language
  const def = languageOptions.value.find(l => l.is_default === 1) || languageOptions.value[0]
  if (def) selectedLangId.value = def.lang_id
  await fetchAllMenus()
})
</script>

<style scoped>
.reorder-btns {
  display: flex;
  gap: 0.25rem;
}

.reorder-btns .btn-xs {
  padding: 2px 6px;
  font-size: 12px;
  line-height: 1.4;
}

.reorder-btns .disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
