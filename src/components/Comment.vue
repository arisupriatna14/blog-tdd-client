<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-title>COMMENT</v-card-title>
      <!-- <v-textarea
        box
        auto-grow
        v-model="comment"
      >
      </v-textarea> -->
      <wysiwyg v-model="comment" />
      <v-btn color="orange" @click="submitComment">Send</v-btn>
      <v-card-text v-if="this.comments">
        <div v-for="(dataComment, index) in comments" :key="index">
          {{ dataComment.user.email }}: <div v-html="dataComment.comment"></div>
          <v-btn  @click="deleteComment(index)">DELETE</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  data: () => ({
    comment: '',
    comments: '',
    token: localStorage.getItem('token'),
    articleId: localStorage.getItem('articleId'),
  }),
  methods: {
    submitComment() {
      axios({
        method: 'POST',
        url: 'http://localhost:3030/comments',
        data: {
          comment: this.comment,
          articleId: this.articleId,
        },
        headers: {
          Authorization: this.token,
        },
      })
        .then(({ data }) => {
          swal('Add comment success', '', 'success');
          this.comments.push(data.result)
        })
        .catch((err) => {
          swal('Add comment failed', '', 'error');
        });
    },
    getComment() {
      axios({
        method: 'GET',
        url: `http://localhost:3030/comments/${this.articleId}`
      })
        .then(({ data }) => {
          // console.log('get comment ==>', data)
          this.comments = data.result
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteComment(index) {
      let id = this.comments[index]._id
      console.log('ini id yang mau di delete ==>', id)
      axios({
        method: 'DELETE',
        url: `http://localhost:3030/comments/${id}`,
        headers: {
          Authorization: this.token,
        },
      })
        .then(() => {
          swal('Delete comment success', '', 'success');
          this.comments.splice(index, 1)
        })
        .catch(() => {
          swal('Delete comment failed', 'Try again!', 'error')
        })
    },
  },
  created() {
    this.getComment()
  },
  mounted() {
    this.getComment()
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
