<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" id="title">MEDIARY</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/new-story" class="btn" v-if="propsislogin">NEW POST</v-btn>
      <v-btn flat to="/login" v-if="!propsislogin" class="btn">SIGN IN</v-btn>
      <v-btn flat to="/register" class="btn" v-if="!propsislogin">SIGN UP</v-btn>
      <v-btn flat @click="logout" class="btn" v-if="propsislogin">LOGOUT</v-btn>
      <v-btn flat to="/about" class="btn">ABOUT</v-btn>
      <v-btn flat to="/me" v-if="propsislogin">
        <v-avatar color="blue" v-if="propsislogin" flat>
          <img
            src="https://avatars3.githubusercontent.com/u/34597567?s=400&u=be5e2a2274d23b820acf23e48830f7cc42893df3&v=4"
            alt="ari"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import swal from 'sweetalert';

export default {
  props: ['propsislogin'],
  name: 'Navbar',
  data: () => ({
  }),
  methods: {
    logout() {
      // this.$emit('')
      localStorage.removeItem('token');
      swal('Logout success', '', 'success');
      this.$router.push('/');
    },
  },
};
</script>

<style>
  .btn, #title {
    text-decoration: none;
    color: black;
  }
</style>
