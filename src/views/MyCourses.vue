<template>
	<div class="mycourses">
		<Blue/>
		<MyCoursesList/>
	</div>
</template>
<script>
	import Blue from '@/components/Blue.vue'
	import MyCoursesList from'@/components/Home/MyCourse.vue'
export default {
  components: {
    Blue,
    MyCoursesList
  },
}
</script>