<template>
  <div class="setup-page">
    <div class="setup-header">
      <h1>Quick Setup</h1>
      <p>Get your website ready in 3 simple steps</p>
    </div>

    <div v-if="loading" class="loading-state">
      <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="3" />
    </div>

    <div v-else class="setup-steps">
      <!-- Step 1: Language -->
      <div :class="['step-card', { completed: status?.hasLanguage }]">
        <div class="step-header">
          <div class="step-number">1</div>
          <div class="step-info">
            <h3>Language</h3>
            <p>Create your website's default language</p>
          </div>
          <div v-if="status?.hasLanguage" class="step-check">
            <i class="pi pi-check-circle"></i>
          </div>
        </div>

        <div v-if="status?.hasLanguage" class="step-done">
          <i class="pi pi-check" style="color: #10b981;"></i>
          <span>{{ status.language?.lang_name }} is set as default language</span>
        </div>

        <div v-else class="step-body">
          <div class="form-row">
            <label>Language Name</label>
            <InputText v-model="langForm.lang_name" placeholder="e.g. English, ខ្មែរ" class="form-input" />
          </div>
          <div class="form-row">
            <label>Language Flag</label>
            <Dropdown
              v-model="langForm.flag"
              :options="flagOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select language"
              class="form-input"
            />
          </div>
          <Button
            label="Create Language"
            icon="pi pi-check"
            :loading="stepLoading === 1"
            :disabled="!langForm.lang_name || langForm.flag === null"
            @click="handleCreateLanguage"
          />
        </div>
      </div>

      <!-- Step 2: Menus & Settings -->
      <div :class="['step-card', { completed: status?.hasMenus && status?.hasBasicSettings, disabled: !status?.hasLanguage }]">
        <div class="step-header">
          <div class="step-number">2</div>
          <div class="step-info">
            <h3>Menus & Settings</h3>
            <p>Set your site title and create navigation menus</p>
          </div>
          <div v-if="status?.hasMenus && status?.hasBasicSettings" class="step-check">
            <i class="pi pi-check-circle"></i>
          </div>
        </div>

        <div v-if="status?.hasMenus && status?.hasBasicSettings" class="step-done">
          <i class="pi pi-check" style="color: #10b981;"></i>
          <span>{{ status.menuCount }} menus created, site title set</span>
        </div>

        <div v-else class="step-body">
          <div class="form-row">
            <label>Site Title</label>
            <InputText v-model="menuForm.siteTitle" placeholder="e.g. My Company" class="form-input" />
          </div>
          <div class="form-row">
            <label>Default Menus</label>
            <div class="menu-checkboxes">
              <div v-for="menu in menuForm.menus" :key="menu.name" class="menu-check">
                <Checkbox v-model="menu.checked" :binary="true" :inputId="'menu-' + menu.name" />
                <label :for="'menu-' + menu.name">{{ menu.name }}</label>
              </div>
            </div>
          </div>
          <Button
            label="Create Menus & Settings"
            icon="pi pi-check"
            :loading="stepLoading === 2"
            :disabled="!status?.hasLanguage || !menuForm.siteTitle || !menuForm.menus.some(m => m.checked)"
            @click="handleCreateMenus"
          />
        </div>
      </div>

      <!-- Step 3: First Content -->
      <div :class="['step-card', { completed: status?.hasContent, disabled: !status?.hasMenus }]">
        <div class="step-header">
          <div class="step-number">3</div>
          <div class="step-info">
            <h3>First Content</h3>
            <p>Create your first page content</p>
          </div>
          <div v-if="status?.hasContent" class="step-check">
            <i class="pi pi-check-circle"></i>
          </div>
        </div>

        <div v-if="status?.hasContent" class="step-done">
          <i class="pi pi-check" style="color: #10b981;"></i>
          <span>{{ status.contentCount }} content pages created</span>
        </div>

        <div v-else class="step-body">
          <div class="form-row">
            <label>Menu Page</label>
            <Dropdown
              v-model="contentForm.menu_id"
              :options="status?.menus || []"
              optionLabel="item_name"
              optionValue="item_id"
              placeholder="Select a page"
              class="form-input"
            />
          </div>
          <div class="form-row">
            <label>Title</label>
            <InputText v-model="contentForm.title" placeholder="Page title" class="form-input" />
          </div>
          <div class="form-row">
            <label>Content</label>
            <Textarea
              v-model="contentForm.description"
              rows="6"
              placeholder="Write your page content here... (HTML is supported)"
              class="form-input"
            />
          </div>
          <Button
            label="Create Content"
            icon="pi pi-check"
            :loading="stepLoading === 3"
            :disabled="!contentForm.menu_id || !contentForm.title || !contentForm.description"
            @click="handleCreateContent"
          />
        </div>
      </div>

      <!-- All Done -->
      <div v-if="allDone" class="setup-complete">
        <div class="complete-icon">
          <i class="pi pi-check-circle" style="font-size: 3rem; color: #10b981;"></i>
        </div>
        <h2>Your website is ready!</h2>
        <p>All setup steps are complete. You can now view your website or continue customizing.</p>
        <div class="complete-actions">
          <NuxtLink to="/admin" class="p-button p-button-secondary">
            <span class="p-button-label">Back to Dashboard</span>
          </NuxtLink>
          <a :href="'http://'+domainName" target="_blank" class="p-button p-button-success">
            <span class="p-button-label">View Your Site</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

