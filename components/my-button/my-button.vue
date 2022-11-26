<template>
  <view>
    <uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
      :direction="direction" @trigger="trigger" />
  </view>
</template>

<script>
  export default {
    name: "my-button",
    data() {
      return {
        title: 'uni-fab',
        directionStr: '垂直',
        horizontal: 'right',
        vertical: 'bottom',
        direction: 'horizontal',
        pattern: {
          color: '#1ca035',
          backgroundColor: '#fff',
          selectedColor: '#007AFF',
          buttonColor: '#1ca035',
          iconColor: '#fff'
        },
        is_color_type: false,
        content: [{
            iconPath: '/static/tarbarIcon/yunshangchuan.png',
            selectedIconPath: '/static/tarbarIcon/yunshangchuan-active.png',
            text: '上传',
            active: false
          },
          {
            iconPath: '/static/tarbarIcon/jinggao.png',
            selectedIconPath: '/static/tarbarIcon/jinggao-active.png',
            text: '警告',
            active: false
          }
        ]
      }
    },
    onBackPress() {
      if (this.$refs.fab.isShow) {
        this.$refs.fab.close()
        return true
      }
      return false
    },
    methods: {
      //点击事件
      trigger(e) {
        console.log(e)
        if (e.index === 0)
          this.$router.replace('pages/upload/upload')
        if (e.index === 1)
          this.$router.replace('pages/warn/warn')
      }
    }
  }
</script>

<style lang="scss">

</style>
