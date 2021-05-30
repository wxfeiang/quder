<template>
  <div class="stydy" :style="home_bg">
    <!-- 题目 -->
    <div class="an_top">
      <div class="title_box">
        <img :src="timu" alt="" />
      </div>
      <!-- 右滑进入 -->
      <transition name="van-slide-right">
        <div class="addNum" v-show="visible">
          <img :src="addNum" alt="" />
        </div>
      </transition>

      <div class="anser_box">
        <div class="an_tips">
          <div class="item fraction">
            <img :src="chj" alt="" />
            <span> {{ allNum }}</span>
          </div>
          <div class="item title" v-if="curlist.type == 0">
            单选题
          </div>
          <div class="item title" v-if="curlist.type == 1">
            多选题
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
        :class="{
          selects: curlist.type == 1 && item.stauts == 3 && !curlist.sublimt,
          correct: item.topic == 1 && item.stauts == 1,
          error: item.topic == 0 && item.err == 1,
        }"
      >
        <div class="qs_left" v-if="item.topic == 0 && item.err == 1">×</div>
        <div class="qs_left" v-else-if="item.topic == 1 && item.stauts == 1">√</div>
        <div class="qs_left" v-else-if="curlist.type == 1 && item.stauts == 3 && !curlist.sublimt">
          {{ index | chard }}
        </div>
        <div class="qs_left" v-else-if="!item.stauts">{{ index | chard }}</div>

        <div class="qs_right">
          {{ item.answer_name }}
        </div>
      </div>
      <div class=".sure_btn " v-if="curlist.type == 1">
        <van-button plain type="primary" @click="sectOver()">确定</van-button>
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
      addNum: require('../assets/image/allNum.png'),
      daflog: require('../assets/image/daflog.png'),
      home_bg: {
        backgroundImage: 'url(' + require('../assets/image/bg.png') + ')',
      },
      strA: 'A',
      chosenContactId: '1',
      list: [],
      curlist: {},
      curNumber: 0,
      allNum: 0, //  总分数
      selecType: 0, // 多选和单选
      visible: false,
      timer: '',
      duration: 0,
    }
  },
  created: function() {
    this.flog = this.$route.query.id

    //  设置随机数
    var number = Math.ceil(Math.random() * 100000)

    this.$http.get('data.json?bbh=' + number).then((res) => {
      this.list = res.data.list
      this.curlist = res.data.list[this.curNumber]
      for (var i = 0; i < this.curlist.length; i++) {
        this.curlist[i].sure = false
      }
    })
    this.timer = setInterval(this.allTime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 点击事件
    addColor(item, index) {
      //  单选点击一次  加分
      if (this.curlist.type == 0 && this.curlist.selArr.length < 1) {
        item.stauts = 1
        this.curlist.sure = 1
        if (item.topic == 1) {
          //  加分
          this.visible = true
          this.allNum += 2
        } else {
          item.err = 1
          var key = this.curlist.lister.findIndex((item) => item.topic == 1)
          this.curlist.lister[key].stauts = 1
        }
        this.curlist.selArr.push(index)

        if (this.curNumber < this.list.length - 1) {
          //  自动下一题
          setTimeout(() => {
            this.curNumber++
            this.curlist = this.list[this.curNumber]
            this.visible = false
          }, 1000)
        }
      } else if (this.curlist.type == 1) {
        if (item.stauts != 3 && !this.curlist.sublimt) {
          console.log(item, index, '---------多选')
          item.stauts = 3
          this.curlist.selArr.push(index)
          //  选项得答案 小标
          if (item.topic == 1) {
            item.selCrr = 1
          } else if (item.topic == 0) {
            item.selCrr = 0
          }
        }
      }
      //

      //
      this.$forceUpdate()
    },
    //  点击完成按钮
    sectOver() {
      if (this.curlist.selArr.length < 1) {
        this.$dialog.alert({
          // title: '提示',
          message: '请选择答案!!',
        })
      } else {
        this.curlist.sublimt = 3
        this.curlist.sure = 1
        var arr1 = this.curlist.selArr //  选中以后得数据
        // console.log(qsArr, 'qsArrqsArrqsArrqsArr')

        var arr2 = [] //  正确答案得数据
        var arr = this.curlist.lister

        // console.log(arr, 'arrarrarrarr')
        arr.forEach((item, index) => {
          if (item.selCrr == 1) {
            //  选择正确
            item.stauts = ''
            item.stauts = 1
          } else if (item.selCrr == 0) {
            // 选择错误
            item.stauts = ''
            item.err = 1
          } else {
            if (item.topic == 1) {
              item.stauts = ''
              item.stauts = 1
            }
          }
          // 真确答案
          if (item.topic == 1) {
            console.log(index, 'index')
            arr2.push(index)
          }
        })
        // 判断是否全部正确 坐加分
        const result =
          arr1.length === arr2.length &&
          arr1.every((a) => arr2.some((b) => a === b)) &&
          arr2.every((_b) => arr1.some((_a) => _a === _b))

        if (result) {
          this.visible = true
          this.allNum += 2
        }
        this.$forceUpdate()
        if (this.curNumber < this.list.length - 1) {
          setTimeout(() => {
            this.curNumber++
            this.curlist = this.list[this.curNumber]
            this.visible = false
          }, 1000)
        }
      }
    },
    //  判断正确答案下标

    step(flog) {
      if (flog == 2) {
        if (this.curlist.selArr.length < 1 && this.curlist.sublimt == 3) {
          this.$dialog.alert({
            // title: '提示',
            message: '请选择答案!!',
          })
        } else if (this.curlist.sure !== 1) {
          this.$dialog.alert({
            // title: '提示',
            message: '请确认答案!!',
          })
        } else {
          this.curNumber++
        }
      }
      if (flog == 1) {
        this.curNumber--
      }
      if (flog == 3) {
        if (this.curlist.sure !== 1) {
          this.$dialog
            .alert({
              // title: '提示',
              message: '请确认答案!!',
            })
            .then(() => {
              // on close
            })
        } else {
          clearInterval(this.timer)
          this.$router.push({
            name: 'AnswerOver',
            query: {
              duration: this.duration,
              allNum: this.allNum,
            },
          })
        }
      }
      this.visible = false

      this.curlist = this.list[this.curNumber]
    },
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
  background-size: 100% 100%;
  background-repeat: no-repeat;
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
.addNum {
  position: absolute;
  left: 160px;
  top: 60px;
  img {
    width: 70px;
    height: 70px;
  }
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
    min-height: 120px;
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
  }
  .selects {
    background: #5857e9;
    .qs_left,
    .qs_right {
      color: #fff;
    }
  }
}
</style>
