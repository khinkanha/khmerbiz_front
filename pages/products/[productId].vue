<template>
  <div class="product-detail">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <ProgressSpinner />
      </div>

      <template v-else-if="product">
      <div class="product-layout">
        <!-- Photo gallery -->
        <div class="product-gallery">
          <div class="main-image">
            <img
              v-if="activePhoto"
              :src="`${photoUrl}${activePhoto}`"
              :alt="product.name"
              @pointerdown="onPointerDown"
              @pointerup="onPointerUp"
              @pointercancel="onPointerUp"
            />
            <div v-else class="no-image">
              <i class="pi pi-image"></i>
            </div>
            <Button
              v-if="(product.photos?.length || 0) > 1"
              icon="pi pi-chevron-left"
              class="gallery-nav gallery-prev"
              severity="secondary"
              rounded
              text
              :disabled="activePhotoIndex === 0"
              :aria-label="$t('product.lightbox.previousPhoto')"
              @click="prevPhoto"
            />
            <Button
              v-if="(product.photos?.length || 0) > 1"
              icon="pi pi-chevron-right"
              class="gallery-nav gallery-next"
              severity="secondary"
              rounded
              text
              :disabled="activePhotoIndex === (product.photos?.length || 0) - 1"
              :aria-label="$t('product.lightbox.nextPhoto')"
              @click="nextPhoto"
            />
            <span v-if="(product.photos?.length || 0) > 1" class="gallery-counter">
              {{ activePhotoIndex + 1 }} / {{ product.photos.length }}
            </span>
          </div>
          <div v-if="product.photos && product.photos.length > 1" class="thumbnails">
            <div
              v-for="(photo, idx) in product.photos"
              :key="idx"
              class="thumbnail"
              :class="{ active: activePhotoIndex === idx }"
              @click="goToPhoto(Number(idx))"
            >
              <img :src="`${photoUrl}${photo}`" :alt="`Photo ${Number(idx) + 1}`" />
            </div>
          </div>
        </div>

        <!-- Product info -->
        <div class="product-info">
          <h1 class="product-name">{{ product.name }}</h1>

          <div v-if="product.price !== undefined && product.price !== null" class="product-price">
            {{ formatPrice(product.price) }}&nbsp;<span v-if="product.currency" class="currency"> {{ product.currency }}</span>
          </div>

          <p v-if="product.shortdes" class="product-shortdes">{{ product.shortdes }}</p>

          <div v-if="product.features && product.features.length" class="features-section">
            <h3 class="features-title">Features</h3>
            <ul class="features-list">
              <li v-for="(feat, i) in product.features" :key="i">
                <i class="pi pi-check-circle"></i> {{ feat }}
              </li>
            </ul>
          </div>

          <div v-if="product.longdes" class="product-description" v-html="product.longdes"></div>

          <!--<NuxtLink
            v-if="product.content_id"
            :to="backLink"
            class="back-link"
          >
            <i class="pi pi-arrow-left"></i> Back to catalog
          </NuxtLink> -->
        </div>
      </div>

      <!-- Related products carousel -->
      <section v-if="relatedProducts.length || relatedLoading" class="related-products">
        <ProgressSpinner v-if="relatedLoading && !relatedProducts.length" class="related-loading" />
        <Carousel
          v-if="relatedProducts.length"
          :value="relatedProducts"
          :numVisible="4"
          :numScroll="1"
          :circular="relatedProducts.length >= 8"
          :responsiveOptions="responsiveOptions"
          class="related-carousel"
        >
          <template #header>
            <h2 class="related-title">{{ $t('product.related.title') }}</h2>
          </template>
          <template #item="slotProps">
            <NuxtLink :to="`/products/${slotProps.data.id}`" class="related-card">
              <div class="related-image">
                <img
                  v-if="slotProps.data.photos && slotProps.data.photos.length"
                  :src="`${photoUrl}${slotProps.data.photos[0]}`"
                  :alt="slotProps.data.name"
                />
                <div v-else class="related-placeholder">
                  <i class="pi pi-image"></i>
                </div>
              </div>
              <div class="related-info">
                <h4 class="related-name">{{ slotProps.data.name }}</h4>
                <div
                  v-if="slotProps.data.price !== undefined && slotProps.data.price !== null"
                  class="related-price"
                >
                  {{ formatPrice(slotProps.data.price) }}&nbsp;<small v-if="slotProps.data.currency"> {{ slotProps.data.currency }}</small>
                </div>
              </div>
            </NuxtLink>
          </template>
        </Carousel>
      </section>
      </template>

      <div v-else class="empty-state">
        <i class="pi pi-exclamation-circle"></i>
        <p>Product not found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const config = useRuntimeConfig()
