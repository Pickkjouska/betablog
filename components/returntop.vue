<template>
  <UButton lable="button" @click="scrollToTop" icon="i-heroicons-arrow-up"
    color="gray" variant="link" size="xl" square v-if="showButton" 
    class="rounded-md"/>
</template>
  
<script setup lang="ts">
const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 100; // 显示按钮条件，你可以根据需要调整
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
