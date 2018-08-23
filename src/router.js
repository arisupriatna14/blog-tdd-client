import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ArticleDetail from './components/ArticleDetail.vue';
// import ListArticle from './views/ListArticle.vue';
import FormUpdateArticle from './components/FormUpdateArticle.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/:author/:id',
        props: true,
        component: ArticleDetail,
      }],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue'),
    },
    {
      path: '/new-story',
      name: 'form',
      component: () => import('./components/FormCreateArticle.vue'),
    },
    {
      path: '/me',
      name: 'myarticle',
      component: () => import('./components/MyArticle.vue'),
      children: [{
        path: '/me/update-article/:id',
        props: true,
        component: FormUpdateArticle,
      }],
    },
  ],
});
