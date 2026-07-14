<template>
  <div class="product-detail">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <ProgressSpinner />
      </div>

      <div v-else-if="product" class="product-layout">
        <!-- Photo gallery -->
        <div class="product-gallery">
          <div class="main-image">
            <img
              v-if="activePhoto"
              :src="`${photoUrl}${activePhoto}`"
              :alt="product.name"
            />
            <div v-else class="no-image">
              <i class="pi pi-image"></i>
            </div>
          </div>
          <div v-if="product.photos && product.photos.length > 1" class="thumbnails">
            <div
              v-for="(photo, idx) in product.photos"
              :key="idx"
              class="thumbnail"
              :class="{ active: activePhoto === photo }"
              @click="activePhoto = photo"
            >
              <img :src="`${photoUrl}${photo}`" :alt="`Photo ${idx + 1}`" />
            </div>
          </div>
        </div>

        <!-- Product info -->
        <div class="product-info">
          <h1 class="product-name">{{ product.name }}</h1>

          <div v-if="product.price !== undefined && product.price !== null" class="product-price">
            {{ formatPrice(product.price) }}<span v-if="product.currency" class="currency"> {{ product.currency }}</span>
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

          <NuxtLink
            v-if="product.content_id"
            :to="backLink"
            class="back-link"
          >
            <i class="pi pi-arrow-left"></i> Back to catalog
          </NuxtLink>
        </div>
      </div>

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

const activePhoto = ref<string>('')

watchEffect(() => {
  if (product.value?.photos?.length) {
    activePhoto.value = product.value.photos[0]
  }
})

const backLink = computed(() => {
  if (product.value?.content_id) {
    return `/pages/${route.params.domainId || 0}/${product.value.content_id}`
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

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-name {
    font-size: 0.9rem;
  }
}
</style>
