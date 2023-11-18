<template>
    <ContentList path="/life" v-slot="{ list }">
      <Blogcard v-for="life in list" :key="life._path" :blog="life"/>
    </ContentList>
</template>