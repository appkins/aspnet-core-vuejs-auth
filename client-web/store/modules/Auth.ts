import auth from '../../services/Auth';
import * as types from '../mutation-types';
const STORAGE_KEY: string = "token";
// initial state
const state = {
  isSignedIn: window.localStorage.getItem(STORAGE_KEY) || false,
  // roles: []
}

const getters = {
    getToken() {
        return window.localStorage.getItem(STORAGE_KEY);
    }
}

const actions = {
    setToken(token: string) {
        window.localStorage.setItem(STORAGE_KEY, token);
    },
    removeToken(): void {
        window.localStorage.removeItem(STORAGE_KEY);
    },
    checkSignIn(): boolean {
        return state.isSignedIn = getters.getToken() === null;
    }
}

// getters
// const getters = {
//   isSignedIn: state => state.isSignedIn
// }

// actions
// const actions = {
//     signIn ({ commit }) {
//         commit(types.SIGNIN_SUCCESS, auth.isSignedInIn());
//     }

// }

// mutations
// const mutations = {
//   [types.SIGNIN_SUCCESS] (state, signedIn) {
//     state.isSignedIn = signedIn
//   },

//   [types.ADD_TO_ROLE] (state, { id }) {
//     state.all.find(p => p.id === id).inventory--
//   }

export default {
  state,
//   getters,
//   actions,
//   mutations
}
