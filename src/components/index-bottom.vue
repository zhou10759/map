<template>
  <!-- 商圈官网底部 -->
  <div>
    <div class="bottom">
      <!--
      <div class="logo-phone">
        <div class="logo"><img style="height: 50px" src="../../static/img/logo_bot.png" alt /></div>
        <div class="phone" style="line-height: 50px">官方热线：13989838220</div>
      </div>-->
      <div class="copyright">
        版权所有@杭州点线圈网络科技有限公司
        <a href="http://www.beian.miit.gov.cn">浙ICP备19013961号-1</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.bottom {
  width: 100%;
  height: 40px;

  background: rgba(25, 31, 40, 1);
  position: fixed;
  bottom: 0;
  text-align: center;

}
.logo-phone {
  display: flex;
  justify-content: center;
  padding-top: 17px;
}
.logo {
  font-size: 26px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(142, 142, 142, 1);
}
.phone {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(142, 142, 142, 1);
  margin-left: 11px;
  margin-bottom: 10px;
}
.copyright {
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(142, 142, 142, 1);
  margin-bottom: 20px;
}
.copyright a {
  font-size: 14px;
  font-weight: 400;
  color: rgba(142, 142, 142, 1);
}
</style>
