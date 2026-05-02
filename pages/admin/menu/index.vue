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

      <div class="form-group" style="margin-bottom:10px">
        <label>{{ $t('menuManager.language') }}:</label>
        <select v-model="selectedLangId" @change="handleLanguageChange" class="form-control" style="display:inline-block;width:auto">
          <option v-for="lang in languageOptions" :key="lang.lang_id" :value="lang.lang_id">{{ lang.lang_name }}</option>
        </select>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t('menuManager.menuName') }}</th>
              <th>{{ $t('menuManager.language') }}</th>
              <th>{{ $t('menuManager.parentMenu') }}</th>
              <th>{{ $t('menuManager.menuOrder') }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in flatMenuItems" :key="item.item_id">
              <td>{{ i + 1 }}</td>
              <td>
                <NuxtLink :to="`/admin/menu/${item.item_id}`" :style="{ paddingLeft: `${item._depth * 1.5}rem` }">
                  <i v-if="item._depth > 0" class="fa fa-angle-right" style="color:#a0aec0;margin-right:4px"></i>
                  {{ item.item_name }}
                </NuxtLink>
                <div v-if="item.content_title">
                  <i class="fa fa-newspaper-o"></i> {{ item.content_title }}
                </div>
              </td>
              <td>
                <img v-if="getLanguageByLangId(item.lang_id)?.flag_icon" :src="`/flag/${getLanguageByLangId(item.lang_id)!.flag_icon}`" style="width:20px;height:14px;border-radius:2px" />
              </td>
              <td>{{ item.parent_name || '—' }}</td>
              <td>{{ item.item_order }}</td>
              <td>
                <a href="#" @click.prevent="confirmDelete(item)" class="text-danger">{{ $t('menuManager.delete') }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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

const getLanguageByLangId = (langId: number): Language | undefined => {
  return domainStore.languages.find(l => l.lang_id === langId)
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
