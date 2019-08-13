<template>
	<div class="contact">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-12 col-lg-8 py-5">
					<div class="text-center border-bottom">
						<h3 class="font-weight-bold">Contact Us</h3>
					</div>
					<form class="py-5" ref="register">

						<div class="form-field mb-4">
						<label for="firstname">Your Name:*</label>
						<input 
						class="form-control" 
						autocomplete="off" 
							id="firstname"
							ref="input_firstname"
							type="text"
							v-model="firstname"
						>
						<span ref="alert_firstname"></span>
						</div>
							<div class="form-field mb-4">
						<label for="email">Email:*</label>
						<input 
						type="email" 
						class="form-control" 
						id="email" 
						ref="input_email"
						v-model="email"
						placeholder="name@example.com"
						autocomplete="false">
						<span ref="alert_email"></span>
						</div>
						<div class="form-field mb-4">
						<label for="subject">Subject:*</label>
						<input 
						type="text" 
						class="form-control" 
						ref="input_subject"
						v-model="subject"
						id="subject"
						>
						<span ref="alert_subject"></span>
						</div>
						<div class="form-field">
						<label for="textarea">What Your Question?</label>
						<textarea 
						class="form-control" 
						id="textarea"
						ref="input_textarea"
						v-model="textarea"
						rows="7">
						</textarea>
						<span ref="alert_textarea"></span>
						</div>
						<div class="mt-3 form-group text-right">
							<button type="button" class="btn btn-primary" data-toggle="button" v-on:click="Send" v-if="!Processing">
							Send
							</button>

							<button type="button" class="btn btn-warning" data-toggle="button" disabled v-if="Processing">
							Processing...
							</button>
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
		data(){
			return {
				Processing: false,
				firstname: '',
				lastname: '',
				email: '',
				subject: '',
				textarea: '',
				url: App.data().ListUrl.urlContact

			}
		},
		mounted(){
			document.querySelectorAll('label').forEach(l=> l.classList.add('font-weight-bold', 'm-0'));
			document.querySelectorAll('.form-field').forEach(f=> {
				f.classList.add('p-0', 'mb-2');
				f.querySelector('span').classList.add('text-danger', 'font-weight-normal');
			});
			this.$refs.register.querySelectorAll('input').forEach(l => l.classList.add('form-control', 'rounded-0', 'shadow-none', 'border'));
		},
		methods: {
			Send(){
				this.Processing = true
				if(
					this.validate('your name', this.firstname, this.$refs.input_firstname, this.$refs.alert_firstname) &&
					this.validate('email', this.email, this.$refs.input_email, this.$refs.alert_email) &&
					this.validate('subject', this.subject, this.$refs.input_subject, this.$refs.alert_subject) &&
					this.validate('textarea', this.textarea, this.$refs.input_textarea, this.$refs.alert_textarea)
				){
					this.post();
				}else{
					this.Processing = false
				}
			},
			post(){
				var data ={
					name: this.firstname,
					email: this.email,
					subject: this.subject,
					text: this.textarea
				}
				axios.post(this.url, data).then(res=>{
					alert("Your Sending Question is Success")
					console.log(res)
					this.Processing = false
				})
				.catch(err=>{
					alert("Error")
					this.Processing = false
				})
			},
			validate(key, val, input, alert){
				var result = true;

				if(val === ''){
					let redkey = key;
					red("please fill the " + redkey + " field");
				}else{
					if(key == 'email'){
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
			firstname(val){
				this.validate('your name', val, this.$refs.input_firstname, this.$refs.alert_firstname);
			},
			email(val){
				this.validate('email', val, this.$refs.input_email, this.$refs.alert_email);
			},
			subject(val){
				this.validate('subject', val, this.$refs.input_subject, this.$refs.alert_subject);
			},
			textarea(val){
				this.validate('textarea', val, this.$refs.input_textarea, this.$refs.alert_textarea);
			},
		}
	}
</script>