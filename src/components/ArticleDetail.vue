<template>
  <div>
    <h1>{{ articles.title }}</h1>
    <p>{{ articles.author }}</p>
    <br>
    <div id="content" v-html="articles.content"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  name: 'ArticleDetail',
  data: () => ({
    articles: '',
  }),
  methods: {
    filterListArtilce() {
      axios.get('http://localhost:3030/articles')
        .then((result) => {
          result.data.resultArr.forEach((article) => {
            const idArticle = article.id;
            if (idArticle === this.id) {
              this.articles = {
                id: idArticle,
                title: article.title,
                author: article.author,
                content: article.content,
              };
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    id() {
      this.filterListArtilce();
    },
  },
  created() {
    this.filterListArtilce();
  },
};
</script>

<style scoped>
  #content {
    text-align: left;
    font-size: 18px;
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.8
  }
</style>
