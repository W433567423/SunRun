<template>
  <view>

    <uni-swiper-dot :info="info" :current="current" field="" mode="nav">
      <swiper class="swiper-box" @change="change">
        <swiper-item v-for="(item ,index) in info" :key="index">
          <view class="swiper-item">
            <text>{{item.content}}</text>
            <image :src=" item.img" style="width:287px;height:413px" v-if="shebei==='ios'"></image>
            <image :src="item.img" style="width:288px;height:656px" v-else-if="shebei==='an'"></image>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>

  </view>
</template>

<script>
  export default {
    name: "lbt",
    data() {
      return {
        current: 0
      };
    },
    props: ['info', 'shebei'],
    onShow() {
      console.log('shebei')
      console.log(this.shebei)
    },
    methods: {
      change(e) {
        this.current = e.detail.current
      }
    }
  }
</script>

<style lang="scss">
  .swiper-box {
    height: 700px;
    margin: 0 10px 10px 0;
  }

  .swiper-item {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text {
      width: 80%;
      margin: 0 auto;
      height: 30px;
      margin-bottom: 10px;
      border: 2px dashed skyblue;
      text-align: center;
    }
  }
</style>
