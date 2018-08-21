<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>MEDIARY</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>
        <router-link to="/login" class="btn">SIGN IN</router-link>
      </v-btn>
      <v-btn flat>
        <router-link to="/register" class="btn">SIGN UP</router-link>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style>
  .btn {
    text-decoration: none;
    color: black;
  }
</style>
