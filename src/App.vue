<template>
  <div id="app">
    <Navbar :propsislogin="islogin"></Navbar>
    <br>
    <router-view @changeStatusLogin="changeLogin"></router-view>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue';

export default {
  data () {
    return {
      islogin: false
    }
  },
  components: {
    Navbar,
  },
  methods: {
    changeLogin (result) {
      if (result) {
        localStorage.setItem('token', result);
      } 
      let token = localStorage.getItem('token')
      if (token) {
        this.islogin = true;
      } 
    },
  },
  mounted() {
    this.changeLogin();
  },
  created() {
    this.changeLogin();
  },
};
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
