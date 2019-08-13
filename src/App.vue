<template>
	<div id="app" class="bg-light" v-on:click="exit">
		<!-- Mobile Sidebar -->
		<div class="sidebar">
			<div class="sidebar-menu bg-light" ref="sidebarMenu">
				<ul class="list-group">
					<li class="list-group-item active text-right rounded-0">
						<font-awesome-icon icon="times" size="lg" v-on:click="openSidebar" class="shadow-none" />
					</li>
					<li class="list-group-item p-0" v-if="isLoggedIn">
						<div class="col-lg-4 d-lg-block text-center p-3">
							<button class="avatar" type="button">
							<img :src="profileImg" v-if="profileImg">
							</button>
						</div>
						<div v-on:click="openSidebar">
							<router-link class="text-dark" to="/profile" v-on:click="openSidebar"><li class="list-group-item">Profile
							</li></router-link>
						</div>
						<div v-on:click="openSidebar">
							<router-link class="text-dark" to="/mycourses"><li class="list-group-item">My Courses
							</li></router-link>
						</div>
						<div v-on:click="openSidebar">
							<span class="border-0 bg-white" v-on:click="logout"><li class="list-group-item">Log Out
							</li></span>
						</div>
					</li>
					<template v-if="!isLoggedIn">
						<router-link to="/login"><li class="list-group-item list-group-item-action font-weight-bold text-primary">Log In</li></router-link>
						<router-link to="/signup"><li class="list-group-item list-group-item-action font-weight-bold text-primary">Sign Up</li></router-link>
					</template>
					<li class="list-group-item list-group-item-action d-flex justify-content-between font-weight-bold" v-on:click="openCategory">Categories<font-awesome-icon icon="chevron-down" size="lg" /></li>
					<li class="mobile-category list-group-item" ref="mobileCategory" style="display: none">
						<ul class="list-group list-group-flush" v-for="category in categories" :key="category.name">
							<div v-on:click="openSidebar">
								<a v-on:click="sendCategory(category.name)"><li class="list-group-item">{{category.name}}</li></a>
							</div>
						</ul>
					</li>
				</ul>
			</div>
			<div class="sidebar-bg" ref="sideBar">
			</div>
		</div>

		<!-- end -->

		<!-- Header -->

		<div class="header position-relative bg-white">
			<div class="navbar navbar-expand-lg align-items-center p-2">
				<button class="navbar-toggler shadow-none" type="button" v-on:click="openSidebar">
					<font-awesome-icon icon="bars" />
				</button>
				<div class="col-4 col-sm-3 col-lg-1 logo text-center text-lg-left d-flex justify-content-center">
					<router-link to="/"><img class="eclass-logo" src="./assets/Eclass-logo.png"></router-link>
				</div>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<font-awesome-icon icon="search" />
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<!-- <div class="col-4 col-sm-3 col-lg-1 logo text-center text-lg-left d-flex justify-content-center">
						<router-link to="/"><img class="eclass-logo" src="./assets/Eclass-logo.png"></router-link>
					</div> -->
					<div class="col-lg-2 category d-none d-lg-block">

						<div class="dropdown">
							<button class="btn shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
								<div class="category-header">
									<font-awesome-icon icon="th" />
									<span class="text-secondary">Categories</span>
								</div>
							</button>
							<div>
								<ul class="dropdown-menu multi-level rounded-0 border-0 m-0 pb-2 p-0 shadow-sm" role="menu" aria-labelledby="dropdownMenu">
									<li class="dropdown-submenu pt-2 p-0" v-for="category in categories" :key="category.aid">
										<a class="dropdown-item" tabindex="-1" v-on:click="sendCategory(category.name)">{{category.name}}
										</a>
										<ul class="dropdown-menu rounded-0 border-0 m-0 p-0 pb-2 h-100 shadow-sm">
											<li class="dropdown-submenu pt-2 p-0" v-for="sub in category.subs" :key="sub.number">
												<a class="dropdown-item" tabindex="-1" v-on:click="sendSubcategory(sub.name)">{{sub.name}}</a> 
												<ul class="dropdown-menu dropdown-menu rounded-0 border-0 m-0 p-0 pb-2 h-100">
													<li class="pt-2 p-0" v-for="topic in sub.topics" :key="topic">
														<a class="dropdown-item" v-on:click="sendTopic(topic)">{{topic}}
														</a>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-lg-6 my-4 my-lg-0">
						<div class="input-group border rounded bg-white">
							<input type="text" class="form-control shadow-none" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="searching" v-on:keyup="ListSearch" @keypress.13.prevent="enter">

							<div class="input-group-append">
								<button class="btn rounded-0 shadow-none" type="button" v-on:click="search">
									<!-- anda di rute search -->
									<font-awesome-icon icon="search" v-bind:disabled="disableding" />
								</button>
							</div>
						</div>
						<div class="list bg-white border rounded position-absolute w-100" v-if="outputSearch.length > 0" style="z-index: 999; left: 0;" ref="exit">
							<div class="px-2">
								<p class="py-3 m-0 border-bottom text-dark font-weight-bold">Result For {{searching}}</p>
								<p class="text-primary m-0 py-2 border-bottom" style="cursor: pointer;" id="Sugestion" v-for="(list, i) in outputSearch" :key="i" v-on:click="searchSugestion(list)">{{list.title}} || {{list.subtitle}}</p>
							</div>
						</div>
					</div>

					<div class="col-lg-4 d-none d-lg-block text-right " v-if="isLoggedIn">
							<div class="dropdown d-inline-flex">
							<button class="avatar" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<img :src="profileImg" v-if="profileImg">
							</button>
							<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
								<router-link class="dropdown-item" to="/profile">Profile</router-link>
								<router-link class="dropdown-item" to="/mycourses">My Courses</router-link>
								<button type="submit" class="dropdown-item" v-on:click="logout">Log Out</button>
							</div>
						</div>
					</div>
					<div class="col-lg-4 text-right user d-none d-lg-block" v-if="!isLoggedIn">
						<router-link to="/login" class="btn btn-warning rounded-0 font-weight-bold" style="margin-right: 7px">Login</router-link>
						<router-link to="/signup" class="btn btn-warning rounded-0 font-weight-bold">Sign Up</router-link>
					</div>
				</div>
			</div>
		</div>

		<!-- end -->

		<router-view :key="$route.fullPath"/>

		<!-- footer -->

		<div class="footer p-0">
			<div class="footer-top">
				<div class="container-fluid">
					<div class="row p-0 p-lg-5 p-md-5">
						<div class="col-lg-4 my-3">
							<h1>About E-Class</h1>
							<p>{{about}}</p>
						</div>
						<div class="col-lg-4 my-3">
							<h1>Follow Us</h1>
							<div class="col-12 d-flex justify-content-around">
								<a href="https://www.instagram.com/doesofficial" target="_blank"><img v-bind:src="google"></a>
								<a href="https://www.instagram.com/doesofficial" target="_blank"><img v-bind:src="fb"></a>
								<a href="https://www.instagram.com/doesofficial" target="_blank"><img v-bind:src="instagrams"></a>
								<a href="https://www.instagram.com/doesofficial" target="_blank"><img v-bind:src="twitter"></a>
							</div>
						</div>
						<div class="col-lg-4 my-3">
							<h1>Does University</h1>
							<p>Soekamtiland<br> Area Sawah, Sidoarum<br>
							Kecamatan Godean Kabupaten Sleman Yogyakarta 55264 Indonesia</p>
						</div>
					</div>
					<div class="p-1 px-2 px-lg-5 text-right">
						<router-link class="mr-3 text-white" to="/contact">Contact Us</router-link>
						<router-link class="text-white" to="/privacy-policy">Privacy Policy</router-link>
					</div>
				</div>
			</div>
			<div class="footer-bottom">
				<div class="container-fluid">
					<div class="wrapper">
						<span>2018 Does Programmer GEN 5. All Rights Reserved</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'

	import router from './router'
	// var mainUrl = 'https://eclass-does.herokuapp.com/'
	// var mainUrl = 'http://192.168.2.231:3000/'
	var mainUrl = 'https://eclass.doesuniversity.com/'
	// var mainUrl = 'http://192.168.2.120:3000/'
	// var mainUrl =  'http://192.168.137.32:3000/'

	var ListUrl = {

		/* HEROKU (Master Backend KW) */
		// ==============================
		// urlCommentCourse: mainUrl + 'v1/commentcourse/',
		urlCommentCourse: mainUrl + 'v1/commentcoursereal/',
		urlCommentAll: mainUrl + 'v1/comments',
		urlAddComment: mainUrl + 'v1/comment',
		urlCommentByid: mainUrl + 'v1/komentar/',
		urlReplyComment: mainUrl + 'v1/reply/',
		urlAbout: mainUrl + 'v1/about',
		urlNewCourses: mainUrl + 'v1/newcourses',
		urlPopCourses: mainUrl + 'v1/popularcourses',
		urlCoursesPage: mainUrl + 'v1/searchcourses',
		UrlCoursesByid: mainUrl + 'v1/course/',
		urlCategorySearch: mainUrl + 'v1/searchcategories',
		urlSubSearch: mainUrl + 'v1/searchsubcat',
		urlTopicSearch: mainUrl + 'v1/searchtopic',
		UrlJoinCourse: mainUrl + 'v1/joincourse/',
		UrlUnjoinCourse: mainUrl + 'v1/unjoincourse/',
		urlUser: mainUrl + 'v1/user/',
		urlUserAll: mainUrl + 'v1/users',
		urlCategory: mainUrl + 'v1/categories',
		urlRegister: mainUrl + 'v1/register',
		urlRegisterGoogle: mainUrl + 'v1/registergoogle',
		urlLogin: mainUrl + 'v1/login',
		urlLoginGoogle: mainUrl + 'v1/logingoogle',
		urlForgotPassword:mainUrl + 'v1/forgotpassword',
		urlEditProfile: mainUrl + 'v1/editprofile/',
		urlAvatar: mainUrl + 'v1/uploadavatar',
		urlDeactive: mainUrl + 'v1/deactivate',
		urlChangePassword: mainUrl + 'v1/changepassword',
		urlResetPassword: mainUrl + 'v1/resetpassword/',
		urlConfirmation: mainUrl + 'v1/confirmation/',
		urlToken: mainUrl + 'v1/checktoken/',
		urlDeleteComment: mainUrl + 'v1/comment/',
		urlDeletReply: mainUrl + 'v1/reply/',
		urlContact: mainUrl + 'v1/contact',
		urlPrivacy: mainUrl +  'v1/privacypolicy'
	}

	
	export default {
		name:"app",
		data () {
			return {
				searching: '',
				disableding : true,
				outputSearch: [],
				ListUrl: ListUrl,
				profileImg: null,
				isLoggedIn: false,
				dataCourse : null,
				searchResult: null,
				dataUser: [],
				categories: [],
				about: null,
				google: require('./assets/google-plus.png'),
				fb: require('./assets/facebook.png'),
				instagrams: require('./assets/instagram.png'),
				twitter: require('./assets/twitter.png')
			}
		},

		mounted() {
			var self = this;

			this.route = this.$route.name;

			// Check token
			if(localStorage.getItem('EClassToken')){
				this.isLoggedIn = true
			}
			
			// Get users
			// Logged In Listener
			this.$root.$on('isLoggedIn', function(){
				self.isLoggedIn = true;
				self.getUserData();
				self.$router.push('/');
			})

			if(this.isLoggedIn){
				this.getUserData();
			}

			// Logged Out Listener
			this.$root.$on('isLoggedOut', function(){
				self.logout();
			})

			// Data Getter
			this.getCourses();
			this.getCategories();
			this.getAbout();
		},
		methods: {
			ListSearch(){
				if(this.searching.length >= 3 && this.searching.length <=10){
				this.outputSearch = []
					var data = {
						search: this.searching.toLowerCase()
					}

					axios.post(this.ListUrl.urlCoursesPage, data).then(res => {
						this.outputSearch = []
						res.data.result.map( data => {
							this.outputSearch.push(data)
						})
					});
				}
				if(this.searching.length == 0){
					this.$refs.exit.className = 'd-none'
				}
			},
			exit(){
				if(this.searching != ''){
					if(this.searching.length >= 3){
						this.$refs.exit.className = 'd-none'
						this.searching = ''
					}
					this.searching = ''
				}
			},
			sendTopic(topic){
				if(this.$route.name != 'selected-topic'){
					this.$router.push({
						name: 'selected-topic',
						path: '/selected/subcategory/topic/',
						params: {name: topic}
					})
				}else {
					this.$router.push({
						params: {name: topic}
					})
				}
			},
			sendSubcategory(subcategory){

				if(this.$route.name != 'selected-subcategory'){
					this.$router.push({
						name: 'selected-subcategory',
						path: '/selected/subcategory/',
						params: {name: subcategory}
					})
				}else {
					this.$router.push({
						params: {name: subcategory}
					})
				}
			},
			sendCategory(category){
				console.log('category dari App', category)

				if(this.$route.name != 'selected'){
					this.$router.push({
						name: 'selected', 
						path:'/selected/', 
						params: {name: category}
					})
				}else{
					this.$router.push({
						params: {name: category}
					})
				}
			},
			enter(e){
				if(e.keyCode===13) {
					this.search()
				}
				if(this.searching.length >= 3){
					this.exit()
				}
			},
			search(){
				if(this.searching.length > 0){
					if(this.$route.path != '/search/'){
						this.$router.push({ name: "search", query: {keyword: this.searching}});
					}else {
						this.$router.push({
							query: {keyword: this.searching}
						})
					}
					this.disableding = false;
				}
			},
			searchSugestion(e){
				if(this.$route.path != '/search/'){
					this.$router.push({ name: "search", query: {keyword: e.title}});
				}else {
					this.$router.push({ query : {keyword : e.title}
					})
				}
			},

			getAbout(){
				this.about = router.app.about
			},

			getCourses(){
				this.dataCourse = router.app.courses
			},

			getCategories(){
				this.categories = router.app.category
			},

			getUserData(){

				var EclassId = localStorage.getItem('ECLASS-id');
				const headers = {
					'Content-Type':'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
				}
				axios.get(this.ListUrl.urlUser + EclassId, headers).then(res => {
					if(res.status === 200) {
						this.dataUser.push(res.data.userData)
						this.profileImg = res.data.userData.avatar;
					}
				});
			},
			openSidebar() {
				var x = this.$refs.sideBar;
				var y = this.$refs.sidebarMenu;

				if (y.style.width === '70%' && x.style.display == 'block') {
					x.style.display = 'none';
					y.style.width = '0px';
				} else {
					x.style.display = 'block';
					y.style.width = '70%';
				}
			},

			openCategory() {
				var z = this.$refs.mobileCategory;

				if (z.style.display === 'none') {
					z.style.display = 'block';
				} else {
					z.style.display = 'none';
				}
			},

			logout() {
				// remove user from local storage to log user out
				localStorage.clear();
				this.isLoggedIn = false;
				this.$router.push('/');
				window.location.reload();
			},

		}
	}
	
