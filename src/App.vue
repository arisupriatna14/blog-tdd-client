<template>
  <div id="app">
    <Navbar :propsislogin="islogin" @logout="logout"></Navbar>
    <br>
    <router-view @changeStatusLogin="changeLogin" class="footer-height"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue';
import Footer from '@/views/Footer.vue';

export default {
  data () {
    return {
      islogin: false,
    }
  },
  components: {
    Navbar,
    Footer,
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
    logout() {
      swal('Logout success', '', 'success');
      this.islogin = false;
      this.$router.push('/')
    }
  },
  mounted() {
    this.changeLogin();
    // this.changeLogout();
  },
  created() {
    this.changeLogin();
    // this.changeLogout();
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

.footer-height {
  min-height: 65vh;
}
</style>
