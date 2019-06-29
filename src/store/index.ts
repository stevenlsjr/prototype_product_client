import { Product } from "../lib/models";
import { MutationTree, ActionTree } from "vuex";
import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth";
Vue.use(Vuex);

export const MUTATIONS = {
  setProducts: "setProducts"
};

export const ACTIONS = {
  fetchProductsFromServer: "fetchProductsFromServer"
};

export interface State {
  products: Product[];
}

export const state: () => State = () => ({
  products: []
});

export const mutations: MutationTree<State> = {
  [MUTATIONS.setProducts](state: State, products: Product[]) {
    state.products = products;
  }
};

export const actions: ActionTree<State, State> = {
  [ACTIONS.fetchProductsFromServer](context) {
    console.log(process.env["PRODUCT_API_BACKEND"]);
  }
};

export default function createStore() {
  return new Vuex.Store({
    state: state(),
    mutations,
    actions,
    modules: {
      auth: authModule()
    }
  });
}
