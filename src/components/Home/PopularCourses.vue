<template>
	<div class="popular-course">
		<div class="container">
			<div class="row my-5">
				<div class="col-12">
					<h2 class="font-weight-bold">Popular Courses</h2>
				</div>
				<div class="col-12 p-0 justify-content-center">
					<div class="px-5 py-0 px-sm-0" v-if="dataFix.length > 0">
						<carousel :per-page-custom="[[320, 1],[480, 2], [768, 3], [1440, 4]]" :paginationEnabled="false" :navigationEnabled="true" navigationNextLabel="<h1>&#8250;</h1>" navigationPrevLabel="<h1>&#8249;</h1>">
							<slide v-for="x in dataFix" :key="x.aid">

								<router-link :to="{name:'course', path:'course/', params:{id: x.aid}}">
									<div class="card m-2">
										<div class="poto">
											<img class="card-img-top" v-bind:src="x.thumbnail" >
										</div>
										<div class="card-body text-dark">
											<div>
												<h5 class="card-title">{{ x.title }}</h5>
											</div>
											<p class="card-text">{{ x.subtitle }}...</p>
											<div class="view-counter mt-4 text-right">
												<i class="fa fa-eye"></i>
												<p class="text-muted m-0">
													<font-awesome-icon icon="eye" />
													{{ x.view_count }} views
												</p>
											</div>
										</div>
									</div>
								</router-link>
							</slide>
						</carousel>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';
import router from '../../router.js'

export default {
	name: 'popular-course',
	components: {
		Carousel,
		Slide
	},
	data() {
		return {
			dataCourse: null,
			dataSort : [],
			dataFix: []

		}	 
	},
	mounted(){
		this.getCourse();
		if(this.dataFix){
			for (var i = 0; i < this.dataFix.length; i++) {
				if(this.dataFix[i].title.length > 30){
					var x = this.dataFix[i].subtitle.slice(0, 22);
					this.dataFix[i].title = x
				}

				if(this.dataFix[i].subtitle.length > 25){
					var a = this.dataFix[i].subtitle.slice(0, 19);
					this.dataFix[i].subtitle = a
				}
			}
		}
	},
	methods: {
		getCourse(){
			var route = router.app.Popcourses
			this.dataFix = route
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
		width: auto;
		height: auto;
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