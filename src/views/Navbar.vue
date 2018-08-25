<template>
  <v-toolbar class="indigo lighten-1 white--text text-xs-center"> 
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" id="title" class="lighten-1 white--text">MEDIARY</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/new-story" class="lighten-1 white--text" v-if="propsislogin">NEW POST</v-btn>
      <v-btn flat to="/login" v-if="!propsislogin" class="lighten-1 white--text">SIGN IN</v-btn>
      <v-btn flat to="/register" class="lighten-1 white--text" v-if="!propsislogin">SIGN UP</v-btn>
      <v-btn flat @click="logout" class="lighten-1 white--text" v-if="propsislogin">LOGOUT</v-btn>
      <v-btn flat to="/about" class="lighten-1 white--text">ABOUT</v-btn>
      <v-btn flat to="/me" v-if="propsislogin">
        <v-icon color="white">account_circle</v-icon>
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
      localStorage.removeItem('token');
      swal('Logout success', '', 'success');
      // this.$emit('changeStatusLogin', 'token')
      this.$router.replace('/login');
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
