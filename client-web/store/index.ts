import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as getters from './getters';
import * as auth from './modules/Auth';
import AuthService from '../services/Auth';

Vue.use(Vuex);
const STORAGE_KEY: string = "token";
// const debug = process.env.NODE_ENV !== 'production'
// const store = new Vuex.Store({
//   modules: {
//     auth
//   }
// })

const store = new Vuex.Store({
    state: {
      isSignedIn: false,
      token: '',
      error: ''
    },
    getters: {
        authState: state => {
            return state.isSignedIn;
        },
        getToken: state => {
            return state.token.length > 0 ? state.token : state.token = window.localStorage.getItem(STORAGE_KEY);
        },
        getError: state => {
            return state.error;
        },
    },
    mutations: {
      toggleSignIn(state) {
        state.isSignedIn = !state.isSignedIn;
      },
      setSignIn(state){
          // const key = window.localStorage.getItem(STORAGE_KEY);
          // alert(key);
          // state.isSignedIn = key !== null;
          state.isSignedIn = this.getters.getToken !== null;
      },
      signOut(state) {
        window.localStorage.removeItem(STORAGE_KEY);
        state.isSignedIn = false;
      },
      setToken(state, token){
        window.localStorage.setItem(STORAGE_KEY, token);
        state.token =  token;
      },
      setError(state, message) {
          state.error = message;
      },
    },
    actions: {
        initApp ({ commit }) {
            //const key = window.localStorage.getItem(STORAGE_KEY);
            // alert(key);
            commit('setSignIn');
            //alert(key);
            //return (key !== null);
        },
        toggleSignIn({ commit }) {
            commit('toggleSignIn')
          },
          setSignIn ({ commit }) {
            commit('setSignIn')
        },
        async signInOrRegister({ commit, state }, {email, password, isRegister}) {
                let authService = new AuthService();
                return await authService.signInOrRegister(email, password, isRegister)
                .then(
                    response => {
                        if (!response.is_error) {
                            // commit('toggleSignIn');
                            commit('setToken', response.content.access_token);
                            return response;
                            // this.$router.push({ path: '/contacts' });
                        }
                        else {
                            //alert(response);
                            if (response.error_content){
                                if(response.error_content.error_description) {
                                    commit('setError', response.error_content.error_description);
                                }
                                else {
                                    commit('setError', JSON.stringify(response.error_content).toString().replace(/[|&;{|&;}|&;"|&;(|&;)|&;,]/g, ""));
                                }
                            }
                            return response;
                        }
                })
                .catch(error => {
                    commit('setError', error);
                    //alert(error);
                    return error;
                });
        },
        async signIn ({ dispatch, commit }, {username, password}) {

                // alert(username + password);
                let isRegister = false;
                return await dispatch('signInOrRegister', {email: username, password: password, isRegister})
                .then(result => {
                    if (!result.is_error) {
                        // alert(JSON.stringify(result));
                        return result;
                    }
                })
                .catch(error => {
                    commit('setError', error);
                    return error});

                // this.actions.signInOrRegister({ commit, state}, {email, password, isRegister});
        },
        async register ({ dispatch, commit }, {username, password}) {
            let isRegister = true;
            return await dispatch('signInOrRegister', {email: username, password: password, isRegister})
            .then(result => {
                if (!result.is_error) {
                    //alert(result.general);

                    return result;
                }
                return result;
            })
            .catch(error => {
                commit('setError', error);
                return error});
            // this.actions.signInOrRegister({ commit, state}, {email, password, isRegister});
        },
        signOut ({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('signOut');
                resolve();
            })
        }
    }
  });

export default store;
