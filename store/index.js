import Vue from 'vue'
import Vuex from 'vuex'
// import moduleCart from '@/store/cart.js'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: () => ({
    ucount: 0,
    amount: 0
  }),
  mutations: {
    changeCount(state, num) {
      state.ucount = num
    },
    changeAmount(state, num) {
      state.amount = num
    }
  }
})
export default store
