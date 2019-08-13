<template>
	<div class="hero">
		<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
		<ol class="carousel-indicators">
			<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
			<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
			<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
		</ol>
			<div class="carousel-inner">
				<div class="carousel-item active" v-for="(carousel, i) in dataCarousel" v-bind:key="i" v-if="i == 0">
					<img class="d-block w-100" v-bind:src="carousel.background" alt="First slide" />
					<div class="hero-caption text-center d-none d-lg-block">
						<h1 class="font-weight-bold">{{ carousel.background_desc }}</h1>
					</div>
				</div>
				<div class="carousel-item" v-for="(carousel, i) in dataCarousel" v-bind:key="i" v-if=" i > 0">
					<img class="d-block w-100" v-bind:src="carousel.background" alt="First slide" />
					<div class="hero-caption text-center d-none d-lg-block">
						<h1 class="font-weight-bold">{{ carousel.background_desc }}</h1>
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router'

	export default {
		data() {
			return {
				dataSortDate : [],
				dataCarousel: [],
			}
		},
		mounted() {
			this.getCourses()
		},

		methods:{
			getCourses(){
				var courses = router.app.Newcourses
				for (var i = 0; i < courses.length; i++) {
					if(i < 3){
						this.dataCarousel.push(courses[i])
					}
				}
			}
		}
	}
</script>

<style scoped>
	
.hero-caption {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.hero-caption h1 {
	color: #fff;
	text-shadow: 0 0 10px #00000080
}

.carousel-item .active, .carousel-item {
	max-height: 550px;
	overflow: hidden;
	background-size: cover;
	background-position: 50%;
}
</style>