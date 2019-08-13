<template>
	<div class="container-fluid">
		<div class="container py-5">
		<div class="row justify-content-center py-5">
			<div class="col-12 col-lg-4 col-md-6 col-sm-8 py-3" v-if="confirmed">
				<h3 class="font-weight-bold text-center">Reset Password</h3>
				<hr class="w-100">
				<form>
					<div v-if="show">
						<div class="alert alert-warning text-center" role="alert">
							<strong>Hallo!</strong> Your Reset Password Success.Please Click <router-link to="/login">Login</router-link> 
						</div>
					</div>
					<div class="form-group">
						<label for="newPassword">New Password</label>
						<input type="password" class="form-control rounded-0 shadow-none" ref="newPassword" v-model="password.new">
						<span class="text-danger" style="font-size: 12px" ref="inputWarning1"></span>
					</div>
					<div class="form-group">
						<label for="confirmNewPassword">Confirm New Password</label>
						<input type="password" class="form-control rounded-0 shadow-none" ref="confirmNewPassword" v-model="password.confirmNew">
						<span class="text-danger" style="font-size: 12px" ref="inputWarning3"></span>
						<span class="text-danger" style="font-size: 12px" ref="inputWarning2"></span>
					</div>
					<button type="button" class="btn btn-primary btn-md btn-block rounded-0 font-weight-bold shadow-none" v-on:click="save">Save New Password</button>
				</form>
			</div>
			<div class="col-12 col-lg-4 col-md-6 col-sm-8 py-3" v-else>
				<p>Token Required. Please Check Your Email. </p>
			</div>
			
		</div>
		</div>
	</div>

</template>

<script>

import axios from 'axios'
import App from '@/App'

export default {
	data() {
		return {
			password : {
				new: '',
				confirmNew: ''
			},
			token: null,
			dataToken: null,
			urlResetPassword: App.data().ListUrl.urlResetPassword,
			urltoken: App.data().ListUrl.urlToken,
			confirmed: false,
			show: false,

		}
	},
	mounted(){
		const params = {
			headers : {
			'x-access-token': this.$route.params.token,
			'Content-Type':'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
			}
		}

		// check token
		axios.post(this.urltoken, {}, params).then(res=>{
			if(res.data.code === 200){
				this.token = this.$route.params.token;
				this.dataToken = res.data.decoded;
				this.confirmed = true;
				console.log('check token selesai', this.token)
			}else{
				console.log('check token error', res)
				alert('Token is not valid. Redirect to home.');
				this.$router.push('/');
			}
		})
		console.log(this.$route.params.token)
	},
	methods : {
		save() {
			var self = this;
			var newPassword = this.$refs.newPassword;
			var confirmNewPassword = this.$refs.confirmNewPassword;
			var inputWarning1 = this.$refs.inputWarning1;
			var inputWarning2 = this.$refs.inputWarning2;

			if(this.password.new == '') {
				newPassword.style.borderBottom = "1px solid red"
				inputWarning1.innerHTML = "field cannot be empty!"
			} else {
				newPassword.style.borderBottom = "1px solid #28a745"
				inputWarning1.innerHTML = ""
			}

			if(this.password.confirmNew == '') {
				confirmNewPassword.style.borderBottom = "1px solid red"
				inputWarning2.innerHTML = "field cannot be empty!"
			} else {
				confirmNewPassword.style.borderBottom = "1px solid #28a745"
				inputWarning2.innerHTML = ""
				if(this.password.confirmNew != this.password.new) {
					confirmNewPassword.style.borderBottom = "1px solid red"
					inputWarning2.innerHTML = "new password didn't match!"
				}
			}

			if(this.password.new != "" && this.password.confirmNew != "" && this.password.confirmNew == this.password.new) {

			const params = {
				headers : {
				'x-access-token': this.$route.params.token,
				'Content-Type':'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
				}
			}

			var dataUser = {
				password: this.password.confirmNew
			}

			if(this.token && this.token !== null){
				axios.put(this.urlResetPassword + this.token, dataUser, params).then(response => {
					if(response.status === 200){
					console.log('Response', response)
					self.show = true;
					}
				}).catch(e=>{
					console.log('error', e.response);
				})
			}else{
				console.log('this token tidak ada', this.token)
			}


			}
		}
	}
}
</script>

<style scoped>
</style>