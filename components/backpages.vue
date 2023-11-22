<template>
    <UButton icon="i-heroicons-arrow-left-solid" size="xl" :padded="false" color="gray"
    variant="link" label="返回首页" :trailing="false" @click="goBack"/>

</template>
  
<script setup lang="ts">

const goBack = () => {
  const router = useRouter();
  router.push('/');
};

</script>
  