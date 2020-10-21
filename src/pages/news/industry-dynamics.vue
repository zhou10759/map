<template>
  <div>
    <!-- 头部标题 -->
    <top></top>
    <!-- 新闻推送 -->
    <div class="news-push"></div>
    <!-- 新闻列表 -->
    <div class="news-list" v-for="(news,index) in newsList.news" :key="index">
      <div class="news-title" @click="toDetail(news)">{{news.newsTitle}}</div>
      <div class="news-content">
        <img :src="news.newsImg" alt class="news-img" />
        <div class="news-cont" v-html="newsCont[index+(currentPage-1)*10]">
          {{newsCont[index]}}
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="paging" v-if="allPage">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :page-size="1" :pager-count="5" layout="prev, pager, next" :total="allPage">
      </el-pagination>
    </div>
    <!-- 底部 -->
    <bottom></bottom>
  </div>
</template>
<script>
  import top from "@/components/top";
  import bottom from "@/components/bottom";
  import { initIndustry } from '@/api/index/index.js';

  export default {
    data() {
      return {
        // 默认页码
        currentPage: 1,
        // 新闻列表数据
        newsList: '',
        // 总页数
        allPage: '',
        newsCont: [],
        userId: '',
        token: ''
      };
    },
    //   引入组件
    components: { top, bottom },
    created() {
      // 获取cookie的用户信息
      let user = this.$cookies.get("userInfo");
      this.userInfo = user;
      console.log("user" + JSON.stringify(user));

    },
    mounted() {
      console.log(this.$router.app._route.name);
      // 获取新闻信息列表
      this.getNews();
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      // 跳转新闻详情页
      toDetail(e) {
        this.$router.push({ path: "newsDetail", query: { newsId: e.id } });
      },
      handleSizeChange(val) {
        console.log(val);
        this.currentPage = val;
      },
      handleCurrentChange(val) {
        console.log(val);
        this.currentPage = val;
        let that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 10)
          document.documentElement.scrollTop = document.body.scrollTop = 600
          if (that.scrollTop === 600) {
            clearInterval(timer)
          }
        }, 16)
      },
      scrollToTop() {
        let that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop + 600
        that.scrollTop = scrollTop
      },
      // 获取新闻列表
      getNews() {
        let page = JSON.stringify({
          page: this.currentPage
        });
        initIndustry(page).then(res => {
          console.log(res);
          if (res.code == '001008') {
            alert("无数据");
          } else {
            this.newsList = res.data;
            this.allPage = res.data.count;
            res.data.news.forEach(item => {
              this.newsCont.push(
                item.newsText
                  .match(/<p\/?.+?\/p>/g)
                  .join("")
                  .replace(/<img\/?.+?>/g, "")
                  .replace(/<\/?.+?>/g, "")
              );
            })
          }
        })
      }
    },
    watch: {
      currentPage: function () {
        this.getNews();
      }
    }
  };
</script>>
<style scoped>
  /* 新闻推送 */
  .news-push {
    width: 100%;
    height: 600px;
    line-height: 600px;
    background-image: url("../../../static/img/9fbd6e429b365e046072619be3b414b2.png");
    background-size: 100% 100%;
    text-align: center;
    padding-top: 88px;
  }

  .news-list {
    width: 1200px;
    margin: 0 auto;
    margin-top: 70px;
  }

  .news-title {
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(75, 75, 75, 1);
  }

  .news-content {
    display: flex;
    margin-top: 35px;
  }

  .news-img {
    width: 400px;
    height: 300px;
    border-radius: 8px;
    margin-right: 30px;
  }

  .news-cont {
    height: 292px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(120, 120, 120, 1);
    text-indent: 2em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 12;
    overflow: hidden;
  }

  /* 分页器 */
  .paging {
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(120, 120, 120, 1);
    margin-top: 50px;
    margin-bottom: 50px;
  }

  @media only screen and (max-width:768px),
  only screen and (max-device-width:768px) {
    .news-push {
      height: 150px;
      line-height: 150px;
      padding-top: 40px;
    }

    .news-push p {
      font-size: 14px;
    }

    .news-list {
      width: 300px;
      margin-top: 10px;
    }

    .news-title {
      font-size: 13px;
    }

    .news-content {
      margin-top: 10px;
      display: inline;
    }

    .news-img {
      width: 300px;
      height: 150px;
      margin-right: 8px
    }

    .news-cont {
      width: 300px;
      font-size: 12px;
    }
  }
</style>