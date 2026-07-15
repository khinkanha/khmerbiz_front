<template>
  <section :class="['product-catalog', `lang-${currentLocale}`]">
    <h2 v-if="sectionTitle" class="section-title">{{ sectionTitle }}</h2>
    <div v-if="sectionDescription" class="section-description" v-html="sectionDescription"></div>

    <!-- Search and Filter Bar -->
    <div v-if="!loading && allProducts.length > 0" class="search-container">
      <div class="search-bar">
        <i class="pi pi-search search-icon"></i>
        <input
          :value="searchQuery"
          @input="handleSearchInput"
          :placeholder="$t('product.search.placeholder')"
          class="search-input"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="clear-search"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <button
        @click="showFilters = !showFilters"
        class="filter-button"
        :class="{ active: hasActiveFilters }"
      >
        <i class="pi pi-filter"></i>
        <span>{{ $t('product.filter.title') }}</span>
        <span v-if="appliedFilters.length" class="filter-badge">
          {{ appliedFilters.length }}
        </span>
      </button>
    </div>

    <!-- Applied Filters Tags -->
    <div v-if="appliedFilters.length" class="applied-filters">
      <div v-for="filter in appliedFilters" :key="filter.type" class="filter-tag">
        <span>{{ filter.label }}</span>
        <button @click="removeFilter(filter)" class="remove-filter">
          <i class="pi pi-times"></i>
        </button>
      </div>
      <button @click="resetFilters" class="reset-all">
        {{ $t('product.filter.clearAll') }}
      </button>
    </div>

    <!-- Filter Panel -->
    <div v-if="showFilters" class="filter-panel">
      <div class="filter-header">
        <h3>{{ $t('product.filter.title') }}</h3>
        <button @click="showFilters = false" class="close-btn">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- Price Range Filter -->
      <div class="filter-section">
        <h4>{{ $t('product.filter.priceRange') }}</h4>
        <div class="price-inputs">
          <div class="price-input">
            <label>{{ $t('product.filter.minPrice') }}</label>
            <input
              type="number"
              v-model.number="priceRange[0]"
              :min="filterMetadata.priceRange.min"
              :max="filterMetadata.priceRange.max"
              @change="currentPage = 1; applyFilters()"
            />
          </div>
          <span class="price-separator">-</span>
          <div class="price-input">
            <label>{{ $t('product.filter.maxPrice') }}</label>
            <input
              type="number"
              v-model.number="priceRange[1]"
              :min="filterMetadata.priceRange.min"
              :max="filterMetadata.priceRange.max"
              @change="currentPage = 1; applyFilters()"
            />
          </div>
        </div>
        <div class="price-display">
          {{ formatCurrency(priceRange[0]) }} - {{ formatCurrency(priceRange[1]) }}
        </div>
      </div>

      <!-- Currency Filter -->
      <div v-if="filterMetadata.currencies.length" class="filter-section">
        <h4>{{ $t('product.filter.currency') }}</h4>
        <div class="currency-options">
          <label
            v-for="currency in filterMetadata.currencies"
            :key="currency"
            class="currency-checkbox"
          >
            <input
              type="checkbox"
              :value="currency"
              :checked="selectedCurrencies.includes(currency)"
              @change="toggleCurrency(currency)"
            />
            <span>{{ currency }}</span>
          </label>
        </div>
      </div>

      <!-- Sort Options -->
      <div class="filter-section">
        <h4>{{ $t('product.filter.sortBy') }}</h4>
        <div class="sort-options">
          <button
            v-for="option in sortOptions"
            :key="option.value"
            @click="handleSortChange(option.value)"
            :class="['sort-btn', { active: sortBy === option.value }]"
          >
            {{ option.label }}
            <i v-if="sortBy === option.value"
               :class="sortOrder === 'asc' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"
            />
          </button>
        </div>
      </div>

      <!-- Filter Actions -->
      <div class="filter-footer">
        <div class="results-count">
          {{ products.length }} {{ $t('product.pagination.of') }} {{ filterMetadata.totalCount }} {{ $t('product.search.resultsCount', { count: filterMetadata.totalCount }) }}
        </div>
        <button @click="resetFilters" class="reset-btn">
          {{ $t('product.filter.resetAll') }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <ProgressSpinner />
    </div>

    <template v-else>
      <div v-if="products.length === 0 && allProducts.length === 0" class="empty-state">
        <i class="pi pi-shopping-bag"></i>
        <p>{{ $t('product.empty.noProducts') }}</p>
      </div>

      <div v-else-if="products.length === 0 && hasActiveFilters" class="empty-state">
        <i class="pi pi-search"></i>
        <p>{{ $t('product.search.noResults') }}</p>
        <p class="empty-hint">{{ $t('product.empty.tryAdjusting') }}</p>
        <button @click="resetFilters" class="reset-btn">
          {{ $t('product.empty.clearFilters') }}
        </button>
      </div>

      <div v-else class="product-grid">
        <NuxtLink v-for="product in products" :key="product.id" :to="`/products/${product.id}`" class="product-card">
          <div class="product-image" @click.prevent.stop="openProductLightbox(product)">
            <img v-if="product.photos && product.photos.length" :src="`${photoUrl}${product.photos[0]}`"
              :alt="product.name" />
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
              {{ formatPrice(product.price) }}&nbsp;<small v-if="product.currency"> {{ product.currency }}</small>
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
    <Dialog v-model:visible="showLightbox" :show-header="false" :style="{ width: '90vw', maxWidth: '900px' }"
      :modal="true" :dismissableMask="true" class="product-lightbox-dialog">
      <div v-if="currentProduct" class="lightbox-content">
        <Button icon="pi pi-arrow-left" rounded text severity="secondary" class="lightbox-nav lightbox-prev"
          @click="prevPhoto" :disabled="currentPhotoIndex === 0" v-tooltip.left="$t('product.lightbox.previousPhoto')" />
        <div class="lightbox-image-wrapper">
          <img :src="`${photoUrl}${currentProduct.photos[currentPhotoIndex]}`" :alt="currentProduct.name"
            class="lightbox-image"
            @pointerdown="onLightboxPointerDown"
            @pointerup="onLightboxPointerUp"
            @pointercancel="onLightboxPointerUp" />
          <div class="lightbox-info">
            <h3 class="lightbox-title">{{ currentProduct.name }}</h3>
            <span class="lightbox-counter">{{ currentPhotoIndex + 1 }} {{ $t('product.pagination.of') }} {{ currentProduct.photos.length }}</span>
          </div>
        </div>
        <Button icon="pi pi-arrow-right" rounded text severity="secondary" class="lightbox-nav lightbox-next"
          @click="nextPhoto" :disabled="currentPhotoIndex === currentProduct.photos.length - 1"
          v-tooltip.right="$t('product.lightbox.nextPhoto')" />
      </div>
      <template #footer>
        <Button icon="pi pi-times" rounded text severity="danger" :label="$t('product.lightbox.close')" @click="showLightbox = false" />
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
const api = useApi()
const { locale } = useI18n()

const loading = ref(false)
const allProducts = ref<any[]>([])  // Store all fetched products
const products = ref<any[]>([])  // Display products (filtered)
const currentPage = ref(1)
const totalPages = ref(1)

// Current locale for font switching
const currentLocale = computed(() => locale.value)

// Search & filter state
const searchQuery = ref('')
const priceRange = ref([0, 1000])
const selectedCurrencies = ref<string[]>([])
const sortBy = ref('priority')
const sortOrder = ref('desc')
const showFilters = ref(false)

// Lightbox state
const showLightbox = ref(false)
const currentProduct = ref<any>(null)
const currentPhotoIndex = ref(0)

// Computed: Filter metadata from all products
const filterMetadata = computed(() => {
  if (allProducts.value.length === 0) {
    return {
      priceRange: { min: 0, max: 1000 },
      currencies: [],
      totalCount: 0
    }
  }

  const prices = allProducts.value.map(p => p.price || 0).filter(p => p > 0)
  const currencies = [...new Set(allProducts.value.map(p => p.currency || 'USD'))]

  return {
    priceRange: {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 1000
    },
    currencies: currencies.sort(),
    totalCount: allProducts.value.length
  }
})

// Computed: Has active filters
const hasActiveFilters = computed(() => {
  return searchQuery.value ||
         priceRange.value[0] > filterMetadata.value.priceRange.min ||
         priceRange.value[1] < filterMetadata.value.priceRange.max ||
         selectedCurrencies.value.length > 0
})

// Computed: Applied filters for display
const appliedFilters = computed(() => {
  const filters = []
  if (searchQuery.value) {
    filters.push({ type: 'search', value: searchQuery.value, label: `${useNuxtApp().$i18n.t('product.filter.title')}: ${searchQuery.value}` })
  }
  if (priceRange.value[0] > filterMetadata.value.priceRange.min ||
      priceRange.value[1] < filterMetadata.value.priceRange.max) {
    filters.push({
      type: 'price',
      value: priceRange.value,
      label: `${formatCurrency(priceRange.value[0])} - ${formatCurrency(priceRange.value[1])}`
    })
  }
  if (selectedCurrencies.value.length > 0) {
    filters.push({
      type: 'currency',
      value: selectedCurrencies.value,
      label: selectedCurrencies.value.join(', ')
    })
  }
  return filters
})

// Computed: Sort options with translation
const sortOptions = computed(() => [
  { value: 'priority', label: useNuxtApp().$i18n.t('product.sort.featured') },
  { value: 'price', label: useNuxtApp().$i18n.t('product.sort.price') },
  { value: 'name', label: useNuxtApp().$i18n.t('product.sort.name') },
  { value: 'create_date', label: useNuxtApp().$i18n.t('product.sort.newest') }
])

// Debounce function
const debounce = (fn: Function, delay: number) => {
  let timeoutId: number | undefined
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Apply filters and return filtered products
const applyFilters = () => {
  let results = [...allProducts.value]

  // 1. Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    results = results.filter(product =>
      product.name.toLowerCase().includes(query)
    )
  }

  // 2. Price range filter
  const minPrice = priceRange.value[0] || 0
  const maxPrice = priceRange.value[1] || 10000
  results = results.filter(product => {
    const price = product.price || 0
    return price >= minPrice && price <= maxPrice
  })

  // 3. Currency filter
  if (selectedCurrencies.value.length > 0) {
    results = results.filter(product =>
      selectedCurrencies.value.includes(product.currency || 'USD')
    )
  }

  // 4. Sort
  results.sort((a, b) => {
    switch(sortBy.value) {
      case 'price':
        return sortOrder.value === 'asc'
          ? (a.price || 0) - (b.price || 0)
          : (b.price || 0) - (a.price || 0)
      case 'name':
        return sortOrder.value === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      case 'create_date':
        const dateA = a.create_date ? new Date(a.create_date).getTime() : 0
        const dateB = b.create_date ? new Date(b.create_date).getTime() : 0
        return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
      case 'priority':
      default:
        return sortOrder.value === 'asc'
          ? (a.priority || 0) - (b.priority || 0)
          : (b.priority || 0) - (a.priority || 0)
    }
  })

  // Update pagination
  const filteredTotal = results.length
  totalPages.value = Math.ceil(filteredTotal / 12) || 1

  // Ensure current page is valid
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }

  // Return paginated results
  const start = (currentPage.value - 1) * 12
  const end = start + 12
  products.value = results.slice(start, end)
}

