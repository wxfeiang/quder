<template>
  <div class="footer">
    <van-button type="default" :disabled="jlxh > 0 ? false : true" class="dy_btn" @click="step(1)">上一题</van-button>
    <van-button type="default" v-if="jlxh == all - 1" class="dy_btn" @click="step(3)">完成</van-button>
    <van-button type="default" v-else class="dy_btn" @click="step(2)">下一题</van-button>
  </div>
</template>

<script>
export default {
  props: {
    jlxh: Number,
    all: Number,
    sure: Boolean,
  },
  methods: {
    step(flog) {
      this.$emit('step', flog)
    },
  },
}
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #fff;

  .dy_btn {
    width: 50%;
    background: #9696fa;
    height: 98px;
    font-size: 36px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffffff;
    line-height: 98px;
    text-align: center;
    border: none;
    border-radius: 0px;
  }
}
</style>
