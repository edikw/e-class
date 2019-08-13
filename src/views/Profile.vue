<template>
  <div class="profile">
    <Blue/>
    <Profile/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Blue from '@/components/Blue.vue'
import Profile from '@/components/Profile/Profile.vue'
import App from '@/App.vue'

export default {
  name: 'profile',
  components: {
    Blue,
    Profile
  },
  data() {
    return {
      url: App.data().url
    }
  },
  mounted() {

  	console.log('hahaha')

    var self = this;

    this.$root.$on('isLoggedOut', function(){
      console.log('isLoggedOut dari app')
      this.$router.push('/')
    })
  }
}
</script>