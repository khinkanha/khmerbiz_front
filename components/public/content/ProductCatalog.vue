<template>
  <section class="product-catalog">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>
    <div v-if="sectionDescription" class="section-description" v-html="sectionDescription"></div>

    <div v-if="loading" class="loading-state">
      <ProgressSpinner />
    </div>

    <template v-else>
      <div v-if="products.length === 0" class="empty-state">
        <i class="pi pi-shopping-bag"></i>
        <p>No products available yet.</p>
      </div>

      <div v-else class="product-grid">
        <NuxtLink
          v-for="product in products"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="product-card"
        >
          <div class="product-image" @click="openProductLightbox(product)">
            <div
              v-if="product.photos && product.photos.length > 1"
              class="photo-thumbs"
            >
              <div
                v-for="(photo, idx) in product.photos.slice(0, 3)"
                :key="idx"
                class="photo-thumb"
                :style="getPhotoThumbStyle(product.photos, idx)"
                @click.stop="openProductLightbox(product, idx)"
              >
                <div v-if="idx === 2 && product.photos.length > 3" class="more-photos">
                  +{{ product.photos.length - 3 }}
                </div>
              </div>
            </div>
            <img
              v-else-if="product.photos && product.photos.length"
              :src="`${photoUrl}${product.photos[0]}`"
              :alt="product.name"
            />
            <div v-else class="product-placeholder">
              <i class="pi pi-image"></i>
            </div>
            <span v-if="product.photos && product.photos.length > 1" class="photo-count">
              <i class="pi pi-images"></i> {{ product.photos.length }}
            </span>
            <div class="image-overlay">
              <i class="pi pi-search"></i>
            </div>
          </div>
          <div class="product-body">
            <h4 class="product-name">{{ product.name }}</h4>
            <p v-if="product.shortdes" class="product-shortdes">{{ product.shortdes }}</p>
            <ul v-if="product.features && product.features.length" class="product-features">
              <li v-for="(feat, i) in product.features.slice(0, 3)" :key="i">{{ feat }}</li>
            </ul>
            <div v-if="product.price !== undefined && product.price !== null" class="product-price">
              {{ formatPrice(product.price) }}<small v-if="product.currency"> {{ product.currency }}</small>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination-controls">
        <button class="pagination-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
          <i class="pi pi-angle-left"></i>
        </button>
        <span class="pagination-info">{{ currentPage }} / {{ totalPages }}</span>
        <button class="pagination-btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
          <i class="pi pi-angle-right"></i>
        </button>
      </div>
    </template>

    <!-- Product Lightbox -->
    <Dialog
      v-model:visible="showLightbox"
      :show-header="false"
      :style="{ width: '90vw', maxWidth: '900px' }"
      :modal="true"
      :dismissableMask="true"
      class="product-lightbox-dialog"
    >
      <div v-if="currentProduct" class="lightbox-content">
        <Button
          icon="pi pi-arrow-left"
          rounded
          text
          severity="secondary"
          class="lightbox-nav lightbox-prev"
          @click="prevPhoto"
          :disabled="currentPhotoIndex === 0"
          v-tooltip.left="'Previous photo'"
        />
        <div class="lightbox-image-wrapper">
          <img
            :src="`${photoUrl}${currentProduct.photos[currentPhotoIndex]}`"
            :alt="currentProduct.name"
            class="lightbox-image"
          />
          <div class="lightbox-info">
            <h3 class="lightbox-title">{{ currentProduct.name }}</h3>
            <span class="lightbox-counter">{{ currentPhotoIndex + 1 }} / {{ currentProduct.photos.length }}</span>
          </div>
        </div>
        <Button
          icon="pi pi-arrow-right"
          rounded
          text
          severity="secondary"
          class="lightbox-nav lightbox-next"
          @click="nextPhoto"
          :disabled="currentPhotoIndex === currentProduct.photos.length - 1"
          v-tooltip.right="'Next photo'"
        />
      </div>
      <template #footer>
        <Button
          icon="pi pi-times"
          rounded
          text
          severity="danger"
          label="Close"
          @click="showLightbox = false"
        />
      </template>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
interface Props {
  contentId: number
  sectionTitle?: string
  sectionDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: '',
  sectionDescription: '',
})

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl
const route = useRoute()
const router = useRouter()
const api = useApi()
const { onKeyStroke } = useEvent()

const loading = ref(false)
const products = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(1)

// Lightbox state
const showLightbox = ref(false)
const currentProduct = ref<any>(null)
const currentPhotoIndex = ref(0)

const fetchProducts = async (page: number = 1) => {
  if (!props.contentId) return
  loading.value = true
  try {
    const response = await api.get<any>(`/site/list-products/${props.contentId}?page=${page}`)
    if (response.success && response.data) {
      const data = response.data
      const items = data.items || []
      products.value = Array.isArray(items) ? items.map(parseProduct) : []
      if (data.pagination) {
        totalPages.value = data.pagination.totalPages || 1
      }
    }
  } catch (e) {
    console.error('Failed to fetch products:', e)
  } finally {
    loading.value = false
  }
}

