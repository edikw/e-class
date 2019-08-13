<template>
	<div class="listSelected">
		<div class="container">
			<div class="row">
				<div class="col-12" v-if="$route.name == 'selected'">
					<h5 class="m-0 font-weight-bold">{{dataCategory.length}} Courses for {{$route.params.name}}</h5>
				</div>
				<Pagination :searchresult="dataCategory" v-if="dataCategory.length > 0"/>

				<div v-if="$route.name == 'selected-subcategory'">
					<div class="col-12">
						<h5 class="m-0 font-weight-bold">{{dataSub.length}} Courses for {{$route.params.name}}</h5>
					</div>
					<Pagination :searchresult="dataSub" v-if="dataSub.length > 0"/>
				</div>

				<div v-if="$route.name == 'selected-topic'">
					<div class="col-12">
						<h5 class="m-0 font-weight-bold"> {{dataTopic.length}} Courses for {{$route.params.name}}</h5>
					</div>
					<Pagination :searchresult="dataTopic" v-if="dataTopic.length > 0"/>
				</div>
			</div>
			<div class="row justify-content-center"  v-if="showLoader">
				<div class="py-5">
					<div class="loader"></div>
				</div>				
			</div>
		</div>
	</div>
</template>

<script>

	import Pagination from '../../views/PaginationSearch.vue'
	import axios from 'axios'
	import App from '../../App.vue'


	export default{
		components: {
			Pagination
		},

		data(){
			return{
				dataCategory: [],
				dataID: null,
				dataCategories: null,

				dataSubName: null,
				dataSub: [],

				dataTopicName: null,
				dataTopic: [],

				showLoader: false

			}
		},
		mounted(){

			// data dari top topic
			if(this.$route.name == 'selected-topic'){
				this.dataTopicName = this.$route.params.name
				this.getTopic()
			}

			// data dari sub catgory
			if(this.$route.name == 'selected-subcategory'){
				this.dataSubName = this.$route.params.name
				this.getCategorySubcategory()
			}

			// data dari category
			if(this.$route.name == 'selected'){
				this.dataID = this.$route.params.name;
				console.log('data id di category', this.dataID)
				this.getCategory();
			}

		},
		methods: {
			getCategory(){
				this.showLoader = true;
				var data = {
					search : this.dataID
				}
				console.log('data yang dikirim', data)

				axios.post(App.data().ListUrl.urlCategorySearch, data).then(res =>{
					if(res.status == 200) {
						console.log(res)
						res.data.result.map(data => {
							this.dataCategory.push(data)
							this.showLoader = false;
						})
					}else{
						this.showLoader = false
					}
				}).catch(e=>{
					this.showLoader = false;
				})
			},
			getCategorySubcategory(){
				this.showLoader = true;
				var data ={
					search: this.dataSubName
				}
				axios.post(App.data().ListUrl.urlSubSearch, data).then(res => {
					if(res.status == 200){
						res.data.result.map(data => {
							this.dataSub.push(data)
							this.showLoader = false;
						})
					}else {
						this.showLoader = false;
					}
				}).catch(e=>{
					this.showLoader = false;
				})
			},

			getTopic(){
				this.showLoader = true;
				var data = {
					search : this.dataTopicName
				}
				
				axios.post(App.data().ListUrl.urlTopicSearch, data).then( res => {
					if(res.status == 200){
						res.data.result.map( data => {
							this.dataTopic.push(data)
							this.showLoader = false;
						})
					}else {
						this.showLoader = false;
					}
				}).catch(e=>{
					this.showLoader = false;
				})
			}
		}
	}
</script>    

<style scoped>

	#img {
		max-width: 200px;
	}
	a:hover{
		text-decoration: none;
	}
	#tes {
		position: relative;
		overflow: hidden;
		height: 130px;
	}
	#tes img {
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.loader {
		border: 12px solid #f3f3f3;
		border-radius: 50%;
		border-top: 12px solid #627eff;
		/*border-bottom: 15px solid #007bff;*/
		width: 100px;
		height: 100px;
		-webkit-animation: spin 2s linear infinite; /* Safari */
		animation: spin 2s linear infinite;
	}
	/* Safari */
	@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
	}
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>