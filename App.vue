<script>
  export default {
    onLaunch: function() {
      // console.log('App Launch')
    },
    onShow: function() {
      // console.log('App Show')
    },
    onHide: function() {
      // console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import '@/uni_modules/uni-scss/index.scss';

  /* #ifndef APP-NVUE */
  /* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
  @font-face {
    font-family: "siyuan";
    src: url("//at.alicdn.com/wf/webfont/UJpeQdBaZWWp/Xa7T1gh3THGlnBgdKvig3.woff2") format("woff2"),
      url("//at.alicdn.com/wf/webfont/UJpeQdBaZWWp/ZSsuwm2412rlnOIU1ci_1.woff") format("woff");
    font-display: swap;
  }

  // 设置整个项目的背景色
  page {
    // font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif !important;
    // font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-family: "siyuan", "STXinwei" !important;
    background-color: #f5f5f5;
  }

  /* #endif */
  .example-info {
    font-size: 14px;
    color: #333;
    padding: 10px;
  }
</style>
