<template>
	<div class="my-course" v-if="myCourse">
		<div class="container">
			<div class="row my-5">
				<div class="col-12">
					<h2 class="font-weight-bold">My Courses</h2>
				</div>
				<div class="col-12 p-0 justify-content-center">
					<div class="px-5 py-0 px-sm-0" v-if="myCourse.length > 0">
						<carousel :per-page-custom="[[0, 1],[480, 2], [768, 3], [1440, 4]]" :paginationEnabled="false" :navigationEnabled="true" navigationNextLabel="<h1>&#8250;</h1>" navigationPrevLabel="<h1>&#8249;</h1>">
							<slide v-for="course in myCourse" :key="course.aid">
								<router-link :to="{name:'course', path:'course/', params:{id: course.aid}}">
									<div class="card m-2">
										<div class="poto">
											<img class="card-img-top" v-bind:src="course.thumbnail">
										</div>
										<div class="card-body text-dark">
											<div style="overflow: hidden">
												<h5 class="card-title">{{ course.title}}</h5>
											</div>
											<p class="card-text">{{ course.subtitle }}...</p>
											<div class="progress" v-if="$route.path == '/mycourses'">
												<div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
											</div>
											<div class="view-counter mt-4 text-right" v-else>
												<i class="fa fa-eye"></i>
												<p class="text-muted m-0">
													<font-awesome-icon icon="eye" />
													{{ course.view_count }} views
												</p>
											</div>
										</div>
									</div>
								</router-link>
							</slide>
						</carousel>
					</div>
					<div v-else>
						<div class="text-center p-5" v-if="!loading">
								<h3>Anda Belum Join Course</h3>
						</div>
					</div>
					<div class="p-5 text-center" v-if="loading">
						<h3>Please Wait. . .</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';
import App from '../../App.vue'
import axios from 'axios'

export default {
	name: 'my-course',
	components: {
		Carousel,
		Slide
	},
	data() {
		return {
			url: App.data().ListUrl.urlUser,
			myCourse: [],
			loading: false
				
		}
	},
	mounted(){
		this.getUser();

	},
	methods: {
		getUser(){
			this.loading = true;

			var EclassId = localStorage.getItem('ECLASS-id');

			axios.get(this.url + EclassId).then(res=>{
				for (var i = 0; i < res.data.userData.my_course.length; i++){
					this.myCourse.push(res.data.userData.my_course[i])
				}

				for (var j = 0; j < this.myCourse.length; j++) {
					if(this.myCourse[j].subtitle.length > 25){
						var x = this.myCourse[j].subtitle.slice(0, 19);
						this.myCourse[j].subtitle = x
					}
				}
				this.loading = false;
					
			})
				
		}
	}
}
</script>
<style scoped>
		.poto{
				height: 200px;          
				position: relative;
				overflow: hidden;   
		}
		.poto img{
				height: auto;
				width: auto;
				max-width: 100%;
				max-height: 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
		}
		a:hover {
				text-decoration: none;
		}
</style>