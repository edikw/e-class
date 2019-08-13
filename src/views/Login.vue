<template>
	<div class="login">
		<Blue/>
		<Login/>
	</div>
</template>

<script>
// @ is an alias to /src
import Blue from '@/components/Blue.vue'
import Login from '@/components/Login/Login.vue'

export default {
	name: 'login',
	components: {
		Blue,
		Login
	},
	mounted() {
		var self = this;

		if(localStorage.getItem('EClassToken')) {
			self.$router.push('/')
		}
	}
}
</script>
