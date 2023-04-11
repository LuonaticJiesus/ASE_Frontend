<template>
  <div class="full-container">
    <main class="main-container">
      <slot name="main"></slot>
    </main>
    <div class="right-container">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DivideContainer',
};
</script>

<style scoped></style>