const { public: { apiBaseUrl } } = config
const photoUrl = config.public.photoUrl || 'https://khmer.biz'

const productId = route.params.productId as string

const parseProduct = (raw: any) => {
  let parsed: any = {}
  if (raw?.description && typeof raw.description === 'string') {
    try { parsed = JSON.parse(raw.description) } catch {}
  }
  return {
    ...raw,
    name: parsed.name || raw?.name || '',
    price: parsed.price,
    currency: parsed.currency,
    shortdes: parsed.shortdes || '',
    longdes: parsed.longdes || '',
    features: Array.isArray(parsed.features) ? parsed.features : [],
    photos: Array.isArray(parsed.photos) ? parsed.photos : [],
  }
}

const { data: product, pending: loading } = await useAsyncData(`product-${productId}`, async () => {
  try {
    const res = await $fetch<any>(`${apiBaseUrl}/site/products/${productId}`)
    if (res?.status !== false && res?.data) return parseProduct(res.data)
  } catch (e) {
    console.error('Failed to fetch product:', e)
  }
  return null
})

const activePhotoIndex = ref(0)

const activePhoto = computed(() => product.value?.photos?.[activePhotoIndex.value] || '')

const prevPhoto = () => {
  if (activePhotoIndex.value > 0) activePhotoIndex.value--
}

const nextPhoto = () => {
  const len = product.value?.photos?.length || 0
  if (activePhotoIndex.value < len - 1) activePhotoIndex.value++
}

const goToPhoto = (idx: number) => {
  activePhotoIndex.value = idx
}

// Keyboard navigation: ArrowLeft / ArrowRight
const handleKeydown = (e: KeyboardEvent) => {
  const tag = (e.target as HTMLElement)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prevPhoto()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    nextPhoto()
  }
}

// Swipe / drag via Pointer Events (touch + mouse)
const swipeStartX = ref<number | null>(null)

const onPointerDown = (e: PointerEvent) => {
  swipeStartX.value = e.clientX
  ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
}

