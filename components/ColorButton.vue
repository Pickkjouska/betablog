<template>
  <ClientOnly>
    <UButton
      size="xl"
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="lightgray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
      disabled
    />

    <template #fallback>
      <div class="p-4" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>