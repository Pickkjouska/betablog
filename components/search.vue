<template>
  <div>
    <UButton lable="button" @click="isOpen = true" icon="i-heroicons-magnifying-glass"
    color="gray" variant="link" size="xl" square />
    <UModal v-model="isOpen" :ui="{ height: 'h-80' }">
      <div class="">
        <UCommandPalette
        ref="transformedData"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
        :autoselect="false"
        :groups="groups"
        :fuse="{ fuseOptions: {
            ignoreLocation: true,
            includeMatches: true,
            threshold: 0,
            keys: ['title', 'description', 'children.children.value', 'children.children.children.value']
            },
           resultLimit: 10
        }"
        @update:model-value="onSelect"
        />
      </div>
    </UModal>
  </div>
</template>


<script setup lang="ts">

const isOpen = ref(false)
const transformedData = ref();

  const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
  const originalData = navigation.value;
  if (originalData) {
    transformedData.value = originalData.flatMap((item, index) => item.children
    ?item.children.map(child => ({
        id: index + 1, 
        label: child.title,
        path: '/docs' + child._path
      }))
      : []
    );
    // console.log(transformedData.value);
  }
const groups = [{
  key: 'users',
  commands: transformedData.value,
}]

function onSelect (option: { path: string | URL | undefined; }) {
  if (option.path) {
    // window.location.href = option.path  报错了 但是能跑o.0?
    window.open(option.path, '_blank')
  }
}
</script>
