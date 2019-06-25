<template>
  <nav>
    <nuxt-link class="navbar-item" to="/">
      Index
    </nuxt-link>
    <nuxt-link class="navbar-item" to="/products">
      Products
    </nuxt-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  margin: 1em;
  min-height: 2em;
  align-items: stretch;
  align-content: center;
  justify-items: stretch;
  justify-content: flex-start;
}

.navbar-item {
  margin: 0.1em;
  padding: 1em;
  background-color: #8888aa;
  color: #fafafa;
}

.navbar-item:hover {
  background-color: #aaaaff;
}
</style>
