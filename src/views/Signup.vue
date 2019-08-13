<template>
  <div class="Signup">
    <Blue/>
    <SignupComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import Blue from '@/components/Blue.vue'
import SignupComponent from '@/components/Signup/Signup.vue'

export default {
  name: 'Signup',
  components: {
    Blue,
    SignupComponent
  },
	mounted() {
    var self = this;

    if(localStorage.getItem('EClassToken')) {
      self.$router.push('/')
    }
	}
}
</script>
