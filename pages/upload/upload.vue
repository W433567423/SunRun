<template>
  <view>
    <uni-section title="上传你的信息" type="line">
      <view class="example">
        <!-- 自定义表单校验 -->
        <uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" label-position="top">
          <uni-forms-item label="作者昵称" required name="author">
            <uni-easyinput v-model="customFormData.author" placeholder="请输入作者昵称" />
          </uni-forms-item>
          <uni-forms-item label="IMEI" required name="IMEI">
            <uni-easyinput v-model="customFormData.IMEI" placeholder="请输入IMEI" />
          </uni-forms-item>
          <uni-forms-item label="你的昵称" required name="username">
            <uni-easyinput v-model="customFormData.username" placeholder="请输入昵称" />
          </uni-forms-item>
          <uni-forms-item label="跑步时间" required name="runtime">
            <uni-data-checkbox v-model="customFormData.runtime" :localdata="runtime" />
          </uni-forms-item>
          <!-- 高级选项 -->
          <uni-collapse>
            <uni-collapse-item title="高级选项">
              <uni-data-picker class="advanced" placeholder="请选择速度" popup-title="请选择速度" :localdata="dataTree"
                v-model="classes" @change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened"
                @popupclosed="onpopupclosed">
              </uni-data-picker>
            </uni-collapse-item>
          </uni-collapse>

        </uni-forms>
        <button type="primary" @click="submit('customForm')">提交</button>
      </view>
    </uni-section>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        classes: '1-2',
        dataTree: [{
            text: "快速",
            value: "fast",
            children: [{
                text: "1300±50步",
                value: "1300"
              },
              {
                text: "1450±50步",
                value: "1400"
              },
              {
                text: "1600±50步",
                value: "1600"
              }
            ]
          },
          {
            text: "中速",
            value: "Medium",
            children: [{
                text: "1300±50步",
                value: "1300"
              },
              {
                text: "1450±50步",
                value: "1400"
              },
              {
                text: "1600±50步",
                value: "1600"
              }
            ]
          },
          {
            text: "慢速",
            value: "slow",
            children: [{
                text: "1300±50步",
                value: "1300"
              },
              {
                text: "1450±50步",
                value: "1400"
              },
              {
                text: "1600±50步",
                value: "1600"
              }
            ]
          }
        ],
        runtime: [{
          text: '晨跑',
          value: 'mor'
        }, {
          text: '晚跑',
          value: 'eve'
        }, {
          text: '随机',
          value: 'random'
        }],
        // 自定义表单数据
        customFormData: {
          author: '',
          IMEI: '',
          username: '',
          runtime: ''
        },
        // 自定义表单校验规则
        customRules: {
          author: {
            rules: [{
              required: true,
              errorMessage: '作者不能为空'
            }, {
              validateFunction: (rule, value, data, callback) => {
                value !== 'tutu' ? callback('作者都不知道是谁就别用了') : 1
              }
            }]
          },
          IMEI: {
            rules: [{
              required: true,
              errorMessage: 'IMEI不能为空'
            }, {
              minLength: 32,
              maxLength: 32,
              errorMessage: 'IMEI格式错误'
            }]
          },
          username: {
            rules: [{
              required: true,
              errorMessage: '你的昵称不能为空'
            }, {
              maxLength: 12,
              errorMessage: '昵称别太长啦(小于12个字符)'
            }]
          },
          runtime: {
            rules: [{
              required: true,
              errorMessage: '请勾选跑步时间'
            }]
          },
        }
      }
    },
    onLoad() {},
    onReady() {
      // 设置自定义表单校验规则，必须在节点渲染完毕后执行
      this.$refs.customForm.setRules(this.customRules)
    },
    methods: {
      onnodeclick(e) {
        console.log(e);
      },
      onpopupopened(e) {
        console.log('popupopened');
      },
      onpopupclosed(e) {
        console.log('popupclosed');
      },
      onchange(e) {
        console.log('onchange:', e);
      },
      submit(ref) {
        this.$refs[ref].validate().then(res => {
          console.log(res)
          console.log('success', res);
          uni.showToast({
            title: `校验通过`
          })
          const {
            data
          } = this.$http.post('/api/sunrun', res).then(response => this.$showMsg(response.data.msg)).catch(err => {
            console.log('err', err);
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  .example {
    padding: 15px;
    background-color: #fff;
  }

  .segmented-control {
    margin-bottom: 15px;
  }

  .button-group {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }

  .form-item {
    display: flex;
    align-items: center;
  }

  .advanced {
    padding: 10px 0;
  }

  .button {
    display: flex;
    align-items: center;
    height: 35px;
    margin-left: 10px;
  }
</style>
