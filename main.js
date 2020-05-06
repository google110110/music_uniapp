import Vue from 'vue'
import App from './App'

import uniFab from '@/components/uni-fab/uni-fab.vue';
import request from 'pages/utils/request.js'
import music from 'pages/utils/music.js'
import LOGIN from 'pages/utils/login.js'
import uniIcons from "@/components/uni-icons/uni-icons.vue"
import uniHeader from '@/components/header/index.vue'
import PubFuc from'pages/utils/common'
import uniAudio from "@/components/audioo/index.vue"

Vue.config.productionTip = false

Vue.prototype.$innerAudioContext = uni.createInnerAudioContext()
Vue.prototype.$minRadio = uni.createInnerAudioContext()
Vue.prototype.$playMusic = music
Vue.prototype.$songId = 0
Vue.prototype.$pubFuc = PubFuc
Vue.prototype.$request = request
Vue.prototype.$login = LOGIN
Vue.prototype.$fab = false
// Vue.prototype.$fab = false

Vue.component('uniAudio',uniAudio)
Vue.component('uni-fab',uniFab)
Vue.component('uni-iconsd',uniIcons)
Vue.component('uni-header',uniHeader)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
