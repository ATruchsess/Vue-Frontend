<script setup>
import AppCard from '@/components/AppCard.vue'
</script>

<template>
  <AppCard #content>
    <div class="content-card">
      <h1 class="text-focus">A simple application to demonstrate authentication</h1>
      <p>
        The application features a Vue.js frontend and a Node.js backend. It incorporates several
        best practices, including:
      </p>

      <div>
        <p class="text-element text-focus">
          Secure Authentication: Uses JWT with HTTP-only cookies to protect against XSS attacks.
        </p>
        <p class="text-element text-focus">
          API Documentation: Integrated Swagger for clear and interactive API exploration.
        </p>
        <p class="text-element text-focus">
          Flexible Database: Supports SQLite in memory or as a file-based database.
        </p>
        <p class="text-element text-focus">
          Comprehensive Testing: Employs Cypress for reliable end-to-end workflow validation.
        </p>
        <p class="text-element text-focus">
          Modern UI: Utilizes PrimeVue for a responsive and visually appealing frontend.
        </p>
      </div>
      <p>
        This setup provides a modern, secure, and maintainable foundation for user authentication
        workflows.
      </p>
    </div>
  </AppCard>
</template>

<style scoped>
.content-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 900px;
  padding: var(--default-padding);
  border: var(--border-card);
  border-radius: var(--default-border-radius);
  background: var(--primary-color-contrast);
}

.text-element {
  margin: 10px;
  margin-left: 0;
  padding: 10px;
  border-left: 4px solid var(--primary-color);
}

.text-focus {
  color: var(--primary-color);
  font-weight: 600;
}
</style>
