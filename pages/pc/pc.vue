<template>
  <view>
    <uni-nav-bar height="65px" dark shadow>
      <view class="input-view">
        <uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
        <input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" @confirm="confirm" />
      </view>
      <block slot="">
        <view class="nav">

        </view>
      </block>
    </uni-nav-bar>

    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
        @clickItem="onClickItem" />
    </view>
    <view class="content">
      <view v-if="current === 0"><text class="content-text">选项卡1的内容</text></view>
      <view v-if="current === 1"><text class="content-text">选项卡2的内容</text></view>
      <view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        items: ['选项卡1', '选项卡2', '选项卡3'],
        current: 0,
        activeColor: '#007aff',
        styleType: 'button'
      };
    },
    methods: {
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex
        }
      },
      styleChange(e) {
        if (this.styleType !== e.detail.value) {
          this.styleType = e.detail.value
        }
      },
      colorChange(e) {
        if (this.styleType !== e.detail.value) {
          console.log(e.detail.value);
          this.activeColor = e.detail.value
        }
      }
    }
  }
</script>

<style lang="scss">
  .example-body {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    padding: 0;
  }

  .uni-common-mt {
    margin-top: 30px;
  }

  .uni-padding-wrap {
    // width: 750rpx;
    padding: 0px 30px;
  }

  .content {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;
    height: 150px;
    text-align: center;
    background-color: rosybrown;
  }

  .content-text {
    font-size: 14px;
    color: #666;
  }

  .color-tag {
    width: 25px;
    height: 25px;
  }

  .uni-list {
    flex: 1;
  }

  .uni-list-item {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex: 1;
    flex-direction: row;
    background-color: #FFFFFF;
  }


  .uni-list-item__container {
    padding: 12px 15px;
    width: 100%;
    flex: 1;
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    box-sizing: border-box;
    /* #endif */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #eee;
  }

  .uni-list-item__content-title {
    font-size: 14px;
  }

  .nav {
    background-color: red;
    width: 800px;
    height: 50px;
  }
</style>
