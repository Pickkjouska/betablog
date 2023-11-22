// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/content'
  ],
  content: {
    highlight: {
      theme: 'github-dark',
      preload: [
        'c',
        'py'
      ],
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: [
    '~/assets/style/transitions.css',
  ]
  
})
