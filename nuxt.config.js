require(`dotenv`).config()

export default {
  mode: `spa`,
  env: {
    userEmail: process.env.USER_EMAIL || `jeremiah@prologuetechnology.com`,
    token: process.env.TOKEN || ``,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || ``,
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      {
        hid: `description`,
        name: `description`,
        content: process.env.npm_package_description || ``,
      },
    ],
    script: [{ src: `http://localhost:8098` }],
    link: [{ rel: `icon`, type: `image/x-icon`, href: `/favicon.ico` }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: `#fff` },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    `@nuxtjs/eslint-module`,
    // Doc: https://github.com/nuxt-community/stylelint-module
    `@nuxtjs/stylelint-module`,
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    `@nuxtjs/tailwindcss`,
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    `@nuxtjs/axios`,
    `@nuxtjs/pwa`,
    // Doc: https://github.com/nuxt-community/dotenv-module
    `@nuxtjs/dotenv`,
  ],
  /**
   * Tailwind config
   */
  tailwindcss: {
    configPath: `~/tailwind.config.js`,
    cssPath: `~/assets/css/tailwind.css`,
    exposeConfig: false,
  },
  /**
   * Post CSS config
   */
  postcss: {
    plugins: {
      'postcss-import': true,
      tailwindcss: true,
      autoprefixer: true,
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
