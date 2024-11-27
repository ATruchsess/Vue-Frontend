<template>
  <div class="card-class">
    <slot name="content"></slot>
  </div>
</template>

<style scoped>
.card-class {
  background: var(--background-small-change);
  border: var(--border-card);
  margin: var(--default-margin);
  border-radius: var(--default-border-radius);
  padding: var(--default-padding);
}
</style>
