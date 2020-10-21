<template>
  <div>
    <!-- 底部导航 -->
    <div class="bottom">
      <div class="contact-us">
        <div class="contact-title">
          <div class="contact-our">联系我们</div>
          <div class="contact-function">
            <div class="contact-left">
              <div class="e-mail">E-mail:&nbsp; 278141196@qq.com</div>
              <div class="address">
                <div class="comment-name">
                  <p>公司地址:&nbsp;&nbsp;</p>
                </div>
                <div>
                  <p>浙江省杭州市拱墅区花园岗街181号</p>
                  <!-- <div class="definite-address"></div> -->
                </div>
              </div>
            </div>
            <!--          <img-->
            <!--            class="contact-right"-->
            <!--            src="../../static/img/qrcode.jpeg"-->
            <!--            alt-->
            <!--          />-->
          </div>
        </div>
        <img class="contact-right" src="../../static/img/qrcode.jpeg" alt />
      </div>
      <div class="bottom-logo">
        <img style="height: 100px" src="../../static/img/logo_bot.png" alt />
        <p>
          版权所有©杭州点线圈网络科技有限公司
          <a href="http://www.beian.miit.gov.cn">浙ICP备19013961号-1</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },

    mounted() { },
    methods: {}
  };
</script>
<style scoped>
  /* 底部导航 */
  .bottom {
    width: 100%;
    height: 298px;
    background: rgba(25, 31, 40, 1);
  }

  .contact-us {
    height: 200px;
    padding-left: 30%;
    padding-right: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .contact-our {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
    padding: 0px 0 20px 0;
  }

  .contact-function {
    display: flex;
  }

  .contact-left {
    margin-right: 163px;
  }

  .e-mail {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
    margin-bottom: 20px;
  }

  .address {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
    display: flex;
  }

  .definite-address {
    margin-top: 20px;
  }

  .contact-right {
    width: 100px;
    height: 100px;
  }

  .bottom-logo {
    height: 97px;
    display: flex;
    align-items: center;
    color: rgba(142, 142, 142, 1);
    padding-left: 37%;
    border-top: 1px solid #505050;
  }

  .bottom-logo span {
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
    margin-right: 30px;
  }

  .bottom-logo p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
  }

  .bottom-logo a {
    font-size: 14px;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
  }


  @media only screen and (max-width:768px),
  only screen and (max-device-width:768px) {
    .contact-us {
      padding-left: 5%;
    }

    .contact-title {
      width: 200px;
    }

    .contact-our {
      font-size: 12px;
      padding-bottom: 8px;
    }

    .e-mail {
      margin-bottom: 8px;
    }

    .comment-name {
      white-space: nowrap;
    }

    .bottom-logo {
      padding-left: 2%;
    }

    .bottom-logo p {
      font-size: 12px;
    }
  }
</style>