</script>

<style>

/*@import url('https://fonts.googleapis.com/css?family=Cantata+One');*/


.courses-header {
	font-family: 'Cantata One', serif;
}

* {
	outline: none !important;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;

}

h1, h2, h3, h4, h5, h6, p {
	padding: 0;
	margin: 0;
}

a {
	text-decoration: none;
}
li a:hover{
	text-decoration: none;
}

button:focus {
	outline: none;
}

/*Mobile Sidebar*/
.sidebar {
	width: 100%;
}

.sidebar-bg {
	width: 100%;
	z-index: 100;
	height: 100vh;
	position: fixed;
	background-color: #00000080;
	z-index: 20;
	display: none;
	transition: display .5s ease;
}

.sidebar-menu {
	position: fixed;
	width: 0px;
	height: 100vh;
	transition: width .5s ease;
	z-index: 30;
	overflow-y: scroll;
	box-shadow: 0 0 10px #000000
}

.mobile-category {
	display: none;
}

.mobile-category ul li a {
	color: #495057;
}

/*end*/

.header {
	width: 100%;
	background-color: #000;
	padding: 0;
	margin: 0;
}

.dropdown .btn {
	background-color: transparent;
}

.btn .focus, .btn:focus {
	box-shadow: none;
}

.input-group:focus {
	border: 1px solid #ccc;
}