import { useSetup } from '~/composables/useSetup'
import { useAuthStore } from '~/stores/auth'
import { useDomainStore } from '~/stores/domain'

const domainStore = useDomainStore()
const { setupStatus: status, loading, fetchStatus, createLanguage, createMenus, updateSiteTitle, createContent } = useSetup()
const authStore = useAuthStore()

const stepLoading = ref<number | null>(null)

const flagOptions = [
  { label: 'ខ្មែរ (Khmer)', value: 0 },
  { label: 'English', value: 1 },
  { label: '中文 (Chinese)', value: 2 },
  { label: 'ไทย (Thai)', value: 3 },
  { label: 'Tiếng Việt (Vietnamese)', value: 4 },
]

const langForm = reactive({
  lang_name: '',
  flag: null as number | null,
})

const menuForm = reactive({
  siteTitle: '',
  menus: [
    { name: 'Home', checked: true },
    { name: 'About Us', checked: true },
    { name: 'Service', checked: true },
    { name: 'Contact Us', checked: true },
  ],
})

const contentForm = reactive({
  menu_id: null as number | null,
  title: '',
  description: '',
})

const allDone = computed(() =>
  status.value?.hasLanguage && status.value?.hasMenus && status.value?.hasContent
)
const domainName = computed(() => domainStore.domain?.domain_name || '')

onMounted(async () => {
  await fetchStatus()
  if (status.value?.menus?.length) {
    contentForm.menu_id = status.value.menus[0].item_id
    contentForm.title = status.value.menus[0].item_name
  }
})

const handleCreateLanguage = async () => {
  stepLoading.value = 1
  const ok = await createLanguage({ lang_name: langForm.lang_name, flag: langForm.flag! })
  if (ok) await fetchStatus()
  stepLoading.value = null
}

const handleCreateMenus = async () => {
  stepLoading.value = 2
  const langId = status.value?.language?.lang_id
  if (!langId) return

  await updateSiteTitle(menuForm.siteTitle)

  const items = menuForm.menus
    .filter(m => m.checked)
    .map(m => ({ item_name: m.name, lang_id: langId }))

  const created = await createMenus(items)

  if (created.length) {
    contentForm.menu_id = created[0].item_id
    contentForm.title = created[0].item_name
  }

  await fetchStatus()
  stepLoading.value = null
}

const handleCreateContent = async () => {
  stepLoading.value = 3
  const langId = status.value?.language?.lang_id
  if (!langId || !contentForm.menu_id) return

  await createContent({
    title: contentForm.title,
    description: contentForm.description,
    content_type: 0,
    lang_id: langId,
    menu_id: contentForm.menu_id,
  })

  await fetchStatus()
  stepLoading.value = null

  // Reset form for next content
  const nextMenu = status.value?.menus?.find(m => m.item_id !== contentForm.menu_id)
  if (nextMenu) {
    contentForm.menu_id = nextMenu.item_id
    contentForm.title = nextMenu.item_name
    contentForm.description = ''
  }
}
</script>

<style scoped>
.setup-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.setup-header {
  margin-bottom: 2rem;
}

.setup-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  color: #1f2937;
}

.setup-header p {
  margin: 0;
  color: #6b7280;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.setup-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.step-card.completed {
  border-color: #10b981;
}

.step-card.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.step-card.completed .step-number {
  background: #10b981;
}

.step-info {
  flex: 1;
}

.step-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1f2937;
}

.step-info p {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.step-check i {
  font-size: 1.5rem;
  color: #10b981;
}

.step-done {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  font-size: 0.9rem;
  color: #374151;
}

.step-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-row label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
}

.menu-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.menu-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-check label {
  cursor: pointer;
  font-weight: 400;
}

.setup-complete {
  text-align: center;
  padding: 3rem 1.5rem;
  background: white;
  border: 2px solid #10b981;
  border-radius: 12px;
}

.complete-icon {
  margin-bottom: 1rem;
}

.setup-complete h2 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.setup-complete p {
  margin: 0 0 1.5rem 0;
  color: #6b7280;
}

.complete-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.complete-actions a {
  text-decoration: none;
}
</style>
