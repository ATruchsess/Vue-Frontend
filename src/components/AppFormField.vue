<template>
  <div class="input-form-field">
    <div class="input-form-field-header">
      <label :for="id">{{ label }}</label>
      <Message size="small" severity="error" variant="simple" :id="`${id}-error`" v-if="!isValid">
        {{ errorMessage }}
      </Message>
    </div>
    <slot name="input">
      <InputText
        :aria-describedby="`${id}-error`"
        :id="id"
        :type="type"
        :value="modelValue"
        :invalid="!isValid"
        @input="updateValue"
        class="input-element"
      />
    </slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

defineProps({
  id: String,
  label: String,
  modelValue: String, // This is bound using v-model in the parent
  isValid: Boolean,
  errorMessage: String,
  type: {
    type: String,
    default: 'text', // Default input type
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value) // Extract the value from the InputEvent
}
</script>

<style scoped>
.input-form-field {
  display: flex;
  flex-direction: column;
}
.input-form-field-header {
  display: flex;
  justify-content: space-between;
}
</style>
