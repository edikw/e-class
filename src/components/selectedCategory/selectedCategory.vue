<template>
	<div class="SelectCategory">
		<div id="banner" class="p-0 ">
			<div class="container">
				<div class="py-3">
					<div class=" col-12 col-lg-6 p-0">
						<h2 class="font-weight-bold p-0" >{{dataParams}}</h2>
						<p class="p-0" v-for="(desc, i) in dataDesc" :key="i" v-if="$route.name == 'selected'">{{desc}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template> 
<script>
	import router from '../../router'

	export default {
		data(){
			return {
				dataParams: null,
				dataDesc: []
			}
		},
		mounted(){
			this.getcategory()
		},

		methods : {
			getcategory(){
				this.dataParams = this.$route.params.name
				var category = router.app.category
				this.filterCategory(category);
			},

			filterCategory(dataCategory) {
				var data = [];
				for (var i = 0; i < dataCategory.length; i++) {
					if(this.dataParams == dataCategory[i].name){
						data.push(dataCategory[i].category_desc)
					}
				}
				this.dataDesc = data
			}
		}
	}
</script>
  
<style scoped>
  #banner {
  color: #fff;
  height: auto;
  background-image: linear-gradient(-90deg, #27d4fe ,#6678ff );
  }


</style>
