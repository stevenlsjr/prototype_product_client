import { Product } from '../lib/models'
import { MutationTree, ActionTree } from 'vuex'

export const MUTATIONS = {
  setProducts: 'setProducts'
}

export const ACTIONS = {
  fetchProductsFromServer: 'fetchProductsFromServer'
}

export interface State {
  products: Product[]
}

export const state: () => State = () => ({
  products: []
})

export const mutations: MutationTree<State> = {
  [MUTATIONS.setProducts](state: State, products: Product[]) {
    state.products = products
  }
}

export const actions: ActionTree<State, State> = {
  [ACTIONS.fetchProductsFromServer](context) {
    console.log(process.env['PRODUCT_API_BACKEND'])
  }
}
