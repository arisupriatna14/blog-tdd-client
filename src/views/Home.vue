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
    HelloWorld
  },
};
</script>

<style>

</style>
