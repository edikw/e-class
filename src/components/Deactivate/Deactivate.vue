<template>
	<div class="deactivate">
		<div class=" container-fluid">
			<div class="container">
			<div class="row border my-5">
				<div class="profile col-12 text-center p-2">
				<h4 class="font-weight-bold m-0">Deactive Account</h4>
				<p class="m-0">Deactive your account</p>
				</div>
				<div class="col-12 col-lg-3 p-0 border-right">
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
					<div class="row justify-content-center ">
					<div class="col-12 col-sm-10 col-md-8 col-lg-9 py-5 px-3">
						<h5 class="pb-5 mb-5">Are you sure want to deactive your account?</h5>
						<div class="text-right py-5">
						<button ttype="button" class="btn btn-success rounded-0 font-weight-bold mr-1" data-toggle="modal" data-target="#exampleModalCenter">Save</button>
						<button class="btn btn-warning rounded-0 font-weight-bold" @click="$router.push('/')">Cancel</button>
						</div>
					</div>
					</div>
				</div>
				</div>

				<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content bg-light">
								<div class="modal-header border-0">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								</div>
								<div class="modal-body text-center p-3 ">
								<p>Are you sure to deactive account ?</p>
								</div>
								<div class="modal-footer border-0">
								<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
								<button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="save">Yes</button>
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
		data(){
			return {
				dataUser : null,
				url: App.data().ListUrl.urlDeactive,
				urlUSer : App.data().ListUrl.urlUser
			}
		},
		mounted(){
			var EclassId = localStorage.getItem('ECLASS-id');
			
			axios.get(this.urlUSer + EclassId).then(res => {
				if(res.status === 200) {
					this.dataUser = res.data.userData
				}
			});
		},
		methods: {

			save() {

				var params = {
					headers : {
						'x-access-token': localStorage.getItem('EClassToken'),
						'Content-Type':'Application/Json',
						'Accept':'Application/Json',
						'Access-Control-Allow-Origin': '*'
					}
				}
				var dataUser = {
					active: false
				}
				axios.put(this.url, dataUser, params).then((response,err)=>{
					if(response.status === 200){
						setTimeout(()=>{
							alert('Your account was successfully deactivated.');
							localStorage.clear();
							this.$root.$emit('isLoggedOut');
							this.isLoggedIn = false;
							this.$router.push('/');
						}, 1000)
					}
				}).catch(e=>{
					alert('Failed')
				})
			}
		}
	}
</script>