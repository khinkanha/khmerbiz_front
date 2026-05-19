<template>
  <div class="banner-slideshow">
    <Carousel :value="banners" :numVisible="1" :numScroll="1" :circular="true" :autoplayInterval="5000"
      class="banner-carousel">
      <template #item="{ data }">
        <div class="banner-slide">
          <a v-if="data.link" :href="data.link" target="_blank" rel="noopener noreferrer" class="banner-link">
            <img v-if="data.photo" :src="`${photoUrl}${data.photo}`" :alt="data.title || 'Banner'"
              class="banner-image" />
          </a>
          <img v-else-if="data.photo" :src="`${photoUrl}${data.photo}`" :alt="data.title || 'Banner'"
            class="banner-image" />
          <div v-if="data.title" class="banner-caption">
            <h2>{{ data.title }}</h2>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import type { Banner } from '~/types'

interface Props {
  banners: Banner[]
}

defineProps<Props>()

const config = useRuntimeConfig()
const photoUrl = config.public.photoUrl
</script>

<style scoped>
.banner-slideshow {
  width: 100%;
}

.banner-carousel {
  width: 100%;
}

.banner-carousel :deep(.p-carousel-content) {
  padding: 0;
}

.banner-carousel :deep(.p-carousel-item) {
  flex: none;
  width: 100%;
}

.banner-slide {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 30px;
}

.banner-link {
  display: block;
}

.banner-image {
  width: 100%;
  display: block;
}

.banner-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 3rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
  color: white;
}

.banner-caption h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  font-family: var(--font-battambang);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Carousel navigation dots/buttons */
.banner-carousel :deep(.p-carousel-indicators) {
  padding: 0.5rem;
  gap: 0.4rem;
}

.banner-carousel :deep(.p-carousel-indicator button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  transition: background-color 0.2s;
}

.banner-carousel :deep(.p-carousel-indicator.p-highlight button) {
  background-color: var(--primary-color, #3b82f6);
}

@media (max-width: 768px) {
  .banner-slide {
    border-radius: 12px;
  }

  .banner-caption {
    padding: 1.25rem 1.5rem;
  }

  .banner-caption h2 {
    font-size: 1rem;
  }
}
</style>
