<template>
	<div class="container-fluid" id="signuppage">
		<div class="container py-5">
			<div class="row justify-content-center">
				<div class="col-12 col-lg-4 col-md-6 col-sm-8 p-0">
					<h3 class="font-weight-bold text-center">Sign Up</h3>
					<hr class="w-100">
					<form class="form-group text-left" ref="register_form" v-on:keyup.enter="keyDisabled">
			
				<!-- FORM FIELDS -->
						<div class="form-field">
							<label for="username">Username</label>
							<input 
								autocomplete="off" 
								id="username"
								ref="input_username"
								type="text"
								v-model="username" 
							>
							<span ref="alert_username"></span>
						</div>

						<div class="form-field">
							<label for="fullname">Fullname</label>
							<input 
								autocomplete="off" 
								id="fullname"
								ref="input_fullname"
								type="text"
								v-model="fullname" 
							>
							<span ref="alert_fullname"></span>
						</div>

						<div class="form-field">
							<label for="birthday">Birthday</label>
							<input 
								autocomplete="off" 
								id="birthday"
								ref="input_birthday"
								type="date"
								data-provide="datepicker"
								v-model="birthday" 
							>
							<span ref="alert_birthday"></span>
						</div>

						<div class="form-field">
							<label for="gender">Gender</label>
							<select 
								v-model="gender"
								ref="input_gender"
								class="custom-select form-control rounded-0 shadow-none border" autocomplete="off" 
								id="gender">
								<option>Male</option>
								<option>Female</option>
							</select>
							<span ref="alert_gender"></span>
						</div>

						<div class="form-field">
							<label for="email">Email</label>
							<input 
								autocomplete="off"
								id="email"
								ref="input_email"
								type="text"
								v-model="email" 
							>
							<span ref="alert_email"></span>
						</div>

						<div class="form-field">
							<label for="password">Password</label>
							<input 
								autocomplete="off"
								id="password"
								ref="input_password"
								type="password"
								v-model="password" 
							>
							<span ref="alert_password"></span>
						</div>

						<div class="form-field">
							<label for="confirmpassword">Confirm Password</label>
							<input 
								autocomplete="off"
								id="confirmpassword"
								ref="input_confirmpassword"
								type="password"
								v-model="confirmpassword"
							>
							<span ref="alert_confirmpassword"></span>
						</div>
					</form>

						<button type="button" class="btn btn-primary btn-md btn-block rounded-0 font-weight-bold" id="buttonSignup" v-on:click="signup" v-if="!processing">Sign Up</button>

						<button type="button" class="btn btn-warning btn-md btn-block rounded-0 font-weight-bold" disabled v-else>Processing...</button>

						<div class="py-2">
							<h5 class="text-center p-2 m-0" id="magic">or</h5>
						</div>
						<button class="btn btn-block p-0 rounded-0 font-weight-bold" id="google-signin-btn" v-on:click="googleSignIn" v-show="gerendered"></button>
						<div  class="text-center p-2">
							<h6 class="font-weight-bold">Already Joined?<router-link to="/login" class="mr-1 ml-1">Log In</router-link>Now</h6>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VueAxios from 'vue-axios'
	import axios from 'axios'
	import Vue from 'vue'
	import App from '@/App.vue'

	Vue.use(VueAxios, axios)

	export default {
		data() {
			return {
				processing: false,
				username: '',
				fullname: '',
				birthday: '',
				gender: '',
				email: '',
				password: '',
				confirmpassword: '',
				gerendered : false,
				googleUser: null,
				register: App.data().ListUrl.urlRegister,
				registerGoogle: App.data().ListUrl.urlRegisterGoogle,
				loginGoogleUrl: App.data().ListUrl.urlLoginGoogle,
			}
		},
		mounted() {
			// Styling
			document.querySelectorAll('label').forEach(l=> l.classList.add('font-weight-bold', 'm-0'));
			document.querySelectorAll('.form-field').forEach(f=> {
				f.classList.add('p-0', 'mb-2');
				f.querySelector('span').classList.add('text-danger', 'font-weight-normal');
			});
			this.$refs.register_form.querySelectorAll('input').forEach(l => l.classList.add('form-control', 'rounded-0', 'shadow-none', 'border'));

			// Google Button

			// eslint-disable-next-line
			if(gapi){
				// eslint-disable-next-line
				gapi.signin2.render('google-signin-btn',{
					'onsuccess': this.renderGoogleBtn,
					'width':'none',
					'longtitle':true,
					'height': 40
					})
			}
				
		},
		methods: {
			keyDisabled(e){
				var key;
				if(window.event){
					key = window.event.keyCode;
				}else {
					key = e.which;
				}
				if(key == 13){
					return false;
				}else{
					return true;
				}
			},
			isValid(key){
				if(key === '' || key.length < 5){
					return false
				}else{
					return true
				}
			},
			signup() {

				this.processing = true;

				if(
					// Username
					// ---------------------------------------- 
					this.validate('username', this.username, this.$refs.input_username, this.$refs.alert_username) &&

					// Fullname
					// ----------------------------------------
					this.validate('fullname', this.fullname, this.$refs.input_fullname, this.$refs.alert_fullname) &&

					// Birthday
					// ----------------------------------------
					this.validate('birthday', this.birthday, this.$refs.input_birthday, this.$refs.alert_birthday) &&

					// Gender
					// ------------------------------------
					this.validate('gender', this.gender, this.$refs.input_gender, this.$refs.alert_gender) &&

					// Email
					// -------------------------------------
					this.validate('email', this.email, this.$refs.input_email, this.$refs.alert_email) &&

					// Password
					// ----------------------------------
					this.validate('password', this.password, this.$refs.input_password, this.$refs.alert_password) &&

					// Confirm Password
					// --------------------------------------
					this.validate('confirmpassword', this.confirmpassword, this.$refs.input_confirmpassword, this.$refs.alert_confirmpassword)
				){
					this.post();
				}else{
					console.log('form not valid')
					this.processing = false;
				}
			},
			post() {
				var userText;
				var emailText;

				var headers = {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
						}
					var dataUser = {
							username: this.username.toLowerCase(),
							fullname: this.fullname,
							birthday: this.birthday,
							gender: this.gender,
							password: this.password,
							email: this.email.toLowerCase(),
							avatar: null,
							role: null,
							token: null,
							token_expired:null,
							google_id: null,
							active: true,
							verified: false,
					}
					console.log('data yang dikirim', dataUser)
					axios.post(this.register, dataUser, headers)
					.then((response) => {
						if (response.status === 200) {
						console.log('response:', response)
						alert('Selamat! Pendaftaran berhasil!. Silahkan Check Email Untuk Verifikasi Account');
						// Redirect Ke login Tinggal di Uncomment Code di bawah
						this.$router.push('/login')
						}else {
						throw new Error("Error");
							// response.status = 200;
					}
					this.processing = false;
				}).catch(e => {
					alert('Mohon maaf, pendaftaran belum berhasil. Silahkan coba kembali.');
					console.log('[ERROR]: ', e.response);
					if(e.response.data.message == 'Username already exist'){
						userText = e.response.data.message

						this.$refs.alert_username.innerHTML = userText;
								this.$refs.input_username.className = "form-control rounded-1 shadow-none border-danger"
								this.processing = false;
								return false;
					} 
					if( e.response.data.message == 'Email already exist') {
						emailText = e.response.data.message
						this.$refs.alert_email.innerHTML = emailText;
								this.$refs.input_email.className = "form-control rounded-1 shadow-none border-danger"
						this.processing = false;
								return false;
					}
				});
			},

			renderGoogleBtn(googleUser) {
				this.googleUser = googleUser;
				this.gerendered = true;
			},
			googleSignIn() {

				let self = this;
						const profile = this.googleUser.getBasicProfile();
				const token = this.googleUser.getAuthResponse().id_token;
				const id = profile.getId();
				const name = profile.getName();
				const imageUrl = profile.getImageUrl();
				const email = profile.getEmail();

				const dataUser = {
							username: "",
							token: token,
							fullname: name,
							email: email,
							avatar: imageUrl,
							role: "student",
							// token_expired:"",
							google_id: id,
							active: true,
							verified: true,
						}

				const params = {
					headers : {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Access-Control-Allow-Origin': '*'
						}
				}


						// POST GOOGLE USER DATA TO BACKEND
				axios.post(this.registerGoogle, dataUser, params).then((response) => {
					if (response.status === 200) {
					console.log('google register success:', response)
					alert('Selamat! Anda berhasil terdaftar!');
					
					// Langsung login
					googleLogin();
					
					// this.$router.push('/');
					}else {
					throw new Error("Error");
						// response.status = 200;
					} 
				}).catch(e => {
					alert('Mohon maaf, pendaftaran belum berhasil.');
					console.log('google register error: ', e.response);
				});

				function googleLogin(){
					// POST GOOGLE LOGIN DATA TO BACKEND
					axios.post(self.loginGoogleUrl, dataUser, params).then(response => {
						if(response.status == 200) {
							console.log('google signin success: ',response);
							localStorage.setItem('EClassToken', response.data.token)
							localStorage.setItem('ECLASS-id', response.data.ID)

							self.$root.$emit('isLoggedIn');
						}
					}).catch(e =>{
						console.log('google signin error:', e)
					})
				}
			},
			validate(key, val, input, alert){
				var alphabets = /^[a-zA-Z-0-9]+$/;
				var space = /^[a-zA-Z-0-9\s]+$/;
				var result = true;

				if(val === ''){
					let redkey = key;
					if(key == 'confirmpassword'){
						redkey = 'confirm password';
					}
					red("please fill the " + redkey + " field");
				}else{

					// Birthday & Gender cuma di cek kosongnya aja

					// Username
					if(key == 'username'){
						if(
							val.length < 6 || 
							val.length > 15 ||
							!(alphabets.test(val))
							){

							if(val.length < 6 || val.length > 15){
								red("username must be between 6 and 15");
							}
							else if(!(alphabets.test(val))){
								red("only alphabet and number, no space and symbol");
							}
						}else{
							clear();
						}
					}

					// Fullname
					else if(key == 'fullname'){
						if(!(space.test(val))){
							red("only alphabet and number");
						}else{
							clear();
						}
					}

					// Email
					else if(key == 'email'){
						if(val.indexOf('@')<= 0){
							red("@ invalid position");
						}else{
							clear();
						}
					}

					// Password
					else if(key == 'password'){
						if(val.length < 8){
							red("password length minimal 8 character");
						}else{
							clear();
						}
					}

					// Confirm Password
					else if(key == 'confirmpassword'){
						if(val != this.password){
							red("password not match");
						}else{
							clear();
						}
					}

					else{
						clear();
					}
				}

				function clear(){
					alert.innerHTML = "";
					input.className = "form-control rounded-0 shadow-none border border-success";
				}
				function red(msg){
					input.className = "form-control rounded-1 shadow-none border-danger";
					alert.innerHTML = msg;
					result = false;
				}

				return result;

				// validate method end
			}
		},
		watch: {
			username(val){
				this.validate('username', val, this.$refs.input_username, this.$refs.alert_username);
			},
			fullname(val){
				this.validate('fullname', val, this.$refs.input_fullname, this.$refs.alert_fullname);
			},
			birthday(val){
				this.validate('birthday', val, this.$refs.input_birthday, this.$refs.alert_birthday);
			},
			gender(val){
				this.validate('gender', val, this.$refs.input_gender, this.$refs.alert_gender);
			},
			email(val){
				this.validate('email', val, this.$refs.input_email, this.$refs.alert_email);
			},
			password(val){
				this.validate('password', val, this.$refs.input_password, this.$refs.alert_password);
			},
			confirmpassword(val){
				this.validate('confirmpassword', val, this.$refs.input_confirmpassword, this.$refs.alert_confirmpassword);
			}
		}
	}
</script>

<style scoped>
	.signupComponent {
		background-color: #f1f1f1;
	}
	.signup {
		border-bottom: .05rem solid #e5e5e5;
	}

	#google {
		background-color: #fff; 
	}
	#googleImg {
		width: 25px;
		margin-right: 15px;

	}
	#buttonSignup {
		background-color: #5384bc;
	}

	/* Custom page footer */
	.footer {
		padding-top: 1.5rem;
		color: #777;
		border-top: .05rem solid #e5e5e5;
	}

	#magic {
		position: relative;
	}

	#magic:before,
	#magic:after {
		content: '';
		height: 1px;
		background-color: #aaa;
		width: 45%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	#magic:before {
		left: 0;
	}

	#magic:after {
		right: 0;
	}
	span {
		cursor: pointer;
	}
	#google-signin-btn {
		width: 100%;
	}
</style>