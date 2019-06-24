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
        @click="fetchPage(previousPage)"
      >
        Previous
      </button>
      <button
        :disabled="!nextPage"
        class="page-nav"
        @click="fetchPage(nextPage)"
      >
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
    const products = await $api.products({ limit: 2, offset: 0 })
    return {
      products: products.result,
      nextPage: products.nextUri,
      previousPage: products.previousUri,
      limit: products.limit,
      offset: products.offset
    }
  },
  components: { ProductItem }
})
export default class Products extends Vue {
  $api!: Api
  products!: Product[]
  limit!: number
  offset!: number
  nextPage?: string
  previousPage?: string

  get productPage(): PaginatedList<Product> {
    return {
      result: this.products,
      previousUri: this.previousPage,
      nextUri: this.nextPage,
      limit: this.limit,
      offset: this.offset
    }
  }
  set productPage(value: PaginatedList<Product>) {
    this.products = value.result
    this.limit = value.limit
    this.previousPage = value.previousUri
    this.nextPage = value.nextUri
  }

  async fetchPage(url: string) {
    this.productPage = await api(this.$axios).products({ url })
  }
}
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
