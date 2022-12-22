<template>
  <view>
    <uni-notice-bar class='notice' show-icon scrollable text="本网站/app/小程序永久免费,请勿通过任何付费渠道获得" />
    <uni-row class="demo-uni-row tip" width="730" style="font-size: 10px;">
      <uni-col :span="11">
        <view class="demo-uni-col dark">本站已运行<text style="color:red">{{timeD}}</text>
        </view>
      </uni-col>
      <uni-col :span="11">
        <view class="demo-uni-col light">成功为<text style="color:red">{{usersCount}}</text>位小可耐云跑步
        </view>
      </uni-col>
    </uni-row>
    <!-- 基本用法 -->
    <uni-search-bar placeholder="快速找到" :radius="100" v-model="query"></uni-search-bar>
    <!-- 列表展示 -->

    <uni-collapse v-if="isShowList">
      <uni-collapse-item title='小可耐们' title-border="none" :border="false" :open="true">
        <view class="content">
          <uni-list v-for="(item,i) in usersList" :key="i">
            <uni-list-item :title="item.username" :rightText="'有效期:'+timeToDur(Number(item.time)+ 86400000 * 7)" link :to="'/pages/person/person?username='+item.username"
              v-if="!timeToDur(Number(item.time)+ 86400000 * 7).includes('-')">
            </uni-list-item>

            <uni-list-item :title="item.username" :disabled="true" rightText="有效期:已失效" v-else>
            </uni-list-item>
          </uni-list>
        </view>
      </uni-collapse-item>
    </uni-collapse>
    <!--筛选 -->
    <uni-collapse v-if="!isShowList">
      <uni-collapse-item title='小可耐们' title-border="none" :border="false" :open="true" v-if="!isShowList">
        <view class="content">
          <uni-list v-for="(item,i) in newList" :key="i">
            <uni-list-item :title="item.username" :rightText="'有效期:'+timeToDur(Number(item.time)+ 86400000 * 7)" link :to="'/pages/person/person?username='+item.username"
              v-if="!timeToDur(Number(item.time)+ 86400000 * 7).includes('-')">
            </uni-list-item>
            <uni-list-item :title="item.username" :disabled="true" rightText="有效期:已失效" v-else>
            </uni-list-item>
          </uni-list>
        </view>
      </uni-collapse-item>
    </uni-collapse>
    <!-- 悬浮 -->
    <my-button></my-button>
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
        queryObject: {
          page: 0,
          limit: 25
        },
        usersList: [],
        usersCount: 0,
        newList: [],
        // 节流阀
        isLoading: true,
        isShowList: true,
        timeD: 0,
        //双向绑定搜索值
        query: ''
      };
    },
    computed: {
      // 时间转换计算属性
      timeToDur() {
        return (etime, stime = (new Date()).getTime(), sec = false) => {
          //总毫秒数
          let usedTime = etime - stime
          let days = Math.floor(usedTime / (24 * 3600 * 1000))
          //总毫秒数（时级）
          let leave1 = usedTime % (24 * 3600 * 1000)
          let hours = Math.floor(leave1 / (3600 * 1000))
          //总毫秒数
          let leave2 = leave1 % (3600 * 1000)
          let minutes = Math.floor(leave2 / (60 * 1000))
          let time = days + "天" + hours + "时" + minutes + "分"
          if (!sec)
            return time
          else {
            let leave3 = leave2 % (60 * 1000)
            let seconds = Math.floor(leave3 / (1000))
            return time + seconds + "秒"
          }
        }
      }
    },
    watch: {
      //搜索词侦听
      query(newValue, oldValue) {
        if (!newValue)
          this.isShowList = true
        else {
          this.isShowList = false
          //请求所有数据
          this.getSerachList(newValue)
        }
      }
    },
    methods: {
      ...mapMutations(['changeCount', 'changeAmount']),
      //获取用户信息
      async getUsersList(callback) {
        this.isLoading = true
        const {
          data: res
        } = await this.$http.get('/api/sunrun', this.queryObject)
        this.isLoading = false
        if (res.status !== 200) this.$showMsg()
        if (res.data.length !== this.queryObject.limit) this.$showMsg('没有更多了呢，宝')
        callback && callback()
        this.usersList = [...this.usersList, ...res.data]
        this.usersCount = res.count
        this.changeCount(this.usersList.length)
        this.changeAmount(this.usersCount)
        this.setBadge()
      },
      async getSerachList(e) {
        const {
          data: res
        } = await this.$http.get('/api/sunrun', {
          salvage: e
        })
        if (res.status !== 200) this.$showMsg()
        this.newList = res.data
      },
      //设置徽标
      setBadge() {
        uni.setTabBarBadge({
          index: 0,
          text: this.usersList.length + ''
        })
      },
      //前往Person
      gotoPerson(username) {
        uni.navigateTo({
          url: '/page/person/person?username=' + username
        })
      },
      getTimeD() {
        setInterval(() =>
          this.timeD = this.timeToDur((new Date()).getTime(), 1665098803000, true), 1000)
      }
    },
    onLoad() {
      this.getUsersList()
      this.timeD = this.timeToDur((new Date()).getTime(), 1665098803000, true)
      this.getTimeD()
    },
    onReachBottom() {
      if (this.isShowList) {
        this.queryObject.page++
        this.isLoading = true
        this.getUsersList()
      }
    },
    onPullDownRefresh() {
      this.isLoading = false
      this.queryObject.page = 0
      this.usersList = []
      this.usersCount = 0
      this.getUsersList(() => {
        uni.stopPullDownRefresh()
        this.$showMsg('刷新成功')
      })
    }
  }
</script>

<style lang="scss">
  .notice {
    z-index: 999;
    position: fixed;
    top: 40px;
    left: 0;
  }

  .tip {
    display: flex;
    justify-content: space-around;
  }

  .demo-uni-col {
    margin-top: 40px;
    height: 36px;
    border-radius: 5px;
    line-height: 36px;
    text-align: center;
  }

  .dark {
    background-color: #d3dce6;
  }

  .light {
    background-color: #e5e9f2;
  }
</style>
