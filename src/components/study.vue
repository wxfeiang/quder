<template>
  <!-- 学习模式 -->
  <div class="xuexi_box">
    <div class="xue_item" v-for="(item, index) in curlist" :key="index">
      {{ item.topic == 1 ? item.answer_name : '' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    curlist: Array,
  },
}
</script>

<style lang="less" scoped>
.xuexi_box {
  margin: 10px auto 0;
  width: 590px;
  min-height: 350px;
  background: #ffffff;
  border-radius: 0px 0px 20px 20px;
  padding: 50px;
  box-sizing: border-box;
  .xue_item {
    font-size: 28px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #48569a;
    line-height: 42px;
    text-align: center;
  }
}
</style>
