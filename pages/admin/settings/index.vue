<template>
  <div>
    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label>{{ $t('settings.websiteTitle') }}</label>
        <input type="text" v-model="form.title" class="form-control" :placeholder="$t('settings.websiteTitle')" />
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.backgroundImage') }}</label>
            <input type="file" accept="image/*" @change="handleBgSelect" class="form-control" />
            <div v-if="bgPreview" style="margin-top:5px">
              <img :src="bgPreview" style="max-height:80px" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.screenMode') }}</label>
            <select v-model="form.s_mode" class="form-control">
              <option value="1">Full Screen</option>
              <option value="2">Medium</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Footer (Normal Text / HTML Code)</label>
            <textarea v-model="form.footer" class="form-control" rows="3" placeholder="Website Footer"></textarea>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.footerAlignment') }}</label>
            <select v-model="form.footer_align" class="form-control">
              <option value="1">Left</option>
              <option value="2">Center</option>
              <option value="3">Right</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.themeStyle') }}</label>
            <select v-model="form.theme" class="form-control">
              <option value="0">Default</option>
              <option value="1">Dark</option>
              <option value="2">Red</option>
              <option value="3">Green</option>
              <option value="4">Purple</option>
              <option value="5">Yellow</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>{{ $t('settings.googleAnalytics') }}</label>
            <input type="text" v-model="form.tracking_id" class="form-control" :placeholder="$t('settings.googleAnalytics')" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('settings.widgetChat') }}</label>
        <textarea v-model="form.chat_script" class="form-control" rows="3" placeholder="Widget Chat"></textarea>
      </div>

      <!-- Template Picker -->
      <div class="form-group">
        <label class="tpl-label">Choose Template Style</label>
        <div class="template-picker">
          <div
            v-for="tpl in templates"
            :key="tpl.id"
            class="tpl-card"
            :class="{ selected: form.page_style == tpl.id }"
            @click="form.page_style = tpl.id"
          >
            <div class="tpl-bar" :style="{ background: tpl.color }"></div>
            <div class="tpl-preview" v-html="tpl.preview"></div>
            <div class="tpl-meta">
              <div class="tpl-name">{{ tpl.name }}</div>
              <div class="tpl-desc">{{ tpl.desc }}</div>
            </div>
            <div class="tpl-chk"><i class="fa fa-check"></i></div>
          </div>
        </div>
      </div>

      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <button type="submit" class="btn btn-danger" :disabled="saving">
        <i class="fa fa-floppy-o"></i> {{ $t('settings.save') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

import { useSettingStore } from '~/stores/setting'

const settingStore = useSettingStore()
const { t } = useI18n()
const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const form = ref({
  title: '',
  page_style: 0,
  theme: 0,
  tracking_id: '',
  chat_script: '',
  footer: '',
  footer_align: '1',
  s_mode: '1',
  background: '',
})

const bgPreview = ref('')
const bgFile = ref<File | null>(null)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const templates = [
  {
    id: 0, name: 'Classic Multi-Page', color: '#555', desc: 'Traditional multi-page with navbar',
    preview: '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;height:20px;background:#555"><div style="width:28px;height:7px;border-radius:2px;background:rgba(255,255,255,.5)"></div><div><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b></div></div><div style="padding:4px 10px"><div style="width:100%;height:24px;background:linear-gradient(135deg,#ddd,#ccc);border-radius:3px"></div></div><div style="padding:6px 10px"><div style="width:45%;height:5px;background:#555;border-radius:2px;margin-bottom:4px"></div><div style="width:100%;height:3px;background:#e0e0e0;border-radius:1px;margin-bottom:3px"></div><div style="display:flex;gap:4px;margin-top:5px"><div style="flex:1;height:28px;background:#f5f5f5;border-radius:3px;border:1px solid #eee"></div><div style="flex:1;height:28px;background:#f5f5f5;border-radius:3px;border:1px solid #eee"></div><div style="flex:1;height:28px;background:#f5f5f5;border-radius:3px;border:1px solid #eee"></div></div></div>'
  },
  {
    id: 1, name: 'Scrolling Single-Page', color: '#e94560', desc: 'Scrolling sections on one page',
    preview: '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;height:20px;background:#16213e"><div style="width:28px;height:7px;border-radius:2px;background:rgba(255,255,255,.5)"></div><div><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b></div></div><div style="height:50px;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="width:45%;height:4px;background:rgba(255,255,255,.7);border-radius:2px;margin-bottom:3px"></div><div style="width:30%;height:4px;background:rgba(255,255,255,.5);border-radius:2px"></div></div>'
  },
  {
    id: 2, name: 'Magazine/News Grid', color: '#e94560', desc: 'Card grid layout with sidebar',
    preview: '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;height:20px;background:#1a1a2e"><div style="width:28px;height:7px;border-radius:2px;background:rgba(255,255,255,.5)"></div><div><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b></div></div><div style="display:flex;padding:5px 10px;gap:5px"><div style="flex:1"><div style="width:100%;height:32px;background:linear-gradient(135deg,#e94560,#c0392b);border-radius:4px;margin-bottom:3px"></div><div style="width:55%;height:4px;background:#555;border-radius:1px"></div></div><div style="width:50px;border-left:1px solid #eee;padding-left:5px"><div style="width:100%;height:3px;background:#999;border-radius:1px;margin-bottom:5px"></div><div style="width:100%;height:2px;background:#e8e8e8;border-radius:1px;margin-bottom:6px"></div><div style="width:100%;height:2px;background:#e8e8e8;border-radius:1px"></div></div></div>'
  },
  {
    id: 3, name: 'Fullscreen Hero', color: '#764ba2', desc: 'Full-screen hero with sections',
    preview: '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;height:20px;background:rgba(0,0,0,.35)"><div style="width:28px;height:7px;border-radius:2px;background:rgba(255,255,255,.5)"></div><div><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b><b style="display:inline-block;width:16px;height:3px;background:rgba(255,255,255,.35);margin-left:3px"></b></div></div><div style="height:60px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="width:20px;height:20px;border-radius:50%;border:2px solid rgba(255,255,255,.8);margin-bottom:5px"></div><div style="width:55%;height:4px;background:rgba(255,255,255,.7);border-radius:2px;margin-bottom:3px"></div><div style="width:30%;height:4px;background:rgba(255,255,255,.5);border-radius:2px"></div></div>'
  },
]

const handleBgSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    bgFile.value = file
    bgPreview.value = URL.createObjectURL(file)
  }
}

