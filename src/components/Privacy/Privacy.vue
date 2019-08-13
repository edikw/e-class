<template>
	<div class="privacy">
		<div class="container">
				<div class="py-5">
					<div class=" col-12 text-center border-bottom">
						<h3 class="font-weight-bold">Privacy Policy</h3>
					</div>
					<div class="py-3">
						{{dataPrivacy}}
					</div>
				</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import App from '../../App.vue'
	import router from '../../router'

	export default {
		data(){
			return {
				url: App.data().ListUrl.urlPrivacy,
				dataPrivacy: null
			}
		},
		mounted(){
			this.getStatic()
		},
		methods: {
			getStatic(){
				var route = router.app.privacy
				this.dataPrivacy = route
			}
		}
	}
</script>
<style scoped>
	.indent {
		text-indent: 50px;
	}
</style>