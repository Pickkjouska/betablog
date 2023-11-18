<template>
  <ContentList path="/blog" v-slot="{ list }">
    <Blogcard v-for="blog in list" :key="blog._path" :blog="blog"/>
  </ContentList>
</template>