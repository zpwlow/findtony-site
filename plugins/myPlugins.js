import Vue from 'vue'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
import moment from 'moment'
import 'moment/locale/zh-cn';
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})


