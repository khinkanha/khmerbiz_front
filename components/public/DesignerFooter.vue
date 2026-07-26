<template>
  <footer v-if="footer" class="df">
    <div class="df-inner" :style="{ gridTemplateColumns: 'repeat(' + colCount + ', 1fr)' }">
      <div v-for="(col, ci) in footer.columns" :key="ci" class="df-col">
        <template v-for="(item, i) in col.items" :key="i">
          <!-- TEXT -->
          <p v-if="item.type === 'text'" class="df-text">{{ item.payload?.text }}</p>

          <!-- SOCIAL -->
          <div v-else-if="item.type === 'social'" class="df-social">
            <a v-for="s in socialMedia" :key="s.smid" :href="s.link" target="_blank" rel="noopener" class="df-social-link">
              <i :class="getSocialIcon(s.stype)" />
            </a>
          </div>

          <!-- MENU / quick links -->
          <ul v-else-if="item.type === 'menu'" class="df-links">
            <li v-for="m in menuTree" :key="m.item_id">
              <NuxtLink :to="`/pages/${domainId}/${m.item_id}`">{{ m.item_name }}</NuxtLink>
            </li>
          </ul>

          <!-- CONTACT -->
          <ul v-else-if="item.type === 'contact'" class="df-contact">
            <li v-if="item.payload?.phone"><i class="pi pi-phone" /> {{ item.payload.phone }}</li>
            <li v-if="item.payload?.email"><i class="pi pi-envelope" /> {{ item.payload.email }}</li>
            <li v-if="item.payload?.address"><i class="pi pi-map-marker" /> {{ item.payload.address }}</li>
          </ul>

          <!-- IMAGE / logo -->
          <img v-else-if="item.type === 'image' && item.payload?.url" class="df-image" :src="item.payload.url" :alt="item.payload?.alt || ''" />
        </template>
      </div>
    </div>
    <div class="df-bottom">
      <span>{{ settings?.title || domain?.domain_name || '' }}</span>
      <span v-if="settings?.footer" v-html="settings.footer" class="df-copy"></span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useDesignStore } from '~/stores/design'
import { useDomainStore } from '~/stores/domain'
import { defaultFooter } from '~/types/design'
import { getSocialIcon } from '~/types'
import type { FooterDesign } from '~/types'

const designStore = useDesignStore()
const domainStore = useDomainStore()

const settings = computed(() => domainStore.settings)
const domain = computed(() => domainStore.domain)
const menuTree = computed(() => domainStore.menuTree)
const socialMedia = computed(() => domainStore.socialMedia)
const domainId = computed(() => domainStore.domain?.domain_id)

const footer = computed<FooterDesign>(() => designStore.design?.footer ?? defaultFooter())
const colCount = computed(() => footer.value.columns.length || 1)
</script>

<style scoped>
.df {
  background-color: var(--footer-bg, #1f2937);
  color: var(--footer-text, #f3f4f6);
  margin-top: auto;
}
.df-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 16px 24px;
  display: grid;
  gap: 28px;
}
.df-col { display: flex; flex-direction: column; gap: 10px; }
.df-text { margin: 0; font-size: 13.5px; line-height: 1.7; opacity: .9; }
.df-social { display: flex; gap: 8px; }
.df-social-link {
  width: 34px; height: 34px; display: grid; place-items: center;
  border-radius: 50%; background: rgba(255,255,255,.1);
  color: #fff !important; text-decoration: none !important;
}
.df-social-link:hover { background: rgba(255,255,255,.2); }
.df-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
.df-links a { color: var(--footer-text, #cbd5e1) !important; text-decoration: none !important; font-size: 13.5px; }
.df-links a:hover { color: #fff !important; }
.df-contact { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; font-size: 13.5px; }
.df-contact li { display: flex; align-items: center; gap: 8px; opacity: .9; }
.df-contact i { color: var(--primary-color, #3b82f6); }
.df-image { max-height: 50px; width: auto; }
.df-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 16px;
  border-top: 1px solid rgba(255,255,255,.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12.5px;
  opacity: .8;
}
.df-copy :deep(a) { color: var(--primary-color, #93c5fd); }
@media (max-width: 768px) {
  .df-inner { grid-template-columns: 1fr !important; }
  .df-bottom { flex-direction: column; gap: 6px; }
}
</style>
