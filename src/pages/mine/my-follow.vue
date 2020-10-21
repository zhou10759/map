<template>
  <div>
    <div class="main-index">
      <!--左边用户信息功能栏-->
<!--      <navigation class="vip-left"></navigation>-->
      <navigation></navigation>
      <!--右边我的关注数据栏-->
      <div class="user-data">
        <div class="my-follow">我的关注</div>
        <!--我的关注用户数据-->
        <div class="follow-message">
          <div class="follow-info">
            <p>姓名</p>
            <p>电话</p>
            <p>性别</p>
            <p>关注的城市</p>
            <p>关注的品牌</p>
          </div>
          <!--关注的数据-->
          <div class="personal-details" v-for="(info,j) in followData.data" :key="j">
            <p>{{info.userName}}</p>
            <p>{{info.telephone}}</p>
            <p>{{info.six=='0'?"女":"男"}}</p>
            <p>{{info.city}}</p>
            <p>{{info.brandName}}</p>
          </div>
          <div v-if="followData.total==0" class="no-data">暂无数据</div>
          <!--分页-->
          <div class="paging">
            <p>共{{followData.total}}条</p>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="1" layout="prev, pager, next, jumper"
                :total="followData.count"></el-pagination>
            </div>
          </div>
        </div>
        <!--数据图-->
        <div class="datas-imgs">
          <div class="pie-img">
            <div id="piecharts" style="width: 350px;height: 250px;"></div>
            <p>男女比例饼状图</p>
          </div>
          <!--分布图-->
          <div class="pie-img">
            <div id="map-img" style="width:350px;height:250px;"></div>
            <p style="margin-left:75px;">用户关注品牌的地理分布图</p>
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
  import China from "../../../node_modules/echarts/map/js/china.js";
  // 引入接口
  import {
    myConcern,
    pieChartBySix,
    distributionMap
  } from "@/api/index/index.js";
  export default {
    data() {
      return {
        // 关注人的数据
        followData: [],
        // 当前的页码
        currentPage: 1,
        // 用户信息
        userInfo: "",
        // 品牌id
        brandId: "",
        // sonId
        sonId:''
      };
    },
    components: { bottom, navigation },
    created() {
      console.log(this.$route.query.barIndex);
      // 获取cookie的用户信息
      let user = this.$cookies.get("userInfo");
      this.userInfo = user;
      // 获取cookie的品牌Id
      this.brandId = this.$cookies.get("brandId");
    },
    mounted() {
      // 获取我的关注列表
      this.getMyFollow();
      // 获取品牌分布接口
      this.getBrabdList();
      // 获取饼图数据
      this.pieData();
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.currentPage = val;
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      // 绘制饼图
      paintingPie(res) {
        let that = this;
        let myCharts = this.$echarts.init(document.getElementById("piecharts"));
        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
            // show: true,
            // position: [50, 100]
          },
          // 显示隐藏图形
          // formatter: function (name) {
          //   return that.$echarts.format.truncateText(name, 10, '14px Microsoft Yahei', '…');
          // },
          legend: {
            orient: "vertical",
            x: "right",
            y: "center",
            left: 250,
            data: ["男", "女"]
          },
          series: [
            {
              name: "",
              // 图形的位置
              center: ["32%", "50%"],
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "10",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: res.data
            }
          ]
        };
        myCharts.setOption(option);
      },
      // 绘制用户关注品牌的分布图
      scattergram(data) {
        this.$echarts.registerMap("China", China);
        let myCharts = this.$echarts.init(document.getElementById("map-img"));
        console.log(data,'data')
        var data = data
        var geoCoordMap = {
          海门: [121.15, 31.89],
          鄂尔多斯: [109.781327, 39.608266],
          招远: [120.38, 37.35],
          舟山: [122.207216, 29.985295],
          齐齐哈尔: [123.97, 47.33],
          盐城: [120.13, 33.38],
          赤峰: [118.87, 42.28],
          青岛: [120.33, 36.07],
          乳山: [121.52, 36.89],
          金昌: [102.188043, 38.520089],
          泉州: [118.58, 24.93],
          莱西: [120.53, 36.86],
          日照: [119.46, 35.42],
          胶南: [119.97, 35.88],
          南通: [121.05, 32.08],
          拉萨: [91.11, 29.97],
          云浮: [112.02, 22.93],
          梅州: [116.1, 24.55],
          文登: [122.05, 37.2],
          上海: [121.48, 31.22],
          攀枝花: [101.718637, 26.582347],
          威海: [122.1, 37.5],
          承德: [117.93, 40.97],
          厦门: [118.1, 24.46],
          汕尾: [115.375279, 22.786211],
          潮州: [116.63, 23.68],
          丹东: [124.37, 40.13],
          太仓: [121.1, 31.45],
          曲靖: [103.79, 25.51],
          烟台: [121.39, 37.52],
          福州: [119.3, 26.08],
          瓦房店: [121.979603, 39.627114],
          即墨: [120.45, 36.38],
          抚顺: [123.97, 41.97],
          玉溪: [102.52, 24.35],
          张家口: [114.87, 40.82],
          阳泉: [113.57, 37.85],
          莱州: [119.942327, 37.177017],
          湖州: [120.1, 30.86],
          汕头: [116.69, 23.39],
          昆山: [120.95, 31.39],
          宁波: [121.56, 29.86],
          湛江: [110.359377, 21.270708],
          揭阳: [116.35, 23.55],
          荣成: [122.41, 37.16],
          连云港: [119.16, 34.59],
          葫芦岛: [120.836932, 40.711052],
          常熟: [120.74, 31.64],
          东莞: [113.75, 23.04],
          河源: [114.68, 23.73],
          淮安: [119.15, 33.5],
          泰州: [119.9, 32.49],
          南宁: [108.33, 22.84],
          营口: [122.18, 40.65],
          惠州: [114.4, 23.09],
          江阴: [120.26, 31.91],
          蓬莱: [120.75, 37.8],
          韶关: [113.62, 24.84],
          嘉峪关: [98.289152, 39.77313],
          广州: [113.23, 23.16],
          延安: [109.47, 36.6],
          太原: [112.53, 37.87],
          清远: [113.01, 23.7],
          中山: [113.38, 22.52],
          昆明: [102.73, 25.04],
          寿光: [118.73, 36.86],
          盘锦: [122.070714, 41.119997],
          长治: [113.08, 36.18],
          深圳: [114.07, 22.62],
          珠海: [113.52, 22.3],
          宿迁: [118.3, 33.96],
          咸阳: [108.72, 34.36],
          铜川: [109.11, 35.09],
          平度: [119.97, 36.77],
          佛山: [113.11, 23.05],
          海口: [110.35, 20.02],
          江门: [113.06, 22.61],
          章丘: [117.53, 36.72],
          肇庆: [112.44, 23.05],
          大连: [121.62, 38.92],
          临汾: [111.5, 36.08],
          吴江: [120.63, 31.16],
          石嘴山: [106.39, 39.04],
          沈阳: [123.38, 41.8],
          苏州: [120.62, 31.32],
          茂名: [110.88, 21.68],
          嘉兴: [120.76, 30.77],
          长春: [125.35, 43.88],
          胶州: [120.03336, 36.264622],
          银川: [106.27, 38.47],
          张家港: [120.555821, 31.875428],
          三门峡: [111.19, 34.76],
          锦州: [121.15, 41.13],
          南昌: [115.89, 28.68],
          柳州: [109.4, 24.33],
          三亚: [109.511909, 18.252847],
          自贡: [104.778442, 29.33903],
          吉林: [126.57, 43.87],
          阳江: [111.95, 21.85],
          泸州: [105.39, 28.91],
          西宁: [101.74, 36.56],
          宜宾: [104.56, 29.77],
          呼和浩特: [111.65, 40.82],
          成都: [104.06, 30.67],
          大同: [113.3, 40.12],
          镇江: [119.44, 32.2],
          桂林: [110.28, 25.29],
          张家界: [110.479191, 29.117096],
          宜兴: [119.82, 31.36],
          北海: [109.12, 21.49],
          西安: [108.95, 34.27],
          金坛: [119.56, 31.74],
          东营: [118.49, 37.46],
          牡丹江: [129.58, 44.6],
          遵义: [106.9, 27.7],
          绍兴: [120.58, 30.01],
          扬州: [119.42, 32.39],
          常州: [119.95, 31.79],
          潍坊: [119.1, 36.62],
          重庆: [106.54, 29.59],
          台州: [121.420757, 28.656386],
          南京: [118.78, 32.04],
          滨州: [118.03, 37.36],
          贵阳: [106.71, 26.57],
          无锡: [120.29, 31.59],
          本溪: [123.73, 41.3],
          克拉玛依: [84.77, 45.59],
          渭南: [109.5, 34.52],
          马鞍山: [118.48, 31.56],
          宝鸡: [107.15, 34.38],
          焦作: [113.21, 35.24],
          句容: [119.16, 31.95],
          北京: [116.46, 39.92],
          徐州: [117.2, 34.26],
          衡水: [115.72, 37.72],
          包头: [110, 40.58],
          绵阳: [104.73, 31.48],
          乌鲁木齐: [87.68, 43.77],
          枣庄: [117.57, 34.86],
          杭州: [120.19, 30.26],
          淄博: [118.05, 36.78],
          鞍山: [122.85, 41.12],
          溧阳: [119.48, 31.43],
          库尔勒: [86.06, 41.68],
          安阳: [114.35, 36.1],
          开封: [114.35, 34.79],
          济南: [117, 36.65],
          德阳: [104.37, 31.13],
          温州: [120.65, 28.01],
          九江: [115.97, 29.71],
          邯郸: [114.47, 36.6],
          临安: [119.72, 30.23],
          兰州: [103.73, 36.03],
          沧州: [116.83, 38.33],
          临沂: [118.35, 35.05],
          南充: [106.110698, 30.837793],
          天津: [117.2, 39.13],
          富阳: [119.95, 30.07],
          泰安: [117.13, 36.18],
          诸暨: [120.23, 29.71],
          郑州: [113.65, 34.76],
          哈尔滨: [126.63, 45.75],
          聊城: [115.97, 36.45],
          芜湖: [118.38, 31.33],
          唐山: [118.02, 39.63],
          平顶山: [113.29, 33.75],
          邢台: [114.48, 37.05],
          德州: [116.29, 37.45],
          济宁: [116.59, 35.38],
          荆州: [112.239741, 30.335165],
          宜昌: [111.3, 30.7],
          义乌: [120.06, 29.32],
          丽水: [119.92, 28.45],
          洛阳: [112.44, 34.7],
          秦皇岛: [119.57, 39.95],
          株洲: [113.16, 27.83],
          石家庄: [114.48, 38.03],
          莱芜: [117.67, 36.19],
          常德: [111.69, 29.05],
          保定: [115.48, 38.85],
          湘潭: [112.91, 27.87],
          金华: [119.64, 29.12],
          岳阳: [113.09, 29.37],
          长沙: [113, 28.21],
          衢州: [118.88, 28.97],
          廊坊: [116.7, 39.53],
          菏泽: [115.480656, 35.23375],
          合肥: [117.27, 31.86],
          武汉: [114.31, 30.52],
          大庆: [125.03, 46.58]
        };
        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        let option = {
          geo: {
            map: "china"
          },
          series: [
            {
              name: "", //
              type: "scatter", // series图表类型
              coordinateSystem: "geo", // series坐标系类型
              data: convertData(data),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: "purple"
                }
              }
            }
          ],
          itemStyle: {
            areaColor: "#5DC4EF" //区域背景色
          }
        };
        myCharts.setOption(option);
      },
      // 获取我的关注列表
      getMyFollow() {
        console.log(localStorage.getItem('sonId '))
        if(localStorage.getItem('sonId')){
            this.sonId = localStorage.getItem('sonId');
        }
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          page: this.currentPage,
          sonId:this.sonId
        });
        myConcern(data).then(res => {
          console.log(res);
          this.followData = res;
        });
      },
      // 获取饼形图数据接口
      pieData() {
        let that = this;
        let datas = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          brandId: this.brandId
        });
        pieChartBySix(datas).then(res => {
          console.log(res);
          if (res.code == "000000") {
            that.paintingPie(res);
          }
        });
      },
      // 品牌分布图
      getBrabdList() {
        let that = this;
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          brandId: this.brandId
        });
        distributionMap(data).then(res => {
          console.log(res);
          if (res.code == "000000") {
            that.scattergram(res.data);
          }
        });
      }
    }
  };
