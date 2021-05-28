<template>
  <div class="stydy" :style="home_bg">
    学习用时
    {{ duration }}
  </div>
</template>
<script>
import Study from '@/components/study.vue'
import Footer from '@/components/footer.vue'
export default {
  components: {
    Study,
    Footer,
  },
  data() {
    return {
      duration: '',
      flog: '',
      timu: require('../assets/image/timu.png'),
      chj: require('../assets/image/chj.png'),
      daflog: require('../assets/image/daflog.png'),
      home_bg: {
        backgroundImage: 'url(' + require('../assets/image/bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      strA: 'A',
      chosenContactId: '1',
      list: [],
      curlist: [],
      curNumber: 0,
      active: '33', //选中样式
      correct: '',
      timer: '',
    }
  },
  created() {
    this.duration = this.$route.query.duration
  },
}
</script>
<style lang="less" scoped></style>
