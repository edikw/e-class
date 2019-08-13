<template>
	<div class="search">
		<Blue/>
		<Searchresult/>
	</div>
</template>
<script>

	import Searchresult from '@/components/Search/Search.vue'
	import Blue from '@/components/Blue.vue'
	export default {
		components :{
			Searchresult,
			Blue
		}
	}
</script>