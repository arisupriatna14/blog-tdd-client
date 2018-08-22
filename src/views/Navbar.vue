<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" id="title">MEDIARY</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>
        <router-link v-if="!isLogin" to="/login" class="btn">SIGN IN</router-link>
        <router-link v-if="isLogin" to="/new-story" class="btn">New Post</router-link>
      </v-btn>
      <v-btn flat>
        <router-link v-if="!isLogin" to="/register" class="btn">SIGN UP</router-link>
        <router-link v-if="isLogin" to="" @click="logout" class="btn">Logout</router-link>
      </v-btn>
      <v-btn flat>
        <router-link v-if="isLogin" to="/about" class="btn">About</router-link>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: 'Navbar',
  data: () => ({
    isLogin: false,
  }),
  methods: {
    checkLogin() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLogin = true;
      }
    },
    logout() {
      localStorage.removeItem('token');
      swal('Logout success', '', 'success');
      this.$router.push('/');
    },
  },
  mounted() {
    this.checkLogin();
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style>
  .btn, #title {
    text-decoration: none;
    color: black;
  }
</style>
