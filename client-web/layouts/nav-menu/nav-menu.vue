<template>
  <v-toolbar dark class="primary nav-bar">
          <v-toolbar-side-icon @click="toggleNav();"></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="goTo('/');">
                      <v-icon>home</v-icon>
              </v-btn>
          <v-btn outline @click="account(isLoggedIn);">
                  <v-icon>search</v-icon> {{ isLoggedIn ? 'Sign Out' : 'Sign In' }}
          </v-btn>
        </v-toolbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  //import store from '../../store';
  import { mapActions, mapGetters } from 'vuex';

  @Component({
  computed: mapGetters({
    isLoggedIn: 'authState'
  })
})
  export default class NavMenu extends Vue {
    // signedIn: boolean = false;

    account(signedIn: boolean) {
      if (signedIn) {
        this.signOut();
      }
      else {
        this.$router.push({ path: '/signin' });
      }
    }

    signOut() {
      this.$store.dispatch('signOut');
      this.$router.push({ path: '/?signedOut=1' });
    }

    toggleNav(){
      this.$emit('close-menu');
    }

    goTo(link: string) {
      this.$router.push({ path: link });
    }
  }
</script>

<style scoped lang="stylus" src="./nav-menu.styl">
</style>
