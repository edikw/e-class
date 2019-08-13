<template>
	<div class="top-categories bg-light">
		<div class="container">
			<div class="row py-5">
			<div class="col-12">
				<h2 class="font-weight-bold">Top Categories</h2>
			</div>

			<div v-for="(category, i) in dataCategory" class="col-12 col-sm-4 col-lg-2 p-0 justify-content-center" :key="i">
				<div class="col-course p-2" v-on:click="send(category)">
					<p class="m-0" style="cursor: pointer;">{{ category.name }}</p>
				</div>
			</div>

			</div>
		</div>
	</div>
</template>

<script>
import router from '../../router'

export default {
	name: 'top-categories',
	data() {
		return {
			dataCategory: null,
		}
	},
	mounted() {

		this.getCategory();
	},
	methods: {
		getCategory(){
			var route = router.app.category
			this.dataCategory = route

		},
		send(category){
			this.$router.push({name: 'selected', path:'/selected/', params: {name: category.name}})
		}
	}
}
</script>
<style>
</style>
