<template>
  <div>
    <UButton lable="button" @click="isOpen = true" icon="i-heroicons-bars-3-20-solid"
    color="gray" variant="link" size="xl" square />
    <USlideover :ui="{ width: 'max-w-[15rem]'}" v-model="isOpen" side="left" >
      <div class=" box-border p-3 w-1/2 mx-auto flex justify-center">
        <UAvatar  size="3xl" src="https://blog.pickk.top/files/tou.jpg" alt="Pickk" class="object-center"/>
      </div>
      <p class=" font-mono text-center text-2xl">Pickk</p>
      <div class=" box-border pt-10 ">
            <UVerticalNavigation :links="links" :ui="{size: 'text-lg'} " class="space-y-2 "/>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const links = [{
  label: 'MyBlog',
  icon: 'i-heroicons-home',
  to: '/',
  iconClass: 'h-6 w-6'
}, {
  label: 'Message',
  icon: 'i-heroicons-book-open',
  to : '/blog',
  iconClass: 'h-6 w-6'
}, {
  label: 'Lift',
  icon: 'i-heroicons-rocket-launch',
  to : '/lift',
  iconClass: 'h-6 w-6'
}
// {
//   label: 'WriteUp',
//   icon: 'i-heroicons-truck',
//   to : 'https://writeup.pickk.top',
//   iconClass: 'h-6 w-6'
// }, 
]
</script>
