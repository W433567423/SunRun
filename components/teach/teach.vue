<template>
  <view>
    <uni-section title="安卓教程" type="line">
      <view class="example-body">
        <button type="primary" @click="showDrawer('showLeft')"><text class="word-btn-white">HttpCanary</text>
        </button>
        <uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event,'showLeft')">
          <view class="close">
            <lbt :info='infoA' shebei="an"></lbt>
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
            <lbt :info='infoB' shebei="ios"></lbt>
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
        showLeft: false,
        infoA: [{
          content: '点击不再提示/确定',
          img: '../../static/image/Android/Android (1).jpg'
        }, {
          content: '侧滑，选择目标应用',
          img: '../../static/image/Android/Android (2).jpg'
        }, {
          content: '点击安装',
          img: '../../static/image/Android/Android (3).jpg'
        }, {
          content: '点击关闭',
          img: '../../static/image/Android/Android (4).jpg'
        }, {
          content: '搜索阳光，并勾选阳光体育服务平台',
          img: '../../static/image/Android/Android (5).jpg'
        }, {
          content: '点击右下角纸飞机',
          img: '../../static/image/Android/Android (6).jpg'
        }, {
          content: '打开阳光体育服务平台',
          img: '../../static/image/Android/Android (7).jpg'
        }, {
          content: '登录',
          img: '../../static/image/Android/Android (8).jpg'
        }, {
          content: '回到软件，点击最下面（有绿色200）',
          img: '../../static/image/Android/Android (9).jpg'
        }, {
          content: '点击右上角响应',
          img: '../../static/image/Android/Android (10).jpg'
        }, {
          content: '点击右下角预览',
          img: '../../static/image/Android/Android (11).jpg'
        }, {
          content: '长按IMEICode后的32位，复制',
          img: '../../static/image/Android/Android (12).jpg'
        }, ],
        infoB: [{
          content: '点击HTTPS抓包',
          img: '../../static/image/IOS/IOS (1).PNG'
        }, {
          content: '点击安装CA证书，会跳转至浏览器',
          img: '../../static/image/IOS/IOS (2).PNG'
        }, {
          content: '在弹出的下载框点击允许',
          img: '../../static/image/IOS/IOS (3).PNG'
        }, {
          content: '下完后进入设置，点击通用->VPN',
          img: '../../static/image/IOS/IOS (4).PNG'
        }, {
          content: '选择Stream...',
          img: '../../static/image/IOS/IOS (5).PNG'
        }, {
          content: '点击安装(->输入密码)->安装->完成',
          img: '../../static/image/IOS/IOS (6).PNG'
        }, {
          content: '回到Stream，点击去信任证书',
          img: '../../static/image/IOS/IOS (7).PNG'
        }, {
          content: '设置->通用->关于手机',
          img: '../../static/image/IOS/IOS (8).PNG'
        }, {
          content: '点击证书信任设置',
          img: '../../static/image/IOS/IOS (9).PNG'
        }, {
          content: '点击Stream...，在弹出框点击继续',
          img: '../../static/image/IOS/IOS (10).PNG'
        }, {
          content: '此时，已经配置好了',
          img: '../../static/image/IOS/IOS (11).PNG'
        }, {
          content: '去重新登录阳光体育服务平台',
          img: '../../static/image/IOS/IOS (12).PNG'
        }, {
          content: '返回软件点击停止抓包',
          img: '../../static/image/IOS/IOS (13).PNG'
        }, {
          content: '点击最新的记录',
          img: '../../static/image/IOS/IOS (14).PNG'
        }, {
          content: '点击按域名，点击client4.aipao.me',
          img: '../../static/image/IOS/IOS (15).PNG'
        }, {
          content: '选择带有wxcode的(一般来讲第四条)',
          img: '../../static/image/IOS/IOS (16).PNG'
        }, {
          content: '点击响应，点击查看响应',
          img: '../../static/image/IOS/IOS (17).PNG'
        }, {
          content: '长按IMEICode后的32位，复制',
          img: '../../static/image/IOS/IOS (18).PNG'
        }, ]
      };
    },
    onReady: function(res) {
      // #ifndef MP-ALIPAY
      this.videoContext = uni.createVideoContext('myVideo')
      // #endif
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
    padding: 0 10px;
  }

  .close {
    padding: 10px;
  }
</style>
