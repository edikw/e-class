<template>
  <div class="home">
    <Blue/>
    <NewPassword/>
  </div>
</template>

<script>
// @ is an alias to /src
import Blue from '@/components/Blue.vue'
import NewPassword from '@/components/NewPassword/NewPassword.vue'


export default {
  name: 'home',
  components: {
    Blue,
    NewPassword
  }
}
</script>
