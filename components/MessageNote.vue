<template>
  <div class=" mx-auto max-w-screen-sm box-border mt-10 rounded-lg overflow-hidden opacity-80  
  shadow-lg p-3 dark:bg-gray-900">
    <div class="slide-enter">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoad = ref(false)
onMounted(() => {
  isLoad.value = true;
})
</script>