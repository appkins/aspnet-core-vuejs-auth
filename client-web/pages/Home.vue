<template>
  <div>

  <h1>Homepage</h1>
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
      <div slot="header">Item</div>
      <v-card>
        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
    <div class="authEtc">
      <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import AuthService from '../services/Auth';

import { mapActions, mapGetters } from 'vuex';
import store from '../store';

@Component({
  computed: mapGetters({
    isLoggedIn: 'authState',
    error: 'getError'
  })
})
export default class Home extends Vue {

  //   onSubmit() {
  //   let authService = new AuthService();
  //   authService.signIn(this.username, this.password).then(response => {
  //     if (!response.is_error) {
  //       this.$router.push({ path: '/contacts' });
  //     } else {
  //       this.error = response.error_content.error_description;
  //     }
  //   });
  // }


}
</script>

<style scoped lang="stylus">
</style>
