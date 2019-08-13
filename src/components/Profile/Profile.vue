<template>
	<div class="container-fluid">
			<div class="container">
			<div class="row border justify-content-center my-5">
				<div class="profile col-12 text-center py-2">
				<h4 class="font-weight-bold m-0">Profile</h4>
				<p class="m-0">Add/Edit Informations About Your Profile</p>
				</div>
				<div class="border-right col-12 col-lg-3 p-0">
				<div class="border-bottom border-top p-3">
					<h5 class="font-weight-bold m-0">{{fullname}}</h5>
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
				<div class="border-top col-lg-9 justify-content-center p-0">
				<div class="container">
					<div class="row justify-content-center">
					<div class="col-12 col-sm-10 col-md-8 col-lg-9 py-5 px-3">
						<div class=" row justify-content-center">
						<div class="col-8 col-sm-6 col-md-6 col-lg-4 col-md-4  text-center">
							<div id="uploadImg">
						<img v-bind:src="profilePic">
						</div>
						<div class="custom-file">
						<input type="file" class="custom-file-input" id="customFile"  @change="onFilePicked">
						<label class="custom-file-label shadow-none" for="customFile">Choose file</label>
							<label class="custom-file-label shadow-none font-weight-bold" for="customFile" v-if="procesing" disabled >Processing...</label>
							</div>
						</div>
						</div>

						<form class="form-group text-left py-4" ref="register_form">
			
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
					</form>


						<div class="row">
						<div class="col text-right">
							<button type="submit" style="margin-right: 7px" class="btn btn-success rounded-0 font-weight-bold shadow-none" v-on:click="save" v-if="!procesingSave">Save</button>

							<button type="submit" style="margin-right: 7px" class="btn btn-warning rounded-0 font-weight-bold shadow-none" disabled v-if="procesingSave">Processing...</button>

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
import App from '@/App'

export default {
	data() {
		return {
			procesing: false,
			procesingSave: false,
			userData: {},
			profilePic: '',
			username: '',
			fullname: '',
			birthday: '',
			gender: '',
			email: '',

			urlUser: App.data().ListUrl.urlUser,
			urleditProfile: App.data().ListUrl.urlEditProfile,
			urlAvatar: App.data().ListUrl.urlAvatar
		}
	},
	mounted() {
		document.querySelectorAll('label').forEach(l=> l.classList.add('font-weight-bold', 'm-0'));
			document.querySelectorAll('.form-field').forEach(f=> {
				f.classList.add('p-0', 'mb-2');
				f.querySelector('span').classList.add('text-danger', 'font-weight-normal');
			});
			this.$refs.register_form.querySelectorAll('input').forEach(l => l.classList.add('form-control', 'rounded-0', 'shadow-none', 'border'));

		let self = this;
		var EclassId = localStorage.getItem('ECLASS-id');

		axios.get(this.urlUser + EclassId).then(res=>{
			console.log("IMAGES",res.data.userData)
			// self.userData = res.data.userData;
		self.username = res.data.userData.username;
		self.fullname = res.data.userData.fullname;
		self.birthday = res.data.userData.birthday;
		self.gender = res.data.userData.gender;
		self.email = res.data.userData.email;
		self.profilePic = res.data.userData.avatar;
		})
	},
	methods : {
		save() {
			// this.procesing = true;
			this.procesingSave = true;

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
					this.validate('email', this.email, this.$refs.input_email, this.$refs.alert_email)
				){
					this.post();
				}else{
					console.log('form not valid')
					this.procesing = false;
					this.procesingSave = false;
				}
		},
		post(){
			var EclassId = localStorage.getItem('ECLASS-id');
				
				const params = {
					headers: {
						'x-access-token': localStorage.getItem('EClassToken'),
						'Content-Type':'Application/Json',
						'Accept':'Application/Json',
						'Access-Control-Allow-Origin': '*'
					}
				}

				const userData = {
					username: this.username,
					fullname: this.fullname,
					birthday: this.birthday,
					gender: this.gender,
					email: this.email,
					avatar: this.profilePic

				}

				axios.put(this.urleditProfile + EclassId, userData , params).then(response=>{
					if(response.status === 200){
						console.log('Response', response)
						alert('Success')
						window.location.reload()
						this.procesing = false
						this.procesingSave = false;
					}
				}).catch(e=>{
					console.log('error', e.response);
					alert('Failed')
					
				})
		},
		onFilePicked(event) {
			let self = this;

			var oldAvatar = JSON.parse(JSON.stringify(this.profilePic));

			this.procesing = true;
			const image = event.target.files[0];
			console.log('SIZE', image.size);
			console.log('ini gambar', image)

		// 	let data = new FormData();
		// 	data.append('file', image);
		// 	data.append('url', oldAvatar);

		// 	console.log('yang dikirim: ', data);

		// 	let request = new XMLHttpRequest();
		// 	request.open('POST', this.urlAvatar);
		// 	request.send(data);
		// 	request.onreadystatechange = function () {
		// 		if(request.readyState === 4 && request.status === 200) {
		// 			var res = JSON.parse(request.responseText);
		// 			console.log("INI RES",res)
		// 			console.log('IMAGE UPLOADED. url:', res.url);
		// 		self.profilePic = res.url;
		// 	}else{
		// 		console.log('ERROR POST GAMBAR')
		// 	}
		// 		self.procesing = false;
		// }
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
			}
		}
	}
</script>

<style>
	
#uploadImg {
	width: 150px;
	height: 150px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid #ccc;
	display: inline-block;
	position: relative;
	overflow: hidden;
}

#uploadImg img {
	width: 100%;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translate(0, -50%);
}

label.custom-file-label::after {
	display: none;
}
	
</style>