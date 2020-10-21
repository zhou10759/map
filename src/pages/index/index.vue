<template>
  <div class="phone-over">
    <top></top>
    <!-- 轮播图 -->
    <div class="swiper-container" id="header">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(images,index) in allData.rotationChart" :key="index">
          <img :src="images" alt />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- 品牌数据 -->
    <div class="brand" v-if="allData">
      <div class="img-list">
        <div class="list-top">
          <div class="brands-one">
            <p>累计创建{{allData.fourPicture[0].numericalValue}}个品牌</p>
            <img :src="allData.fourPicture[0].fourPictureImg" class="img-one" alt />
          </div>
          <div class="brands-two">
            <p>累计创建{{allData.fourPicture[1].numericalValue}}商圈</p>
            <img :src="allData.fourPicture[1].fourPictureImg" class="img-two" alt />
          </div>
        </div>
        <div class="list-bottom">
          <div class="brands-three">
            <p>累计被关注过{{allData.fourPicture[2].numericalValue}}次</p>
            <img :src="allData.fourPicture[2].fourPictureImg" class="img-three" alt />
          </div>
          <div class="brands-four">
            <p>平台数据接入累计{{allData.fourPicture[3].numericalValue}}</p>
            <img :src="allData.fourPicture[3].fourPictureImg" class="img-four" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 产品介绍 -->
    <div class="product" id="product">
      <div class="ch">产品介绍</div>
      <div class="en">Product introduction</div>
    </div>
    <!-- 产品内容 -->
    <div class="products">
      <img :src="allData.productIntroduction" alt class="data-map" />
    </div>
    <!-- 商圈产品功能 -->
    <div class="store-function">
      <div class="store-product">DLA大数据选址软件</div>
      <div class="store-en">DLA Big data location software</div>
      <div class="function-list">
        <img :src="allData.function" alt />
        <!--<div class="function">-->
        <!--<img src="../../../static/img/1.png" alt/>-->
        <!--<div class="function-ch">商圈客流</div>-->
        <!--<div class="function-en">Efficient network access</div>-->
        <!--</div>-->
        <!--<div class="function">-->
        <!--<img src="../../../static/img/1.png" alt/>-->
        <!--<div class="function-ch">强大服务能力</div>-->
        <!--<div class="function-en">Strong service capacity</div>-->
        <!--</div>-->
        <!--<div class="function">-->
        <!--<img src="../../../static/img/1.png" alt/>-->
        <!--<div class="function-ch">挖掘用户价值</div>-->
        <!--<div class="function-en">Explore user value</div>-->
        <!--</div>-->
        <!--<div class="function">-->
        <!--<img src="../../../static/img/1.png" alt/>-->
        <!--<div class="function-ch">高度自定义</div>-->
        <!--<div class="function-en">Height customization</div>-->
        <!--</div>-->
      </div>
    </div>
    <!-- 商圈雷达产品特点 -->
    <div class="radar" id="radar" v-if="allData">
      <div class="radar-ch">DLA大数据选址软件特点</div>
      <div class="radar-en">DLA Big data location software trait</div>
      <div class="trait">
        <div class="trait-content">
          <img src="../../../static/img/Thetraceability.png" class="icon" alt />
          <div class="trait-title">{{allData.characteristics[0].productTitle}}</div>
          <div class="trait-cont" v-html="allData.characteristics[0].productText">
            {{allData.characteristics[0].productText}}</div>
          <img :src="allData.characteristics[0].productImage" class="trait-img" alt />
        </div>
        <div class="trait-content">
          <img src="../../../static/img/Forstandard.png" class="icon" alt />
          <div class="trait-title">{{allData.characteristics[1].productTitle}}</div>
          <div class="trait-cont" v-html="allData.characteristics[1].productText">
            {{allData.characteristics[1].productText}}</div>
          <img :src="allData.characteristics[1].productImage" class="trait-img" alt />
        </div>
        <div class="trait-content">
          <img src="../../../static/img/ductility.png" class="icon" alt />
          <div class="trait-title">{{allData.characteristics[2].productTitle}}</div>
          <div class="trait-cont" v-html="allData.characteristics[2].productText">
            {{allData.characteristics[2].productText}}</div>
          <img :src="allData.characteristics[2].productImage" class="trait-img" alt />
        </div>
        <div class="trait-content">
          <img src="../../../static/img/Marketingcohesion.png" class="icon" alt />
          <div class="trait-title">{{allData.characteristics[3].productTitle}}</div>
          <div class="trait-cont" v-html="allData.characteristics[3].productText">
            {{allData.characteristics[3].productText}}</div>
          <img :src="allData.characteristics[3].productImage" class="trait-img" alt />
        </div>
      </div>
    </div>
    <!-- 新闻中心 -->
    <div class="news-center">
      <div class="news-ch">新闻中心</div>
      <div class="news-en">News center</div>
      <div class="news-list">
        <div class="news" v-for="(news,j) in allData.news" :key="j">
          <img :src="news.newsImg" alt class="news-img" />
          <div class="news-content">
            <div class="news-title">{{news.newsTitle}}</div>
            <div class="news-cont" v-html="newsCont[j]">{{newsCont[j]}}</div>
            <div class="news-btn" @click="toNews()">查看更多</div>
          </div>
        </div>
        <!--<div class="news">-->
        <!--<img src="../../../static/img/分组.png" alt class="news-img"/>-->
        <!--<div class="news-content">-->
        <!--<div class="news-title">如何用大数据做精准营销</div>-->
        <!--<div class="news-cont">共和国70年成长的生命宝库，收录的是一个贫穷大国最终走向繁荣富强的壮丽史诗，典藏的是一幅贫苦百姓如愿迈进富裕小康的…</div>-->
        <!--<div class="news-btn">查看更多</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="news">-->
        <!--<img src="../../../static/img/分组.png" alt class="news-img"/>-->
        <!--<div class="news-content">-->
        <!--<div class="news-title">如何用大数据做精准营销</div>-->
        <!--<div class="news-cont">共和国70年成长的生命宝库，收录的是一个贫穷大国最终走向繁荣富强的壮丽史诗，典藏的是一幅贫苦百姓如愿迈进富裕小康的…</div>-->
        <!--<div class="news-btn">查看更多</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="news">-->
        <!--<img src="../../../static/img/分组.png" alt class="news-img"/>-->
        <!--<div class="news-content">-->
        <!--<div class="news-title">如何用大数据做精准营销</div>-->
        <!--<div class="news-cont">共和国70年成长的生命宝库，收录的是一个贫穷大国最终走向繁荣富强的壮丽史诗，典藏的是一幅贫苦百姓如愿迈进富裕小康的…</div>-->
        <!--<div class="news-btn">查看更多</div>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <!-- 关于我们 -->
    <div class="about-us" id="about-us" v-if="allData">
      <div class="about-ch">关于我们</div>
      <div class="about-en">About us</div>
      <div class="company">{{allData.aboutUs.aboutUsTitle}}</div>
      <div class="company-introduce">{{allData.aboutUs.aboutUsText}}</div>
      <div class="development-history">
        <img :src="allData.backgroundImage" class="back-img" alt />
        <div class="development-course">发展历程</div>
        <div class="course-list">
          <div class="developments" v-for="(developList,l) in allData.histories" :key="l">
            <div class="date">{{developList.year}}</div>
            <img src="../../../static/img/Horizontalline.png" alt class="development-img" />
            <div class="development-title">{{developList.event}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="partner" id="partner" v-if="allData">
      <div class="partner-ch">合作伙伴</div>
      <div class="partner-en">partners</div>
      <div class="trademark">
        <div v-for="(partners,g) in allData.partner" :key="g">
          <img :src="partners.partnerImages" alt />
          <a :href="partners.partnerLink"></a>
        </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <bottom></bottom>
  </div>
</template>

<script>
  import top from "@/components/top";
  import bottom from "@/components/bottom";
  import Swiper from "swiper";
  // 引入接口
  import { init } from "@/api/index/index.js";

  export default {
    data() {
      return {
        allData: "",
        // 新闻中心内容
        newsCont: []
      };
    },
    // 引入组件
    components: { top, bottom },
    created() {
      this.getMessage();
    },
    mounted: function () {
      // 轮播图
      this.initSwiper();
    },
    methods: {
      // 轮播图
      initSwiper() {
        var mySwiper = new Swiper(".swiper-container", {
          pagination: {
            el: ".swiper-pagination"
          },
          observer: true,
          observeParents: true,
          autoplay: true //可选选项，自动滑动
        });
        new Swiper(".swiper-container");
        var mySwiper = document.querySelector(".swiper-container").swiper;
        mySwiper.slideNext();
      },
      // 请求官网接口
      getMessage() {
        init().then(res => {
          console.log(res);
          this.allData = res.data;
          let news = res.data.news;
          news.forEach(item => {
            this.newsCont.push(
              item.newsText
                .match(/<p\/?.+?\/p>/g)
                .join("")
                .replace(/<img\/?.+?>/g, "")
                .replace(/<\/?.+?>/g, "")
            );
          });
        });
      },
      // 查看更多跳转新闻列表
      toNews() {
        this.$router.push({ path: "/news" });
      }
    }
  };
</script>>

<style scoped>
  /* 轮播图       >>>  样式穿透 */
  .swiper-container {
    padding-top: 88px !important;
  }

  .swiper-container-horizontal>>>.swiper-pagination-bullet {
    width: 20px;
    height: 6px;
    border-radius: 6px;
  }

  .swiper-slide {
    width: 100%;
    height: 900px;
  }

  .swiper-slide img {
    width: 100%;
    height: 900px;
  }

  /* 品牌数据 */
  .img-list {
    width: 1200px;
    height: 500px;
    margin: 0 auto;
    margin-top: 95px;
  }

  .list-top {
    display: flex;
    justify-content: space-between;
  }

  .list-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 21px;
  }

  .brands-one {
    width: 580px;
    position: relative;
  }

  .brands-two {
    width: 600px;
    position: relative;
  }

  .brands-three {
    width: 600px;
    position: relative;
  }

  .brands-four {
    width: 580px;
    position: relative;
    top: -123px;
  }

  .img-one {
    width: 580px;
    height: 300px;
  }

  .img-two {
    width: 600px;
    height: 180px;
    float: right;
  }

  .img-three {
    width: 600px;
    height: 180px;
  }

  .img-four {
    width: 580px;
    height: 302px;
  }

  .brands-one p {
    position: absolute;
    top: 37%;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 24px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .brands-two p {
    position: absolute;
    bottom: 40%;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 24px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .brands-three p {
    position: absolute;
    bottom: 40%;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 24px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .brands-four p {
    position: absolute;
    top: 41%;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 24px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  /* 产品介绍 */
  .product {
    margin-top: 110px;
    margin-bottom: 76px;
    text-align: center;
  }

  .ch {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 8px;
  }

  .en {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(75, 75, 75, 1);
  }

  /* 产品内容 */
  .products {
    width: 100%;
    height: 600px;
    /*background-image: url("../../../static/img/332.png");*/
    /*background-size: 100% 100%;*/
    position: relative;
  }

  .products img {
    width: 100%;
    height: 600px;
  }

  .data-map {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* 商圈产品功能 */
  .store-function {
    text-align: center;
    margin-top: 114px;
    margin-bottom: 10px;
  }

  .store-product {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 8px;
  }

  .store-en {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 69px;
  }

  .function-list {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  .function-list img {
    width: 100%;
    height: 340px;
  }

  /*.function {*/
  /*text-align: center;*/
  /*}*/

  /*.function img {*/
  /*width: 117px;*/
  /*height: 144px;*/
  /*}*/

  /*.function-ch {*/
  /*font-size: 24px;*/
  /*font-family: PingFangSC-Medium, PingFang SC;*/
  /*font-weight: 500;*/
  /*color: rgba(80, 115, 146, 1);*/
  /*}*/

  /*.function-en {*/
  /*font-size: 14px;*/
  /*font-family: PingFangSC-Regular, PingFang SC;*/
  /*font-weight: 400;*/
  /*color: rgba(80, 115, 146, 1);*/
  /*}*/

  /* 商圈雷达特点 */
  .radar {
    text-align: center;
  }

  .radar-ch {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 8px;
  }

  .radar-en {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 102px;
  }

  .trait {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .trait-content {
    margin-bottom: 35px;
  }

  .icon {
    width: 47px;
    height: 47px;
    margin-bottom: 30px;
  }

  .trait-title {
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 20px;
  }

  .trait-cont {
    font-size: 20px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(120, 120, 120, 1);
    margin-bottom: 8px;
  }

  .trait-img {
    width: 500px;
    height: 350px;
    margin-top: 20px;
  }

  /* 新闻中心 */
  .news-center {
    text-align: center;
  }

  .news-ch {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
  }

  .news-en {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 70px;
  }

  .news-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 1200px;
    margin: 0 auto;
  }

  .news {
    width: 540px;
    padding: 20px;
    border: 1px solid rgba(151, 151, 151, 1);
    display: flex;
    margin-bottom: 30px;
  }

  .news-img {
    width: 280px;
    height: 180px;
    margin-right: 20px;
  }

  .news-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
  }

  .news-title {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
  }

  .news-cont {
    width: 200px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(120, 120, 120, 1);
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .news-btn {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    width: 140px;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(90deg,
        rgba(253, 177, 102, 1) 0%,
        rgba(254, 143, 95, 1) 100%);
    border-radius: 22px;
    text-align: center;
    cursor: pointer;
  }

  /* 关于我们 */
  .about-us {
    text-align: center;
    margin-top: 60px;
  }

  .about-ch {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 8px;
  }

  .about-en {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 70px;
  }

  .company {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 30px;
  }

  .company-introduce {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 50px;
  }

  .development-history {
    position: relative;
  }

  .back-img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .development-course {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    padding: 50px 0;
  }

  .course-list {
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    padding-bottom: 91px;
  }

  .developments {
    display: flex;
    align-items: center;
    margin-bottom: 100px;
    padding-left: 34%;
  }

  .date {
    width: 91px;
    height: 37px;
    margin-right: 40px;
  }

  .development-img {
    margin-right: 40px;
  }

  /* 合作伙伴 */
  .partner {
    text-align: center;
  }

  .partner-ch {
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 8px;
    margin-top: 110px;
  }

  .partner-en {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(75, 75, 75, 1);
    margin-bottom: 75px;
  }

  .trademark {
    width: 62.5%;
    margin: 0 auto;
    display: flex;
    /* justify-content: space-around; */
    flex-wrap: wrap;
    padding-left: 35px;
    position: relative;
  }

  .trademark img {
    width: 200px;
    height: 160px;
    margin-bottom: 50px;
    padding-right: 35px;
  }

  .trademark a {
    width: 200px;
    height: 160px;
    background: rgba(0, 0, 0, 0);
    display: block;
    position: absolute;
    top: 0;
  }

  @media only screen and (max-width:768px),
  only screen and (max-device-width:768px) {
    .swiper-slide {
      width: 100%;
      height: 200px;
    }

    .img-list {
      width: 100%;
      height: 100px;
      margin-top: 0;
    }

    .swiper-slide img {
      height: 200px;
    }

    .brand {
      height: 200px;
    }

    .brands-one {
      width: 50%;
    }

    .brands-one p {
      font-size: 12px;
    }

    .img-one {
      height: 150px;
    }

    .brands-two {
      width: 50%;
    }

    .brands-two p {
      font-size: 12px;
    }

    .img-two {
      height: 150px;
    }

    .list-bottom {
      margin-top: 5px;
    }

    .brands-three {
      width: 50%;
    }

    .brands-three p {
      font-size: 12px;
    }

    .brands-four {
      width: 50%;
      top: 0;
    }

    .brands-four p {
      font-size: 12px;
    }

    .img-four {
      height: 150px;
    }

    .img-three {
      height: 150px;
    }

    .ch {
      font-size: 14px;
    }

    .en {
      font-size: 12px;
    }

    .product {
      margin-bottom: 10px;
    }

    .products {
      height: 200px;
    }

    .products img {
      height: 200px;
    }

    .store-function {
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .store-product {
      font-size: 14px;
    }

    .store-en {
      font-size: 12px;
      margin-bottom: 5px;
    }

    .function-list img {
      height: 200px;
    }

    .radar-ch {
      font-size: 14px;
    }

    .radar-en {
      font-size: 12px;
      margin-bottom: 8px;
    }

    .trait {
      width: 100%;
    }

    .trait-content {
      margin-bottom: 8px;
    }

    .icon {
      width: 20px;
      height: 20px;
      margin-bottom: 10px;
    }

    .trait-title {
      font-size: 13px;
      margin-bottom: 8px;
    }

    .trait-cont {
      font-size: 12px;
    }

    .trait-img {
      width: 150px;
      height: 150px;
      margin-top: 10px;
    }

    .news-ch {
      font-size: 14px;
    }

    .news-en {
      font-size: 12px;
      margin-bottom: 8px;
    }

    .news-list {
      width: 350px;
      justify-content: center;
    }

    .news {
      width: 300px;
      padding: 4px;
      margin-bottom: 8px;
    }

    .news-img {
      width: 150px;
      height: 100px;
      margin-right: 5px;
    }

    .news-title {
      width: 100%;
      font-size: 12px;
    }

    .news-cont {
      width: 150px;
      font-size: 12px;
    }

    .news-btn {
      width: 60px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    }

    .about-us {
      margin-top: 8px;
    }

    .about-ch {
      font-size: 14px;
    }

    .about-en {
      font-size: 12px;
      margin-bottom: 8px;
    }

    .company {
      font-size: 13px;
    }

    .company-introduce {
      font-size: 12px;
      margin-bottom: 20px;
    }

    .development-course {
      font-size: 13px;
      padding: 5px 0;
    }

    .course-list {
      font-size: 12px;
      padding-bottom: 8px;
    }

    .developments {
      margin-bottom: 12px;
      padding-left: 5%;
    }

    .date {
      width: 50px;
      height: 20px;
      margin-right: 10px;
    }

    .development-img {
      margin-right: 10px;
    }

    .partner-ch {
      font-size: 14px;
      margin-top: 15px;
    }

    .partner-en {
      font-size: 12px;
      margin-bottom: 8px;
    }

    .phone-over {
      overflow-x: hidden;
    }
  }
</style>