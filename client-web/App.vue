<template>
  <v-layout wrap>
    <v-container>
      <v-layout justify-center>
        <nav-menu @close-menu="toggleMenu()" />
        <v-btn @click.stop="toggleNav();" class="pink white--text">Toggle</v-btn>
        <h1>{{ isLoggedIn }}</h1>
        <router-view />

      </v-layout>
    </v-container>
    <v-navigation-drawer
      class="side-nav-content"
      temporary
      v-model="sideNavOpen"
      v-bind:class="{ active: sideNavOpen }"
      :mini-variant="mini"
      dark
      absolute
    >
      <side-nav
        :open="sideNavOpen"
        :mini="mini"
        @mini-nav="mini = !mini;"
      />
    </v-navigation-drawer>
  </v-layout>
</template>

<script lang="ts">
// Polyfills
import 'whatwg-fetch';
import './polyfills/object-assign';
import './polyfills/array-find';
import './polyfills/string-startsWith';

import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';
// import AuthService from './services/Auth';
import store from './store';

@Component({
  computed: mapGetters({
    isLoggedIn: 'authState'
  }),
})
export default class App extends Vue {
  sideNavOpen: boolean = false;
  mini: boolean = false;

  // isLoggedIn: boolean = false;

  beforeCreate() {
    this.$store.dispatch('setSignIn');
  }

  toggleMenu() {
    // alert('hi');
    this.sideNavOpen = !this.sideNavOpen;
  }
}
</script>

<style lang="stylus">

/*
 * Global Styles
 */
@import '../node_modules/vuetify/dist/vuetify.min.css';
@import '../node_modules/vuetify/src/stylus/main.styl';
@require './styles/auth.styl';

body {
  padding-top: 5rem;
  font-family: "century gothic", verdana;
}

.btn-link {
  cursor: pointer;
}

.btn {
  margin: 10px 3px 10px 3px;
}

.side-nav-content.navigation-drawer {
  padding-top: 56px;
  width: 0;
  transition: width 0.3s;
  &.active {
    width: 300px;
    background-color: white;
    z-index: 5;
  }
}
</style>
