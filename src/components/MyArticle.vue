<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12>
        <h1>My Article</h1>
      </v-flex>
      <v-flex xs12 sm12 md12 lg4 v-for="(article, index) in myArticles" :key="article.id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="mb-3">{{ article.title }}</h3>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange" :to="{ path: `/me/update-article/${article._id}`, params: { id: article._id } }">
              <v-icon color="white">fa fa-pencil-square-o</v-icon>
            </v-btn>
            <v-btn color="orange" @click="deleteArticle(index)">
              <v-icon color="white">fa fa-trash-o</v-icon>
            </v-btn>
            <v-btn color="orange" :to="{ path: `/me/list-comments/${article._id}`, params: { id: article._id} }">
              <v-icon color="white">fa fa-comments</v-icon>
            </v-btn>
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
import { setTimeout } from 'timers';

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
        url: 'http://blog-api.arisupriatna.com/articles/my-articles',
        headers: {
          Authorization: this.token,
        },
      })
        .then((result) => {
          this.myArticles = result.data.result;
        })
        .catch(() => {
          swal('Get my article failed. Please login', 'Try again!', 'error');
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        });
    },
    deleteArticle(index) {
      const id = this.myArticles[index]._id;
      axios({
        method: 'DELETE',
        url: `http://blog-api.arisupriatna.com/articles/${id}`,
        headers: {
          Authorization: this.token,
        },
      })
        .then(() => {
          swal('Delete articles success', '', 'success');
          this.myArticles.splice(index, 1);
        })
        .catch(() => {
          swal('Delete articles failed', 'Try again!', 'error');
        });
    },
  },
  created() {
    this.getMyArticle();
  },
};
</script>

<style>

</style>