const handleSave = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  saving.value = true
  try {
    const data: any = { ...form.value }
    if (bgFile.value) data.background = bgFile.value
    const success = await settingStore.updateSettings(data)
    if (success) {
      successMessage.value = t('common.success')
      setTimeout(() => { successMessage.value = '' }, 3000)
    } else {
      errorMessage.value = t('common.error')
    }
  } catch (error: any) {
    errorMessage.value = error.message || t('common.error')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await settingStore.fetchSettings()
  if (settingStore.settings) {
    const s = settingStore.settings
    form.value = {
      title: s.title || '',
      page_style: s.page_style || 0,
      theme: s.theme || 0,
      tracking_id: s.tracking_id || '',
      chat_script: s.chat_script || '',
      footer: s.footer || '',
      footer_align: String(s.footer_align || 1),
      s_mode: String(s.s_mode || 1),
      background: s.background || '',
    }
    if (s.background) bgPreview.value = `${photoUrl}${s.background}`
  }
})
</script>

<style scoped>
.template-picker {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 10px;
}

.tpl-card {
  position: relative;
  border: 2px solid #e4e4e4;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  background: #fff;
  transition: all .3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.tpl-card:hover {
  border-color: #aaa;
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.tpl-card.selected {
  border-color: #337ab7;
  box-shadow: 0 6px 24px rgba(51, 122, 183, 0.25);
}

.tpl-bar {
  height: 3px;
  opacity: .3;
  transition: all .3s;
}

.tpl-card.selected .tpl-bar,
.tpl-card:hover .tpl-bar {
  opacity: 1;
  height: 4px;
}

.tpl-chk {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  background: #337ab7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 11px;
  opacity: 0;
  transform: scale(.3);
  transition: all .3s;
}

.tpl-card.selected .tpl-chk {
  opacity: 1;
  transform: scale(1);
}

.tpl-preview {
  height: 130px;
  overflow: hidden;
  background: #fff;
}

.tpl-meta {
  padding: 10px 12px;
  border-top: 1px solid #f0f0f0;
  transition: all .3s;
}

.tpl-card.selected .tpl-meta {
  background: linear-gradient(135deg, #337ab7, #286090);
  border-top-color: transparent;
}

.tpl-name {
  font-size: 12px;
  font-weight: 700;
  color: #222;
}

.tpl-card.selected .tpl-name {
  color: #fff;
}

.tpl-desc {
  font-size: 10px;
  color: #999;
  margin-top: 2px;
}

.tpl-card.selected .tpl-desc {
  color: rgba(255, 255, 255, .7);
}

@media (max-width: 768px) {
  .template-picker {
    grid-template-columns: 1fr;
  }
}
</style>
