<template>
  <div class="designer-page">
    <div v-if="!sections.length" class="designer-empty">
      <i class="pi pi-palette" />
      <p>This page uses the Site Designer but has no sections yet.</p>
      <span>Add blocks in <strong>Admin → Designer → Build page</strong>.</span>
    </div>

    <template v-for="(slot, i) in sections" :key="i">
      <!-- Widget slot: same createWidgetHtml + blocks.css pipeline as in articles. -->
      <div v-if="slot.kind === 'widget'" class="designer-section" v-html="renderSlotHtml(slot)" />

      <!-- Content slot: bind to tenant content via the shared ContentRenderer.
           Resolution is per-language — contentSections reloads on lang switch. -->
      <div v-else-if="slot.kind === 'content'" class="designer-section">
        <ContentRenderer
          v-if="resolveContent(slot)"
          :content="resolveContent(slot)"
          :domain-id="domainId"
          :show-title="true"
        />
        <div v-else class="designer-placeholder">
          <i :class="slotMetaIcon(slot.contentType)" />
          <span>No {{ slotMetaLabel(slot.contentType) }} content yet.</span>
        </div>
      </div>

      <!-- Banner slot: render the tenant's banners (filtered to the active
           language, if any lang_id is present on the banner rows). -->
      <div v-else-if="slot.kind === 'banner'" class="designer-section">
        <BannerSlideshow v-if="langBanners.length" :banners="langBanners" />
        <div v-else class="designer-placeholder">
          <i class="pi pi-image" />
          <span>No banners published.</span>
        </div>
      </div>

      <!-- Social slot: render the tenant's social links. -->
      <div v-else-if="slot.kind === 'social'" class="designer-section">
        <div v-if="socialMedia.length" class="designer-social">
          <a
            v-for="s in socialMedia"
            :key="s.smid"
            :href="s.link"
            target="_blank"
            rel="noopener"
            class="designer-social-link"
          >
            <i :class="getSocialIcon(s.stype)" />
          </a>
        </div>
        <div v-else class="designer-placeholder">
          <i class="pi pi-share-alt" />
          <span>No social links configured.</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { renderSlotHtml, CONTENT_TYPE_META } from '~/utils/designerSections'
import { getSocialIcon } from '~/types'
import type { ContentSection, ContentSlot, SectionSlot } from '~/types'
import { useDomainStore } from '~/stores/domain'

const props = defineProps<{
  sections: readonly SectionSlot[]
  // Content sections resolved by the parent (pages/index.vue / the menu page
  // route), already in the active language. Used to satisfy `kind:'content'`.
  contentSections?: ContentSection[]
}>()

const domainStore = useDomainStore()
const config = useRuntimeConfig()

const domainId = computed(() => domainStore.domain?.domain_id ?? 0)
const socialMedia = computed(() => domainStore.socialMedia ?? [])

// Banners: prefer the active language, but fall back to all if none are tagged.
const langBanners = computed(() => {
  const all = domainStore.banners ?? []
  const langId = domainStore.currentLanguage?.lang_id
  if (!langId) return all
  const matching = all.filter((b) => b.lang_id === langId)
  return matching.length ? matching : all
})

/** Resolve a content slot to a ContentSection (or null).
 *  - If `menuId` is set: match by content.menu_id.
 *  - Else (auto): first content section matching the slot's contentType. */
const resolveContent = (slot: ContentSlot): ContentSection | null => {
  const list = props.contentSections ?? []
  if (slot.menuId !== undefined) {
    return list.find((cs) => cs.content?.menu_id === slot.menuId) ?? null
  }
  return list.find((cs) => cs.content?.content_type === slot.contentType) ?? null
}

const slotMetaLabel = (contentType: number): string =>
  CONTENT_TYPE_META[contentType]?.label ?? 'content'
const slotMetaIcon = (contentType: number): string =>
  CONTENT_TYPE_META[contentType]?.icon ?? 'pi pi-file'

// keep config referenced (photo URL may be used by child components via store)
void config
</script>

<style scoped>
.designer-page {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 8px 16px 40px;
}
.designer-section {
  width: 100%;
}
.designer-empty {
  text-align: center;
  padding: 90px 20px;
  color: #94a3b8;
}
.designer-empty i {
  font-size: 34px;
  display: block;
  margin-bottom: 12px;
}
.designer-empty p {
  margin: 0 0 4px;
  font-weight: 600;
  color: #475569;
}
.designer-empty span {
  font-size: 13px;
}
.designer-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 20px;
  border: 2px dashed var(--kb-border, #e2e8f0);
  border-radius: var(--kb-radius, 10px);
  color: #94a3b8;
  text-align: center;
}
.designer-placeholder i {
  font-size: 26px;
  color: #cbd5e1;
}
.designer-placeholder span {
  font-size: 13.5px;
}
.designer-social {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 0;
}
.designer-social-link {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--primary-color, #3b82f6);
  color: #fff !important;
  text-decoration: none !important;
  font-size: 17px;
}
.designer-social-link:hover {
  background: var(--primary-dark, #1d4ed8);
}
</style>
