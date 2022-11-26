<template>
  <view>
    <uni-section title="安卓教程" type="line">
      <view class="example-body">
        <button type="primary" @click="showDrawer('showLeft')"><text class="word-btn-white">HttpCanary</text>
        </button>
        <uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event,'showLeft')">
          <view class="close">
            <button @click="closeDrawer('showLeft')"><text class="word-btn-white">关闭</text></button>
            还没做出来，懒~，我要摆烂烂
          </view>
        </uni-drawer>
      </view>
    </uni-section>


    <uni-section title="IOS教程" type="line">
      <view class="example-body">
        <button type="primary" @click="showDrawer('showRight')"><text class="word-btn-white">Stream</text>
        </button>
        <uni-drawer ref="showRight" mode="right" :width="320" @change="change($event,'showRight')">
          <view class="close">
            <button @click="closeDrawer('showRight')"><text class="word-btn-white">关闭Drawer</text></button>
            还没做出来，懒~，我要摆烂烂
          </view>
        </uni-drawer>
      </view>
    </uni-section>

  </view>
</template>

<script>
  export default {
    name: "teach",
    data() {
      return {
        showRight: false,
        showLeft: false
      };
    },
    methods: {
      confirm() {},
      // 打开窗口
      showDrawer(e) {
        this.$refs[e].open()
      },
      // 关闭窗口
      closeDrawer(e) {
        this.$refs[e].close()
      },
      // 抽屉状态发生变化触发
      change(e, type) {
        console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
        this[type] = e
      }
    },
    onNavigationBarButtonTap(e) {
      if (this.showLeft) {
        this.$refs.showLeft.close()
      } else {
        this.$refs.showLeft.open()
      }
    },
    // app端拦截返回事件 ，仅app端生效
    onBackPress() {
      if (this.showRight || this.showLeft) {
        this.$refs.showLeft.close()
        this.$refs.showRight.close()
        return true
      }
    }
  }
</script>

<style lang="scss">
  .example-body {
    padding: 10px;
  }

  .close {
    padding: 10px;
  }
</style>
