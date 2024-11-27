<script setup>
import { ref } from 'vue'
import axios from 'axios'
import FormField from '../../components/AppFormField.vue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const formData = ref({
  name: '',
  password: '',
})

const errorMessage = ref('')
const isSubmitting = ref(false)

const toast = useToast()

const submitForm = async () => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    let backendUrl =
      (import.meta.env.VITE_BACKEND_ORIGIN || 'http://localhost:5000') +
      (import.meta.env.VITE_API_TARGET || '/api/v1')

    //For testing of all functions to logout first, because the UI has no function for this
    try {
      // Fetch current user
      const currentUser = await axios.post(
        backendUrl + '/users/logout',
        { withCredentials: true }, // Credentials must be included here as well
      )
      console.log(currentUser.data)
    } catch (error) {
      console.error('Failed to fetch current user:', error.response?.data || error.message)
    }

    const response = await axios.post(
      backendUrl + '/users/login',
      {
        name: formData.value.name,
        password: formData.value.password,
      },
      { withCredentials: true }, // Include credentials for login request
    )

    formData.value.name = ''
    formData.value.password = ''

    //For testing of all functions to get the protected endpoint, because the UI has no function for this
    if (response.data) {
      try {
        // Fetch current user
        const currentUser = await axios.get(
          backendUrl + '/users/current-user',
          { withCredentials: true }, // Credentials must be included here as well
        )
        console.log(currentUser.data)
      } catch (error) {
        console.error('Failed to fetch current user:', error.response?.data || error.message)
      }
    }

    console.log('Login successful!', response.data)

    if (toast) {
      toast.add({
        severity: 'success', // success, info, warn, or error
        summary: 'Success',
        detail: 'Login successful!',
        life: 5000, // Duration in milliseconds
      })
    } else {
      alert('Login successful!')
    }
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message)
    errorMessage.value = err.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="content-card">
    <div class="inner-content">
      <h1 class="text-focus">Login</h1>

      <FormField id="name" label="Account Name" v-model="formData.name" />

      <FormField id="password" label="Password" type="Password" v-model="formData.password" />

      <!-- Error Message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>

    <Button type="submit" :disabled="isSubmitting">
      <span v-if="isSubmitting">Submitting...</span>
      <span v-else>Submit</span>
    </Button>
  </form>
</template>

<style scoped>
.inner-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.content-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  max-width: 400px;
  padding: var(--default-padding);
  border: var(--border-card);
  border-radius: var(--default-border-radius);
  background: var(--primary-color-contrast);
}

.error-message {
  background: var(--warning-color);
  padding: var(--default-padding);
  color: var(--primary-color-contrast);
}

.text-focus {
  color: var(--primary-color);
  font-weight: 600;
}
</style>
