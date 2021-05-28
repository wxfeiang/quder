<template>
  <div class="stydy" :style="home_bg">
    <!-- 题目 -->
    <div class="an_top">
      <div class="title_box">
        <img :src="timu" alt="" />
      </div>
      <div class="anser_box">
        <div class="an_tips">
          <div class="item fraction">
            <img :src="chj" alt="" />
            <span>100</span>
          </div>
          <div class="item title">
            单选题
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

    <!-- 答案列表 -->
    <div class="qs_list">
      <!-- @click="addColor(index)" -->
      <div
        class="qs_item"
        v-for="(item, index) in curlist.lister"
        :key="index"
        @click="addColor(item, index)"
        :class="{ correct: correct == item.topic }"
      >
        <div class="qs_left">{{ index | chard }}</div>
        <div class="qs_right">
          {{ item.answer_name }}
        </div>
      </div>
    </div>
    <Footer @step="step" :jlxh="curNumber" :all="list.length" />
  </div>
</template>
<script>
import Footer from '@/components/footer.vue'
export default {
  components: {
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
      },
      strA: 'A',
      chosenContactId: '1',
      list: [],
      curlist: [],
      curNumber: 0,
      active: '33', //选中样式
      correct: '',
    }
  },
  created: function() {
    this.flog = this.$route.query.id

    //  设置随机数
    var number = Math.ceil(Math.random() * 100000)

    this.$http.get('data.json?bbh=' + number).then((res) => {
      this.list = res.data.list
      this.curlist = res.data.list[this.curNumber]
    })
  },
  methods: {
    //生成 ABCFd
    addColor(item, index) {
      console.log(item, index)
      // if (item.topic) this.active = item.topic
      this.active = item.topic
    },
    step(flog) {
      if (flog == 2) {
        this.curNumber++
      }
      if (flog == 1) {
        this.curNumber--
      }
      this.curlist = this.list[this.curNumber]
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
  background-size: 100% 100%;
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
  padding: 0 30px;
  width: 670px;
  height: 250px;
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
.qs_list {
  margin: 40px 0 0 0;
  .qs_item {
    display: flex;
    align-items: center;
    margin: 0 auto 20px;
    padding: 10px 30px;
    width: 590px;
    height: 120px;
    background: #ffffff;
    border-radius: 20px;

    box-sizing: border-box;
    .qs_left {
      width: 10%;
      text-align: center;
      font-size: 36px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #48569a;
      line-height: 100px;
    }
    .qs_right {
      width: 90%;
      text-align: center;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #48569a;
    }
  }
  .correct {
    background: #66debf;
    .qs_left,
    .qs_right {
      color: #fff;
    }
  }
  .error {
    background: #ff8473;
    .qs_left,
    .qs_right {
      color: #fff;
    }
    .showA {
      background: #5857e9;
      .qs_left,
      .qs_right {
        color: #fff;
      }
    }
  }
}
</style>
