<template>
  <div class="Tkhome" :style="home_bg">
    <div class="logo">
      <img :src="logo" alt="logo" />
    </div>
    <div class="bg_title">
      <img :src="bgtitle" alt="bgtitle" />
    </div>
    <div class="daflog">
      <img :src="daflog" alt="daflog" />
    </div>
    <div class="btn">
      <van-button block class="dy_btns btn_xuexi" @click="study()">学习模式</van-button>
      <van-button block class="dy_btns btn_strat" @click="answer()">答题模式</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tkhome',
  props: {
    msg: String,
  },
  data() {
    return {
      logo: require('../assets/image/logo.png'),
      bgtitle: require('../assets/image/bg_title.png'),
      daflog: require('../assets/image/daflog.png'),
      home_bg: {
        backgroundImage: 'url(' + require('../assets/image/index_bg.png') + ')',
      },
      chosenContactId: '1',
      list: [],
    }
  },
  created: function() {
    //  设置随机数
    var number = Math.ceil(Math.random() * 100000)
    console.log(number)
    this.$http.get('data.json?bbh=' + number).then((res) => {
      console.log(res, '成功')
      this.list = res.data
    })
  },
  methods: {
    study() {
      this.$router.push({
        name: 'Study',
        query: {
          id: '0',
        },
      })
    },
    answer() {
      this.$router.push('/Answer')
    },
  },
}
</script>
<style scoped>
.Tkhome {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
.logo {
  padding: 30px;
  width: 174px;
  height: 34px;
}
.logo img {
  width: 100%;
  height: 100%;
}
.bg_title {
  margin-top: 120px;
  text-align: center;
  height: 200px;
}
.bg_title img {
  width: 520px;
  height: 200px;
}
.daflog {
  margin: 10px auto 0;
  text-align: center;
}
.daflog img {
  width: 750px;
  height: 440px;
}
.btn {
  text-align: center;
  margin: -60px 0 30px;
}

.btn .dy_btns {
  margin: 0px auto;
  width: 440px;
  height: 100px;
  border-radius: 50px;
  font-size: 44px;
  font-family: YouYuan;
  font-weight: bold;
  color: #ffffff;
  line-height: 100px;
  text-stroke: 1px #ffffff;
  border: none;
}
.btn .btn_xuexi {
  margin: 0px auto 44px;
  background: #9696fa;
  box-shadow: 0px 10px 0px #7f7eff, 0px 0px 0px #7f7eff;
}
.btn .btn_strat {
  background: #ffab18;
  box-shadow: 0px 10px 0px #f08b2c, 0px 0px 0px #f08b2c;
}
</style>
