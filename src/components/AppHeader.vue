<template>
  <div class="header-container">
    <div class="header-content">
      <div class="header-text">
        {{ config.headertext }}
      </div>
      <!-- Header Icon -->
      <RouterLink v-if="values.headerIcon?.link" :to="values.headerIcon.link">
        <img :src="values.headerIcon.iconSrc" :alt="values.headerIcon.altText" />
      </RouterLink>

      <!-- Navigation Buttons -->
      <div style="display: flex; gap: 10px">
        <RouterLink
          v-for="(button, index) in values.navButtons"
          :key="index"
          :to="button.buttonLink"
        >
          <Button :label="button.buttonText" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'

// Define props
defineProps({
  config: {
    type: Object,
    required: true,
  },
  values: {
    type: Object,
    required: true,
  },
})
</script>

<style>
.header-container {
  box-shadow: 0px 1px 4px 4px rgb(215, 214, 221);
  display: flex;
  flex-direction: column;
}

.header-text {
  color: var(--primary-color-dark);
  font-size: large;
  font-weight: 700;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
</style>