const onPointerUp = (e: PointerEvent) => {
  if (swipeStartX.value === null) return
  const delta = e.clientX - swipeStartX.value
  swipeStartX.value = null
  if (Math.abs(delta) < 50) return  // ignore tiny / accidental moves
  if (delta < 0) nextPhoto()
  else prevPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Related products (same catalog/content_id, excluding current) — client-only,
// not SEO-critical. Mirrors the relatedNews pattern in pages/news/[newsId].vue.
const relatedProducts = ref<any[]>([])
const relatedLoading = ref(false)

const responsiveOptions = ref([
  { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
  { breakpoint: '1100px', numVisible: 3, numScroll: 1 },
  { breakpoint: '768px', numVisible: 2, numScroll: 1 },
  { breakpoint: '560px', numVisible: 2, numScroll: 1 },
])

onMounted(async () => {
  const contentId = product.value?.content_id
  if (!contentId) return
  relatedLoading.value = true
  try {
    const collected: any[] = []
    // Fetch up to 2 pages (~20 raw items), exclude the current product, cap at 20.
    for (let page = 1; page <= 2 && collected.length < 20; page++) {
      const res = await $fetch<any>(`${apiBaseUrl}/site/list-products/${contentId}?page=${page}`)
      if (!res || res.status === false || !res.data) break
      const items = res.data.items || res.data
      if (!Array.isArray(items) || items.length === 0) break
      for (const raw of items) {
        const parsed = parseProduct(raw)
        if (String(parsed.id) !== String(productId)) collected.push(parsed)
        if (collected.length >= 20) break
      }
      const totalPages = res.data.pagination?.totalPages
      if (totalPages && page >= totalPages) break
    }
    relatedProducts.value = collected.slice(0, 20)
  } catch {
    // silently fail — related section is optional
  } finally {
    relatedLoading.value = false
  }
})

const backLink = computed(() => {
  if (product.value?.content_id) {
    return `/#section-${product.value.content_id}`
  }
  return '/'
})

const formatPrice = (price: number) => {
  return Number(price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

// SEO
useHead(() => ({
  title: product.value?.name || 'Product',
  meta: product.value?.shortdes
    ? [{ name: 'description', content: product.value.shortdes }]
    : [],
}))
</script>

<style scoped>
.product-detail {
  min-height: 60vh;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  padding: 2rem 0;
}

/* ---- Gallery ---- */
.main-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: grab;
  touch-action: pan-y;
}

/* Prev / next arrows */
.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gallery-nav:hover:not(:disabled) {
  background: #fff;
}

.gallery-nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.gallery-prev {
  left: 0.5rem;
}

.gallery-next {
  right: 0.5rem;
}

.gallery-counter {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 5;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  font-size: 4rem;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.thumbnail {
  width: 72px;
  height: 72px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail.active {
  border-color: var(--primary-color, #3b82f6);
}

.thumbnail:hover {
  border-color: var(--primary-color, #3b82f6);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---- Info ---- */
.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.75rem 0;
  font-family: var(--font-battambang);
  line-height: 1.4;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color, #3b82f6);
  margin-bottom: 1rem;
}

.product-price .currency {
  font-size: 0.875rem;
  font-weight: 500;
  color: #718096;
}

.product-shortdes {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.features-section {
  margin-bottom: 1.5rem;
}

.features-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.75rem 0;
  font-family: var(--font-battambang);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #4a5568;
}

.features-list i {
  color: var(--primary-color, #3b82f6);
  font-size: 0.9rem;
}

.product-description {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.product-description :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--primary-color, #3b82f6);
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: auto;
  padding-top: 1.5rem;
}

.back-link:hover {
  text-decoration: underline;
}

/* ---- Loading / Empty ---- */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 4rem 0;
  color: #718096;
}

.empty-state i {
  font-size: 2.5rem;
}

/* ---- Related products carousel ---- */
.related-products {
  margin: 2.5rem 0;
}

.related-loading {
  display: flex;
  margin: 0 auto;
}

.related-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem 0;
  font-family: var(--font-battambang);
}

.related-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  margin: 0 0.5rem;
  height: 100%;
  transition: box-shadow 0.3s, transform 0.3s;
}

.related-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}

.related-image {
  width: 100%;
  aspect-ratio: 4/3;
  background: #f7fafc;
  overflow: hidden;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.related-card:hover .related-image img {
  transform: scale(1.05);
}

.related-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  font-size: 2.5rem;
}

.related-info {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.related-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  font-family: var(--font-battambang);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-card:hover .related-name {
  color: var(--primary-color, #3b82f6);
}

.related-price {
  margin-top: auto;
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-color, #3b82f6);
}

.related-price small {
  font-size: 0.7rem;
  font-weight: 500;
  color: #718096;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-name {
    font-size: 0.9rem;
  }

  /* Compact related-product cards in the carousel */
  .related-info {
    padding: 0.4rem;
    gap: 0.25rem;
  }

  .related-name {
    font-size: 0.75rem;
  }

  .related-price {
    font-size: 0.85rem;
  }
}
</style>
