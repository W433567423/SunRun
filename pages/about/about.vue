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
          <!-- 特殊处理 -->
          <image src="../../static/image/log.png" style="width: 36px; height: 36px;" v-if="iconList[index]==='log'">
          </image>
          <image src="../../static/image/bilibili.png" style="width: 36px;height: 36px;"
            v-else-if="iconList[index]==='bili'">
          </image>
          <uni-icons :type="iconList[index]" :size="40" color="#777" v-else />
          <text class="text">{{iconText[index]}}</text>
        </view>
      </uni-grid-item>
    </uni-grid>

    <!-- 弹出层 -->
    <view>
      <uni-popup ref="popup" type="center" class="pop">
        <image src="../../static/image/wx.png" mode=""></image>
        <image src="../../static/image/zfb.jpg" mode=""></image>
      </uni-popup>
    </view>
    <view>
      <uni-popup ref="log_pop" type="center">
        <!-- <uni-popup-dialog title="log" type="circle"> -->
        <scroll-view scroll-y="true" class="log-scroll">
          <h2>log</h2>
          <ul>
            <li class="red">仍在更新，看心情更新</li>
            <li>2022.12.17 删除了pc端，并对内容进行了内容及样式优化</li>
            <li>2022.12.5 加入了课查看个人长跑信息板块</li>
            <li> 2022.11.20 经过两天的爆肝，手机端已上线</li>
            <li> ~2022.11.15 这阵子忙完会着手重构网站，并专门适配手机端</li>
            <li> 2022.11.10修复了未勾选跑步时间也可以上传的bug</li>
            <li> 2022.11.4加入了捐献模块</li>
            <li> 2022.11.4优化了界面UI，仍未适配移动端，家人们将就用着</li>
            <li> 2022.10.24加入IOS抓包视频教程</li>
            <li>~2022.10.24预计加入IOS抓包教程</li>
            <li> 2022.10.23 增加晨/晚跑自选功能&修复了时间显示为负数的bug</li>
            <li>~2022.10.19 有学妹向我反映老是晨跑不好</li>
          </ul>
        </scroll-view>
      </uni-popup>
    </view>
  </view>
  </view>

</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        iconList: ['gift', 'log', 'redo', 'qq', 'bili', 'email-filled'],
        iconText: ['乐捐', '日志', '分享', 'QQ', 'bilibili', '反馈bug']
      }
    },
    computed: {
      ...mapState(['amount'])
    },
    onLoad() {
      this.getUsersList()
    },
    methods: {
      ...mapMutations(['changeAmount']),
      //获取用户信息
      async getUsersList() {
        const {
          data: res
        } = await this.$http.get('/api/sunrun', this.queryObject)
        if (res.status !== 200) this.$showMsg()
        this.changeAmount(res.count)
      },
      change(e) {
        let {
          index
        } = e.detail
        switch (index) {
          case 0:
            this.$refs.popup.open('center')
            break
          case 1:
            this.$refs.log_pop.open('center')
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
    justify-content: space-around;
    align-items: center;
    padding-top: 20px;

    .text {
      margin-bottom: 10px;
    }
  }

  .pop {
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

  .log-scroll {
    width: 75%;
    height: 400px;
    padding: 30px 20px;
    border-radius: 30px;
    background-color: white;
    margin: 0 auto;

    h2 {
      display: block;
      width: 40px;
      height: 30px;
      line-height: 30px;
      margin: 0 auto 10px;
      font-weight: 800;
    }

    ul {
      padding: 0 10px 0 20px;
    }

    .red {
      color: red;
    }
  }
</style>
