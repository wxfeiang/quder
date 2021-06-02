<template>
  <div class="stydy" :style="home_bg">
    <div class="logo">
      <img :src="logo" alt="logo" />
    </div>
    <div class="center_box">
      <div class="top_box">
        <img :src="over" alt="" />
        <div class="top_tips">
          {{ allNum | evaluate }}
        </div>
      </div>
      <div class="desion">
        <div class="item_box">
          <div class="otem_top">
            本轮得分
          </div>
          <div class="otem_center">
            <!-- {{ allNum }} -->
            <template>
              <countTo :startVal="0" :endVal="allNum" :duration="3000"></countTo>
            </template>
          </div>
        </div>
        <div class="item_box">
          <div class="otem_top">
            本轮用时
          </div>
          <div class="otem_center">{{ showTime.mresult }}'{{ showTime.sresult }}"</div>
        </div>
      </div>
      <div class="cp_erm">
        <img :src="erm" alt="" />
        <!-- <div id="qrcode" class="qrcode_div"></div> -->
      </div>
    </div>
    <div class="btn">
      <van-button block class="dy_btns btn_xuexi" @click="study()">再答一遍</van-button>
      <van-button block class="dy_btns btn_strat" @click="share()">分享成绩</van-button>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <img :src="zhisi" alt="" />
        <p>请点击右上角分享</p>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getSeconds } from '../utis/urlParameter'

import countTo from 'vue-count-to'
export default {
  components: {
    // Study,
    // Footer,
    countTo,
  },

  data() {
    return {
      duration: '',
      allNum: '',
      showTime: {},
      daflog: require('../assets/image/daflog.png'),
      logo: require('../assets/image/logo.png'),
      erm: require('../assets/image/erm.png'),
      over: require('../assets/image/over.png'),
      zhisi: require('../assets/image/share.png'),
      home_bg: {
        backgroundImage: 'url(' + require('../assets/image/o_bg.png') + ')',
      },
      show: false,
    }
  },
  created() {
    this.duration = this.$route.query.duration
    this.allNum = this.$route.query.allNum
    this.showTime = getSeconds(this.duration)
  },
  mounted() {
    //this.qrcode() //调用二维码生成的方法
    // this.share()
  },

  methods: {
    study() {
      this.$router.push('/Answer')
    },
    qrcode() {
      // 和div的id相同 必须是id  class类名会报错
      // 第二参数是他的配置项
      let qrCode = new QRCode('qrcode', {
        text: window.location.href,
        width: 55,
        height: 55,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      })
    },
    share() {
      this.show = true
    },
  },
  filters: {
    evaluate: (value) => {
      if (value == 100) {
        return '完美'
      } else if (value >= 90 && value < 100) {
        return '优秀'
      } else if (value >= 80 && value < 90) {
        return '良好'
      } else if (value < 80) {
        return '再接再励'
      }
    },
  },
}
</script>
<style lang="less" scoped>
.stydy {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.logo {
  padding: 30px;
  width: 174px;
  height: 34px;

  img {
    width: 100%;
    height: 100%;
  }
}
.center_box {
  margin: 50px auto 0;
  width: 630px;
  height: 840px;
  background: #5857e9;
  border-radius: 20px;
  box-sizing: border-box;
  .top_box {
    position: relative;
    text-align: center;
    padding: 120px 0 0 0;
    img {
      width: 370px;
      height: 270px;
    }
    .top_tips {
      position: absolute;
      bottom: 48px;
      left: 0;
      right: 0;
      width: 100%;

      font-size: 36px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
    }
  }
  .desion {
    display: flex;
    justify-content: space-around;
    margin: 58px 0 0 0;
    .item_box {
      text-align: center;
      .otem_top {
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
        line-height: 56px;
        opacity: 0.5;
      }
      .otem_center {
        font-size: 56px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #facc25;
        line-height: 60px;
      }
    }
  }
  .cp_erm {
    margin: 80px auto 0;
    width: 140px;
    height: 140px;
    text-align: center;
    background: #fff;
    box-sizing: border-box;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
    }
    .qrcode_div {
      width: 100%;
      height: 100%;
      display: inline-block;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        padding: 10px; // 利用padding的特性，挤出白边
        box-sizing: border-box;
      }
    }
  }
}
.btn {
  // margin: -60px 0 30px;
  display: flex;
  justify-content: space-around;
  width: 630px;
  box-sizing: border-box;
  margin: 30px auto 0;

  .dy_btns {
    width: 300px;
    height: 100px;
    border-radius: 50px;
    font-size: 40px;
    font-family: YouYuan;
    font-weight: bold;
    color: #ffffff;
    line-height: 100px;
    text-stroke: 1px #ffffff;
    border: none;
  }
  .btn_xuexi {
    background: #9696fa;
    box-shadow: 0px 10px 0px #7f7eff, 0px 0px 0px #7f7eff;
  }
  .btn_strat {
    background: #ffab18;
    box-shadow: 0px 10px 0px #f08b2c, 0px 0px 0px #f08b2c;
  }
}
.wrapper {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  height: 100%;
  text-align: right;

  img {
    margin: 50px 50px 0 0;
    width: 110px;
    height: 140px;
  }
  p {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    padding: 20px 20px 0 0;
  }
}
</style>
