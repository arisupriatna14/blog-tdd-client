<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg4 sm12>
        <v-expansion-panel inset>
          <v-expansion-panel-content
            v-for="(article,i) in articles"
            :key="i"
          >
            <div slot="header" style="font-size: 16px;">{{ article.title }}</div>
            <v-card>
              <router-link 
                :to="{ path: `/@${article.author.split(' ').join('').toLowerCase()}/${article.id}/`, params: { id: article.id } }" style="color: white; text-decoration: none;"
              >
                <v-btn color="blue">
                    Read More
                </v-btn>
              </router-link>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 lg8 sm12>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListArticle',
  data: () => ({
    articles: [],
  }),
  methods: {
    listArticle() {
      axios.get('http://localhost:3030/articles')
        .then((result) => {
          result.data.resultArr.forEach((article) => {
            const idArticle = article.id;
            this.articles.push({
              id: idArticle,
              title: article.title,
              author: article.author,
              content: article.content,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.listArticle();
  },
};
</script>

<style scoped>
  .btn {
    text-decoration: none;
    color: white;
    font-weight: bold
  }
</style>