.input-group input, .input-group button {
	border: none;
	background-color: #fff;
}

.spacer {
	flex: 1;
}

.wrapper {
	display: flex;
	align-items: center;
}

.logo h2 {
	font-family: cursive;
	color: #228eff;
	font-weight: bold;
	margin: 0;
}
.logo a {
	padding: 0;
}

.logo a:hover {
	text-decoration: none;
}

.search input, .search button {
	display: flex;
	align-items: center;
}

.search input, .search button {
	padding: 10px;
	background-color: #e4e4e4;
}

.category {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.category ul li span {
	color: #000;
}

.category .category-header{
	display: flex;
	align-items: center;
}

.category .categoryspan {
	color: #818181;
	font-size: 16px;
}

.category svg {
	font-size: 25px;
	color: #c1c1c1;
	margin-right: 7px;
}

.search button:hover {
	background-color: #FFBD3A;
}

.dropdown-item:hover, .dropdown-item:focus {
	color: #0091ff;
	background-color: none;
}

.dropdown-submenu>.dropdown-menu {
	top: 0;
	left: 100%;
}

.dropdown-submenu:hover>.dropdown-menu {
	display: block;
}

.dropdown-submenu>a:after {
	display: block;
	content: "";
	float: right;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
	border-width: 5px 0 5px 5px;
	border-left-color: #ccc;
	margin-top: 5px;
	margin-right: -10px;
}

.row .col h1 {
	font-size: 33px;
}

.col-course {
	background-color: #fff;
	margin: 10px;
	border-radius: 3%;
	border: 1px solid #ccc;
}

.col-course:hover, .card:hover {
	box-shadow: 0 0 10px #00000050;
}

.rowcourse {
	width: 80%;
}

.new-course .col-course h5 {
	font-weight: bold;
}

.thumbnail {
	height: 200px;
	position: relative;
	overflow: hidden;
	border-top-right-radius: 3%;
	border-top-left-radius: 3%;
}

.thumbnail img {
	position: absolute;
}

.avatar img, .avatarSidebar img {
	width: 100%;
	position: absolute;
	top: 50%;
	left: 0;
	transform: translate(0, -50%);

}
.avatar{
	width: 45px;
	height: 45px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid #ccc;
	display: inline-block;
	position: relative;
	overflow: hidden;
}
.avatarSidebar {
	width: 60px;
	height: 60px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid #ccc;
	display: inline-block;
	position: relative;
	overflow: hidden;
}

.footer {
	width: 100%;
	padding: 0;
}

.footer-top {
	width: 100%;
	background-color: #0a172f;
	color: #fff;
	display: flex;
	justify-content: center;
}

.footer-top .wrapper {
	display: flex;
	justify-content: space-between;
}

.footer-top .wrapper .row {
	width: 30%;
	display: inline-block;
}

.footer-top .wrapper .row {
	padding: 40px 20px;
}

.footer-top .wrapper .row h1 {
	font-size: 26px;
	margin-bottom: 15px;
	font-weight: bold;
}

.footer-top .wrapper .row p {
	font-size: 16px;
	font-family: 'Playfair Display', serif;
}


.footer-bottom {
	width: 100%;
	background-color: #228eff;
	padding: 10px 0;
	color: #fff;
	display: flex;
	justify-content: center;
}

.footer-bottom span {
	font-size: 14px;
	font-weight: bold;
}

.eclass-logo {
	width: 100px;
}

span {
	cursor: pointer;
}
#Sugestion:hover {
	background-color: #f1f1f1;
	border-radius: 5px;
}
</style>
