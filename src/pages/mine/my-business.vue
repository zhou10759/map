<template>
  <div>
    <div class="main-index">
      <!--左边用户信息功能栏-->
      <navigation></navigation>
      <!--右边用户信息数据栏-->
      <div class="user-data">
        <div class="business-statistics">商圈统计</div>
        <div class="change-datas">
          <!--商圈城市-->
          <div class="city-list">
            <div class="city-name" v-for="(item,i) in cityList" :key="i" @click="toCity(item.cityName)">
              <p>{{item.cityName}}</p>
              <p>({{item.businessCount}})</p>
            </div>
          </div>
          <!--商圈名称以及状态-->
          <div class="status">
            <p>商圈名称</p>
            <p>已售/未售</p>
            <p>已开/未开</p>
          </div>
          <!--商圈数据-->
          <div v-if="businessData.length==0" class="no-create">您未创建商圈</div>
          <div class="business-data" v-for="(list,o) in businessData" :key="o">
            <p>{{list.businessName}}</p>
            <p :class="list.businessUnsold==0?'active':''" v-if="list.businessUnsold==0">未售</p>
            <p :class="list.businessUnsold==0?'active':''" v-if="list.businessUnsold==1">已售</p>
            <p v-if="list.businessOpen==0">未开</p>
            <p v-if="list.businessOpen==1">已开</p>
          </div>
          <!--分页-->
          <div class="paging">
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="1" layout="prev, pager, next, jumper"
                :total="allData.count"></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>


<script>
  import navigation from "@/components/my-business-left";
  import bottom from "@/components/index-bottom";
  // 引入接口
  import { myBusinessZone } from "@/api/index/index.js";
  export default {
    data() {
      return {
        // 城市列表
        cityList: [
          {
            name: "杭州",
            sum: 10
          },
          {
            name: "北京",
            sum: 20
          },
          {
            name: "北京",
            sum: 20
          },
          {
            name: "北京",
            sum: 20
          },
          {
            name: "宁波",
            sum: 30
          },
          {
            name: "台州",
            sum: 40
          },
          {
            name: "衢州",
            sum: 100
          },
          {
            name: "上海",
            sum: 5
          },
          {
            name: "广州",
            sum: 4
          },
          {
            name: "广州",
            sum: 4
          },
          {
            name: "广州",
            sum: 4
          }
        ],
        // 商圈数据
        businessData: [
          {
            name: "肯德基",
            isSale: "已售",
            isOpen: "已开"
          },
          {
            name: "麦当劳",
            isSale: "已售",
            isOpen: "已开"
          },
          {
            name: "德克士",
            isSale: "已售",
            isOpen: "已开"
          },
          {
            name: "华莱士",
            isSale: "未售",
            isOpen: "已开"
          },
          {
            name: "杰克",
            isSale: "已售",
            isOpen: "未开"
          },
          {
            name: "柔丝",
            isSale: "未售",
            isOpen: "已开"
          }
        ],
        // 分页默认页
        currentPage: 1,
        // 用户信息
        userInfo: "",
        // 我的商圈所有数据
        allData: "",
        // 商圈标识符
        brandId:''
      };
    },
    components: { bottom, navigation },
    created() {
      // 获取cookie的用户信息
      let user = this.$cookies.get("userInfo");
      this.brandId = this.$cookies.get("brandId");
      this.userInfo = user;
    },
    mounted() {
      // 我的商圈数据接口
      this.getBusinessData();
    },
    methods: {
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      // 我的商圈数据接口
      getBusinessData(e) {
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          page: this.currentPage,
          cityName: e,
          brandId:this.brandId
        });
        myBusinessZone(data).then(res => {
          console.log(res);
          this.cityList = res.data.myBusinessZoneCities;
          this.businessData = res.data.myBusinessZone;
          this.allData = res;
        });
      },
      // 跳转城市展示的商圈数据
      toCity(e) {
        console.log(e);
        this.getBusinessData(e);
      }
    },
    watch: {
      currentPage: function () {
        this.getBusinessData();
      }
    }
  };
</script>

<style scoped>
  .main-index {
    width: 100%;
    height: 95%;
    background: #f7f7f7;
    display: flex;
    justify-content: center;
    position: absolute;
  }

  /*右边用户信息数据栏*/
  .user-data {
    width: 934px;
    height: 100%;
    margin-left: 30px;
  }

  .business-statistics {
    width: 100%;
    height: 88px;
    line-height: 88px;
    padding-left: 30px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 20px;
    background: #ffffff;
    padding: 0 30px;
  }

  .change-datas {
    width: 934px;
    height: 82%;
    background: rgba(255, 255, 255, 1);
    padding: 30px;
  }

  /*商圈城市*/
  .city-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 1px solid #f8f8f8;
    padding-bottom: 20px;
    cursor: pointer;
  }

  .city-name {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
  }

  .city-name p:nth-of-type(2) {
    margin-left: 10px;
  }

  /*商圈名称以及状态*/
  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
    border-bottom: 1px solid #f8f8f8;
    padding: 20px 0;
  }
  .status p{
    width: 90px;
    text-align: center;
  }

  /* 不存在商圈数据 */
  .no-create {
    text-align: center;
    font-size: 20px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
    padding: 20px 0;
    color: rgba(86, 86, 86, 1);
  }

  /*商圈数据*/
  .business-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
    padding: 12px 0;
    border-bottom: 1px solid #f8f8f8;
  }

  .business-data p {
    width: 90px;
    text-align: center;
    white-space: nowrap;
  }

  /*分页*/
  .paging {
    text-align: center;
    margin-top: 35px;
  }

  /* 未售的样式 */
  .active {
    color: #ff5d46;
  }

  @media screen and (min-width: 1200px) and (max-width: 1500px) {
    .navigation-bar {
      height: 66%;
    }

    .user-infos {
      height: 90%;
    }

    .main-index {
      height: 90%;
    }

    .business-statistics {
      width: 93%;
    }

    .change-datas {
      width: 890px;
      padding: 20px;
    }

    .city-name {
      font-size: 14px;
    }

    .city-list {
      padding-bottom: 10px;
    }

    .business-data p:nth-of-type(2) {
      text-align: center;
    }

    .business-data p:nth-of-type(3) {
      text-align: center;
    }

    .status {
      padding: 10px 0;
      font-size: 13px;
    }

    .business-data {
      padding: 8px 0;
      font-size: 13px;
    }

    .paging {
      margin-top: 25px;
    }
  }
</style>