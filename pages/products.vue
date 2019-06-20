<template>
  <article class="content">
    <ul>
      <li class="product-item" v-for="product in products" :key="product.url">
        <div>{{product.name}}</div>
        <div class="product-price">{{product.pricePerItem}}</div>
      </li>
    </ul>
    <nav class="pagination">
      <button :disabled="!previousPage" class="page-nav" >Previous</button>
      <button :disabled="!nextPage" class="page-nav">Next</button>
    </nav>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ACTIONS } from '../store/index'
import '@nuxtjs/axios'
import { Product, jsonToProduct } from '../models/index'

interface AsyncData {
  products: Product[]
  nextPage?: string
  previousPage?: string
}

@Component({
  async asyncData({ params, $axios }): Promise<AsyncData> {
    const url = process.env['PRODUCT_API_BACKEND'] + '/api/v1/products?limit=1'
    const res = await $axios.$get(url)
    const { count, next, previous, results } = res
    const products = results.map(jsonToProduct)
    return {
      products,
      nextPage: next,
      previousPage: previous
    }
  }
})
export default class Products extends Vue {
  products!: Product[]
  nextPage?: string
  previousPage?: string

  async fetchNextPage() {}
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