// Debounced search
const debouncedSearch = debounce((query: string) => {
  searchQuery.value = query
  currentPage.value = 1
  applyFilters()
}, 300)

// Reset all filters
const resetFilters = () => {
  searchQuery.value = ''
  priceRange.value = [filterMetadata.value.priceRange.min, filterMetadata.value.priceRange.max]
  selectedCurrencies.value = []
  sortBy.value = 'priority'
  sortOrder.value = 'desc'
  currentPage.value = 1
  applyFilters()
}

// Remove individual filter
const removeFilter = (filter: any) => {
  switch(filter.type) {
    case 'search':
      searchQuery.value = ''
      break
    case 'price':
      priceRange.value = [filterMetadata.value.priceRange.min, filterMetadata.value.priceRange.max]
      break
    case 'currency':
      selectedCurrencies.value = []
      break
  }
  currentPage.value = 1
  applyFilters()
}

// Toggle currency selection
const toggleCurrency = (currency: string) => {
  const index = selectedCurrencies.value.indexOf(currency)
  if (index > -1) {
    selectedCurrencies.value.splice(index, 1)
  } else {
    selectedCurrencies.value.push(currency)
  }
  currentPage.value = 1
  applyFilters()
}

// Handle sort change
const handleSortChange = (sortField: string) => {
  if (sortBy.value === sortField) {
    // Toggle sort order if same field
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = sortField
    sortOrder.value = 'desc' // Default to descending for new field
  }
  currentPage.value = 1
  applyFilters()
}

