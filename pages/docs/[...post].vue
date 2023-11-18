<template>
    <MessageNote>
      <ContentDoc class="prose prose-a:no-underline 
      dark:prose-invert dark:prose-pre:bg-slate-800 " :path="path"/>
    </MessageNote>
</template>


<script setup lang="ts">
  const route = useRoute()
  const post = route.params.post as Array<String>
  const path = post.join('/')
</script>