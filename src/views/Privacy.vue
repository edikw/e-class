<template>
  <div class="privacy">
    <Blue/>
    <PrivacyPolicy/>
  </div>
</template>

<script>
// @ is an alias to /src
import Blue from '@/components/Blue.vue'
import PrivacyPolicy from '@/components/Privacy/Privacy.vue'

export default {
  name: 'privacy',
  components: {
    Blue,
    PrivacyPolicy
  },
}
</script>