<template>
  <div class="auth-form">
    <v-progress-linear v-if="isBusy" v-bind:indeterminate="true"></v-progress-linear>
  <h2 class="formAuthHeading">Please sign in</h2>
  <v-alert v-if="isConfirmed" color="info" icon="warning" value="true">
  Your email address has been successfully confirmed.
  </v-alert>
  <v-alert v-if="isExpired" color="info" icon="warning" value="true">
  <strong>Sesion Expired</strong> You need to sign in again.
  </v-alert>
  <v-alert v-if="isSignedOut" color="info" icon="warning" value="true">
  <strong>Signed Out</strong>
  </v-alert>

  <v-alert v-if="error" color="error" icon="warning" value="true">
    {{error}}
  </v-alert>
  <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Email"
        v-model="username"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        :rules="passwordRules"
        :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (hidePassword = !hidePassword)"
        required
        :type="hidePassword ? 'password' : 'text'"
      ></v-text-field>

      <v-btn
        @click="onSubmit();"
        :disabled="!valid"
      >
        submit
      </v-btn>
    </v-form>

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
    // isLoggedIn: 'authState',
    error: 'getError'
  })
})
export default class SignIn extends Vue {
  // isLoggedIn: boolean = false;
  username: string = "user@test.com";
  password: string = "P2ssw0rd!";
  valid: boolean = true;
  isBusy: boolean = false;
  // error: string = null;

  hidePassword: boolean = true;

  emailRules: Array<any> = [
    (v: any) => !!v || 'E-mail is required',
    (v: any) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
  ];

  passwordRules: Array<any> = [
    (v: any) => !!v || 'Password is required',
    (v: any) => v.length >= 6 || 'Password must be at least 6 characters long'
  ];

  get isConfirmed() {
    return this.$route.query.confirmed;
  }

  get isExpired() {
    return this.$route.query.expired;
  }

  get isSignedOut() {
    return this.$route.query.signedOut;
  }

  async onSubmit() {
    this.isBusy = true;
    await this.$store.dispatch('signIn', {username: this.username, password: this.password})
    .then(response => {
      // alert(JSON.stringify(response));
      this.isBusy = false;
        if (!response.is_error) {
          this.$router.push({ path: '/contacts' });
        }
    })
    .catch(error => {
        this.isBusy = false;
    });

  }

  beforeMount(){

  }

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
