<template>
  <article class="content">
    <ul>
      <li class="product-item" v-for="product in products" :key="product.url">
        <product-item :product="product"></product-item>
      </li>
    </ul>
    <nav class="pagination">
      <button
        :disabled="!previousPage"
        class="page-nav"
        @click="onPreviousPage"
      >
        Previous
      </button>
      <button :disabled="!nextPage" class="page-nav" @click="onNextPage">
        Next
      </button>
    </nav>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ACTIONS } from '../store/index'
import '@nuxtjs/axios'
import { Product, jsonToProduct, PaginatedList } from '../lib/models'
import { Api, api } from '../lib/api'
import { Context } from '@nuxt/vue-app'
import ProductItem from '~/components/ProductItem.vue'

@Component({
  async asyncData({ app, $axios }: Context) {
    const $api = api($axios)
    const limit = 30
    const page = await $api.products({ limit, offset: 0 })
    return {
      limit: page.limit,
      offset: page.offset,
      page
    }
  },
  components: { ProductItem }
})
class Products extends Vue {
  limit!: number
  offset!: number
  page!: PaginatedList<Product>
  get products() {
    return this.page.result
  }

  get nextPage() {
    return this.page.nextUri
  }
  get previousPage() {
    return this.page.previousUri
  }

  onNextPage() {
    this.offset += this.limit
    return this.fetchPage(this.nextPage)
  }

  onPreviousPage() {
    this.offset -= this.limit
    return this.fetchPage(this.nextPage)
  }
  async fetchPage(url: string) {
    this.page = await api(this.$axios).products({ url })
  }
}

export default Products
</script>


<style scoped>
.content {
  margin: 2em;
  display: flex;
  flex-direction: column;
}
.content > * {
  margin: 1em;
}

.product-item {
  display: flex;
  justify-content: space-between;
}

.product-item * {
  margin-left: 1em;
  margin-right: 1em;
}

.product-price::before {
  content: '$';
}
</style>
