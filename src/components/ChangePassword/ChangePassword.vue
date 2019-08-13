<template>
		<div class="container-fluid">
			<div class="container">
				<div class="row border my-5">
					<div class="profile col-12 text-center p-2">
						<h4 class="m-0 font-weight-bold">Change Password</h4>
						<p class="m-0">Edit your account and Change your Password</p>
					</div>
					<div class="col-lg-3 p-0 border-right">
						<div class="border-bottom border-top p-3">
							<h5 class="font-weight-bold m-0" v-if="dataUser">{{dataUser.fullname}}</h5>
						</div>
							<div class="p-3">
								<ul class="list-unstyled font-weight-bold">
									<li>
										<router-link to="/profile">Profile</router-link>
									</li>
									<li>
										<router-link to="/changepassword">Change Password</router-link>
									</li>
									<li>
										<router-link to="/deactive">Deactive Account</router-link>
									</li>
								</ul>
							</div>
					</div>
						<div class="col-lg-9 border-top justify-content-center p-0">
							<div class="container">
								<div class="row justify-content-center">
									<div class="col-12 col-sm-10 col-md-8 col-lg-9 py-5 px-3">
										<form class="form-group text-left py-4" ref="register_form">
											<div class="form-field">
												<label for="Current">Current Password</label>
												<input 
													autocomplete="off"
													id="Current"
													ref="input_current"
													type="email"
													v-model="currentPassword" 
												>
												<span ref="alert_current"></span>
											</div>

											<div class="form-field">
												<label for="new_password">New Password</label>
												<input 
													autocomplete="off"
													id="new_password"
													ref="input_new"
													type="email"
													v-model="newPassword" 
												>
												<span ref="alert_new"></span>
											</div>

											<div class="form-field">
												<label for="confirmNew">Confirm New Password</label>
												<input 
													autocomplete="off"
													id="confirmNew"
													ref="input_confirm"
													type="email"
													v-model="confirmNewPassword" 
												>
												<span ref="alert_confirm"></span>
											</div>
										</form>

										<div class="row">
											<div class="col text-right">
												<button type="submit" class="btn btn-success rounded-0 font-weight-bold shadow-none" style="margin-right: 7px" v-on:click="save" v-if="!proccesing">Save</button>

												<button type="submit" class="btn btn-warning rounded-0 font-weight-bold shadow-none" style="margin-right: 7px" disabled v-on:click="save" v-if="proccesing">Proccesing...</button>

												<button type="submit" class="btn btn-warning rounded-0 font-weight-bold shadow-none" @click="$router.push('/')">Cancel</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
</template>

<script>

import axios from 'axios'
import App from '@/App.vue'


export default {
	data() {
		return {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
			dataUser :null,
			urlChangePassword: App.data().ListUrl.urlChangePassword,
			urlUser : App.data().ListUrl.urlUser,
			proccesing: false
		}
	},
	mounted(){

		document.querySelectorAll('label').forEach(l=> l.classList.add('font-weight-bold', 'm-0'));
			document.querySelectorAll('.form-field').forEach(f=> {
				f.classList.add('p-0', 'mb-2');
				f.querySelector('span').classList.add('text-danger', 'font-weight-normal');
			});
			this.$refs.register_form.querySelectorAll('input').forEach(l => l.classList.add('form-control', 'rounded-0', 'shadow-none', 'border'));
			
			this.getUser()
		},
	methods : {
		getUser(){
			// this.dataUser = router.app.user

			var EclassId = localStorage.getItem('ECLASS-id');
			axios.get(this.urlUser + EclassId).then(res => {
					if(res.status === 200) {
						this.dataUser = res.data.userData
					}
				});
		},
		save() {
			this.proccesing = true;

				if(
					this.validate('current password', this.currentPassword, this.$refs.input_current, this.$refs.alert_current) &&

					this.validate('new password', this.newPassword, this.$refs.input_new, this.$refs.alert_new) &&

					this.validate('confirm new password', this.confirmNewPassword, this.$refs.input_confirm, this.$refs.alert_confirm)

				){
					this.post();
				}else{
					this.proccesing = false;
				}

			},
			post(){
				this.proccesing = true;

				const params = {
					headers : {
						'x-access-token': localStorage.getItem('EClassToken'),
						'Content-Type':'application/json',
						'Accept': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
					}
				}

				var dataUser = {
					current_password: this.currentPassword,
					new_password: this.confirmNewPassword
				}

				axios.put(this.urlChangePassword, dataUser, params).then(response => {
					if(response.status === 200){
						console.log('Response', response)
						alert('Change Password Success');
						window.location.reload();
						this.proccesing = false;
					}
				}).catch(e=>{
				})
				
			},

			validate(key, val, input, alert){
				var result = true;

				if(val === ''){
					let redkey = key;
					red("please fill the " + redkey + " field");
				}

				else if(key == 'new password'){
						if(val.length < 8){
							red("password length minimal 8 character");
						}else{
							clear();
						}
					}
					else if(key == 'confirm new password'){
						if(val != this.newPassword){
							red("password not match");
						}else{
							clear();
						}
					}

					else{
						clear();
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
			}
		},
		watch: {
			currentPassword(val){
				this.validate('current password', this.currentPassword, this.$refs.input_current, this.$refs.alert_current);
			},
			newPassword(val){
				this.validate('new password', this.newPassword, this.$refs.input_new, this.$refs.alert_new);
			},
			confirmNewPassword(val){
				this.validate('confirm new password', this.confirmNewPassword, this.$refs.input_confirm, this.$refs.alert_confirm);
			}
		}
}
</script>