const parseProduct = (raw: any) => {
  let parsed: any = {}
  if (raw.description && typeof raw.description === 'string') {
    try {
      parsed = JSON.parse(raw.description)
    } catch (e) {
      console.warn('Failed to parse product description:', raw.description)
    }
  }
  return {
    ...raw,
    name: parsed.name || raw.name || 'Unnamed Product',
    price: parsed.price,
    currency: parsed.currency || 'USD',
    shortdes: parsed.shortdes || raw.shortdes || '',
    longdes: parsed.longdes || raw.longdes || '',
    features: Array.isArray(parsed.features) ? parsed.features : [],
    photos: Array.isArray(parsed.photos) ? parsed.photos : [],
  }
}

const formatPrice = (price: number) => {
  return Number(price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

const goToPage = async (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    router.push({ query: { ...route.query, page: String(page) } })
    await fetchProducts(page)
  }
}

// Lightbox functions
const openProductLightbox = (product: any, photoIndex: number = 0) => {
  if (product.photos && product.photos.length > 0) {
    currentProduct.value = product
    currentPhotoIndex.value = photoIndex
    showLightbox.value = true
  }
}

const getPhotoThumbStyle = (photos: string[], index: number) => {
  // Inset objects (not strings) so they spread correctly into the style binding.
  const positions = [
    { top: '0', left: '0', right: '50%', bottom: '50%' },
    { top: '0', left: '50%', right: '0', bottom: '50%' },
    { top: '50%', left: '0', right: '0', bottom: '0' },
  ]
  const background = photos[index] ? `url(${photoUrl}${photos[index]})` : 'none'
  return {
    background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), ${background}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    ...positions[index % 3],
  }
}

const nextPhoto = () => {
  if (currentProduct.value && currentPhotoIndex.value < currentProduct.value.photos.length - 1) {
    currentPhotoIndex.value++
  }
}

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  }
}

// Handle keyboard navigation in lightbox
onKeyStroke('ArrowRight', (e: KeyboardEvent) => {
  if (showLightbox.value) {
    e.preventDefault()
    nextPhoto()
  }
})

onKeyStroke('ArrowLeft', (e: KeyboardEvent) => {
  if (showLightbox.value) {
    e.preventDefault()
    prevPhoto()
  }
})

onKeyStroke('Escape', (e: KeyboardEvent) => {
  if (showLightbox.value) {
    e.preventDefault()
    showLightbox.value = false
  }
})

onMounted(async () => {
  const pageParam = route.query.page as string
  if (pageParam) {
    const p = parseInt(pageParam, 10)
    if (p > 0) currentPage.value = p
  }
  await fetchProducts(currentPage.value)
})

watch(() => route.query.page, async (newPage) => {
  if (newPage) {
    const p = parseInt(newPage as string, 10)
    if (p > 0 && p !== currentPage.value) {
      currentPage.value = p
      await fetchProducts(p)
    }
  }
})
</script>

<style scoped>
.product-catalog {
  padding: 2rem 0;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-family: var(--font-battambang);
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 0;
  color: #a0aec0;
}

.empty-state i {
  font-size: 3rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s, transform 0.3s;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}

.product-image {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f7fafc;
  cursor: pointer;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

/* Photo thumbnails grid */
.photo-thumbs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
}

.photo-thumb {
  position: absolute;
  background: #f7fafc;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid white;
  transition: all 0.3s;
}

.photo-thumb:hover {
  z-index: 10;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.more-photos {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.product-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
  font-size: 3rem;
}

.photo-count {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 1;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
  z-index: 2;
}

.image-overlay i {
  color: white;
  font-size: 2rem;
}

.product-image:hover .image-overlay {
  opacity: 1;
}

/* Lightbox styles */
:deep(.product-lightbox-dialog) {
  background: transparent;
  box-shadow: none;
}

:deep(.product-lightbox-dialog .p-dialog-content) {
  background: transparent;
  border: none;
  padding: 0;
}

.lightbox-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  min-height: 60vh;
}

.lightbox-image-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.lightbox-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  min-width: 200px;
}

.lightbox-title {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

.lightbox-counter {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.lightbox-prev {
  left: 1rem;
}

.lightbox-next {
  right: 1rem;
}

.lightbox-nav:hover:not(:disabled) {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.product-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.4rem 0;
  font-family: var(--font-battambang);
  line-height: 1.4;
}

.product-card:hover .product-name {
  color: var(--primary-color, #3b82f6);
}

.product-shortdes {
  font-size: 1rem;
  color: #718096;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-features {
  margin: 0 0 0.5rem 0;
  padding-left: 1.1rem;
  font-size: 0.8rem;
  color: #4a5568;
  line-height: 1.4;
}

.product-features li {
  display: list-item;
}

.product-price {
  margin-top: auto;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color, #3b82f6);
}

.product-price small {
  font-size: 0.7rem;
  font-weight: 500;
  color: #718096;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #4a5568;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--primary-color, #3b82f6);
  color: #fff;
  border-color: var(--primary-color, #3b82f6);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.875rem;
  color: #4a5568;
  padding: 0 0.75rem;
  font-weight: 500;
  min-width: 60px;
  text-align: center;
}
</style>
