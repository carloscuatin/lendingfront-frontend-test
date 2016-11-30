import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { httpGet } from '../utils/fetch';

Vue.use(Vuex);

const initialState = {
  products: [],
  purchases: []
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PURCHASES(state, purchases) {
    state.purchases = purchases;
  },
  ADD_PURCHASE(state) {
    const newNote = {
      text: 'New note',
      favorite: false
    };
    state.notes.push(newNote);
  },
  EDIT_PURCHASE(state, text) {
    state.activeNote.text = text;
  },
  DELETE_PURCHASE(state) {
    state.notes.$remove(state.activeNote);
    state.activeNote = state.notes[0];
  }
};

const actions = {
  GET_PRODUCTS({ commit }) {
    httpGet('/products/')
      .then((response) => {
        commit('SET_PRODUCTS', response.results);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  GET_PURCHASES({ commit }, productId) {
    httpGet(`/purchases/?product__id=${productId}`)
      .then((response) => {
        commit('SET_PURCHASES', response.results);
      });
  }
};

export default new Vuex.Store({
  mutations,
  actions,
  state: initialState,
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
});
