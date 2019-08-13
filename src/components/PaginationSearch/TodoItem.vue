<template>
	<div class="col-12">
		<router-link class="text-dark" :to="{name:'course', path:'course/', params:{id:database.id}}">
			<div class="media border my-3 d-inline-block d-md-flex bg-white">
				<div class="col-12 p-0 col-md-10 d-block d-md-flex">
					<div class="col-12 col-md-3 col-lg-3 p-0" id="tes">
						<img v-bind:src="database.thumbnail">
					</div>
					<div class="media-body ml-md-3 p-3 px-md-0">
						<h5 class="font-weight-bold">{{database.title}}</h5>
						<p class="m-0 pb-3 pb-lg-0">{{database.description}}</p>
					</div>
				</div>
				<div class="col-12 col-md-2 p-3 text-right">
					<font-awesome-icon icon="eye" /><p class="d-inline-block m-0 ml-1">{{database.view_count}} views</p>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
		export default {
			name: 'item',
			props: ['database'],
			data: () => {
				return {
					items: []
				}
			},
			mounted(){
				if(this.database){
					this.items = this.database;
				}
			},
			beforeMount(){
				this.items = [];
			}
		}
</script>

<style scoped>
		.wrapper {
			text-align: left;
			margin-bottom: 10px;
			margin-top: 20px;
		}

		a:hover{
				text-decoration: none;
		}
		#tes {
			position: relative;
			overflow: hidden;
			height: 150px;
		}
		#tes img {
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
</style>