// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
import {
	$http
} from '@escook/request-miniprogram'

$http.baseUrl = 'https://asr.wtututu.top'
// $http.baseUrl = 'http://127.0.0.1:8000'

$http.beforeRequest = function(e) {
	if (e.method == 'GET')
		uni.showLoading({
			title: '数据加载ing...'
		})
}
$http.afterRequest = function() {
	uni.hideLoading()
}

Vue.prototype.$http = $http
Vue.prototype.$showMsg = function(title = '数据加载失败!', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
