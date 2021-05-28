<template>
  <div class="home">
    <Tkhome />
  </div>
</template>

<script>
// @ is an alias to /src
import Tkhome from '@/components/Tkhome.vue'

export default {
  name: 'Home',
  components: {
    Tkhome,
  },
}
</script>
<style scoped>
.home {
  height: 100%;
}
</style>
