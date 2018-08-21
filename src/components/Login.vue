<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs3 />
      <v-flex xs6>
        <h1>SIGN IN</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          >
          </v-text-field>
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          >
          </v-checkbox>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
          Sign In
          </v-btn>
          <v-btn
            @click="clear"
          >
          Reset
          </v-btn>
        </v-form>
      </v-flex>
      <v-flex xs3 />
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  data: () => ({
    name: 'Register',
    valid: true,
    username: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    checkbox: false,
    password: '',
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios.post('http://localhost:3030/users/login', {
          username: this.username,
          email: this.email,
          password: this.password,
          checkbox: this.checkbox,
        })
          .then(() => {
            swal('Sign in success', 'Mediary, Inc', 'success');
            this.$router.push('/');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>
