<template>
  <div>
    <h1>{{ articles.title }}</h1>
    <p>{{ articles.author }}</p>
    <br>
    <div id="content" v-html="articles.content"></div>
    <br>
    <v-btn 
      :to="{ path: `/@${articles.authorConvert}/${articles.id}/comments`, params: { id: articles.id } }" 
      style="color: black; text-decoration: none;"
    >
      Comment
    </v-btn>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import Comment from '@/components/Comment.vue';

export default {
  props: ['id'],
  name: 'ArticleDetail',
  components: {
    Comment,
  },
  data: () => ({
    articles: '',
  }),
  methods: {
    filterListArtilce() {
      axios.get('http://localhost:3030/articles')
        .then((result) => {
          result.data.resultArr.forEach((article) => {
            if (article.id === this.id) {
              this.articles = {
                id: article.id,
                title: article.title,
                author: article.author,
                content: article.content,
                authorConvert: article.author.split(' ').join('').toLowerCase()
              };
              localStorage.setItem('articleId', this.id)
              localStorage.setItem('author', this.articles.authorConvert)
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    id(value) {
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
