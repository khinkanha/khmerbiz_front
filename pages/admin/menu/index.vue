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

      <DataTable :value="flatMenuItems" :loading="loading" :paginator="true" :rows="pagination.limit"
        :totalRecords="pagination.total" :lazy="true" @page="onPageChange" :rowsPerPageOptions="[10, 20, 50]"
        stripedRows>
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
import type { Language } from '~/types'

const menuStore = useMenuStore()
const domainStore = useDomainStore()

const loading = ref(false)
const selectedLangId = ref<number>(0)
const clearMsg = ref(false)

const languageOptions = computed(() => domainStore.languages as Language[])
const pagination = computed(() => menuStore.pagination)

const flatMenuItems = computed(() => {
  const flatten = (items: any[], depth = 0): any[] => {
    const result: any[] = []
    for (const item of items) {
      result.push({ ...item, _depth: depth })
      if (item.children?.length) result.push(...flatten(item.children, depth + 1))
    }
    return result
  }
  return flatten([...menuStore.menuItems])
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

const onPageChange = (event: any) => {
  loading.value = true
  menuStore.fetchMenuItems(event.page + 1).finally(() => { loading.value = false })
}

const handleLanguageChange = async () => {
  if (selectedLangId.value) {
    loading.value = true
    await menuStore.fetchMenuTree(selectedLangId.value)
    loading.value = false
  }
}

const handleClearCache = () => {
  menuStore.clearCache()
  domainStore.clearCache()
  clearMsg.value = true
  if (selectedLangId.value) menuStore.fetchMenuTree(selectedLangId.value)
  setTimeout(() => { clearMsg.value = false }, 3000)
}

const confirmDelete = async (item: any) => {
  if (confirm('Are you sure?')) {
    await menuStore.deleteMenuItem(item.item_id)
    if (selectedLangId.value) await menuStore.fetchMenuTree(selectedLangId.value)
  }
}

onMounted(async () => {
  loading.value = true
  await menuStore.fetchMenuItems()
  loading.value = false
})
</script>
