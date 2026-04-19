<template>
  <div class="banner-slideshow">
    <Carousel :value="banners" :numVisible="1" :numScroll="1" :circular="true" :autoplayInterval="5000" class="banner-carousel">
      <template #item="{ data }">
        <div class="banner-slide">
          <img
            v-if="data.photo"
            :src="`${photoUrl}${data.photo}`"
            :alt="data.title || 'Banner'"
            class="banner-image"
          />
          <div v-if="data.title" class="banner-caption">
            <h2>{{ data.title }}</h2>
          </div>
        </div>
      </template>
      <template #item="{ item }">
        <div class="banner-slide">
          <img
            v-if="item.photo"
            :src="`${photoUrl}${item.photo}`"
            :alt="item.title || 'Banner'"
            class="banner-image"
          />
          <div v-if="item.title" class="banner-caption">
            <h2>{{ item.title }}</h2>
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
const photoUrl = config.public.photoUrl || 'https://khmer.biz'
</script>

<style scoped>
.banner-slideshow {
  width: 100%;
}

.banner-carousel {
  width: 100%;
}

.banner-slide {
  position: relative;
  aspect-ratio: 21/9;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.banner-caption h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  font-family: var(--font-battambang);
}

@media (max-width: 768px) {
  .banner-slide {
    aspect-ratio: 16/9;
  }

  .banner-caption h2 {
    font-size: 1.125rem;
  }
}
</style>
