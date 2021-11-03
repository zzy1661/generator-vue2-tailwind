import Vue from 'vue';
// 引入全部样式
import 'vant/lib/index.less';
import '@/view/styles/index.scss';

import App from '@/view/App.vue';
import router from '@/router';

import i18n from '@/config/lang';

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
