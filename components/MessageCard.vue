<template>
    <div class=" mx-auto max-w-screen-sm box-border rounded-lg mb-7 overflow-hidden opacity-80  
    shadow-md hover:shadow-xl dark:bg-gray-900" >
      <div>
        <nuxt-link :to="`/docs${props.blog._path}`">
        <img class="" src="../static/images/1.jpg" alt="Card Images"/>
        <div class="m-3 space-y-3">
          <p class=" font-mono text-3xl">{{ props.blog.title }}</p>
          <p class=" font-mono text-base text-slate-500">{{ props.blog.description }}</p>
        </div>
        <div class="box-border p-3 flex">
          <UAvatar size="lg" src="https://blog.pickk.top/files/tou.jpg" alt="Pickk" />
          <div class="box-border pl-3 pt-1">
            <p class="text-sm font-medium">Pickk</p>
            <p class="mt-1 text-sm leading-4 opacity-90">看我干啥o.0?</p>
        </div>
        </div>
        </nuxt-link>
      </div>
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps(['blog'])
// const value = defineProps(['value'])

</script>
