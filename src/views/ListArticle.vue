<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg8 sm12>
        <v-jumbotron
          :gradient="gradient"
          dark
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
          <v-container fill-height>
            <v-layout align-center>
              <v-flex text-xs-center>
                <h3 class="display-3">MEDIARY, Inc.</h3>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>
        <br>
        <router-view></router-view>
      </v-flex>
      <v-flex xs12 lg4 sm12>
        <h1>List Article</h1>
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
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListArticle',
  data: () => ({
    articles: [],
    gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
  }),
  methods: {
    listArticle() {
      axios.get('http://localhost:3030/articles')
        .then(({ data }) => {
          this.articles = data.resultArr
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

