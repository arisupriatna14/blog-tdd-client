<template>
  <div>
    <div v-if="listComments.length === 0">
      <h1>Tidak ada comments</h1>
    </div>
    <div v-for="(dataComment, index) in listComments" :key="index">
      <v-card>
        <v-card-title>
          <div>
            <v-icon dark>account_circle</v-icon>
            {{ dataComment.user.email }}
          </div>
        </v-card-title>
        <v-card-text>
          <div v-html="dataComment.comment"></div>
        </v-card-text>
        <v-card-actions>
          <v-flex offset-lg10>
            <v-btn  @click="deleteComment(index)">
              <v-icon>fa fa-trash-o</v-icon>
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data: () => ({
    listComments: [],
    url: 'http://localhost:3030/comments/',
    token: localStorage.getItem('token')
  }),
  methods: {
    getAllCommentByIdArticle() {
      axios({
        method: 'GET',
        url: this.url + this.id,
      })
        .then(({ data }) => {
          this.listComments = data.result;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteComment(index) {
      let id = this.listComments[index]._id
      axios({
        method: 'DELETE',
        url: this.url + id,
        headers: {
          Authorization: this.token,
        },
      })
        .then(() => {
          swal('Delete comment success', '', 'success');
          this.listComments.splice(index, 1);
        })
        .catch(() => {
          swal('Delete comment failed', 'Try again!', 'error');
        });
    },
  },
  created() {
    this.getAllCommentByIdArticle();
  },
  watch: {
    id() {
      this.getAllCommentByIdArticle();
    }
  }
};
</script>

<style>

</style>
