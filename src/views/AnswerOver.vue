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
            {{ allNum }}
          </div>
        </div>
        <div class="item_box">
          <div class="otem_top">
            本轮用时
          </div>
          <div class="otem_center">
            {{ duration }}
          </div>
        </div>
      </div>
      <div class="cp_erm">
        <img :src="erm" alt="" />
      </div>
    </div>
    <div class="btn">
      <van-button block class="dy_btns btn_xuexi" @click="study()">再答一遍</van-button>
      <van-button block class="dy_btns btn_strat" @click="answer()">分享成绩</van-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    // Study,
    // Footer,
  },

  data() {
    return {
      duration: '',
      allNum: '',
      daflog: require('../assets/image/daflog.png'),
      logo: require('../assets/image/logo.png'),
      erm: require('../assets/image/logo.png'),
      over: require('../assets/image/over.png'),
      home_bg: {
        backgroundImage: 'url(' + require('../assets/image/o_bg.png') + ')',
      },
      strA: 'A',
    }
  },
  created() {
    this.duration = this.$route.query.duration
    this.allNum = this.$route.query.allNum
  },
  methods: {
    study() {
      this.$router.push('/Answer')
    },
  },
  filters: {
    evaluate: (value) => {
      if (value > 90) {
        return '优秀'
      } else if (value >= 60 && value < 90) {
        return '及格'
      } else {
        return '未完成'
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
  background-size: cover;
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
        line-height: 40px;
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
    img {
      width: 100%;
      height: 100%;
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
</style>
