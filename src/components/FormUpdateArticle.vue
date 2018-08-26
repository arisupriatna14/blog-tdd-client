<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md10 xs12 offset-md1>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="data.title"
            color="purple darken-2"
            label="Title"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="data.author"
            color="purple darken-2"
            label="Author"
            required
          >
          </v-text-field>
          <wysiwyg v-model="data.content" />
          <br>
          <v-btn
            @click="updateArticle"
            color="green"
            style="color: white"
          >
            Update
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
  props: ['id'],
  data: () => ({
    token: localStorage.getItem('token'),
    title: '',
    author: '',
    content: '',
    data: '',
    authorArticle: localStorage.getItem('author'),
    articleId: localStorage.getItem('articleId'),
  }),
  methods: {
    dataUpdate() {
      axios({
        method: 'GET',
        url: 'http://blog-api.arisupriatna.com/articles/my-articles',
        headers: {
          Authorization: this.token,
        },
      })
        .then(({ data }) => {
          data.result.forEach((result) => {
            if (result._id === this.id) {
              this.data = {
                title: result.title,
                author: result.author,
                content: result.content,
              };
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateArticle() {
      axios({
        method: 'PUT',
        url: `http://blog-api.arisupriatna.com/articles/${this.id}`,
        headers: {
          Authorization: this.token,
        },
        data: {
          title: this.data.title,
          author: this.data.author,
          content: this.data.content,
        },
      })
        .then(() => {
          swal('Update success', '', 'success');
          this.$router.push(`/@${this.authorArticle}/${this.articleId}`);
        })
        .catch(() => {
          swal('Update failed', 'Try again!', 'error');
        });
    },
  },
  watch: {
    id() {
      this.dataUpdate();
    },
  },
  created() {
    this.dataUpdate();
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
