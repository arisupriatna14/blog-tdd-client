<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12>
        <h1>My Article</h1>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4 v-for="article in myArticles" :key="article.id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="mb-3">{{ article.title }}</h3>
              <p>{{ article.author }}</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" :to="{ path: `/me/update-article/${article.id}`, params: { id: article.id } }">Edit</v-btn>
            <v-btn flat color="orange" @click="deleteArticle(article.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
      <v-flex xs12 lg12 md12>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  data() {
    return {
      myArticles: [],
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    getMyArticle() {
      axios({
        method: 'GET',
        url: 'http://localhost:3030/articles/my-articles',
        headers: {
          Authorization: this.token,
        },
      })
        .then((result) => {
          result.data.result.forEach((article) => {
            this.myArticles.push({
              id: article._id,
              author: article.author,
              title: article.title,
              content: article.content,
            });
          });
        })
        .catch((err) => {
          swal('Get my article failed.', 'Try again!', 'error')
        });
    },
    deleteArticle(id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3030/articles/${id}`,
        headers: {
          Authorization: this.token,
        }
      })
        .then((result) => {
          swal('Delete articles success', '', 'success')
        })
        .catch((err) => {
          swal('Delete articles failed', 'Try again!', 'error')
        })
    },
  },
  created() {
    this.getMyArticle();
  },
};
</script>

<style>

</style>
