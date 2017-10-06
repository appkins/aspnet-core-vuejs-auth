<template>
  <v-toolbar dark class="primary nav-bar">
          <v-toolbar-side-icon @click="toggleNav();"></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="goTo('/');">
                      <v-icon>home</v-icon>
              </v-btn>
          <v-btn outline @click="signOut();">
                  <v-icon>search</v-icon> {{ signedIn ? 'Sign In' : 'Sign Out' }}
          </v-btn>
        </v-toolbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import AuthService from '../../services/Auth';

  @Component
  export default class NavMenu extends Vue {
    signedIn: boolean = false;

    signOut() {
      let authService = new AuthService();
      authService.signOut();
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
