<template>
  <div class="seting">
       <h2 class="van-doc-demo-block__title">主叫设置</h2>
      <van-field v-model="tel" type="tel" label="主叫号码" />
      <h2 class="van-doc-demo-block__title">隐私号码设置</h2>
      <van-field v-model="yinsi" type="tel" label="隐私号码"  disabled />
      <div class="btn_box">
      <van-button type="info" round block @click="sure()">确定</van-button>
      </div>


  </div>
</template>
<script>
export default {
    data() {
    return {
      tel: '',
      yinsi: '17150870359',
      digit: '',
      number: '',
      password: '',
    };
  },
 methods: {

   sure(){
     if(this.tel == ""){
        this.$toast("请输入主叫号码");
        return false
     }
    var data = {"PhoneNoA":this.tel}
    this.$http 
        .post('http://work.yogoo.net/weworkapi/api/set_PhoneNoA/',JSON.stringify(data))
        .then(res => {
          console.log(res)
          if(res.data.ErrorCode == 0){
            localStorage.setItem("flog", 1);  
            this.$toast("设置成功");
          }else{
             this.$toast(res.data.data);
          }
      
       
   
        }).catch((response)=>{
     
      })
   }


 }


   
}
</script>
<style scoped>

.title{
  text-align: center;
  font-size: 20px;
  line-height: 40px;
  background: #07c160;
    color: #fff;
}
.van-doc-demo-block__title{
    
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
}
.btn_box{
  margin: 40px  auto 0;
  width: 80%;
  
}
</style>