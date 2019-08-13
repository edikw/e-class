<template>
	<div class="top-topic" v-if="$route.name == 'selected'">
		<div class="container">
			<div class="row py-5">
				<div class="col-12">
					<h1 class="font-weight-bold">Top Topic</h1>
				</div>
				<div class="col-12 col-sm-4 col-lg-2 p-0 justify-content-center" v-for="(data, i) in dataTopicFix" :key="i">
					<div class="col-course p-2" v-on:click="sendTopic(data)">
						<p class="m-0" style="cursor: pointer;">{{data}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import router from '../../router'

export default {
		name: 'top-topic',
		data() {
			return {
				dataTopic: [],
				dataEmit: null,
				dataTopicFix: [],
			}
		},
		mounted(){

				// data category
			this.$root.$on('categorySelected', (category) => {
				this.dataEmit = category.name;
				this.getTopic()
			})
			
			this.dataEmit = this.$route.params.name
			this.getTopic()
		},

		methods: {
			getTopic(){
				var category = router.app.category

				this.filterTopic(category)
			},
			filterTopic(data){
				this.dataTopic = [];
				data.map(a=> {
					if(a.name == this.dataEmit){
						this.dataTopic.push(a)
					}
				})
				this.dataTopicFix = [];
				this.dataTopic.map(data => {
					data.subs.map(a => {

						this.dataTopicFix = a.topics
					})
				})
			},

			sendTopic(dataTopic){
				if(this.$route.name != 'selected-topic'){
					this.$router.push({
						name: 'selected-topic',
						path: '/selected/subcategory/topic/',
						params: {name: dataTopic}
					})
				}else {
					this.$router.push({
						params: {name: dataTopic}
					})
					this.$root.$emit('topicSelected', dataTopic)
				}
			}

		}
}
</script>
