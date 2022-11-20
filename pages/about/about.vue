<template>
  <view>
    <!-- header -->
    <header>
      <view class="head">
        <view class="touxiang">
          <image src="../../static/image/touxiang.jpg" mode=""></image>
        </view>
        <text style="margin-left: 20px;">想用头像?想叭!</text>
      </view>
      <view style="margin:50px 0px 0 20px;">本网站已被<text style="color:red">{{this.amount}}</text>位小可耐使用!</view>
    </header>
    <!-- 宫格 -->
    <uni-grid :column="3" :highlight="true" @change="change" :square="false">
      <uni-grid-item v-for="(item, index) in 6" :index="index" :key="index">
        <view class="grid-item-box gongge" style="background-color: #fff;height: 80px;">
          <uni-icons :type="iconList[index]" :size="40" color="#777" v-if="!!iconList[index]" />

          <text class="text" v-if="!!iconList[index]">{{iconText[index]}}</text>
          <!-- B站特殊处理 -->
          <image src="../../static/image/bilibili.png" style="width: 36px;margin-bottom: 0;" mode="aspectFit"
            v-if="!!!iconList[index]">
          </image>
          <text class="text" v-if="!!!iconList[index]" style="margin-bottom: 12px;">{{iconText[index]}}</text>
        </view>
      </uni-grid-item>
    </uni-grid>

    <!-- 列表 -->
    <!-- 弹出层 -->
    <view>
      <uni-popup ref="popup" type="center" class="pop">
        <image src="../../static/image/wx.png" mode=""></image>
        <image src="../../static/image/zfb.jpg" mode=""></image>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        iconList: ['gift', 'headphones', 'redo', 'qq', '', 'email-filled'],
        iconText: ['乐捐', '付费咨询', '分享', 'QQ', 'bilibili', '反馈bug']
      }
    },
    computed: {
      ...mapState(['amount'])
    },
    onLoad() {},
    methods: {
      change(e) {
        let {
          index
        } = e.detail
        console.log(index)
        switch (index) {
          case 0:
            this.$refs.popup.open('center')
            break
          case 1:
            this.$showMsg('该功能未开放')
            break
          case 2:
            let input = document.createElement("input");
            input.value = 'https://run.wtututu.top';
            document.body.appendChild(input);
            input.select();
            document.execCommand("Copy");
            document.body.removeChild(input);
            this.$showMsg('链接已复制到剪切板了，快分享给有需要的宝叭！');
            break
          case 3:
            window.open('http://wpa.qq.com/msgrd?v=3&uin=227384408&site=qq&menu=yes')
            break
          case 4:
            window.open('https://space.bilibili.com/698802436')
            break
          case 5:
            window.open('mailto:227384408@qq.com')
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  header {
    width: 100%;
    height: 200px;
    background-color: #449ffa;
    background-color: #f3f7f0;
  }

  .gongge {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;

    text {
      margin-top: 10px;
    }
  }

  .pop {
    background-color: red;

    image {
      width: 375rpx;
    }
  }

  .head {
    position: relative;
    top: 30px;
    left: 30px;
    width: 240px;

    .touxiang {
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      width: 80px;
      height: 80px;
      vertical-align: middle;

      image {
        width: 80px;
        height: 80px;
      }
    }
  }
</style>
