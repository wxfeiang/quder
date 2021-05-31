<template>
  <div class="stydy" :style="home_bg">
    <!-- 题目 -->
    <div class="an_top">
      <div class="title_box">
        <img :src="timu" alt="" />
      </div>
      <div class="anser_box">
        <div class="an_tips">
          <div class="item fraction"></div>
          <div class="item title">
            学习中
          </div>
          <div class="item flog">
            <span class="n_start">{{ curNumber | Nubers }}</span>
            <span class="n_all">/{{ list.length }} </span>
          </div>
        </div>
        <div class="an_center">
          {{ curlist.topic_name }}
        </div>
      </div>
    </div>
    <Study :curlist="curlist.lister" />
    <!-- 底部按钮 -->
    <Footer @step="step" :jlxh="curNumber" :all="list.length" />
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
      flog: '',
      timu: require('../assets/image/timu.png'),
      chj: require('../assets/image/chj.png'),
      daflog: require('../assets/image/daflog.png'),
      home_bg: {
        backgroundImage: 'url(' + require('../assets/image/bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%;',
      },
      strA: 'A',
      chosenContactId: '1',
      list: [],
      curlist: [],
      curNumber: 0,
      timer: '',
      duration: 0,
    }
  },
  created: function() {
    this.flog = this.$route.query.id
    // console.log(this.flog)
    //  设置随机数
    var number = Math.ceil(Math.random() * 100000)
    this.$http.get('data.json?bbh=' + number).then((res) => {
      // console.log(res, '成功')
      this.list = res.data.list
      //  监测是否有学习经历
      var numberS = localStorage.getItem('studyNumber') * 1
      if (numberS != 0 && numberS < this.list.length - 1) {
        console.log('jiancedao le ')
        this.$dialog
          .confirm({
            title: '提示',
            message: '检测到您上次学习的位置,是否继续',
          })
          .then(() => {
            // this.curNumber = numberS
            // console.log(this.curNumber)
            // this.curlist = this.list[0]

            this.curNumber = numberS
            this.curlist = this.list[numberS]
          })
          .catch(() => {
            this.curlist = this.list[this.curNumber]
          })
      } else {
        this.curlist = this.list[this.curNumber]
      }
    })

    this.timer = setInterval(this.allTime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    localStorage.setItem('studyTime', this.duration)
    localStorage.setItem('studyNumber', this.curNumber)
  },
  methods: {
    step(flog) {
      if (flog == 2) {
        this.curNumber++
      }
      if (flog == 1) {
        this.curNumber--
      }
      this.curlist = this.list[this.curNumber]
      if (flog == 3) {
        clearInterval(this.timer)
        this.$router.push({
          name: 'StudyOver',
          query: {
            duration: this.duration,
          },
        })
      }
    },
    //计时器

    allTime() {
      this.duration++
    },
  },

  filters: {
    chard: function(index) {
      var strA = 'A'
      return String.fromCharCode(strA.charCodeAt() + index)
    },
    Nubers: (value) => {
      var str = value + 1
      return str < 10 ? '0' + str : str
    },
  },
}
</script>
<style lang="less" scoped>
.stydy {
  width: 100%;
  height: 100%;
  padding: 20px 0 0 0;
  box-sizing: border-box;
}
.an_top {
  position: relative;
  padding: 102px 0 0 0;
}
.title_box {
  position: absolute;
  top: 0;
  left: 50%;
  width: 230px;
  height: 230px;
  background: #5857e9;
  border-radius: 50%;
  margin-left: -115px;
  text-align: center;
  box-sizing: border-box;
  padding: 20px;
}
.title_box img {
  width: 110px;
  height: 90px;
}
.anser_box {
  margin: 0 auto;
  padding: 0 30px 30px;
  width: 670px;
  min-height: 250px;
  background: #5857e9;
  border: 6px solid #9696fa;
  box-shadow: 0px 10px 0px 0px #2226bc;
  border-radius: 20px 20px 0px 0px;
  box-sizing: border-box;
}
.an_tips {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .item {
    width: 33%;
  }
  .fraction {
    font-size: 36px;
    font-family: DIN;
    font-weight: bold;
    color: #facc25;
    line-height: 60px;
    span {
      font-size: 34px;
    }
  }
  .fraction img {
    width: 34px;
    height: 34px;
  }
  .title {
    width: 230px;
    height: 60px;
    background: #7f7eff;
    border-radius: 30px;
    font-size: 36px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffffff;
    line-height: 60px;
    text-align: center;
  }
  .flog {
    text-align: right;
    line-height: 60px;
    font-family: DIN;
    font-weight: bold;
    color: #facc25;
  }
  .flog .n_start {
    font-size: 36px;
  }
  .flog .n_all {
    font-size: 26px;
  }
}
.an_center {
  position: relative;
  margin: 20px 0 0 0;
  font-size: 28px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  line-height: 36px;
}
</style>
