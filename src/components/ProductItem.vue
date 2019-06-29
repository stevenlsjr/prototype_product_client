<template>
  <div class="product-item">
    <div class="product-name">
      {{ product.name }}
    </div>
    <div class="product-price">
      <span> {{ product.pricePerItem | dollars }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Product } from "../lib/models";
@Component({})
class ProductItem extends Vue {
  @Prop() product!: Product;
}

export default ProductItem;
</script>

<style scoped>
.product-item {
  display: flex;
  align-content: space-between;
}
.product-item > * {
  margin: 0.4em;
}
.product-price > *::before {
  content: "$";
}
</style>
