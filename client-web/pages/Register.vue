<template>
  <div>

  <h2 class="formAuthHeading">Please register for access</h2>
  <div v-if="isConfirmed" class="alert alert-success" role="alert">
  Your email address has been successfully confirmed.
  </div>
  <div v-if="isExpired" class="alert alert-info" role="alert">
  <strong>Sesion Expired</strong> You need to sign in again.
  </div>
  <div v-if="isSignedOut" class="alert alert-info" role="alert">
  <strong>Signed Out</strong>
  </div>
  <div v-if="error" class="alert alert-danger" role="alert">
  {{error}}
  </div>
  <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="Email"
        v-model="email"
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
      <router-link to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import RegisterComplete from '../components/RegisterComplete.vue';
import { mapGetters } from 'vuex';
// import AuthService from '../services/Auth';

@Component(
  {
  components: { RegisterComplete },
  computed: mapGetters({
      // isLoggedIn: 'authState',
      error: 'getError'
    })
  })
export default class Register extends Vue {
  email: string = "user@test.com";
  password: string = "P2ssw0rd!";
  valid: boolean = true;
  registerComplete = false;
  errors: { [key: string]: string } = {};

  hidePassword: boolean = true;
  emailRules: Array<any> = [
    (v: any) => !!v || 'E-mail is required',
    (v: any) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
  ];

  passwordRules: Array<any> = [
    (v: any) => !!v || 'Password is required',
    (v: any) => v.length >= 6 || 'Password must be at least 6 characters long'
  ];

  onSubmit() {
    this.$store.dispatch('signIn', {username: this.email, password: this.password}).then(result => {
      //this.$router.push({ path: '/contacts' });
    }).catch(error => {
      alert(error);
    });
    // this.$router.push({ path: '/contacts' });
  }

  firstError(errors:string[]){
      return errors ? errors[0] : "";
  }

}
</script>

<style scoped lang="stylus">
</style>
