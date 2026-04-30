<template>
  <div class="row">
    <div class="col-md-3">
      <ul class="nav nav-pills nav-stacked">
        <li><NuxtLink to="/admin/menu">{{ $t('menuManager.listMenu') }}</NuxtLink></li>
        <li :class="{ active: true }"><NuxtLink to="/admin/menu/add">{{ $t('menuManager.addMenu') }}</NuxtLink></li>
      </ul>
    </div>
    <div class="col-md-9">
      <p>{{ $t('menuManager.menu') }}</p>
      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label>{{ $t('menuManager.menuName') }}</label>
          <input type="text" v-model="form.item_name" class="form-control" :placeholder="$t('menuManager.menuName')" />
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>{{ $t('menuManager.language') }}</label>
              <select v-model="form.lang_id" @change="handleLangChange" class="form-control">
                <option v-for="lang in languageOptions" :key="lang.lang_id" :value="lang.lang_id">{{ lang.lang_name }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>{{ $t('menuManager.parentMenu') }}</label>
              <select v-model="form.parent_id" class="form-control">
                <option :value="0">Root</option>
                <option v-for="item in parentOptions" :key="item.item_id" :value="item.item_id">{{ item.item_name }}</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-danger"><i class="fa fa-floppy-o"></i> {{ $t('menuManager.save') }}</button>
      </form>
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
const { t } = useI18n()

const languageOptions = computed(() => domainStore.languages as Language[])
const parentOptions = computed(() => {
  const items: any[] = []
  const flatten = (list: any[]) => {
    for (const item of list) {
      if (item.item_name) items.push(item)
      if (item.children?.length) flatten(item.children)
    }
  }
  flatten([...menuStore.menuTree])
  return items
})

const form = ref({ item_name: '', lang_id: 0, parent_id: 0, item_order: 0 })

const handleLangChange = async () => {
  if (form.value.lang_id) {
    await menuStore.fetchMenuTree(form.value.lang_id)
  }
}

const handleSave = async () => {
  if (!form.value.item_name) return
  const domainId = domainStore.domain?.domain_id
  if (!domainId) return

  const result = await menuStore.addMenuItem({
    item_name: form.value.item_name,
    parent_id: form.value.parent_id,
    item_order: 0,
    lang_id: form.value.lang_id,
    domain_id: domainId,
  })

  if (result.success) {
    navigateTo('/admin/menu')
  }
}

onMounted(() => {
  if (domainStore.languages.length > 0) {
    form.value.lang_id = domainStore.languages[0].lang_id
  }
})
</script>
