<template>
  <div class="">
  <ContentList path="/blog" v-slot="{ list }">
    <MessageCard v-for="blog in list" :key="blog._path" :blog="blog"/>
  </ContentList>
  <ContentList path="/life" v-slot="{ list }">
      <MessageCard v-for="life in list" :key="life._path" :blog="life"/>
  </ContentList>
</div>
</template>