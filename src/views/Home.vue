<template>
  <div class="home bg-light">
    <Carousel/>
    <Blue/>
    <MyCourses v-if="isLoggedIn"/>
    <NewCourses/>
    <PopularCourses/>
    <TopCategories/>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Home/Carousel.vue'
import Blue from '@/components/Blue.vue'
import MyCourses from '@/components/Home/MyCourse.vue'
import NewCourses from '@/components/Home/NewCourses.vue'
import PopularCourses from '@/components/Home/PopularCourses.vue'
import TopCategories from '@/components/Home/TopCategories.vue'

export default {
  name: 'home',
  components: {
    Carousel,
    Blue,
    MyCourses,
    NewCourses,
    PopularCourses,
    TopCategories
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    var self = this;

    this.$root.$on('isLoggedOut', function(){
      console.log('isLoggedOut dari app')
      self.isLoggedIn = false;
    })

    if(localStorage.getItem('EClassToken')) {
      self.isLoggedIn = true
    }
  }
}
</script>
