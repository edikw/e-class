import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCarousel from 'vue-carousel';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faSearch, faTh, faTimes, faChevronDown, faEye,faMinus, faPlayCircle,faLock, faPlus, faCheck, faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue, VueCarousel, VueAxios, axios);

Vue.config.productionTip = false

// === Config ===
// master data lokal
var url = App.data().ListUrl
var data = {
	Newcourses: {},
	Popcourses: {},
	privacy: {},
	about: {},
	category: {}
}

var dataCount = 0;
var dataLength = 5;
var fallbacked = false;

// hanya render app beneran ketika semua data ada.
		renderApp();
function checkData(){
	if(dataCount === dataLength){
	}
}

// === Get Data ===
// eksekusi fungsi ketika dokumen sudah dimuat.
window.onload = (()=>{
	// get semua data yang dibutuhkan
	getNewCourses();
	getPopCourses();
	getPrivacy();
	getAbout();
	getCategory();
})();

function getNewCourses(){
	axios.get(url.urlNewCourses).then(res => {
		if(res.status === 200) {  
			if(res.data.status === 500){
				renderAppBak();
			}else{
				data.Newcourses = res.data.result;
				dataCount++;
				checkData();
			}
		}
	})
	.catch(err => {
		console.log(err);
		renderAppBak();
	})
}

function getPopCourses(){
	axios.get(url.urlPopCourses).then(res => {
		if(res.status === 200) {  
			if(res.data.status === 500){
				renderAppBak();
			}else{
				data.Popcourses = res.data.result;
				dataCount++;
				checkData();
			}
		}
	})
	.catch(err => {
		console.log(err);
		renderAppBak();
	})
}

function getPrivacy(){
	axios.get(url.urlPrivacy).then(res => {
		if(res.status == 200){
			if(res.data.status === 500){
				renderAppBak();
			}else{
				data.privacy = res.data.result
				dataCount++;
				checkData();
			}
		}
	})
	.catch(err => {
		console.log(err);
		renderAppBak();
	})
}

function getAbout(){
	axios.get(url.urlAbout).then(res =>{
		if(res.status == 200){
			if(res.data.status === 500){
				renderAppBak();
			}else {
				data.about = res.data.result
				dataCount++;
				checkData();
			}
		}
	})
	.catch(err => {
		console.log(err);
		renderAppBak();
	})
}

function getCategory(){
	axios.get(url.urlCategory).then(res =>{
		if(res.status ==200){
			if(res.data.status === 500){
				renderAppBak();
			}else{
				data.category = res.data.result
				dataCount++;
				checkData();
			}
		}
	})
	.catch(err => {
		console.log(err);
		renderAppBak();
	})
}

// === Render ===
function renderApp(){
	new Vue({
		// data: () => {return data},
		router,
		render: h => h(App)
	}).$mount('#app')
}

function renderAppBak(){
	if(fallbacked === false){
		fallbacked = true;

	// new Vue({
	//   data: () => {return data},
	//   router,
	//   render: h => h(App)
	// }).$mount('#app')

		// console.clear();
		console.log('render backup app');
	}
}