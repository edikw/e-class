<template>
  <div class="changepassword">
    <Blue/>
    <ChangePassword/>
  </div>
</template>

<script>
// @ is an alias to /src
import Blue from '@/components/Blue.vue'
import ChangePassword from '@/components/ChangePassword/ChangePassword.vue'

export default {
  name: 'changepassword',
  components: {
    Blue,
    ChangePassword
  },
  mounted() {
    var self = this;
    
    if(!localStorage.getItem('EClassToken')) {
      this.$router.push('/')
    }

    this.$root.$on('isLoggedOut', function(){
      console.log('isLoggedOut dari app')
      this.$router.push('/')
    })
  }
}
</script>
