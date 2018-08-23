<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md10 xs12 offset-md1>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="title"
            color="purple darken-2"
            label="Title"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="author"
            color="purple darken-2"
            label="Author"
            required
          >
          </v-text-field>
          <wysiwyg v-model="myHTML" />
          <br>
          <v-btn
            @click="submit"
            color="green"
            style="color: white"
          >
            Publish
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: 'FormCreateArticle',
  data: () => ({
    author: '',
    title: '',
    content: '',
    myHTML: '',
  }),
  methods: {
    submit() {
      axios({
        method: 'POST',
        url: 'http://localhost:3030/articles',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        data: {
          title: this.title,
          author: this.author,
          content: this.myHTML,
        },
      })
        .then((result) => {
          swal('New post success publish', '', 'success');
          this.$router.push('/');
          
        })
        .catch((err) => {
          swal('Post failed to publish', 'Try again!', 'error');
        });
    },
  },

};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
