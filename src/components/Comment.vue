<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-title>COMMENT</v-card-title>
      <wysiwyg v-model="comment" />
      <v-flex offset-lg10>
        <v-btn color="orange" @click="submitComment">
          <v-icon color="white">fa fa-paper-plane-o</v-icon>
        </v-btn>
      </v-flex>
      <v-card-text v-if="this.comments">
        <div v-for="(dataComment, index) in comments" :key="index">
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
              <v-flex offset-lg10 v-if="dataComment.user.email === emailFromToken">
                <v-btn  @click="deleteComment(index)">
                  <v-icon>fa fa-trash-o</v-icon>
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
          <br>
        </div>
      </v-card-text>
      <v-flex style="text-align: left">
        <v-btn  :to="{ path: `/@${author}/${articleId}`, params: { id: articleId } }" style="color: black; text-decoration: none;">
          <v-icon>fa fa-chevron-left</v-icon>
        </v-btn>
      </v-flex>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  props: ['id'],
  data: () => ({
    comment: '',
    comments: '',
    token: localStorage.getItem('token'),
    articleId: localStorage.getItem('articleId'),
    author: localStorage.getItem('author'),
    url: 'http://localhost:3030/comments/',
    emailFromToken: '',
  }),
  methods: {
    getEmailFromToken() {
      this.emailFromToken = jwt.verify(this.token, process.env.VUE_APP_JWT_SECRET_KEY).email
    },
    submitComment() {
      axios({
        method: 'POST',
        url: this.url,
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
          this.comments.push(data.result);
        })
        .catch((err) => {
          swal('Add comment failed', '', 'error');
        });
    },
    getComment() {
      axios({
        method: 'GET',
        url: this.url + this.articleId,
      })
        .then(({ data }) => {
          this.comments = data.result;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteComment(index) {
      let id = this.comments[index]._id
      let commentByUser = this.comments[index].user.email
      const decoded = jwt.verify(this.token, process.env.VUE_APP_JWT_SECRET_KEY).email

      if (commentByUser === decoded) {
        axios({
          method: 'DELETE',
          url: this.url + id,
          headers: {
            Authorization: this.token,
          },
        })
          .then(() => {
            swal('Delete comment success', '', 'success');
            this.comments.splice(index, 1);
          })
          .catch(() => {
            swal('Delete comment failed', 'Try again!', 'error');
          });
      } else {
        swal('Delete failed', 'You do not have access to delete this comment!', 'warning')
      }
    },
  },
  created() {
    this.getComment();
    this.getEmailFromToken();
  },
  mounted() {
    this.getComment();
    this.getEmailFromToken();
  },
  watch: {
    id() {
      this.getComment();
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
