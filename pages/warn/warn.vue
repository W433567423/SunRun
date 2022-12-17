<template>
  <view style="width: 100%;background-color: red;">
    <!-- <uni-section title=" 上传文件,不要乱传(该功能不开放)" type="line">
    <view class="example-body">
      <uni-file-picker limit="9" file-mediatype="all" title="最多选择9个文件"></uni-file-picker>
    </view>
    </uni-section> -->
    <uni-section title="食用步骤" type="line" padding>
      <uni-steps :options="list" active-icon="medal" :active="active" />
      <view class="content">

        <view v-if="active === 0">
          <uni-group title="君绾墨教程">
            <uni-row class="demo-uni-row" :width="nvueWidth">
              <div>
                <text class="zyxJiao" @click="gotoWeb('https://czyx007.cn/archives/wireshark-sunnyrun')">HttpCanary食用
                </text>
              </div>
            </uni-row>
          </uni-group>
          <uni-group title="涂涂教程(请先下载好软件)">
            <teach></teach>
          </uni-group>
        </view>

        <view v-if="active === 1">
          <uni-row class="demo-uni-row" :width="nvueWidth">
            <uni-col>
              <view class="demo-uni-col light block">
                <view>安卓:<uni-icons type="cloud-download" size="24"></uni-icons>
                  <uni-link href="https://wwc.lanzoul.com/iPrXN0da7vpc" color="#1aa034" text="HttpCanary"
                    showUnderLine="false" font-size="20"></uni-link>[密码:tutu]
                </view>
                <button class="mini-btn" type="primary" size="mini"
                  @click="gotoWeb('https://wwc.lanzoul.com/iPrXN0da7vpc')">立即下载</button>
              </view>
              <hr>
              <view class="demo-uni-col dark block">
                <view>IOS:<uni-icons type="cloud-download" size="24"></uni-icons>
                  <uni-link href="https://apps.apple.com/cn/app/stream/id1312141691" color="#1aa034" text="Stream"
                    showUnderLine="false" font-size="20"></uni-link>
                </view>
                <button class="mini-btn" type="primary" size="mini"
                  @click="gotoWeb('https://apps.apple.com/cn/app/stream/id1312141691')">立即下载</button>
              </view>
            </uni-col>
          </uni-row>
        </view>

        <view v-if="active === 2">
          <uni-row class="demo-uni-row" :width="nvueWidth">
            <uni-col>
              <view class="demo-uni-col light block" style="padding: 30px 0px;">
                <ul>
                  <li>付费答疑:QQ:227384408</li>
                  <li>先点击右下角[关于我]，再点击[乐捐]</li>
                  <li>重申:付费的意义仅仅是为了避免不动脑就打扰</li>
                  <li>一次三元，三元解君愁！！！</li>
                </ul>
              </view>
            </uni-col>
          </uni-row>
        </view>

        <view v-if="active === 3">
          <uni-row class="demo-uni-row" :width="nvueWidth">
            <uni-col>
              <view class="demo-uni-col dark block" style="padding: 30px 10px 30px 0px; height: 240px;">

                <ul>注意事项
                  <li>每个人只用一个昵称，滥用昵称后果自负</li>
                  <li>长跑时间：6:00-8:30、16:00-22:30（其他时间跑步成绩无效）</li>
                  <li>长跑要求：男生2000（2米每秒-5.5米每秒）<br>女生1600（1.6米每秒-5.5米每秒）</li>
                  <li>南湖也可以用，不要再来问我了！很忙，谢谢！</li>
                </ul>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </uni-section>
    <footer>
      <view><button type="primary" size="mini" @click="change">下一步</button>
        <text>本站承诺永久免费，但是不承诺永久维护</text>
      </view>
    </footer>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        gutter: 0,
        nvueWidth: 730,
        active: 0,
        list: [{
          title: '观看教程',
          desc: 'L'
        }, {
          title: '安装软件',
          desc: 'O'
        }, {
          title: '上手抓包',
          desc: 'V'
        }, {
          title: '上传IMEI',
          desc: 'E'
        }]
      }
    },

    methods: {
      change() {
        if (this.active < this.list.length - 1) {
          this.active += 1
        } else {
          this.active = 0
        }
      },
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex
        }
      },
      gotoWeb(url) {
        window.open(url)
      }
    }
  }
</script>

<style lang="scss">
  .demo-uni-row {
    /* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
    display: block;
    /* #endif */
  }

  // 支付宝小程序没有 demo-uni-row 层级
  // 微信小程序使用了虚拟化节点，没有 demo-uni-row 层级
  /* #ifdef MP-ALIPAY || MP-WEIXIN */
  ::v-deep .uni-row {
    margin-bottom: 10px;
  }

  /* #endif */

  .demo-uni-col {
    height: 30px;
    border-radius: 10px;
    line-height: 30px;
    margin: 0 15px;
    padding: 0 15px;
  }

  .dark_deep {
    background-color: #99a9bf;
  }

  .dark {
    background-color: #d3dce6;
  }

  .light {
    background-color: #e5e9f2;
  }

  .example-body {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    padding: 5rpx 10rpx 0;
    overflow: hidden;
  }

  .zyxJiao {
    color: skyblue;
    background-color: #e5e9f2;
    padding: 5px 20px;
    border-radius: 20px;
  }

  .block {
    height: 120px;
    margin: 20px;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;

    view {
      display: flex;
      justify-content: center;
    }

    ul {
      padding: 0 0 0 25px;
      font-size: 16px;
    }
  }

  footer {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    bottom: 0;
    margin-bottom: 32px;
    width: 100%;
    max-width: 596px;
    height: 100px;

    button {
      display: block;
      width: 150px;
      height: 36px;
      line-height: 36px;
      background-color: limegreen;
    }
  }
</style>
