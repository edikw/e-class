<template>
  <div class="course">
    <!-- <Blue/> -->
    <Course/>
  </div>
</template>

<script>
// @ is an alias to /src
import Blue from '@/components/Blue.vue'
import Course from '@/components/Course/Course.vue'
import router from '../router'

export default {
  name: 'course',
  components: {
    Blue,
    Course
  },
  mounted() {
    var self = this;
    
    this.$root.$on('isLoggedOut', function(){
      console.log('isLoggedOut dari app')
      this.$router.push('/')
    })
  }
}
</script>
