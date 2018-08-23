<template>
  <div class="home">
    <ListArticle></ListArticle>
  </div>
</template>

<script>
import ListArticle from '@/views/ListArticle.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    ListArticle,
    HelloWorld,
  },
  // mounted() {
  //   this.$router.push('/@arisupriatna/5b7e26e1c80cb708488c7eff/');
  // },
  // watch: {
  //   '$route'() {
  //     if (this.$route.params.id === undefined) {
  //       this.$router.push('/@arisupriatna/5b7e26e1c80cb708488c7eff/');
  //     }
  //   },
  // },
};
</script>

<style>

</style>
