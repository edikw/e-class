<template>
		<div class="container-fluid">
			<div class="container py-5">
				<div class="row justify-content-center">
					<div class="col-12 col-lg-4 col-md-6 col-sm-8 p-0">
						<h3 class="font-weight-bold text-center">Log In</h3>
						<hr class="w-100">
						<div class="text-center" v-if="$router.history.current['path'] == '/login/verified'">
							<span class="text-success d-block pb-3">Selamat! <br>
							Akun anda sudah terverifikasi. Silahkan Login.</span>
						</div>
						<div class="text-center">
							<span class="text-danger text-center" ref="invalid"></span>
						</div>

						<form onkeypress="return event.keyCode != 13;">
							<!--  -->
							<div class="form-group">
								<label for="exampleInputEmail" class="m-0 font-weight-bold">Email/Username</label>
								<input type="text" class="form-control rounded-0 shadow-none " aria-describedby="emailHelp" name="username" ref="loginUsername" v-model="login.username" id="exampleInputEmail" autocomplete="off">
								<span class="text-danger" ref="inputWarning1"></span>
							</div>

							<div class="form-group">
								<label for="exampleInputPassword1" class="m-0 font-weight-bold">Password</label>
								<div class="input-group border">
									<input v-model="login.password" type="password" class="form-control rounded-0 shadow-none border-0" id="exampleInputPassword1" name="password" autocomplete="off" ref="loginPassword" v-on:keyup.enter="save"/>
									<div class="input-group-append">
										<span class="input-group-text bg-white border-0" id="eyes" v-on:click="showPassword"><font-awesome-icon icon="eye"/></span>
									</div>  
								</div>
								<span class="text-danger" ref="inputWarning2"></span>
							</div>

							<button type="button" class="btn btn-primary btn-md btn-block rounded-0 font-weight-bold shadow-none" id="buttonSignup" v-on:click="save" v-if="!processing">Login</button>
							<button type="button" class="btn btn-warning btn-md btn-block rounded-0 font-weight-bold shadow-none" disabled v-if="processing">Processing...</button>
							
							<div class="py-2">
								<h5 class="text-center p-2 m-0" id="magic">or</h5>
							</div>

							<button type="submit" class="btn btn-block border p-0 rounded-0" id="googleBtn"  v-on:click="googleSignIn" v-show="gRendered">
							</button>

							<div class="text-center">
								<h6 style="color: #007bff;" class="btn bg-light border-0 mt-2 shadow-none" data-toggle="modal" data-target="#exampleModalCenter">
									Forgot Password?
								</h6>
							</div>


							<div  class="text-center">
								<h6 class="font-weight-bold">Not Yet Joined?<router-link to="/signup"> Sign Up</router-link> First</h6>
							</div>
				<!-- Forgot Password Pop-up -->

							<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header align-items-center">
											<h5 class="modal-title" id="exampleModalCenterTitle">Forget Password?</h5>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<span class="text-danger" style="font-size: 12px" ref="invalid2"></span>
											<span class="text-success" style="font-size: 12px" ref="success"></span>
											<input type="email" class="form-control mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="login.email">

											<button type="button" class="col-sm-2 btn btn-warning" v-on:click="send" v-if="!processingForgot">Send</button>

											<button type="button" class=" btn btn-warning font-weight-bold" disabled v-if="processingForgot">Processing...</button>
											<small id="emailHelp" class="form-text text-muted">We're going to Send you an information link to verify your password</small>
										</div>
									</div>
								</div>
							</div>
				
						</form>
					</div>
				</div>
			</div>
		</div>
</template>

<script>

import axios from 'axios'
import App from '@/App.vue'

