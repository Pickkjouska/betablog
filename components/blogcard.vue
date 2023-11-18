<template>
    <div class=" mx-auto max-w-screen-sm box-border rounded-lg mb-5 overflow-hidden opacity-80  
    shadow-md hover:shadow-xl " >
      <div>
        <nuxt-link :to="`/docs${props.blog._path}`">
        <div class="m-3 space-y-3">
          <p class=" font-mono text-2xl">{{ props.blog.title }}</p>
          <p class=" font-mono text-slate-500">{{ props.blog.description }}</p>
        </div>
        </nuxt-link>
      </div>
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps(['blog'])
</script>