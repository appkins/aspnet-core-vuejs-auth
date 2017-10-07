<template>
  <div class="auth-form">

  <h2 class="formAuthHeading">Please register for access</h2>
  <div v-if="isConfirmed" class="alert alert-success" role="alert">
  Your email address has been successfully confirmed.
  </div>
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
    await this.$store.dispatch('register', {username: this.email, password: this.password})
    .then(response => {
      // alert(JSON.stringify(response));
        if (!response.is_error) {
          this.$router.push({ path: '/contacts' });
        }
    })
    .catch(error => {

    });
    // this.$router.push({ path: '/contacts' });
  }

  firstError(errors:string[]){
      return errors ? errors[0] : "";
  }

}
</script>

<style scoped lang="stylus">
.auth {
  max-width: 25em;
}
</style>
