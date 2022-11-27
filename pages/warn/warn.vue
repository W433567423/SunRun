<template>
  <view>
    <!-- <uni-section title="上传文件,不要乱传(该功能不开放)" type="line">
      <view class="example-body">
        <uni-file-picker limit="9" file-mediatype="all" title="最多选择9个文件"></uni-file-picker>
      </view>
    </uni-section> -->
    <uni-section title="食用步骤" type="line" padding>
      <uni-steps :options="list" active-icon="medal" :active="active" />
      <view class="content">

        <view v-if="active === 0">
          <uni-group title="食用教程">
            <uni-row class="demo-uni-row" :width="nvueWidth">
              <uni-col :span="14">
                <view class="demo-uni-col dark"><text style="color: skyblue;"
                    @click="gotoWeb('https://czyx007.cn/archives/wireshark-sunnyrun')">HttpCanary食用方法
                  </text></view>
              </uni-col>
            </uni-row>
          </uni-group>
          <uni-group title="个人制作教程">
            <teach></teach>
          </uni-group>
        </view>

        <view v-if="active === 1">
          安卓:<uni-icons type="cloud-download" size="24"></uni-icons>
          <uni-link href="https://wwc.lanzoul.com/iPrXN0da7vpc" color="#999999" text="HttpCanary" showUnderLine="false"
            font-size="20"></uni-link>[密码:tutu]<br>
          <button class="mini-btn" type="primary" size="mini"
            @click="gotoWeb('https://wwc.lanzoul.com/iPrXN0da7vpc')">立即下载</button><br>
          IOS:<uni-icons type="cloud-download" size="24"></uni-icons>
          <uni-link href="https://apps.apple.com/cn/app/stream/id1312141691" color="#999999" text="Stream"
            showUnderLine="false" font-size="20"></uni-link><br>
          <button class="mini-btn" type="primary" size="mini"
            @click="gotoWeb('https://apps.apple.com/cn/app/stream/id1312141691')">立即下载</button>
        </view>

        <view v-if="active === 2">
          <view class="tag-view">
            <uni-tag text="没啥好说的，按视频/教程一步步来" type="warning" />
          </view>
          <view class="tag-view">
            <uni-tag text="QQ:2232202990(付费答疑，3r解君愁)" type="success" />
          </view>
        </view>

        <view v-if="active === 3">
          注意事项
          <ul>
            <li>每个人只用一个昵称，滥用昵称后果自负</li>
            <li>长跑时间：6:00-8:30、16:00-22:30（其他时间跑步成绩无效）</li>
            <li>长跑要求：男生2000（2米每秒-5.5米每秒）<br>女生1600（1.6米每秒-5.5米每秒）</li>
            <li>南湖也可以用，不要再来问我了！很忙，谢谢！</li>
          </ul>
        </view>
      </view>
    </uni-section>
    <footer><button type="primary" size="mini" @click="change">下一步</button>
      <text>本站承诺永久免费，但是不承诺永久维护</text>
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
          desc: 'O'
        }, {
          title: '安装软件',
          desc: 'L'
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

  footer {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 32px;
    width: 100%;
    height: 100px;

    button {
      display: block;
      width: 100px;
      height: 30px;
      margin-bottom: 32px;
    }
  }
</style>
