<template>
  <view>
    <uni-notice-bar show-icon scrollable text="本网站/app/小程序永久免费,请勿通过任何付费渠道获得" />
    <!-- 基本用法 -->
    <uni-search-bar @input="input" placeholder="快速找到" :radius="100"></uni-search-bar>
    <!-- 列表展示 -->
    <uni-collapse v-if="isShowList">
      <uni-collapse-item title='小可耐们' title-border="none" :border="false" :open="true">
        <view class="content">
          <uni-list v-for="(item,i) in usersList" :key="i">
            <uni-list-item :title="item.username" :rightText="'有效期:'+timeToDuration(Number(item.time))"
              v-if="!timeToDuration(Number(item.time)).includes('-')">
            </uni-list-item>
            <uni-list-item :title="item.username" :disabled="true" rightText="有效期:已失效"
              v-if="timeToDuration(Number(item.time)).includes('-')">
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
            <uni-list-item :title="item.username" :rightText="'有效期:'+timeToDuration(Number(item.time))"
              v-if="!timeToDuration(Number(item.time)).includes('-')">
            </uni-list-item>
            <uni-list-item :title="item.username" :disabled="true" rightText="有效期:已失效"
              v-if="timeToDuration(Number(item.time)).includes('-')">
            </uni-list-item>
          </uni-list>
        </view>
      </uni-collapse-item>
    </uni-collapse>

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
          limit: 20
        },
        usersList: [],
        usersCount: 0,
        newList: [],
        // 节流阀
        isLoading: true,
        //
        isShowList: true
      };
    },
    onLoad() {
      this.getUsersList()
    },
    onShow() {
      // this.getUsersList(() => {})
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
      // 时间转换函数
      timeToDuration(etime, stime = (new Date()).valueOf()) {
        let usedTime = etime + 86400000 * 7 - stime
        let days = Math.floor(usedTime / (24 * 3600 * 1000))
        let leave1 = usedTime % (24 * 3600 * 1000)
        let hours = Math.floor(leave1 / (3600 * 1000))
        let leave2 = leave1 % (3600 * 1000)
        let minutes = Math.floor(leave2 / (60 * 1000))
        let time = days + "天" + hours + "时" + minutes + "分"
        return time;
      },
      //设置徽标
      setBadge() {
        uni.setTabBarBadge({
          index: 0,
          text: this.usersList.length + ''
        })
      },
      //搜索框事件
      input(e) {
        if (!!!e) {
          this.isShowList = true
        } else {
          this.isShowList = false
          //请求所有数据
          this.getNewList(e)
        }
      },
      async getNewList(e) {
        const {
          data: res
        } = await this.$http.get('/api/sunrun', {
          salvage: e
        })
        if (res.status !== 200) this.$showMsg()
        this.newList = res.data
      }
    },
    onReachBottom() {
      this.queryObject.page++
      this.isLoading = true
      this.getUsersList()
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
    },
    open() {}
  }
</script>

<style lang="scss">
</style>
