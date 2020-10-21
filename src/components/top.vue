<template>
  <div>
    <div class="head">
      <div class="logo"><img class="logo-img" src="../../static/img/logo.png" alt />
        <p :class="typeBrowse==2?'hiden':'phone-register'" @click="phoneRegister">注册</p>
      </div>
      <ul class="title">
        <li @click="toIndex()" class="index">首页</li>
        <li @click="toProduct()" class="product">产品介绍</li>
        <li @click="toRadar()" class="radar">DLA选址</li>
        <li class="news-center">
          <div @click="toNews()" :class="newsClass">{{newsContent}}</div>
          <div class="trade" @click.stop="toIndustry" v-if="caareFlag">{{caareContent}}</div>
          <div class="show-hide" @click="showDiv()">
            <img src="../../static/img/paging.png" class="jiantou" alt v-if="newsPicFlag" />
            <img src="../../static/img/pagingI.png" class="jiantou" alt v-if="!newsPicFlag" />
          </div>
        </li>
        <li class="about-us" @click="toOur()">关于我们</li>
        <li class="panter" @click="toPanter()">合作伙伴</li>
        <li class="login" @click="toRegister()">
          登录|
          <span>注册</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        newsContent: '新闻中心',
        caareContent: '行业动态',
        caareFlag: false,
        newsPicFlag: true,
        newsClass: '',
        typeBrowse: 2
      };
    },
    created() {
      // 判断当前是手机还是PC
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.typeBrowse = 0;
        console.log("IOS");
      } else if (/(Android)/i.test(navigator.userAgent)) {
        this.typeBrowse = 1;
        console.log("Android");
      } else {
        this.typeBrowse = 2;
        console.log("PC");
      }
    },
    mounted() {
      if (this.$router.app._route.name == "index") {
        $(".index")
          .addClass("active")
          .siblings()
          .removeClass("active");
      } else if (this.$router.app._route.name == "news") {
        $(".news-center").addClass("active");
      }
      window.addEventListener('scroll', this.scrollToTop)
    },
    methods: {
      // 移动端跳转注册页面
      phoneRegister() {
        this.$router.push({ path: "/phoneRegister" });
      },
      //   跳转首页
      toIndex() {
        if (!(this.$router.app._route.name == "index")) {
          this.$router.push({ path: "/" });
        } else {
          $("html,body").animate(
            { scrollTop: document.querySelector("#header").offsetTop - 100 },
            800
          );
          // $("html,body").animate({ scrollTop: $("#product").offset().top }, 800);
          $(".index")
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      },
      // 跳转新闻页
      toNews() {
        this.$router.push({ path: "/news" });
      },
      // 跳转产品介绍
      toProduct() {
        if (!(this.$router.app._route.name == "index")) {
          this.$router.push({ path: "/" });
          let that = this
          let timer = setInterval(() => {
            let ispeed = Math.floor(-that.scrollTop / 10)
            document.documentElement.scrollTop = document.body.scrollTop = 1550
            if (that.scrollTop === 1550) {
              clearInterval(timer)
            }
          }, 16)
          setTimeout(function () {
            $(".product")
              .addClass("active")
              .siblings()
              .removeClass("active");
          }, 0)
        } else {
          $("html,body").animate(
            { scrollTop: document.querySelector("#product").offsetTop - 100 },
            800
          );
          // $("html,body").animate({ scrollTop: $("#product").offset().top }, 800);
          $(".product")
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      },
      // 跳转商圈雷达
      toRadar() {
        if (!(this.$router.app._route.name == "index")) {
          this.$router.push({ path: "/" });
          let that = this
          let timer = setInterval(() => {
            let ispeed = Math.floor(-that.scrollTop / 10)
            document.documentElement.scrollTop = document.body.scrollTop = 2400
            if (that.scrollTop === 2400) {
              clearInterval(timer)
            }
          }, 16)
          setTimeout(function () {
            $(".radar")
              .addClass("active")
              .siblings()
              .removeClass("active");
          }, 0)
        } else {
          $("html,body").animate(
            { scrollTop: document.querySelector("#radar").offsetTop - 100 },
            800
          );
          // $("html,body").animate({ scrollTop: $("#radar").offset().top }, 800);
          $(".radar")
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      },
      scrollToTop() {
        let that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
      },
      // 跳转关于我们
      toOur() {
        if (!(this.$router.app._route.name == "index")) {
          this.$router.push({ path: "/" });
          let that = this
          let timer = setInterval(() => {
            let ispeed = Math.floor(-that.scrollTop / 10)
            document.documentElement.scrollTop = document.body.scrollTop = 5020
            if (that.scrollTop === 5020) {
              clearInterval(timer)
            }
          }, 16)
          setTimeout(function () {
            $(".about-us")
              .addClass("active")
              .siblings()
              .removeClass("active");
          }, 0)
        } else {
          console.log($("#about-us"));
          $("html,body").animate(
            { scrollTop: document.querySelector("#about-us").offsetTop - 100 },
            800
          );
          // $("html,body").animate({ scrollTop: $("#about-us").offset().top }, 800);
          $(".about-us")
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      },
      // 跳转合作伙伴
      toPanter() {
        if (!(this.$router.app._route.name == "index")) {
          this.$router.push({ path: "/" });
          let that = this
          let timer = setInterval(() => {
            let ispeed = Math.floor(-that.scrollTop / 10)
            document.documentElement.scrollTop = document.body.scrollTop = 6600
            clearInterval(timer)
          }, 16)
          setTimeout(function () {
            $(".panter")
              .addClass("active")
              .siblings()
              .removeClass("active");
          }, 0)
        } else {
          $("html,body").animate(
            { scrollTop: document.querySelector("#partner").offsetTop - 100 },
            800
          );
          // $("html,body").animate({ scrollTop: $("#partner").offset().top }, 800);
          $(".panter")
            .addClass("active")
            .siblings()
            .removeClass("active");
        }
      },
      // 跳转登录注册
      toRegister() {
        this.$router.push({ path: "/login" });
      },
      // 点击图标显示行业动态
      showDiv() {
        this.newsPicFlag = !this.newsPicFlag
        this.caareFlag = true
      },
      // 跳转行业动态
      toIndustry() {
        this.caareFlag = false
        if (this.newsContent == '新闻中心') {
          this.$router.push({ path: "industryDynamics" });
          this.newsContent = '行业动态'
          this.caareContent = '新闻中心'
        } else {
          this.toNews()
          this.newsContent = '新闻中心'
          this.caareContent = '行业动态'
        }
      }
    },
    watch: {
      $route: {
        handler(val) {
          if (val.name == "industryDynamics") {
            this.newsContent = "行业动态";
            this.caareContent = "新闻中心";
            this.newsClass = 'newsClass'
          } else {
            this.newsClass = ''
          }
        },
        immediate: true
      },

    }
  };
</script>
<style scoped>
  .head {
    position: fixed;
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    height: 88px;
    line-height: 88px;
    z-index: 99;
  }

  .logo {
    font-size: 36px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: rgba(122, 122, 122, 1);
  }

  .logo-img {
    height: 100px;
  }

  .title {
    display: flex;
    justify-content: space-around;
    margin-left: 20%;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(94, 94, 94, 1);
    width: 50%;
  }

  .title li {
    cursor: pointer;
  }

  .news-center {
    position: relative;
    display: flex;
    align-items: center;
  }

  .trade {
    position: absolute;
    top: 60px;
    width: 77px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: white;
    color: rgba(94, 94, 94, 1);
  }

  /* 切换时所在的标题 */
  .active {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(22, 187, 255, 1);
    border-top: 2px solid #16bbff;
  }

  .newsClass {
    color: rgba(22, 187, 255, 1);
  }

  .show-hide {
    width: 20px;
    height: 10px;
    line-height: 10px;
  }

  .jiantou {
    width: 8px;
    height: 6px;
    margin-left: 5px;
  }

  .login {
    font-size: 20px;
  }

  .news_instual {
    position: relative;
  }

  .news,
  .newsPic {
    float: left;
  }

  .hiddenNews {
    position: absolute;
    bottom: -14px;
    width: 77px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: white;
    color: rgba(94, 94, 94, 1);
  }

  .newsPic {
    margin: 38px 0 0 5px;
  }

  .title span {
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #16bbff;
  }

  .hiden {
    display: none;
  }


  @media only screen and (max-width:768px),
  only screen and (max-device-width:768px) {
    .swiper-slide {
      width: 100%;
      height: 50px;
    }

    .logo {
      height: 0px;
    }

    .logo-img {
      height: 35px;
    }

    .title {
      width: 100%;
      font-size: 12px;
      margin-left: 0;
    }

    .head {
      display: inline;
      line-height: 35px;
    }

    .title li {
      white-space: nowrap;
    }

    .active {
      font-size: 12px;
    }

    .login {
      font-size: 12px;
      display: none;
    }

    .phone-register {
      float: right;
      font-size: 12px;
      margin-right: 10px;
      color: rgba(22, 187, 255, 1);
    }
  }
</style>