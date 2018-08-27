import Vue from 'vue';
import Vuetify from 'vuetify';
import wysiwyg from 'vue-wysiwyg';
import tinymce from 'vue-tinymce-editor';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import colors from 'vuetify/es5/util/colors';
import {} from 'dotenv/config';
import App from './App.vue';
import router from './router';

require('dotenv').config();

Vue.component('tinymce', tinymce);

Vue.use(wysiwyg, {
  hideModules: { bold: true },
  forcePlainTextOnPaste: true,
  maxHeight: '500px',
});

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base, // #3F51B5
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
