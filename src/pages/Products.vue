<template>
  <article class="content">
    <ul>
      <li class="product-item" v-for="product in products" :key="product.url">
        <product-item :product="product"></product-item>
      </li>
    </ul>
    <nav class="pagination">

        <page-limit-input name="page-limit" v-model.number="limit" :min="10" :max="50"/>

      <button :disabled="!previousPage" class="page-nav" @click="onPreviousPage">Previous</button>
      <button :disabled="!nextPage" class="page-nav" @click="onNextPage">Next</button>
    </nav>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ACTIONS } from '../store/index'
import { Product, jsonToProduct, PaginatedList } from '../lib/models'
import { Api, api, ProductParams } from '../lib/api'
import ProductItem from '../components/ProductItem.vue'
import PageLimitInput from '../components/PageLimitInput.vue'

@Component({
  // async asyncData({ app, $axios }: Context) {
  //   const $api = api($axios)
  //   const limit = 30
  //   const page = await $api.products({ limit, offset: 0 })
  //   return {
  //     limit: page.limit,
  //     offset: page.offset,
  //     page
  //   }
  // },
  components: { ProductItem, PageLimitInput }
})
class Products extends Vue {
  private limit!: number
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
    if (this.nextPage) {
      this.offset += this.limit
      return this.fetchPage({ limit: this.limit, offset: this.offset })
    }
  }

  onPreviousPage() {
    if (this.previousPage) {
      this.offset -= this.limit
      if (this.offset < 0){
        this.offset = 0
      }
      return this.fetchPage({ limit: this.limit, offset: this.offset })
    }
  }
  async fetchPage(params: ProductParams) {
    // this.page = await api(this.$axios).products(params)
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
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 0em;
  margin-bottom: 0em;
}

.product-price::before {
  content: '$';
}
</style>
