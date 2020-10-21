<template>
  <div style="min-height: 100vh;position: relative">
    <!-- 头部 -->
    <top></top>
    <div class="news-detail" v-html="newsDetail.newsDetails">
      {{newsDetail.newsDetails}}
    </div>
    <!-- 底部导航 -->
    <div v-if="false">
      <div class="bottom">
        <div class="contact-us">
          <div class="contact-our">联系我们</div>
          <div class="contact-function">
            <div class="contact-left">
              <div class="e-mail">E-mail:&nbsp; wf@hzdxq.cn</div>
              <div class="address">
                <div>
                  <p>公司地址:&nbsp;&nbsp;</p>
                </div>
                <div>
                  <p>浙江省杭州市拱墅区花园岗街</p>
                  <div class="definite-address">181号崇安中心6层668室</div>
                </div>
              </div>
            </div>
            <img class="contact-right" src="../../../static/img/deed9953d325900ffbc000cd788d0c8c (1).png" alt/>
          </div>
        </div>
        <div class="bottom-logo">
          <span>logo</span>
          <p>版权所有©杭州点线圈网络科技有限公司 苏ICP备10041365号-1</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import top from "@/components/top";
  import {newsDetails} from '@/api/index/index.js';

  export default {
    data() {
      return {
        // 新闻id
        id: '',
        // 新闻详情数据
        newsDetail: ''
      };
    },
    //   引入组件
    components: {top},
    created() {
      // 接收页面跳转参数
      console.log(this.$route.query.newsId);
      this.id = this.$route.query.newsId;
    },
    mounted() {
      // 获取新闻详情
      this.getDetail()
    },
    methods: {
      // 获取新闻详情
      getDetail() {
        let data = JSON.stringify({
          newsId: this.id
        });
        newsDetails(data).then(res => {
          console.log(res);
          this.newsDetail = res.data
        })
      }
    }
  };
</script>

<style scoped>
  .news-detail {
    width: 62.5%;
    margin: 0 auto;
    padding-top: 100px;
    padding-bottom: 300px;
  }

  .news-title {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
    padding-top: 143px;
    margin-bottom: 40px;
  }

  .news-cont img {
    width: 1000px;
    height: 500px;
    margin-bottom: 40px;
  }

  .news-cont p {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(120, 120, 120, 1);
    margin-bottom: 40px;
  }

  /* 底部导航 */
  .bottom {
    width: 100%;
    height: 298px;
    background: rgba(25, 31, 40, 1);
    position: absolute;
    bottom: 0;
  }

  .contact-us {
    height: 200px;
    padding-left: 37%;
  }

  .contact-our {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
    padding: 30px 0 20px 0;
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
</style>
