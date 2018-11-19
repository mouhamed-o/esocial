import axios from "axios";

const state = {
  all: [],
  pending: false,
  error: false,
  selectedStoreId: 0,
  countries: [],
  selectedCountryTermId: 0
};

const getters = {
  getCenteredStore: state => {
    return state.all.filter(store => store.ID === state.selectedStoreId)[0];
  },
  getSelectedCountryTermId: state => {
    return state.selectedCountryTermId;
  }
};

const actions = {
  getCountries({ commit }) {
    commit("apiPending");
    // eslint-disable-next-line prettier/prettier
    axios.get("http://93.118.32.98:9938/api/list").then(r => r.data).then(data => {
        commit("receiveNations", data.data.countries);
      });
  },
  getAllStores({ commit }) {
    commit("apiPending");
    // eslint-disable-next-line prettier/prettier
    axios.get("http://93.118.32.98:9938/api/list").then(r => r.data).then(data => {
        commit("receiveAll", data.data.stores);
      });
  },
  selectStore({ commit }, { id }) {
    commit("selectStore", id);
  },
  selectCountryTermId({ commit }, term_id) {
    commit("selectCountryTermId", term_id);
  }
};

const mutations = {
  selectCountryTermId(state, term_id) {
    state.selectedCountryTermId = term_id;
  },
  receiveNations(state, jsonTerms) {
    state.pending = false;
    state.countries = terms(jsonTerms.terms).countries;
  },
  receiveAll(state, stores) {
    state.pending = false;
    state.all = stores;
  },
  apiPending(state) {
    state.pending = true;
  },
  apiFailure(state) {
    state.pending = false;
    state.error = true;
  },
  selectStore(state, id) {
    state.selectedStoreId = id;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

const terms = terms =>
  terms.map(term => term).reduce(
    (acc, cur) => {
      if (cur.parent === 0) {
        acc.continents.push(cur.term_id);
      }
      if (acc.continents.indexOf(cur.parent) > -1) {
        acc.countries.push(cur);
      }
      return acc;
    },
    { continents: [], countries: [] }
  );
