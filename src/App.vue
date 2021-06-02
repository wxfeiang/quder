<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    //this.qrcode() //调用二维码生成的方法
    this.share()
  },
  methods: {
    share() {
      var surl = window.location.href
      console.log('置换签名的地址', surl, encodeURIComponent(surl), '')
      var getUrl = `https://www.yoribo.com/weChat_share/?action=10001&param=[{'surl': '${encodeURIComponent(
        surl
      )}', 'accessToken': 'DB7C1D38-E3E7-4BF7-8A60-699ACD536B11'}]`

      this.$http
        .post(getUrl)
        .then((res) => {
          // console.log(res)
          this.wxstart(res)
          console.log(res, 'res---------')
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    wxstart(res) {
      var data = res.data.Data[0]

      var url = 'http://www.yoribo.com/H5/quster/dist/'

      var appId = data.appid
      var timestamp = data.timestamp
      var nonceStr = data.noncestr
      var signature = data.signature
      console.log(appId, timestamp, nonceStr, signature, '------------------')

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.error(function(res) {
        // 注册失败
        console.log('注册失败')
        this.$toast.fail('请返回上一层')
        alert('请返回上一层')
      })

      wx.ready(function() {
        var imgurl = 'http://www.yoribo.com/H5/H5_manual/fonts/favicon.ico'
        var title = 'REITs快速入门经典50题'
        var desc = 'REITs快速入门经典50题入门,你也来试试.......'
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: url, // 分享链接
          imgUrl: imgurl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
            console.log('分享sucess')
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          },
        })

        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: url, // 分享链接
          imgUrl: imgurl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            console.log('分享sucess')
          },
          cancel: function() {},
        })

        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: url, // 分享链接
          imgUrl: imgurl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
            console.log('分享sucess')
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          },
        })
      })
    },
  },
}
</script>
<style>
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
