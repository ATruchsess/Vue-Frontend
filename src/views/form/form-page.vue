<script setup>
import FormRegisterComponent from './form-register-component.vue'
import FormLoginComponent from './form-login-component.vue'
import AppCard from '@/components/AppCard.vue'
</script>

<template>
  <AppCard #content>
    <div class="flex-box">
      <FormRegisterComponent />
      <FormLoginComponent />
    </div>
  </AppCard>
</template>

<style scoped>
.flex-box {
  display: flex;
  gap: 20px;
}
</style>