// Handle search input
const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  debouncedSearch(target.value)
}

// Clear search
const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
  applyFilters()
}

// Handle page change
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    applyFilters()
  }
}

const fetchProducts = async () => {
  if (!props.contentId) return
  loading.value = true
  try {
    // Fetch all products from API
    let allItems = []
    let currentPageNum = 1
    let hasMore = true

    // Fetch all pages to get complete dataset for client-side filtering
    while (hasMore) {
      const response = await api.get<any>(`/site/list-products/${props.contentId}?page=${currentPageNum}`)

      if (response.success && response.data) {
        const data = response.data
        const items = data.items || []

        if (items.length > 0) {
          allItems = [...allItems, ...items.map(parseProduct)]
          currentPageNum++
        } else {
          hasMore = false
        }

        // Check if there are more pages
        if (data.pagination && currentPageNum > data.pagination.totalPages) {
          hasMore = false
        }
      } else {
        hasMore = false
      }
    }

    // Store all products for client-side filtering
    allProducts.value = allItems

    // Initialize filter metadata
    const prices = allItems.map(p => p.price || 0).filter(p => p > 0)
    if (prices.length > 0) {
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      priceRange.value = [minPrice, maxPrice]
    }

    // Apply initial filters
    applyFilters()

  } catch (e) {
    console.error('Failed to fetch products:', e)
    allProducts.value = []
    products.value = []
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

// Locale-aware currency formatting
const formatCurrency = (amount: number) => {
  if (!amount && amount !== 0) return '$0'

  const locale = currentLocale.value === 'kh' ? 'km-KH' :
                 currentLocale.value === 'ch' ? 'zh-CN' :
                 currentLocale.value === 'th' ? 'th-TH' :
                 currentLocale.value === 'vi' ? 'vi-VN' : 'en-US'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

const formatPrice = (price: number) => {
  if (!price && price !== 0) return '0'

  const locale = currentLocale.value === 'kh' ? 'km-KH' :
                 currentLocale.value === 'ch' ? 'zh-CN' :
                 currentLocale.value === 'th' ? 'th-TH' :
                 currentLocale.value === 'vi' ? 'vi-VN' : 'en-US'

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price)
}

// Lightbox functions
const openProductLightbox = (product: any, photoIndex: number = 0) => {
  if (product.photos && product.photos.length > 0) {
    currentProduct.value = product
    currentPhotoIndex.value = photoIndex
    showLightbox.value = true
  }
}

// Lightbox swipe state (touch + mouse drag via Pointer Events)
const lightboxSwipeStartX = ref<number | null>(null)

const onLightboxPointerDown = (e: PointerEvent) => {
  lightboxSwipeStartX.value = e.clientX
  ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
}

const onLightboxPointerUp = (e: PointerEvent) => {
  if (lightboxSwipeStartX.value === null) return
  const delta = e.clientX - lightboxSwipeStartX.value
  lightboxSwipeStartX.value = null
  if (Math.abs(delta) < 50) return  // ignore tiny / accidental moves
  if (delta < 0) nextPhoto()
  else prevPhoto()
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
const handleKeyboard = (e: KeyboardEvent) => {
  if (!showLightbox.value) return

  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault()
      nextPhoto()
      break
    case 'ArrowLeft':
      e.preventDefault()
      prevPhoto()
      break
    case 'Escape':
      e.preventDefault()
      showLightbox.value = false
      break
  }
}

onMounted(async () => {
  const pageParam = route.query.page as string
  if (pageParam) {
    const p = parseInt(pageParam, 10)
    if (p > 0) currentPage.value = p
  }
  await fetchProducts()

  // Add keyboard event listener for lightbox navigation
  window.addEventListener('keydown', handleKeyboard)
})

onUnmounted(() => {
  // Remove keyboard event listener
  window.removeEventListener('keydown', handleKeyboard)
})

watch(() => route.query.page, async (newPage) => {
  if (newPage) {
    const p = parseInt(newPage as string, 10)
    if (p > 0 && p !== currentPage.value) {
      currentPage.value = p
      applyFilters()
    }
  }
})
</script>

<style scoped>
.product-catalog {
  padding: 2rem 0;
}

/* Language-specific font classes */
.lang-kh {
  font-family: var(--font-battambang), 'Noto Sans Khmer', 'Battambang', sans-serif;
}

.lang-en {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.lang-zh {
  font-family: 'Noto Sans SC', 'Microsoft YaHei', 'SimHei', sans-serif;
}

.lang-th {
  font-family: 'Noto Sans Thai', 'Sarabun', 'Prompt', sans-serif;
}

.lang-vi {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

/* Search & Filter Styles */
.search-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-bar {
  flex: 1;
  min-width: 280px;
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-bar:focus-within {
  border-color: var(--primary-color, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  color: #a0aec0;
  font-size: 1rem;
  margin-right: 0.5rem;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  color: #1a202c;
}

.search-input::placeholder {
  color: #a0aec0;
}

.clear-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #a0aec0;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
}

.clear-search:hover {
  background: #e2e8f0;
  color: #4a5568;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.filter-button:hover {
  border-color: var(--primary-color, #3b82f6);
  color: var(--primary-color, #3b82f6);
}

.filter-button.active {
  background: var(--primary-color, #3b82f6);
  color: white;
  border-color: var(--primary-color, #3b82f6);
}

.filter-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  background: white;
  color: var(--primary-color, #3b82f6);
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0 4px;
}

.filter-button.active .filter-badge {
  background: rgba(255, 255, 255, 0.9);
}

/* Applied Filters */
.applied-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  align-items: center;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: #e2e8f0;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #4a5568;
  transition: all 0.2s;
}

.filter-tag:hover {
  background: #cbd5e0;
}

.remove-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  color: #718096;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
}

.remove-filter:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1a202c;
}

.reset-all {
  padding: 0.25rem 0.75rem;
  border: none;
  background: transparent;
  color: var(--primary-color, #3b82f6);
  cursor: pointer;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
}

.reset-all:hover {
  background: rgba(59, 130, 246, 0.1);
}

.empty-hint {
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0;
}

/* Filter Panel */
.filter-panel {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.filter-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  font-family: var(--font-battambang);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #a0aec0;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f7fafc;
  color: #4a5568;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.75rem 0;
  font-family: var(--font-battambang);
}

/* Price Inputs */
.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.price-input {
  flex: 1;
}

.price-input label {
  display: block;
  font-size: 0.75rem;
  color: #718096;
  margin-bottom: 0.25rem;
}

.price-input input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
}

.price-input input:focus {
  outline: none;
  border-color: var(--primary-color, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.price-separator {
  color: #a0aec0;
  font-weight: 500;
}

.price-display {
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
  text-align: center;
  padding: 0.5rem;
  background: #f7fafc;
  border-radius: 6px;
}

/* Currency Options */
.currency-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.currency-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.currency-checkbox:hover {
  background: #f7fafc;
}

.currency-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.currency-checkbox span {
  font-size: 0.9rem;
  color: #4a5568;
}

/* Sort Options */
.sort-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sort-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  text-align: left;
}

.sort-btn:hover {
  border-color: var(--primary-color, #3b82f6);
  color: var(--primary-color, #3b82f6);
}

.sort-btn.active {
  background: var(--primary-color, #3b82f6);
  color: white;
  border-color: var(--primary-color, #3b82f6);
}

/* Filter Footer */
.filter-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.results-count {
  font-size: 0.875rem;
  color: #718096;
}

.reset-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.reset-btn:hover {
  border-color: var(--primary-color, #3b82f6);
  color: var(--primary-color, #3b82f6);
}

/* Responsive Design */
@media (max-width: 768px) {
  /* Dense 4-per-row grid for mobile */
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  .product-card {
    border-radius: 6px;
  }

  .product-body {
    padding: 0.4rem;
  }

  /* Compact cards: image + name + price only */
  .product-shortdes,
  .product-features {
    display: none;
  }

  .product-name {
    font-size: 0.7rem;
    margin: 0 0 0.25rem 0;
  }

  .product-price {
    font-size: 0.8rem;
  }

  .photo-count {
    font-size: 0.6rem;
    padding: 1px 5px;
    bottom: 4px;
    right: 4px;
  }

  .search-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    min-width: auto;
  }

  .filter-button {
    width: 100%;
    justify-content: center;
  }

  .filter-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .filter-footer {
    padding-bottom: 2rem;
  }

  .applied-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-tag {
    justify-content: space-between;
  }

  .reset-all {
    width: 100%;
    text-align: center;
  }
}
</style>