</script>

<style scoped>
  /*左边功能栏*/
  .vip-left {
    position: fixed;
    left: 350px;
  }
  .user-data {
    width: 934px;
    height: 100%;
    margin-left: 30px;
  }

  .main-index {
    width: 100%;
    height: 95%;
    background: #f7f7f7;
    display: flex;
    justify-content: center;
    position: absolute;
  }

  .follow-index {
    width: 100%;
    display: flex;
    background: #f7f7f7;
    justify-content: center;
    position: absolute;
  }

  .follow-datas {
    width: 934px;
    height: 100%;
    margin-left: 13.5%;
    padding-bottom: 5.5%;
    position: relative;
  }

  .my-follow {
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

  /*我的关注用户数据*/
  .follow-message {
    width: 934px;
    background: rgba(255, 255, 255, 1);
    padding: 30px;
  }

  .follow-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
    padding-bottom: 20px;
    border-bottom: 1px solid #f8f8f8;
  }
  .follow-info p{
    width: 90px;
    text-align: center;
  }

  /*关注的数据*/
  .personal-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .personal-details p {
    width: 90px;
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid #f8f8f8;
  }

  .no-data {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }

  /*分页*/
  .paging {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }

  .paging p {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
    margin-right: 146px;
  }

  .datas-imgs {
    width: 934px;
    height: 372px;
    background: rgba(255, 255, 255, 1);
    padding: 30px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  /*饼图*/
  .pie-img p {
    margin-left: 65px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
  }

  @media screen and (min-width: 1200px) and (max-width: 1500px) {
    .vip-left {
      left: 60px;
    }

    .follow-datas {
      margin-left: 22%;
    }
    .my-follow{
      width: 95%;
    }
    .follow-message{
      width: 888px;
    }
    .datas-imgs{
      width: 888px;
    }
  }
</style>
