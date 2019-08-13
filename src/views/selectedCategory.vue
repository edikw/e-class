<template>
	<div class="selectedCategory bg-light">
		<Selected/>
		<NewCourses/>
		<Toptopic/>
		<Listselected/>

	</div>
</template>

<script>
	import Selected from '@/components/selectedCategory/selectedCategory.vue'
	import NewCourses from '@/components/Home/NewCourses.vue'
	import Toptopic from '@/components/selectedCategory/TopTopic.vue'
	import Listselected from '@/components/selectedCategory/Listselected.vue'
	
	export default{
		name: 'selected',
		components: {
			Selected,
			NewCourses,
			Toptopic,
			Listselected
		}
	}
</script>