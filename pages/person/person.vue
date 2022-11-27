<template>
  <view>
    <view v-if="personData">
      <uni-section class="mb-10" :title="'有效跑步次数:'+personData.RaceNums+'次'"
        :sub-title="'晨跑次数:'+personData.RaceMNums+'次'" type="circle">

        <template v-slot:right>
          总次数:{{personData.AllCount}}次
        </template>
        <button></button>
      </uni-section>
      <uni-list :border="true">
        <view v-for="(item,index) in personData.listValue" :key="index">
          <!-- {{item}} -->
          <uni-list-chat :title="item.CostDistance+'米'" avatar="../../static/image/touxiang.jpg"
            :note="item.StepNum+'步 '+item.Speed+'m/s'" time="2020-02-02 20:20">
            <view class="chat-custom-right">
              <text class="chat-custom-text">{{item.ResultDate}}</text>
            </view>
          </uni-list-chat>
        </view>

      </uni-list>
    </view>
    <view v-if="!personData">你的IMEI码过期了呢</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        gutter: 0,
        nvueWidth: 730,
        username: '',
        personData: {}
      };
    },
    onLoad(options) {
      this.username = options.username
      this.getData(options.username)
      this.setBadge(options.username)
    },
    methods: {
      async getData(username) {
        const {
          data: res
        } = await this.$http.get('/api/sunrun/data?username=' + username)
        // console.log(res)
        this.personData = res.data
        // console.log(res.data)
      },
      setBadge(text) {
        console.log(text)
        uni.setNavigationBarTitle({
          title: text
        })
      }
    }
  }
</script>

<style lang="scss">
  .demo-uni-row {
    margin-bottom: 10px;

    // 组件在小程序端display为inline
    // QQ、字节小程序文档写有 :host，但实测不生效
    // 百度小程序没有 :host
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
    height: 36px;
    border-radius: 5px;
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


  $uni-success: #18bc37 !default;

  .uni-wrap {
    flex-direction: column;
    /* #ifdef H5 */
    height: calc(100vh - 44px);
    /* #endif */
    /* #ifndef H5 */
    height: 100vh;
    /* #endif */
    flex: 1;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .decoration {
    width: 6px;
    height: 6px;
    margin-right: 4px;
    border-radius: 50%;
    background-color: $uni-success;
  }
</style>
