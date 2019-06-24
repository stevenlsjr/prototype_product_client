import { Context } from '@nuxt/vue-app'
import { api, Api } from '~/lib/api'

export { Api } from '~/lib/api'

declare module '@nuxt/vue-app' {
  interface Context {
    $api: Api
  }
}

declare module 'vue/types' {
  interface Vue {
    $api: Api
  }
}

export default function apiPlugin(context: Context, inject) {
  const axios = context.app.$axios
  const $api = api(axios)

  inject('api', $api)
}
