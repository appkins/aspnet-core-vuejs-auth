import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue'
import AuthLayout from './layouts/Auth.vue';
import DefaultLayout from './layouts/Default.vue';
import SignIn from './pages/SignIn.vue';
import Register from './pages/Register.vue';
import Contacts from './pages/Contacts.vue';
import ContactForm from './components/ContactForm.vue';
import Vuetify from 'vuetify';
import NavMenu from './layouts/nav-menu/nav-menu.vue';
import SideNav from './layouts/side-nav/side-nav.vue';
import Home from './pages/Home.vue';
// import router from './router';
import store from './store';

import routes from './router';

Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.component('nav-menu', NavMenu);
Vue.component('side-nav', SideNav);

async function redirectIfNotAuth (to: any, from: any, next: any) {
    store.dispatch('initApp');
    const user = await getUserState()
    if (user === false) {
      next({ name: 'SignIn' })
    } else {
      next()
    }
  }

  function getUserState () {
    return new Promise((resolve, reject) => {
      if (store.state.isSignedIn === undefined) {
        const unwatch = store.watch(
          () => store.state.isSignedIn,
          (value) => {
            unwatch()
            resolve(value)
          }
        )
      } else {
        resolve(store.state.isSignedIn)
      }
    })
  }


let router = new VueRouter({
    routes: [
        {
            path: '', component: AuthLayout,
            children: [
                { path: '/', component: Home },
                { name: 'SignIn', path: '/signin', component: SignIn },
                { path: '/register', component: Register },
                { path: '/contacts', component: Contacts, beforeEnter: redirectIfNotAuth },
                { path: '/contacts/new', component: ContactForm },
                { path: '/contacts/edit/:id', name: 'editContact', component: ContactForm }
            ]
        },
    ],
    mode: 'history',
});



const app = new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App, {})
});
