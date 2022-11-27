<script>
  export default {
    data() {
      return {
        la_id: "",
        nowurl: "",
      };
    },
    created() {
      // other ...
      this.linktab();
    },
    methods: {
      linktab() {
        let goUrl = this.isMobile();
        if (goUrl !== 1) {
          location = "https://run.wtututu.top/desktop.html";
        }
      },
      isMobile() {
        let flag = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        let goUrl = flag ? 1 : 0;
        return goUrl;
      },
    },
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import '@/uni_modules/uni-scss/index.scss';
  /* #ifndef APP-NVUE */
  @import '@/static/customicons.css';

  // 设置整个项目的背景色
  page {
    background-color: #f5f5f5;
  }

  /* #endif */
  .example-info {
    font-size: 14px;
    color: #333;
    padding: 10px;
  }
</style>
