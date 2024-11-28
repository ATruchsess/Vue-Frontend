<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import FormField from '../../components/AppFormField.vue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const formData = ref({
  name: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = ref('')
const isSubmitting = ref(false)

//Simple validation of the inputs
const isNameValid = computed(() => formData.value.name.trim() !== '')
const isPasswordValid = computed(() => formData.value.password.length >= 8)
const isPasswordMatch = computed(() => formData.value.password === formData.value.confirmPassword)
const isFormValid = computed(
  () => isNameValid.value && isPasswordMatch.value && isPasswordValid.value,
)

//PrimeVue Component to show a toast with a message
const toast = useToast()

const submitForm = async () => {
  if (!isFormValid.value) {
    console.log('Form is invalid.')
    return
  }

  errorMessage.value = ''

  isSubmitting.value = true
  try {
    let backendUrl =
      (import.meta.env.VITE_BACKEND_ORIGIN || 'http://localhost:5000') +
      (import.meta.env.VITE_API_TARGET || '/api/v1')

    // Make the POST request to the Node.js backend
    const response = await axios.post(backendUrl + '/users', {
      name: formData.value.name,
      password: formData.value.password,
    })
    console.log('Form submitted successfully!', response.data)

    if (toast) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Account creation successful!',
        life: 5000, // Duration in milliseconds
      })
    } else {
      alert('Account creation successful!')
    }

    // Reset the form, could also be a function
    formData.value.name = ''
    formData.value.password = ''
    formData.value.confirmPassword = ''
    
  } catch (err) {
    console.error('Account creation failed:', err.response?.data || err.message)
    if (err.response?.data?.error === 'Database error while creating user') {
      //Alexander von Truchseß 27.11.2024: Better error message from the backend would be nice
      errorMessage.value = 'This username is already taken. Please try a different one.'
    } else {
      errorMessage.value = 'Account creation failed. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="content-card">
    <h1 class="text-focus">Create a new Account</h1>

    <FormField
      id="formRegisterName"
      label="Account Name"
      v-model="formData.name"
      :isValid="isNameValid"
      errorMessage="Name can be empty"
    />

    <FormField
      id="formRegisterPassword"
      label="Password"
      type="Password"
      v-model="formData.password"
      :isValid="isPasswordValid"
      errorMessage="Password must be at least 8 characters"
    />

    <FormField
      id="formRegisterConfirmPassword"
      label="Confirm Password"
      type="password"
      v-model="formData.confirmPassword"
      :isValid="isPasswordMatch"
      errorMessage="Passwords must match"
    />

    <p id="formRegisterErrorMessage" v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <Button id="formRegisterSubmitButton" type="submit" :disabled="!isFormValid || isSubmitting">
      <span v-if="isSubmitting">Submitting...</span>
      <span v-else>Submit</span>
    </Button>
  </form>
</template>

<style scoped>
.content-card {
  display: flex;
  flex-direction: column;
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