export default {
	name: 'login',
	data() {
		return {
			processing: false,
			processingForgot: false,
			login : {
				username: '',
				password: ''
			},
			gRendered : false,
			googleUser: null,
			urlLogin: App.data().ListUrl.urlLogin,
			loginGoogleUrl: App.data().ListUrl.urlLoginGoogle,
			forgotPasswordUrl: App.data().ListUrl.urlForgotPassword
		}
	},
	mounted() {
		// eslint-disable-next-line
		if(gapi){
			// eslint-disable-next-line
			gapi.signin2.render('googleBtn', { // this is the button "id"
					'onsuccess': this.renderGoogleBtn,
					'width': 'none',
					'longtitle': true
			})
		}

		if(localStorage.getItem('EClassToken')){
			this.$router.push('/')
		}
	},
	methods : {

		showPassword() {
				var x = this.$refs.loginPassword;
				if (x.type === "password") {
					x.type = "text"
				}else {
					x.type = "password"
				}
			},

		save() {
			this.processing = true;

			var loginUsername = this.$refs.loginUsername;
			var loginPassword = this.$refs.loginPassword;
			var inpWarning1 = this.$refs.inputWarning1;
			var inpWarning2 = this.$refs.inputWarning2;
			var invalid = this.$refs.invalid;
			var self = this;

			if(this.login.username == "") {
				inpWarning1.innerHTML = "field cannot be empty!"
				this.processing = false;
			} else {
				loginUsername.style.border = "1px solid #ccc"
						inpWarning1.innerHTML = ""
			}

			if(this.login.password == "") {
				inpWarning2.innerHTML = "field cannot be empty!"
				this.processing = false;
			} else {
				loginPassword.style.border = "1px solid #ccc"
						inpWarning2.innerHTML = ""
			}

			if(this.login.username != "" && this.login.password != "") {
				const headers = {
					'Authorization': localStorage.getItem('EClassToken'),
					'Content-Type':'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
				}

				var dataUser = {
					username: this.login.username,
					email: this.login.username,
					password: this.login.password
				}

				axios.post(this.urlLogin, dataUser, headers).then(response => {
					if(response.status === 200){
						localStorage.setItem('EClassToken', response.data.token)
						localStorage.setItem('ECLASS-id', response.data.ID)

						self.$root.$emit('isLoggedIn');
						this.processing = false;
					}
				}).catch(e=>{
					console.log('error', e.response);
					invalid.innerHTML = e.response.data.message;
					this.processing = false;
				})
			}
		},
		renderGoogleBtn(googleUser) {
				this.googleUser = googleUser;
				this.gRendered = true;
			},
		googleSignIn() {
			this.processing = true;

			var self = this
			var googleUser = this.googleUser

			const profile = googleUser.getBasicProfile();
			const token = googleUser.getAuthResponse().id_token;
			const id = profile.getId();
			const name = profile.getName();
			const imageUrl = profile.getImageUrl();
			const email = profile.getEmail();

			const params = {
				headers : {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			}

			const dataUser = {
				username: "",
				fullname: name,
				email: email,
				avatar: imageUrl,
				role: "student",
				token_expired: "",
				google_id: id,
				active: true,
				token: token,
				verified: true,
			}

			// POST GOOGLE LOGIN DATA TO BACKEND
			axios.post(this.loginGoogleUrl, dataUser, params).then(response =>{
				if(response.status == 200) {
					localStorage.setItem('EClassToken', response.data.token)
					localStorage.setItem('ECLASS-id', response.data.ID)

					self.$root.$emit('isLoggedIn');
					this.processing = false;
				}
			}).catch(e =>{
				alert("Login gagal. Jika anda pernah melakukan deaktivasi akun, silahkan cek email untuk aktivasi kembali.");
				console.log('google signin error:', e)
				this.processing = false;
			})
		},
		send() {
			var self = this
			this.processingForgot = true
			var success = this.$refs.success;
			var invalid2 = this.$refs.invalid2;

			const theemail = {
				email: this.login.email
			}

			console.log(theemail)

			const headers = {
				'Content-Type':'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type'
			}

			axios.post(this.forgotPasswordUrl, theemail, headers).then(response => {
				if(response.status === 200) {
					success.innerHTML = "Confirm link was sent to your Email"
					invalid2.innerHTML = ""
					self.processingForgot = false
				} else {
					success.innerHTML = ""
				}
			}).catch(e => {
				invalid2.innerHTML = "The Email is not registered!"
				success.innerHTML = ""
				console.log('erorrrr', e.response)
				self.processingForgot = false
			})
		}
	}
}
</script>

<style scoped>

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
</style>