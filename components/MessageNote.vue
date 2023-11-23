<template>
  <div class=" mx-auto max-w-screen-sm box-border mt-10 rounded-lg overflow-hidden opacity-80  
  shadow-lg p-3 dark:bg-gray-900">
  
    <Backpages/>

    <div class="slide-enter">
      <slot/>
    </div>
    <Giscus 
        repo="Pickkjouska/betablog"
        repo-id="R_kgDOKvDD6w"
        category="General"
        category-id="DIC_kwDOKvDD684CbL0d"
        mapping="title"
        term="Welcome to my blog!"
        reactions-enabled="1"
        emit-metadata="1"
        input-position="top"
        theme="light"
        lang="zh-CN"
        crossorigin="anonymous"
        loading="lazy"  
        >
    </Giscus >
  </div>
</template>

<script setup lang="ts">
import  Giscus  from '@giscus/vue';
const isLoad = ref(false)
onMounted(() => {
  isLoad.value = true;
})
</script>