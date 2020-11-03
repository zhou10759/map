<template>
  <div>
    <div id="container" ref="imageDemo" v-loading="loading" element-loading-text="正在获取您的城市">
      <!--<div class="new-map" style="width:100%;height:100%;"></div> -->
    </div>
    <!--<div class="address-user">-->
    <div class="select-address">
      <input type="text" placeholder="搜地点、找路线" id="suggestId" v-model="addressName" />
      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
      <!-- 城市选择 -->
      <div class="select-city">
        <div class="citys" @click="getCity">
          <p>{{ address ? address : "城市" }}</p>
          <img src="../../../static/img/Underthe.png" alt />
        </div>
        <div class="search" @click="searchCity">
          <img src="../../../static/img/search.png" alt />
        </div>
      </div>
    </div>
    <!-- 城市列表弹框 -->
    <div v-if="isCity" class="cities">
      <!-- 默认城市 -->
      <div class="city-title">
        <div>城市列表</div>
        <img src="../../../static/img/ShutdownII.png" @click="getCity" alt />
      </div>
      <div class="defil-city" v-if="isNationwide == false">
        <div class="present-city">
          <p>当前城市：</p>
          <p>{{ this.address }}</p>
          <p class="default-city" v-if="isDefault == false" @click="defaultCity">设为默认城市</p>
        </div>
        <div class="default-cit" v-if="isDefault == true">
          <p class="sure-city">您默认的城市是：</p>
          <a href="javascript:void(0);" class="now-city" @click="nowCity()">
            {{
            this.defaultCitys
            }}
          </a>
          <p class="delete-city">
            [
            <span @click="noDefault">删除</span>
            ]
          </p>
        </div>
      </div>
      <!-- 热门城市 -->
      <div class="hot-city">
        <div class="hot-cites">
          <p v-for="(item, i) in hotList" :key="i" @click="getHotCity(i)">{{ item.name }}</p>
        </div>
        <div class="search-city">
          <div class="province-city">
            <p :class="isProvince == false ? 'active' : ''" @click="province()">按省份</p>
            <p :class="isProvince == true ? 'active' : ''" @click="city()">按城市</p>
          </div>
          <div class="inpt-city">
            <!-- ref绑定输入框内容 -->
            <input type="text" placeholder="输入城市名" ref="cityName" />
            <p @click="getName">搜索</p>
          </div>
        </div>
      </div>
      <!-- 省份下面的数据 -->
      <div v-if="isProvince == false">
        <div class="initial">
          <p v-for="(item, i) in provinceCity.acronym" :key="i" @click="getInitial(i)">{{ item.initial }}</p>
        </div>
        <div class="city-list">
          <div class="all-city">
            <div class="province">
              <div v-for="(city, i) in provinceCity.citys" :key="i" :id="city.capital" class="provinces">
                <div class="province-first">{{ city.capital }}</div>
                <div>
                  <div v-for="(province, a) in city.provinces" :key="a" class="cits">
                    <div class="province-name" @click="getProvince(province.province)">{{ province.province }}:</div>
                    <div class="cit-list">
                      <div class="under-city" v-for="(ciyies, l) in province.ciyies" :key="l" @click="toCity(ciyies)">
                        {{ ciyies }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 城市下面的数据 -->
      <div v-if="isProvince == true">
        <div class="initial">
          <p v-for="(item, i) in citys.acronym" :key="i" @click="toCitys(i)">{{ item }}</p>
        </div>
        <div class="city-list">
          <div class="all-city">
            <div v-for="(cits, k) in citys.cites" :key="k" class="citye-list">
              <div class="province-first" :id="cits.capital">{{ cits.capital }}</div>
              <div class="cit-list">
                <div v-for="(cityNames, o) in cits.cityName" :key="o" class="citye" @click="goCity(cityNames)">
                  {{ cityNames }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 创建商圈 -->
    <div class="create-business" v-if="isCreated"></div>
    <div class="createCircle" v-if="isCreated">
      <div class="create-title">
        <p>创建{{ isPolyLine ? "动线" : "商圈" }}</p>
        <img src="../../../static/img/ShutdownII.png" @click="closeStore" alt />
      </div>
      <div class="create-info">
        <div class="business-area-name">
          <p>{{ isPolyLine ? "动线" : "商圈" }}名称</p>
          <input type="text" placeholder="请输入商圈名称" v-model="tradingAreaName" v-if="!isPolyLine" />
          <input type="text" placeholder="请输入动线名称" v-model="tradingAreaName" v-if="isPolyLine" />
        </div>
        <div class="business-area-describe">
          <p>{{ isPolyLine ? "动线" : "商圈" }}描述</p>
          <textarea cols="30" rows="10" placeholder="请输入商圈描述" v-model="tradingAreaDescribe"
            v-if="!isPolyLine"></textarea>
          <textarea cols="30" rows="10" placeholder="请输入动线描述" v-model="tradingAreaDescribe"
            v-if="isPolyLine"></textarea>
        </div>
        <div class="business-area-grade" v-if="!isPolyLine">
          <p>{{ isPolyLine ? "动线" : "商圈" }}等级</p>
          <div class="radio">
            <input type="radio" name="pai" id="paixu1" :checked="tradingArea == 0 ? true : false"
              @click="sureRadio()" />
            {{ radioList.first }}
            <label for="paixu1" style="cursor:pointer" class="first"></label>
            <input type="radio" name="pai" id="paixu2" :checked="tradingArea == 1 ? true : false"
              @click="sureRadios()" />
            {{ radioList.second }}
            <label for="paixu2" style="cursor:pointer" class="second"></label>
            <input type="radio" name="pai" id="paixu3" :checked="tradingArea == 2 ? true : false"
              @click="sureRadioes()" />
            {{ radioList.third }}
            <label for="paixu3" style="cursor:pointer" class="third"></label>
          </div>
        </div>
        <div class="business-area-open" v-if="!isPolyLine">
          <p>商圈描述</p>
          <div class="switch">
            <el-switch v-model="offSale" active-text="已售" @change="createOffOn()"></el-switch>
            <el-switch v-model="offOpen" active-text="已开" @change="createOnOff()"></el-switch>
          </div>
        </div>
      </div>
      <div class="create-btn">
        <p @click="closeStore">取消</p>
        <p @click="createStore()">立即创建</p>
      </div>
    </div>
    <!-- 编辑商圈 -->
    <div class="edit-shadow"></div>
    <div class="create-circle">
      <div class="create-title">
        <p>编辑{{ isPolyLine ? "动线" : "商圈" }}</p>
        <img src="../../../static/img/ShutdownII.png" @click="closeBusinessEdit" alt />
      </div>
      <div class="create-info">
        <div class="business-area-name">
          <p>{{ isPolyLine ? "动线" : "商圈" }}名称</p>
          <input type="text" placeholder=" 请输入商圈名称" v-model="tradingAreaName" v-if="!isPolyLine" />
          <input type="text" placeholder=" 请输入动线名称" v-model="tradingAreaName" v-if="isPolyLine" />
        </div>
        <div class="business-area-describe">
          <p>{{ isPolyLine ? "动线" : "商圈" }}描述</p>
          <textarea cols="30" rows="10" placeholder="请输入商圈描述" v-model="tradingAreaDescribe"
            v-if="!isPolyLine"></textarea>
          <textarea cols="30" rows="10" placeholder="请输入动线描述" v-model="tradingAreaDescribe"
            v-if="isPolyLine"></textarea>
        </div>
        <div class="business-area-grade" v-if="!isPolyLine">
          <p>{{ isPolyLine ? "动线" : "商圈" }}等级</p>
          <div class="radio">
            <input type="radio" name="paixu" id="paixu1" :checked="tradingAreaGrand == 0" @click="sureRadio1()" />
            {{ radioList.first }}
            <label for="paixu1" style="cursor:pointer" class="first"></label>
            <input type="radio" name="paixu" id="paixu2" :checked="tradingAreaGrand == 1" @click="sureRadio2()" />
            {{ radioList.second }}
            <label for="paixu2" style="cursor:pointer" class="second"></label>
            <input type="radio" name="paixu" id="paixu3" :checked="tradingAreaGrand == 2" @click="sureRadio3()" />
            {{ radioList.third }}
            <label for="paixu3" style="cursor:pointer" class="third"></label>
          </div>
        </div>
        <div class="business-area-open" v-if="!isPolyLine">
          <p>商圈描述</p>
          <div class="switch">
            <el-switch v-model="value1" active-text="已售" @change="onOff()"></el-switch>
            <el-switch v-model="value2" active-text="已开" @change="offOn()"></el-switch>
          </div>
        </div>
      </div>
      <div class="create-btn">
        <p @click="deleteBusinessEdit">删除</p>
        <p @click="closeBusinessEdit">取消</p>
        <p @click="sureBusinessEdit">确认</p>
      </div>
    </div>
    <!-- 右侧个人信息及功能 -->
    <div class="user-info">
      <div class="map-btn">
        <!-- 绘制面删除热力图不精确的点 -->
        <div class="delete-hotmap" v-if="userInfo.admin" @click="operatHot">
          <p>操作热力图</p>
          <img src="../../../static/img/Underthe.png" alt style="width:10px;height:6px;margin-left:10px;" />
        </div>
        <div class="ranging" @click="ranging">
          <img src="../../../static/img/distance.png" alt />
          <p>测距</p>
        </div>
        <div class="select-area" @click="getArea">
          <p>商圈规划</p>
          <img src="../../../static/img/Underthe.png" alt />
        </div>
        <div class="label" @click="createPoint()">
          <p>标签</p>
          <img src="../../../static/img/Thelabel.png" alt />
        </div>
        <div class="exhibition" @click="showIcon">
          <p>展示</p>
          <img src="../../../static/img/Underthe.png" alt />
        </div>
      </div>
      <div class="user-message">
        <img src="../../../static/img/people.png" @click="toMyBusiness" alt />
      </div>
      <!-- 热力图增删 -->
      <div v-if="operationHotMap" class="operat-map">
        <p @click="addHotMap">添加热力图</p>
        <p @click="deleteHotMap">删除热力图</p>
      </div>
      <!-- 选择区域弹框 -->
      <div class="areas" v-if="isArea" :class="userInfo.admin ? 'is-admin' : ''">
        <div @click="rectangle">矩形</div>
        <div @click="polygon">多边形</div>
        <div @click="roundness">圆形</div>
        <div @click="brokenLine">动线</div>
      </div>
      <!--展示按钮-->
      <div class="show-icon" v-if="isShowIcon" :class="userInfo.admin ? 'is-admins' : ''">
        <div @click="toMyicon">标签</div>
        <div @click="showHotMap">热力图</div>
        <div @click="toMystore">商圈列表</div>
      </div>
    </div>
    <!-- 添加热力图点位 -->
    <div v-if="heatPosition" class="heat-back"></div>
    <div class="heat-value" v-if="heatPosition">
      <input type="number" placeholder="请输入热力图热力值" v-model="heatValue" />
      <div class="heat-btn">
        <p @click="cancelHeat">取消</p>
        <p @click="sureHeat">确认</p>
      </div>
    </div>
    <!-- 是否删除该热力图 -->
    <div v-if="deleteMap" class="delete-map"></div>
    <div class="delet-hot-map" v-if="deleteMap">
      <div class="delete-sure">是否删除该热力图所在位置</div>
      <div class="delete-on">
        <p @click="cancelDelete">取消</p>
        <p @click="sureDelete">确认</p>
      </div>
    </div>
    <!--展示热力图列表-->
    <div class="hot-maplist" v-if="isHotmap">
      <div class="show-hot">
        <p>热力图查看</p>
        <img src="../../../static/img/ShutdownII.png" @click="closeHotList" alt />
      </div>
      <div @click="madeHotmap" style="text-align: center;color: rgba(2, 122, 255, 1);cursor: pointer;">定制热力图</div>
      <div class="map-list">
        <div class="hot-list" v-for="(hotMap, index) in hotMapLists" :key="index">
          <p>{{ hotMap.heatMapName }}</p>
          <p class="in-baidu" :class="lookStuats == index ? 'actived' : ''" @click="openHeatmap(hotMap, index)">查看</p>
        </div>
      </div>
    </div>
    <!--我的标签-->
    <div class="hot-maplist" v-if="isMyicon">
      <div class="show-hot">
        <p>我的标签</p>
        <p  @click="deleteIcon('all')" style="cursor:pointer;">删除所有标签</p>
        <img src="../../../static/img/ShutdownII.png" @click="closeMyicon" alt />
      </div>
      <div class="map-list">
        <div v-if="iconList.labelName.length == 0" style="text-align: center;margin-top: 10px;">暂无标签</div>
        <div v-if="iconList.labelName.length > 0">
          <div class="hot-list" v-for="(items, index) in iconList.labelName" :key="index">
            <p>{{ items.name }}</p>
            <div style="display: flex;">
              <p class="in-baidu" :class="items.type?'my-icon':''" @click="lookIcon(items.name,index)">查看</p>
              <!-- <p style="color: red;font-size: 12px;cursor: pointer;width: 50px;height: 24px;line-height: 24px;" @click="dleteIcon(items.name)">删除</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--我的商圈-->
    <div class="hot-maplist" v-if="isMystore">
      <div class="show-hot">
        <p>筛选</p>
        <img src="../../../static/img/ShutdownII.png" @click="closeMystore" alt />
      </div>
      <div class="show-btn">
        <p>显示全部</p>
        <el-switch class="off-on" v-model="isValue" @change="showAll()"></el-switch>
      </div>
      <div class="show-btn">
        <p>未售/已售</p>
        <el-switch class="off-on" v-model="isSale" @change="saled()"></el-switch>
      </div>
      <div class="show-btn">
        <p>未开/已开</p>
        <el-switch class="off-on" v-model="isOpen" @change="opened()"></el-switch>
      </div>
      <div class="hot-lists">商圈列表</div>
      <div class="map-list">
        <div class="hot-list" v-for="(items, i) in filtrateBusiness" :key="i" @click="openBusinessItem(items)">
          <p>{{ items.businessName }}</p>
          <!-- <p class="in-baidu" @click="lookIcon()">查看</p> -->
        </div>
      </div>
    </div>
    <!--商圈报告-->
    <div class="business-report" v-if="isReport">
      <div class="show-hot" v-if="businessReports">
        <div class="store-name">
          <img src="../../../static/img/Bitmap(1).png" alt />
          <p>{{ businessReports.businessZoneName }}</p>
        </div>
        <img src="../../../static/img/ShutdownII.png" class="close-report" @click="closeMyreport" alt />
      </div>
      <div class="report-data" v-if="businessReports">
        <div class="city-data">
          <div class="follow-sum">
            <div class="attention">
              <img src="../../../static/img/Theuser.png" alt />
              <p>
                今日关注数
                <span>{{ businessReports.followNum }}</span>
              </p>
            </div>
            <img :src="businessReports.qrCodeImg" class="img-code" @click="getCode(businessReports)" alt />
          </div>
          <div class="city-business">
            <div>{{ businessReports.businessZoneName }}</div>
            <div style="text-align: center;margin-top: 20px;" v-if="!businessReports.screenshotImg">暂无商圈截图</div>
            <img :src="businessReports.screenshotImg" alt />
          </div>
          <!--城市数据-->
          <div class="city-datas">
            <div class="datas-title">城市数据：</div>
            <div class="city-name">
              <p>
                城市：
                <span>{{ businessReports.city }}</span>
              </p>
              <p>
                城市等级：
                <span>{{ businessReports.cityData.cityLevel }}</span>
              </p>
            </div>
            <div class="cit-datas">
              <div class="city-info">
                <p>省份</p>
                <p>{{ businessReports.province }}</p>
              </div>
              <div class="city-info">
                <p>城市</p>
                <p>{{ businessReports.city }}</p>
              </div>
              <div class="city-info">
                <p>城市等级</p>
                <p>{{ businessReports.cityData.cityLevel }}</p>
              </div>
              <div class="city-info">
                <p>常住人口(万)</p>
                <p>{{ businessReports.cityData.residentPopulationPro }}</p>
              </div>
              <div class="city-info">
                <p>GDP(亿)</p>
                <p>{{ businessReports.cityData.gDP }}</p>
              </div>
              <div class="city-info">
                <p>三产比例</p>
                <p>{{ businessReports.cityData.threeProduction }}</p>
              </div>
              <div class="city-info">
                <p>社会消费品零售总额(亿)</p>
                <p>{{ businessReports.cityData.retailTotal }}</p>
              </div>
              <div class="city-info">
                <p>城镇居民人均可支配收入(元)</p>
                <p>{{ businessReports.cityData.income }}</p>
              </div>
              <div class="city-info">
                <p>人均消费支出(元)</p>
                <p>{{ businessReports.cityData.expenditure }}</p>
              </div>
            </div>
          </div>
          <!--商圈基础数据-->
          <div class="basics-data">
            <div class="basics-title">商圈基础数据：</div>
            <div class="basics-area">
              <p>
                商圈面积:
                <span>{{ businessReports.area }}㎡</span>
              </p>
              <p>
                常住人口:
                <span>{{ businessReports.residentPopulation }}人</span>
              </p>
              <p>
                商圈等级:
                <span>
                  {{
                  businessReports.businessLevel == 0
                  ? "S"
                  : businessReports.businessLevel == 1
                  ? "A"
                  : "B"
                  }}
                </span>
              </p>
            </div>
            <div class="basics-images">
              <div id="myCharts"></div>
            </div>
          </div>
        </div>
        <!--基础数据-->
        <div class="facility-statistics">
          <el-collapse v-model="activeNames" @change="handleChange" class="el-collapse-item">
            <el-collapse-item title="商圈内小区和写字楼统计" class="facility-data" name="1">
              <div class="statistics-data">
                <div class="small-estate">
                  <p>小区名称</p>
                  <p v-for="(estate, k) in businessReports.villageName" :key="k">{{ estate }}</p>
                </div>
                <div class="small-estate">
                  <p>写字楼名称</p>
                  <p v-for="(building, k) in businessReports.officeName" :key="k">{{ building }}</p>
                </div>
              </div>
            </el-collapse-item>
            <div class="data-statistics">
              <p>共{{ businessReports.villageNum }}个小区</p>
              <p>共{{ businessReports.officeNum }}幢写字楼</p>
            </div>
            <el-collapse-item title="商圈内聚客设施统计" class="facility-data" name="2">
              <div class="statistics-dats">
                <div class="facility-list">
                  <p>聚客设施名称</p>
                  <p>类型</p>
                </div>
                <div class="facility-name" v-for="(items, index) in businessReports.gatherGuestsName" :key="index">
                  <p>{{ items.otherName }}</p>
                  <p>{{ items.otherType }}</p>
                </div>
              </div>
            </el-collapse-item>
            <div class="data-statistics">
              <p>共{{ businessReports.gatherGuestsNum }}个聚客设施</p>
            </div>
          </el-collapse>
        </div>
        <!--商业数据-->
        <div class="business-data">
          <div class="commerce-data">
            <p>商圈商业数据：</p>
            <img :src="
                businessReports.thermodynamicChart
                  ? businessReports.thermodynamicChart
                  : businessHotImage
              " alt />
          </div>
          <!--饼形图-->
          <div class="pie-chart">
            <div class="pie-name">
              <div id="pieChart" style="padding-top: 10px"></div>
              <div v-if="oneIndustry.length == 0" class="no-industry-data">暂无行业数据</div>
              <p>一级行业占比</p>
            </div>
            <div class="pie-name">
              <div id="piecharts" style="padding-top: 10px"></div>
              <div v-if="twoIndustry.length == 0" class="no-industry-data">暂无行业数据</div>
              <p>二级行业占比</p>
            </div>
          </div>
          <!--广告栏-->
          <img :src="businessReports.advertisement" class="advertising" alt />
        </div>
      </div>
    </div>
    <!--二维码弹框-->
    <div class="shade" v-if="isCode"></div>
    <div class="two-code" v-if="isCode">

      <div class="pop-up">
        <div>
          <p>微信扫码查看更方便！</p>
          <img src="../../../static/img/Shutdown.png" class="off-code" @click="offCode" alt />
        </div>

        <img :src="businessReports.qrCodeImg" class="QR-code" alt />
      </div>
    </div>
    <div id="qrcode" ref="qrcode"></div>
    <!--</div>-->
    <!-- 切换卫星地图 -->
    <img src="../../../static/img/Themap.png" alt class="satellite" @click="cutSatellite" />
    <!--会员提示框-->
    <div class="shade" v-if="isVip"></div>
    <div class="jurisdiction" v-if="isVip">
      <div class="warm-prompt">温馨提示</div>
      <div class="no-money">您暂时没有查看权限，是否购买会员！</div>
      <div class="pay-money">
        <p @click="closeVip">取消</p>
        <p @click="goVip">立即开通</p>
      </div>
    </div>
    <!-- 添加标签的弹框 -->
    <div class="add-label-shadow"></div>
    <div class="add-label">
      <div class="add-title">
        <div>添加标签</div>
        <img src="../../../static/img/ShutdownII.png" alt @click="closeAdd()" />
      </div>
      <div class="add-info">
        <div class="icon-name">
          <div style="white-space: nowrap;">名称</div>
          <input type="text" placeholder="请输入标题" v-model="iconName" />
          <select @change="selectIndustry($event)" id="icon-select">
            <option value disabled selected v-if="!isType">暂时没有名称</option>
            <option value disabled selected v-if="isType">请选择标签</option>
            <option v-for="(item, index) in iconList.labelName" :key="index">
              {{
              item.name
              }}
            </option>
          </select>
        </div>
        <div class="icon-message">
          <div style="white-space: nowrap;">备注</div>
          <textarea cols="30" rows="10" placeholder="请输入备注信息" v-model="iconMessage"></textarea>
        </div>
      </div>
      <div class="add-btn">
        <div class="amend-icon" @click="toUpdateIcon($event)">
          <img :src="iconSrc" alt />
          <p style="white-space: nowrap;">修改</p>
        </div>
        <div class="cancel" @click="closeAdd()">取消</div>
        <div class="create-now" @click="createIcon">立即创建</div>
      </div>
    </div>
    <!-- 修改标签样式 -->
    <div class="change-icon-shadow"></div>
    <div id="change-icon">
      <div class="add-title">
        <div>更换标签样式</div>
        <img src="../../../static/img/ShutdownII.png" class="closeIcon" @click="closeIcon()" alt style="cursor: pointer;" />
      </div>
      <div class="all-icon">
        <img v-for="(item, index) in locationIconList" :key="index" :src="item.labelStyleImg" @click="chooseIcon(item)"
          alt />
      </div>
    </div>
    <!-- 编辑标签样式 -->
    <div class="change-icon-shadow1"></div>
    <div class="add-label1">
      <div class="add-title">
        <div class="already-add">已添加标签</div>
        <img src="../../../static/img/ShutdownII.png" alt @click="closeEdit()" />
      </div>
      <div class="add-info">
        <div class="icon-name">
          <div style="white-space: nowrap;">名称</div>
          <input type="text" placeholder="请输入标题" v-model="iconName" />
          <select @change="selectIndustry($event)" id="icon-select">
            <option value disabled selected v-if="!isType">暂时没有名称</option>
            <option value disabled selected v-if="isType">请选择类别</option>
            <option v-for="(item, index) in iconList.labelName" :key="index">
              {{
              item.name
              }}
            </option>
          </select>
        </div>
        <div class="icon-message">
          <div style="white-space: nowrap;">备注</div>
          <textarea cols="30" rows="10" placeholder="请输入备注信息" v-model="iconMessage"></textarea>
        </div>
      </div>
      <div class="add-btn">
        <div class="amend-icon" @click="editIcon($event)">
          <img :src="iconSrc" alt />
          <p style="white-space: nowrap;">修改</p>
        </div>
        <div class="cancel" @click="closeEdit(iconName)">取消</div>
        <div class="create-now1" @click="deleteIcon">删除</div>
        <div class="sure-edit" @click="sureIcon">确认</div>
      </div>
    </div>
    <!-- 定制热力图弹框 -->
    <div class="back" v-if="isMade==true"></div>
    <div class="pop-up" v-if="isMade==true">
      <div class="hint">温馨提示</div>
      <div class="success">请联系管理员</div>
      <div class="contact">管理员联系方式：19941207730</div>
      <div class="yes" @click="sure()">好的</div>
    </div>
    <!-- 画不出圆，提示刷新页面   -->
    <div class="backs" v-if="netWork==true"></div>
    <div class="pop-ups" v-if="netWork==true">
      <div class="hint">温馨提示</div>
      <div class="success">网络出现波动，是否刷新页面</div>
      <div style="display:flex;align-items: center; justify-content: center;">
        <div class="yess" @click="yesWork()">刷新</div>
        <div @click="cancelWork()" class="cancel-work">取消</div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import bottom from "@/components/index-bottom";
  // 引入QRCODE，js转二维码
  import QRCode from "qrcodejs2";
  // 引入接口
  import {
    initBusinessZone,
    defaultAddress,
    createBusinessZone,
    showBusinessZone,
    initHeatMap,
    showBusinessReport,
    showThermodynamic,
    showLabelStyle,
    createLabelShowBusinessName,
    createLabel,
    selectLabelById,
    showLabel,
    showBusinessZoneById,
    updateBusinessZone,
    updateLabelById,
    deleteLabel,
    zoomBusiness,
    updThermodynamicChart,
    deleteThermodynamic,
    addThermodynamic,
    deleteBusinessZone
  } from "@/api/index/index.js";
  export default {
    data() {
      return {
        // 输入框的内容
        addressName: "",
        // 标签实例
        diffculty: "",
        // 商圈数量的圆以及文字
        circle: [],
        labels: [],
        // 判断是否有标签类目
        isType: "",
        // 原始图标
        iconSrc: "",
        // 编辑的标签点击取消获取原来的图标
        formerIcon: "",
        // 标签编辑状态
        iconEdit: false,
        //所有图标
        locationIconList: [],
        // 商圈数量信息
        scaleInfo: "",
        // 地图显示地点
        address: "",
        // 地图级别
        rank: 15,
        // 比例尺大小
        plottingScale: "",
        // 地图的级别
        mapSize: "",
        // 是否为默认城市
        isDefault: false,
        // 设置的默认城市
        defaultCitys: "",
        // 显示全国时，隐藏当前城市
        isNationwide: false,
        // 热力图属性
        heatmapOverlay: "",
        // 判断基偶点击事件
        index: 1,
        // 地图
        map: "",
        // 中心点
        point: "",
        // 鼠标绘制点线面
        drawingManager: "",
        // 控制选择区域的显示隐藏
        isArea: false,
        // 城市列表数据的显示隐藏
        isCity: false,
        // 判断点击的是省份还是城市
        isProvince: false,
        // 是否动线
        isPolyLine: false,
        // 热门城市数据
        hotList: [
          {
            name: "全国"
          },
          {
            name: "北京"
          },
          {
            name: "上海"
          },
          {
            name: "广州"
          },
          {
            name: "深圳"
          },
          {
            name: "成都"
          },
          {
            name: "天津"
          },
          {
            name: "南京"
          },
          {
            name: "杭州"
          },
          {
            name: "武汉"
          }
        ],
        // 按省份排列数据
        provinceCity: {
          acronym: [
            { initial: "A" },
            { initial: "F" },
            { initial: "G" },
            { initial: "H" },
            { initial: "J" },
            { initial: "L" },
            { initial: "N" },
            { initial: "Q" },
            { initial: "S" },
            { initial: "T" },
            { initial: "X" },
            { initial: "Y" },
            { initial: "Z" },
            { initial: "港澳" }
          ],
          citys: [
            {
              capital: "A",
              provinces: [
                {
                  province: "安徽",
                  ciyies: [
                    "合肥",
                    "安庆",
                    "亳州",
                    "巢湖",
                    "池州",
                    "滁州",
                    "阜阳",
                    "淮北",
                    "淮南",
                    "黄山",
                    "六安",
                    "马鞍山",
                    "宿州",
                    "铜陵",
                    "芜湖",
                    "宣城",
                    "蚌埠"
                  ]
                }
              ]
            },
            {
              capital: "F",
              provinces: [
                {
                  province: "福建",
                  ciyies: [
                    "福州",
                    "龙岩",
                    "南平",
                    "宁德",
                    "莆田",
                    "泉州",
                    "三明",
                    "厦门",
                    "漳州"
                  ]
                }
              ]
            },
            {
              capital: "G",
              provinces: [
                {
                  province: "甘肃",
                  ciyies: [
                    "兰州",
                    "白银",
                    "定西",
                    "甘南州",
                    "嘉峪关",
                    "金昌",
                    "酒泉",
                    "临夏州",
                    "陇南",
                    "平凉",
                    "庆阳",
                    "天水",
                    "武威",
                    "张掖"
                  ]
                },
                {
                  province: "广东",
                  ciyies: [
                    "广州",
                    "潮州",
                    "东莞",
                    "佛山",
                    "河源",
                    "惠州",
                    "江门",
                    "揭阳",
                    "茂名",
                    "梅州",
                    "清远",
                    "汕头",
                    "汕尾",
                    "韶关",
                    "深圳",
                    "阳江",
                    "云浮",
                    "湛江",
                    "肇庆",
                    "中山",
                    "珠海"
                  ]
                },
                {
                  province: "广西",
                  ciyies: [
                    "南宁",
                    "百色",
                    "北海",
                    "崇左",
                    "防城港",
                    "桂林",
                    "贵港",
                    "河池",
                    "贺州",
                    "来宾",
                    "柳州",
                    "钦州",
                    "梧州",
                    "玉林"
                  ]
                },
                {
                  province: "贵州",
                  ciyies: [
                    "贵阳",
                    "安顺",
                    "毕节",
                    "六盘水",
                    "铜仁",
                    "遵义",
                    "黔西南州",
                    "黔东南州",
                    "黔南州"
                  ]
                }
              ]
            },
            {
              capital: "H",
              provinces: [
                {
                  province: "海南",
                  ciyies: [
                    "海口",
                    "白沙",
                    "保亭",
                    "昌江",
                    "儋州",
                    "澄迈",
                    "东方",
                    "定安",
                    "琼海",
                    "琼中",
                    "乐东",
                    "临高",
                    "陵水",
                    "三亚",
                    "屯昌",
                    "万宁",
                    "文昌",
                    "五指山"
                  ]
                },
                {
                  province: "河北",
                  ciyies: [
                    "石家庄",
                    "保定",
                    "沧州",
                    "承德",
                    "邯郸",
                    "衡水",
                    "廊坊",
                    "秦皇岛",
                    "唐山",
                    "邢台",
                    "张家口"
                  ]
                },
                {
                  province: "河南",
                  ciyies: [
                    "郑州",
                    "安阳",
                    "许昌",
                    "信阳",
                    "周口",
                    "驻马店",
                    "济源",
                    "鹤壁",
                    "焦作",
                    "开封",
                    "洛阳",
                    "漯河",
                    "南阳",
                    "平顶山",
                    "濮阳",
                    "三门峡",
                    "商丘",
                    "新乡"
                  ]
                },
                {
                  province: "黑龙江",
                  ciyies: [
                    "哈尔滨",
                    "大庆",
                    "大兴安岭地区",
                    "鹤岗",
                    "黑河",
                    "鸡西",
                    "佳木斯",
                    "牡丹江",
                    "七台河",
                    "齐齐哈尔",
                    "双鸭山",
                    "绥化",
                    "伊春"
                  ]
                },
                {
                  province: "湖北",
                  ciyies: [
                    "武汉",
                    "鄂州",
                    "恩施",
                    "黄冈",
                    "黄石",
                    "荆门",
                    "荆州",
                    "潜江",
                    "神农架林区",
                    "十堰",
                    "随州",
                    "天门",
                    "仙桃",
                    "咸宁",
                    "襄阳",
                    "孝感",
                    "宜昌"
                  ]
                },
                {
                  province: "湖南",
                  ciyies: [
                    "长沙",
                    "常德",
                    "郴州",
                    "衡阳",
                    "怀化",
                    "娄底",
                    "邵阳",
                    "湘潭",
                    "湘西州",
                    "益阳",
                    "永州",
                    "岳阳",
                    "张家界",
                    "株洲"
                  ]
                }
              ]
            },
            {
              capital: "J",
              provinces: [
                {
                  province: "江苏",
                  ciyies: [
                    "南京",
                    "常州",
                    "淮安",
                    "连云港",
                    "南通",
                    "苏州",
                    "宿迁",
                    "泰州",
                    "无锡",
                    "徐州",
                    "盐城",
                    "扬州",
                    "镇江"
                  ]
                },
                {
                  province: "江西",
                  ciyies: [
                    "南昌",
                    "抚州",
                    "赣州",
                    "吉安",
                    "景德镇",
                    "九江",
                    "萍乡",
                    "上饶",
                    "新余",
                    "宜春",
                    "鹰潭"
                  ]
                },
                {
                  province: "吉林",
                  ciyies: [
                    "长春",
                    "白城",
                    "白山",
                    "吉林",
                    "辽源",
                    "四平",
                    "松原",
                    "通化",
                    "延边"
                  ]
                }
              ]
            },
            {
              capital: "L",
              provinces: [
                {
                  province: "辽宁",
                  ciyies: [
                    "沈阳",
                    "鞍山",
                    "本溪",
                    "朝阳",
                    "大连",
                    "丹东",
                    "抚顺",
                    "阜新",
                    "葫芦岛",
                    "锦州",
                    "辽阳",
                    "盘锦",
                    "铁岭",
                    "营口"
                  ]
                }
              ]
            },
            {
              capital: "N",
              provinces: [
                {
                  province: "内蒙古",
                  ciyies: [
                    "呼和浩特",
                    "阿拉善盟",
                    "包头",
                    "巴彦淖尔",
                    "赤峰",
                    "鄂尔多斯",
                    "呼伦贝尔",
                    "通辽",
                    "乌海",
                    "乌兰察布",
                    "锡林郭勒盟",
                    "兴安盟"
                  ]
                },
                {
                  province: "宁夏",
                  ciyies: ["银川", "固原", "石嘴山", "吴忠", "中卫"]
                }
              ]
            },
            {
              capital: "Q",
              provinces: [
                {
                  province: "青海",
                  ciyies: [
                    "西宁",
                    "果洛州",
                    "海东",
                    "海北州",
                    "海南州",
                    "海西州",
                    "黄南州",
                    "玉树州"
                  ]
                }
              ]
            },
            {
              capital: "S",
              provinces: [
                {
                  province: "山东",
                  ciyies: [
                    "济南",
                    "滨州",
                    "东营",
                    "德州",
                    "菏泽",
                    "济宁",
                    "聊城",
                    "临沂",
                    "青岛",
                    "日照",
                    "秦安",
                    "威海",
                    "潍坊",
                    "烟台",
                    "枣庄",
                    "淄博"
                  ]
                },
                {
                  province: "山西",
                  ciyies: [
                    "太原",
                    "长治",
                    "大同",
                    "晋城",
                    "晋中",
                    "临汾",
                    "吕梁",
                    "朔州",
                    "忻州",
                    "阳泉",
                    "运城"
                  ]
                },
                {
                  province: "陕西",
                  ciyies: [
                    "西安",
                    "安康",
                    "宝鸡",
                    "汉中",
                    "商洛",
                    "铜川",
                    "渭南",
                    "咸阳",
                    "延安",
                    "榆林"
                  ]
                },
                {
                  province: "四川",
                  ciyies: [
                    "成都",
                    "阿坝州",
                    "巴中",
                    "达州",
                    "德阳",
                    "甘孜州",
                    "广安",
                    "广元",
                    "乐山",
                    "凉山州",
                    "泸州",
                    "南充",
                    "眉山",
                    "锦阳",
                    "内江",
                    "攀枝花",
                    "遂宁",
                    "雅安",
                    "宜宾",
                    "资阳",
                    "自贡"
                  ]
                }
              ]
            },
            {
              capital: "T",
              provinces: [
                {
                  province: "台湾",
                  ciyies: [
                    "台北",
                    "高雄",
                    "台中",
                    "台南",
                    "新北",
                    "基隆",
                    "新竹",
                    "嘉义"
                  ]
                }
              ]
            },
            {
              capital: "X",
              provinces: [
                {
                  province: "西藏",
                  ciyies: [
                    "拉萨",
                    "阿里地区",
                    "昌都",
                    "林芝",
                    "那曲地区",
                    "日喀则",
                    "山南地区"
                  ]
                },
                {
                  province: "新疆",
                  ciyies: [
                    "乌鲁木齐",
                    "阿拉尔",
                    "阿克苏地区",
                    "阿勒泰地区",
                    "巴音郭楞",
                    "博尔塔拉州",
                    "昌吉州",
                    "哈密",
                    "和田地区",
                    "喀什地区",
                    "克拉玛依",
                    "克孜勒苏州",
                    "石河子",
                    "塔城地区",
                    "图木舒克",
                    "吐鲁番地区",
                    "五家渠",
                    "伊犁州"
                  ]
                }
              ]
            },
            {
              capital: "Y",
              provinces: [
                {
                  province: "云南",
                  ciyies: [
                    "昆明",
                    "保山",
                    "楚雄州",
                    "大理州",
                    "德宏州",
                    "迪庆州",
                    "红河州",
                    "丽江",
                    "临沧",
                    "怒江州",
                    "普洱",
                    "曲靖",
                    "邵通",
                    "文山",
                    "西双版纳",
                    "玉溪"
                  ]
                }
              ]
            },
            {
              capital: "Z",
              provinces: [
                {
                  province: "浙江",
                  ciyies: [
                    "杭州",
                    "湖州",
                    "嘉兴",
                    "金华",
                    "丽水",
                    "宁波",
                    "衢州",
                    "绍兴",
                    "台州",
                    "温州",
                    "舟山"
                  ]
                },
                {
                  province: "港澳",
                  ciyies: ["香港", "澳门"]
                }
              ]
            }
          ]
        },
        // 按城市排列数据
        citys: {
          acronym: [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "J",
            "K",
            "L",
            "M",
            "N",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "W",
            "X",
            "Y",
            "Z"
          ],
          cites: [
            {
              capital: "A",
              cityName: [
                "安庆",
                "安顺",
                "安阳",
                "鞍山",
                "阿拉善盟",
                "安康",
                "阿里地区",
                "阿拉尔",
                "阿克苏地区",
                "阿勒泰地区",
                "澳门"
              ]
            },
            {
              capital: "B",
              cityName: [
                "蚌埠",
                "亳州",
                "白银",
                "百色",
                "北海",
                "毕节",
                "白沙",
                "保亭",
                "保定",
                "白城",
                "白山",
                "本溪",
                "包头",
                "巴彦淖尔",
                "滨州",
                "宝鸡",
                "巴中",
                "巴音郭楞",
                "博尔塔拉州",
                "保山",
                "北京"
              ]
            },
            {
              capital: "C",
              cityName: [
                "巢湖",
                "池州",
                "滁州",
                "潮州",
                "崇左",
                "昌江",
                "澄迈",
                "沧州",
                "承德",
                "长沙",
                "常德",
                "郴州",
                "常州",
                "长春",
                "朝阳",
                "赤峰",
                "长治",
                "成都",
                "阿坝州",
                "昌都",
                "昌吉州",
                "楚雄州",
                "重庆"
              ]
            },
            {
              capital: "D",
              cityName: [
                "定西",
                "东莞",
                "儋州",
                "东方",
                "定安",
                "大庆",
                "大兴安岭地区",
                "大连",
                "丹东",
                "东营",
                "德州",
                "大同",
                "达州",
                "德阳",
                "大理州",
                "德宏州",
                "迪庆州"
              ]
            },
            {
              capital: "E",
              cityName: ["鄂州", "鄂尔多斯"]
            },
            {
              capital: "F",
              cityName: ["阜阳", "福州", "佛山", "防城港", "抚顺", "阜新"]
            },
            {
              capital: "G",
              cityName: [
                "甘南州",
                "广州",
                "桂林",
                "贵港",
                "贵阳",
                "赣州",
                "固原",
                "果洛州",
                "甘孜州",
                "广安",
                "广元",
                "高雄"
              ]
            },
            {
              capital: "H",
              cityName: [
                "合肥",
                "淮北",
                "淮南",
                "黄山",
                "河源",
                "惠州",
                "河池",
                "贺州",
                "海口",
                "临高",
                "邯郸",
                "衡水",
                "鹤壁",
                "哈尔滨",
                "鹤岗",
                "黑河",
                "黄冈",
                "黄石",
                "衡阳",
                "怀化",
                "淮安",
                "葫芦岛",
                "呼和浩特",
                "呼伦贝尔",
                "海北州",
                "海南州",
                "海西州",
                "黄南州",
                "菏泽",
                "汉中",
                "哈密",
                "和田地区",
                "杭州",
                "湖州"
              ]
            },
            {
              capital: "J",
              cityName: [
                "嘉峪关",
                "金昌",
                "酒泉",
                "江门",
                "揭阳",
                "焦作",
                "鸡西",
                "佳木斯",
                "荆门",
                "荆州",
                "吉安",
                "景德镇",
                "九江",
                "吉林",
                "锦州",
                "济南",
                "济宁",
                "晋城",
                "晋中",
                "嘉兴",
                "金华",
                "基隆",
                "嘉义"
              ]
            },
            {
              capital: "K",
              cityName: ["开封", "喀什地区", "克拉玛依", "克孜勒苏州", "昆明"]
            },
            {
              capital: "L",
              cityName: [
                "六安",
                "龙岩",
                "兰州",
                "临夏州",
                "陇南",
                "来宾",
                "柳州",
                "六盘水",
                "乐东",
                "廊坊",
                "洛阳",
                "漯河",
                "娄底",
                "连云港",
                "辽源",
                "辽阳",
                "莱芜",
                "聊城",
                "临沂",
                "临汾",
                "吕梁",
                "乐山",
                "凉山州",
                "泸州",
                "拉萨",
                "林芝",
                "丽江",
                "临沧",
                "丽水"
              ]
            },
            {
              capital: "M",
              cityName: ["马鞍山", "茂名", "梅州", "牡丹江", "眉山", "绵阳"]
            },
            {
              capital: "N",
              cityName: [
                "南平",
                "宁德",
                "南宁",
                "南阳",
                "恩施",
                "南京",
                "南通",
                "南昌",
                "南充",
                "内江",
                "那曲地区",
                "怒江州",
                "宁波"
              ]
            },
            {
              capital: "P",
              cityName: [
                "莆田",
                "平凉",
                "平顶山",
                "濮阳",
                "萍乡",
                "盘锦",
                "攀枝花",
                "普洱"
              ]
            },
            {
              capital: "Q",
              cityName: [
                "泉州",
                "庆阳",
                "清远",
                "钦州",
                "黔西南州",
                "黔东南州",
                "黔南州",
                "琼海",
                "琼中",
                "陵水",
                "秦皇岛",
                "七台河",
                "齐齐哈尔",
                "潜江",
                "青岛",
                "曲靖",
                "衢州"
              ]
            },
            {
              capital: "R",
              cityName: ["日照", "日喀则"]
            },
            {
              capital: "S",
              cityName: [
                "宿州",
                "三明",
                "汕头",
                "汕尾",
                "韶关",
                "深圳",
                "三亚",
                "石家庄",
                "三门峡",
                "商丘",
                "双鸭山",
                "绥化",
                "神农架林区",
                "十堰",
                "随州",
                "邵阳",
                "苏州",
                "宿迁",
                "上饶",
                "四平",
                "松原",
                "沈阳",
                "石嘴山",
                "朔州",
                "商洛",
                "遂宁",
                "山南地区",
                "石河子",
                "绍兴",
                "上海"
              ]
            },
            {
              capital: "T",
              cityName: [
                "铜陵",
                "天水",
                "铜仁",
                "屯昌",
                "唐山",
                "天门",
                "泰州",
                "通化",
                "铁岭",
                "通辽",
                "秦安",
                "太原",
                "铜川",
                "塔城地区",
                "图木舒克",
                "吐鲁番地区",
                "台州",
                "天津",
                "台北",
                "台中",
                "台南"
              ]
            },
            {
              capital: "W",
              cityName: [
                "芜湖",
                "武威",
                "梧州",
                "万宁",
                "文昌",
                "五指山",
                "武汉",
                "无锡",
                "抚州",
                "乌海",
                "乌兰察布",
                "吴忠",
                "威海",
                "潍坊",
                "渭南",
                "乌鲁木齐",
                "五家渠",
                "文山",
                "温州"
              ]
            },
            {
              capital: "X",
              cityName: [
                "宣城",
                "厦门",
                "邢台",
                "新乡",
                "信阳",
                "许昌",
                "仙桃",
                "咸宁",
                "襄阳",
                "孝感",
                "湘潭",
                "湘西州",
                "徐州",
                "新余",
                "锡林郭勒盟",
                "兴安盟",
                "西宁",
                "海东市",
                "忻州",
                "西安",
                "咸阳",
                "西双版纳",
                "香港",
                "新北",
                ,
                "新竹"
              ]
            },
            {
              capital: "Y",
              cityName: [
                "阳江",
                "云浮",
                "玉林",
                "伊春",
                "宜昌",
                "益阳",
                "永州",
                "岳阳",
                "盐城",
                "扬州",
                "宜春",
                "鹰潭",
                "延边",
                "营口",
                "银川",
                "玉树州",
                "烟台",
                "阳泉",
                "运城",
                "延安",
                "榆林",
                "雅安",
                "宜宾",
                "伊犁州",
                "玉溪"
              ]
            },
            {
              capital: "Z",
              cityName: [
                "漳州",
                "张掖",
                "湛江",
                "肇庆",
                "中山",
                "珠海",
                "遵义",
                "张家口",
                "郑州",
                "周口",
                "驻马店",
                "张家界",
                "株洲",
                "镇江",
                "中卫",
                "枣庄",
                "淄博",
                "资阳",
                "自贡",
                "邵通",
                "舟山"
              ]
            }
          ],
          linePoint: []
        },
        // 商圈等级的选择
        radioList: { first: "S", second: "A", third: "B" },
        // 开售的状态
        value1: false,
        value2: false,
        // 是否创建商圈
        isCreated: false,
        // 清除点线面的属性
        fun: "",
        industryList: ["麦当劳", "肯德基", "德克士", "汉堡汉霸"],
        // 是否展示标签、热力图、商圈
        isShowIcon: false,
        // 展示热力图列表
        isHotmap: false,
        // 是否会员
        isVip: false,
        isMyicon: false,
        // 创建标签的类目
        iconList: [],
        // 筛选的商圈列表
        filtrateBusiness: [],
        // 查看我的商圈
        isMystore: false,
        // 显示全部  开关
        isValue: false,
        // 创建的 已售/未售  开关
        offSale: false,
        // 创建的 已开/未开  开关
        offOpen: false,
        // 编辑的 已售/未售  开关
        isSale: false,
        //编辑的 已开/未开  开关
        isOpen: false,
        activeNames: [""],
        // 是否点开二维码
        isCode: false,
        // 是否展示商圈报告
        isReport: false,
        // 品牌Id
        brandId: "",
        // 用户信息
        userInfo: "",
        // 判断是什么类型的商圈（圆，矩形，多边形）
        shapeStatus: "",
        // 获取矩形、多边形、圆形面积
        allAcreage: "",
        // 商圈的名称
        tradingAreaName: "",
        // 商圈描述
        tradingAreaDescribe: "",
        // 创建商圈等级
        tradingArea: 0,
        // 编辑商圈等级
        tradingAreaGrand: 0,
        // 商圈已开未开
        businessOpen: 0,
        // 商圈已售未售
        businessUnsold: 0,
        // 圆的半径
        radius: "",
        // 图形闭合点
        closingPoint: [],
        // 商圈报告数据
        businessReports: "",
        // 热力图列表
        hotMapLists: "",
        // 标签的名称
        iconName: "",
        // 标签的备注信息
        iconMessage: "",
        //当前点击的图标是哪个
        clickMarker: "",
        // 获取标签ID
        iconId: "",
        // 获取回显的标签ID
        labelId: "",
        // 获取标签的经纬度
        iconPosition: "",
        // 获取标签类目名称
        createIconName: "",
        // 创建商圈所在城市
        createCity: "",
        // 创建商圈所在省份
        createProvince: "",
        // 创建商圈所在区
        createDistrict: "",
        // 一级行业数量
        oneIndustry: [],
        // 二级行业数量
        twoIndustry: [],
        // 商圈报告弹框
        label: "",
        // 商圈ID
        businessId: "",
        // 编辑回显的商圈类型
        businessClickType: "",
        // 点击查看标签样式状态
        lookStuats: -1,
        // 判断商圈是否超出范围
        outArea: false,
        // 商圈截图
        screenshotImg: "",
        // 商圈热力图截图
        businessHotImage: "",
        // 定制服务的商圈面积
        customizationArea: "",
        // 定制服务的报告Id
        customizedId: "",
        // 定制的商圈实例
        customizedObj: "",
        // 所有矩形的实例
        orthogonNew: "",
        // 所有多变形的实例
        rectangleNew: "",
        // 所有圆形的实例
        circleNew: "",
        // 所有折线的实例
        brokenNew: "",
        // 测距功能
        myDis: "",
        // 加载框的状态
        loading: true,
        // 当前点击的商圈报告ID
        businessReportId: "",
        //  操作热力图
        operationHotMap: false,
        // 热力值
        heatValue: "",
        // 热力值输入框显示隐藏
        heatPosition: false,
        // 增加热力图的经纬度
        newHotPosition: "",
        // 热力图类型
        hotType: "",
        // 获取删除热力图不精确的点 半径
        deleteRadius: "",
        // 获取删除热力图不精确的点 中心点
        deletePoint: "",
        // 热力图Id
        heatMapId: "",
        // 热力图下标
        hotIndex: "",
        // 是否删除热力图
        deleteMap: false,
        sonId: "",
        overlays: "",
        deleteFlag: false,
        iconArray: [],
        iconarrList: [],
        isMade: false,
        netWork: false //网络波动状态
      };
    },
    // 引入组件
    components: { bottom },
    created() {
      // this.brandId = this.$route.query.brandId;
      // 获取cookie的用户信息
      let user = this.$cookies.get("userInfo");
      this.brandId = this.$cookies.get("brandId");
      this.userInfo = user;
    },
    mounted() {
      // 获取当前城市
      this.getCityPosition();
      // 地图以及热力图功能
      this.getMap();
      // 获取当前的默认城市  商圈初始化
      this.initializeBusiness();
      // 热力图列表
      this.hotMapList();
      // 监听鼠标滚轮
      window.addEventListener("mousewheel", this.handleScroll, true);
      // 加载我的标签接口
      this.getMyIcon();
      // 加载标签的图标样式接口
      this.getIconimg();
      // 获取输入的地点以及生产下拉框
      this.getInptAddress();
    },
    methods: {
      // 管理员功能对热力图的增删
      operatHot() {
        this.operationHotMap = !this.operationHotMap;
      },
      // 添加热力图
      addHotMap() {
        let map = this.map;
        let that = this;
        if (this.hotType == "") {
          alert("请先打开热力图");
        } else {
          let p = "新增";
          this.drawing(p);
        }
      },
      // 删除热力图不精确的点
      deleteHotMap() {
        let that = this;
        if (this.hotType == "") {
          alert("请先打开热力图");
        } else {
          this.deleteFlag = true;
          this.closingPoint = [];
          this.drawing();
          console.log("画完要删的热力图");
          this.drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
        }
      },
      // 取消输入热力值
      cancelHeat() {
        this.heatPosition = !this.heatPosition;
        this.heatValue = "";
        this.fun.clearAll();
        this.drawingManager.close();
      },
      // 确认输入热力值
      sureHeat() {
        console.log(this.heatValue);
        let that = this;
        if (this.heatValue <= 100) {
          let data = JSON.stringify({
            count: this.heatValue,
            lat: this.newHotPosition.lat,
            lng: this.newHotPosition.lng,
            type: this.hotType,
            city: this.address,
            userId: this.userInfo.userId,
            token: this.userInfo.token
          });
          addThermodynamic(data).then(res => {
            console.log(res);
            if (res.code == "000003") {
              alert("请先打开热力图操作");
            }
            if (res.code == "000000") {
              that.heatPosition = !that.heatPosition;
              that.heatValue = "";
              that.fun.clearAll();
              that.drawingManager.close();
              let dat = {
                heatType: that.hotType,
                heatMapId: that.heatMapId
              };
              that.switchHotMap(dat);
            }
          });
        } else if (this.heatValue > 100) {
          alert("最大值不能超过100");
        }
        if (this.heatValue == "") {
          alert("请输入热力值,");
        }
      },
      // 取消删除热力图
      cancelDelete() {
        this.deleteFlag = false;
        this.deleteMap = !this.deleteMap;
        this.deleteRadius = "";
        this.deletePoint = "";
        this.fun.clearAll();
        this.drawingManager.close();
      },
      // 确认删除热力图
      sureDelete() {
        this.deleteFlag = false;
        let that = this;
        let dat = {
          heatType: this.hotType,
          heatMapId: this.heatMapId
        };
        let datas = JSON.stringify({
          lng: this.deletePoint.lng,
          lat: this.deletePoint.lat,
          radius: this.deleteRadius / 1000,
          type: this.hotType,
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          city: this.address,
          heatMapId: this.heatMapId
        });
        deleteThermodynamic(datas).then(res => {
          console.log(res);
          if (res.code == "000000") {
            that.deleteMap = !that.deleteMap;
            that.deleteRadius = "";
            that.deletePoint = "";
            that.fun.clearAll();
            that.drawingManager.close();
            that.switchHotMap(dat);
          }
        });
      },
      // 获取输入的地点以及生产下拉框
      getInptAddress() {
        let map = this.map;
        function G(id) {
          return document.getElementById(id);
        }
        var ac = new BMap.Autocomplete({ input: "suggestId", location: map }); //建立一个自动完成的对象
        ac.addEventListener("onhighlight", function (e) {
          //鼠标放在下拉列表上的事件
          var str = "";
          var _value = e.fromitem.value;
          var value = "";
          if (e.fromitem.index > -1) {
            value =
              _value.province +
              _value.city +
              _value.district +
              _value.street +
              _value.business;
          }
          str =
            "FromItem<br />index = " +
            e.fromitem.index +
            "<br />value = " +
            value;

          value = "";
          if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value =
              _value.province +
              _value.city +
              _value.district +
              _value.street +
              _value.business;
          }
          str +=
            "<br />ToItem<br />index = " +
            e.toitem.index +
            "<br />value = " +
            value;
          G("searchResultPanel").innerHTML = str;
        });
        let that = this;
        var myValue;
        ac.addEventListener("onconfirm", function (e) {
          //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          myValue =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
          G("searchResultPanel").innerHTML =
            "onconfirm<br />index = " +
            e.item.index +
            "<br />myValue = " +
            myValue;
          that.mapFn(myValue);
        });
      },
      // 搜索地点跳转
      mapFn(myValue) {
        let map = this.map;
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 18);
          var myIcon = new BMap.Icon(
            "https://ss0.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3605553043,2514692554&fm=23&gp=0.jpg",
            new BMap.Size(23, 35)
          );
          map.addOverlay(new BMap.Marker(pp, { icon: myIcon })); //添加标注
          //map.addOverlay(new BMap.Marker(pp));
        }
        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      },
      // 搜索按钮
      searchCity() {
        this.mapFn(this.addressName);
      },
      // 截图地图的图片
      getMapImg(e, id) {
        // svg转canvas
        let nodesToRecover = [];
        let nodesToRemove = [];
        let svgElem = $("#container").find("svg"); // divReport为需要截取成图片的dom的id
        let prepare = [];
        let that = this;
        for (let i = 0; i < svgElem.length; i++) {
          prepare.push(0);
        }
        svgElem.each(function (index, node) {
          let parentNode = node.parentNode;
          let svgImg = node.outerHTML;
          let canvas = document.createElement("canvas");
          canvg(canvas, svgImg);
          canvas.style.position = node.style.position;
          canvas.style.width = node.style.width;
          canvas.style.height = node.style.height;
          canvas.style.left = 0;
          canvas.style.top = 0;
          let ctx = canvas.getContext("2d");
          let svg_xml = new XMLSerializer().serializeToString(node);
          let img = new Image();
          img.src = "data:image/svg+xml;base64," + window.btoa(svg_xml);
          img.onload = function () {
            ctx.drawImage(img, 0, 0);
            prepare[index] = 1;
            download(canvas.toDataURL("image/png")); // 调试用
          };
          parentNode.appendChild(canvas); // 使用canvas代替svg进行截图
          nodesToRemove.push({
            // 完成截图后删除canvas
            parent: parentNode,
            child: canvas
          });
          // setTimeout(function () {
          //     nodesToRemove.push({
          //       // 完成截图后删除canvas
          //       parent: parentNode,
          //       child: canvas
          //     });
          //   },1000)
          // nodesToRecover.push({
          //   // 完成截图后恢复svg
          //   parent: parentNode,
          //   child: node
          // });
          // parentNode.removeChild(node); // 暂时移除svg
        });
        let waitInterval = setInterval(() => {
          let isComplete = true;
          for (let i = 0; i < prepare.length; i++) {
            if (prepare[i] == 0) {
              isComplete = false;
              break;
            }
          }
          if (isComplete) {
            clearInterval(waitInterval);
            // div转canvas截图
            html2canvas(document.getElementById("container"), {
              useCORS: true,
              scale: 0.5,
              backgroundColor: null
            }).then(cnv => {
              console.log(that.$refs.imageDemo);
              console.log(cnv);
              let imgUrl = cnv.toDataURL("image/png"); // 将canvas转换成img的src流，base64
              console.log(imgUrl);
              that.screenshotImg = imgUrl;
              // 判断是否为商圈热力图截图
              if (e == 1) {
                that.businessHotImage = imgUrl;
                // 调用商圈热力图接口
                let data = JSON.stringify({
                  userId: that.userInfo.userId,
                  token: that.userInfo.token,
                  reportId: id,
                  thermodynamicChart: imgUrl
                });
                updThermodynamicChart(data).then(res => {
                  console.log(res);
                });
              }
              // for (let i = 0; i < nodesToRecover.length; i++) {
              //   nodesToRecover[i].parent.appendChild(nodesToRecover[i].child);
              // }
              for (let i = 0; i < nodesToRemove.length; i++) {
                nodesToRemove[i].parent.removeChild(nodesToRemove[i].child);
              }
            });
          }
        }, 300);
      },
      // 获取地图商圈数量
      getBusinessSum() {
        console.log(this.address);
        let datas = JSON.stringify({
          brandId: this.brandId,
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          city: this.address
        });
        zoomBusiness(datas).then(res => {
          console.log(res);
          this.scaleInfo = res.data;
        });
      },
      // 热力图列表接口
      hotMapList() {
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          memberLevel: this.userInfo.memberLevel
        });
        initHeatMap(data).then(res => {
          console.log(res);
          this.hotMapLists = res.data;
        });
      },
      // 获取当前城市
      getCityPosition() {
        let map = this.map;
        let that = this;
        if (this.defaultCitys) {
        } else {
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(
            function (r) {
              console.log(r);
              //that.address = r.address.city;

              //that.defaultCity()
              that.address = that.defaultCitys;
              that.loading = false;
              console.log(that.loading);
            },
            { enableHighAccuracy: true }
          );
        }
        that.getBusinessSum();
      },
      // 商圈初始化
      initializeBusiness() {
        console.log(this.brandId);
        let that = this;
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          brandId: this.brandId,
          cityName: this.address
        });
        initBusinessZone(data).then(res => {
          console.log("initBusinessZone" + JSON.stringify(res.data));
          let address = "";
          if (res.data.defaultAddress.address) {
            address = res.data.defaultAddress.address.city;
          }
          that.filtrateBusiness = res.data.businessZone;
          console.log(res.data.defaultAddress.city);
          this.defaultCitys = address; //new BMap.Point(address.lng, address.lat);
          //map.centerAndZoom(new BMap.Point(address.lng, address.lat),18);
          if (res.data.defaultAddress.city) {
            that.isDefault = !that.isDefault;
            that.defaultCitys = res.data.defaultAddress.city;
          }
        });
      },
      // 商圈数量
      drawCircle(e, range) {
        console.log(e);
        let map = this.map;
        let that = this;
        map.removeOverlay(this.circle);
        map.removeOverlay(this.labels);
        for (let i = 0; i < e.length; i++) {
          let point = new BMap.Point(e[i].lng, e[i].lat);
          let opt = {
            strokeColor: "#027AFF",
            fillColor: "#027AFF",
            fillOpacity: "0.5"
          };
          var circle = new BMap.Circle(point, range, opt);
          that.circle.push(circle);
          var opts = {
            position: point, // 指定文本标注所在的地理位置
            offset:
              // range == 7000 ? new BMap.Size(-20, -20) : new BMap.Size(-30, -55) //设置文本偏移量
              range == 3000 ? new BMap.Size(-25, -40) : new BMap.Size(-20, -20) //设置文本偏移量
          };
          var labels = new BMap.Label(
            e[i].address + "<br> " + e[i].area + "个",
            opts
          ); // 创建文本标注对象
          that.labels.push(labels);
          labels.setStyle({
            color: "#ffffff",
            backgroundColor: "transparent", //文本背景色
            borderColor: "transparent", //文本框边框色
            // fontSize: "12px",
            fontSize: range == 3000 ? "16px" : "12px",
            height: "20px",
            fontWeight: 600,
            textAlign: "center",
            lineHeight: range == 3000 ? "40px" : "20px",
            // lineHeight: "20px",
            fontFamily: "微软雅黑"
          });
          map.addOverlay(circle);
          map.addOverlay(labels);
        }
      },
      // 获取标签的下拉框内容以及标签展示
      getMyIcon() {
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          brandId: this.brandId
        });
        createLabelShowBusinessName(data).then(res => {
          console.log(res);
          let dat = res.data;
          this.iconList = dat;
          // 判断是否有标签类目
          this.isType = res.data.labelName[0];
        });
      },
      // 创建标签按钮
      createIcon() {
        console.log(this.iconPosition);
        let map = this.map;
        // if (!((this.iconName || this.createIconName) && this.iconMessage)) {
        if (!(this.iconName || this.createIconName)) {
          alert("请填写名称");
        } else {
          let iconMessage = this.iconMessage;
          let labelName = this.iconName ? this.iconName : this.createIconName;
          let dats = JSON.stringify({
            userId: this.userInfo.userId,
            token: this.userInfo.token,
            memberLevel: this.userInfo.memberLevel,
            brandId: this.brandId,
            labelName: this.iconName ? this.iconName : this.createIconName,
            labelRemarks: this.iconMessage,
            labelStyleId: this.iconId
              ? this.iconId
              : this.locationIconList[0].labelStyleId,
            coordinates: this.iconPosition
          });
          createLabel(dats).then(res => {
            console.log(res);
            if (res.code == "000000") {
              console.log(this.clickMarker);
              map.removeOverlay(this.clickMarker);
              $(".add-label-shadow").css("display", "none");
              $(".add-label").css("display", "none");
              this.iconName = "";
              this.iconMessage = "";
              if (this.isType) {
                $("#icon-select").val("请选择类别");
              } else {
                $("#icon-select").val("暂时没有名称");
              }
              var pt = new BMap.Point(
                this.iconPosition.lng,
                this.iconPosition.lat
              );
              console.log("createLabel" + this.iconSrc);
              this.myIcon = new BMap.Icon(this.iconSrc, new BMap.Size(35, 45));
              var marker = new BMap.Marker(pt, {
                icon: this.myIcon
              });
              if (res.data) {
                marker.labelId = res.data.id;
              }
              let that = this;
              //marker.labelId = res.data.id;
              marker.labelName = this.iconName
                ? this.iconName
                : this.createIconName;
              //console.log(this.myIcon.imageUrl); // 创建标注 并弹出添加标签框
              this.clickMarker = marker;
              map.addOverlay(marker);
              // 让标签置于地图中心
              map.panTo(point);
              this.getMyIcon();
              this.clickMarker.labelId = this.iconId
                ? this.iconId
                : this.locationIconList[0].labelStyleId;
              marker.addEventListener("click", function (e) {
                console.log(e);
                // 将标签置于地图中间
                map.panTo(point);
                that.labelId = e.target.labelId;
                that.iconEdit = !that.iconEdit;
                setTimeout(function () {
                  $(".add-label1").css("display", "block");
                  $(".change-icon-shadow1").css("display", "block");
                }, 500);
                // $(".add-label1").css("margin-top", e.clientY - 390);
                // $(".add-label1").css("margin-left", e.clientX - 250);
                $("#change-icon").css("display", "none");
                $(".change-icon-shadow").css("display", "none");
                console.log(that.iconSrc);
                console.log(that.iconName ? that.iconName : that.createIconName);
                console.log(that.iconMessage);
                that.iconName = labelName;
                that.iconMessage = iconMessage;
                that.iconSrc = that.iconSrc;
                // 取一个接口获取的图标
                // portIcon = dat[i].labelStyleImg;
                // that.iconId = dat[i].labelStyleId;
              });
            } else if (res.code == "000003") {
              alert(res.msg);
            } else if (res.code == "001010") {
              alert("标签创建超出数量");
            }
          });
        }
      },
      // 实时更新地图比例尺大小
      handleScroll() {
        let map = this.map;
        let that = this;
        setTimeout(function () {
          that.plottingScale = map.getZoom();
          // 1:5
          if (that.plottingScale == 12) {
            that.mapSize = 5;
            for (let j = 0; j < that.circle.length; j++) {
              map.removeOverlay(that.circle[j]);
              map.removeOverlay(that.labels[j]);
            }
            let range = 3000;
            // that.drawCircle(that.scaleInfo.smallSize, range);
          }
          // 1:10
          else if (that.plottingScale == 11) {
            that.mapSize = 10;
            for (let j = 0; j < that.circle.length; j++) {
              map.removeOverlay(that.circle[j]);
              map.removeOverlay(that.labels[j]);
            }
            let range = 4000;
            // that.drawCircle(that.scaleInfo.smallSize, range);
          }
          // 1:20
          else if (that.plottingScale == 10) {
            that.mapSize = 20;
            for (let j = 0; j < that.circle.length; j++) {
              map.removeOverlay(that.circle[j]);
              map.removeOverlay(that.labels[j]);
            }
            let range = 7000;
            that.drawCircle(that.scaleInfo.bigSize, range);
          } else {
            for (let j = 0; j < that.circle.length; j++) {
              map.removeOverlay(that.circle[j]);
              map.removeOverlay(that.labels[j]);
            }
          }
        }, 500);
      },
      // 商圈报告接口
      getReports(e) {
        console.log(e);
        let datas = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          reportId: e.target.reportId
        });
        let that = this;
        showBusinessReport(datas).then(res => {
          console.log(res);
          if (res.code == "000001") {
            alert("报告生成中，请稍等");
          } else {
            this.businessReports = res.data;
            let businessBaseData = new Array(3);
            businessBaseData[0] = res.data.villageNum;
            businessBaseData[1] = res.data.officeNum;
            businessBaseData[2] = res.data.gatherGuestsNum;
            this.oneIndustry = res.data.gatherGuests;
            this.twoIndustry = res.data.twoLevelIndustry;
            setTimeout(function () {
              // 获取echart数据
              that.getEcharts(businessBaseData);
              // 绘制饼图
              that.drawPie(res.data.gatherGuests);
              that.paintingPie(res.data.twoLevelIndustry);
            }, 1000);
            // 判断是否有商圈热力图截图
            if (
              res.data.thermodynamicChart == undefined ||
              res.data.thermodynamicChart == null ||
              res.data.thermodynamicChart == ""
            ) {
              // 判断商圈热力图是否开启
              if (that.lookStuats != -1) {
                console.log("开启热力图");
                that.getMapImg(1, e.target.reportId);
              }
            }
          }
        });
      },
      openBusinessItem(item) {
        //console.log(JSON.stringify(item))
        let coordinate = item.coordinates[0];
        console.log(JSON.stringify(coordinate));
        let point = new BMap.Point(coordinate.lng, coordinate.lat);
        this.map.centerAndZoom(point, 16);
      },
      // 生成地图以及热力图功能
      getMap() {
        console.log(this.address);
        console.log(this.rank);
        console.log(this.defaultCitys);
        this.map = new BMap.Map("container", { enableMapClick: false }); // 创建地图实例
        let map = this.map;
        // map.centerAndZoom(new BMap.Point('杭州'), 11);
        // this.point = new BMap.Point("杭州");
        // let point = this.point;
        console.log("curAddress " + this.address);
        map.centerAndZoom(this.address, 13); // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(); // 允许滚轮缩放
        map.addControl(new BMap.ScaleControl()); //比例尺
      },
      // 切换卫星地图
      cutSatellite() {
        let map = this.map;
        let point = this.point;
        if (this.index % 2 == 0) {
          this.map.setMapType(BMAP_NORMAL_MAP);
          this.index++;
        } else {
          this.map.setMapType(BMAP_SATELLITE_MAP);
          this.index++;
        }
      },
      // 测距
      ranging() {
        // 关闭鼠标绘制模式
        if (this.drawingManager) {
          this.drawingManager.close();
        }
        let map = this.map;
        let myDis = new BMapLib.DistanceTool(map);
        this.myDis = myDis;
        this.myDis.open();
      },
      // 鼠标绘制点线面
      drawing(e) {
        let map = this.map;
        let poi = this.point;
        let that = this;
        var overlays = [];
        let datas = e;
        // var size = new BMap.Size(32, 32);
        // var myIcon = new BMap.Icon('../../../static/img/1.png', size);
        // var mk = new BMap.Marker(poi,{icon:myIcon});//创建标注图标
        // map.addOverlay(mk);//将标注添加到地图中
        var overlaycomplete = function (e) {
          overlays.push(e.overlay);
          that.overlays = overlays;
          // for (let i = 0; i < overlays.length; i++) {
          // $(".add-label").css("margin-top", e.overlay.V.offsetTop - 350);
          // $(".add-label").css("margin-left", e.overlay.V.offsetLeft - 250);
          // $("#change-icon").css("margin-top", e.overlay.V.offsetTop - 300);
          // $("#change-icon").css("margin-left", e.overlay.V.offsetLeft - 235);
          // $(".add-label").css("display", "block");
          // $(".add-label-shadow").css("display", "block");
          // }
        };
        var styleOptions = {
          strokeColor: "#027AFF", //边线颜色。
          fillColor: "#027AFF", //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 2, //边线的宽度，以像素为单位。
          strokeOpacity: 1, //边线透明度，取值范围0 - 1。
          fillOpacity: 0.1, //填充的透明度，取值范围0 - 1。
          strokeStyle: "solid" //边线的样式，solid或dashed。
        };
        //实例化鼠标绘制工具
        // BMapGLLib
        var drawingManager = new BMapLib.DrawingManager(map, {
          isOpen: true, //是否开启绘制模式
          enableDrawingTool: false, //是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5) //偏离值
          },
          // 是否启用测距或者侧面积
          enableCalculate: true,
          circleOptions: styleOptions, //圆的样式
          polylineOptions: styleOptions, //线的样式
          polygonOptions: styleOptions, //多边形的样式
          rectangleOptions: styleOptions //矩形的样式
        });
        this.drawingManager = drawingManager;
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener("overlaycomplete", overlaycomplete);
        drawingManager.addEventListener("overlaycomplete", function (e) {
          // 新增热力图点位
          if (datas) {
            that.heatPosition = !that.heatPosition;
            that.newHotPosition = e.overlay.point;
          } else {
            //  创建标注之后的弹框位置
            if (e.drawingMode == "marker") {
              that.iconName = "";
              that.iconMessage = "";
              // $(".add-label").css(
              //   "margin-top",
              //   e.overlay.V.offsetTop - 350 + e.currentTarget._map.offsetY
              // );
              // $(".add-label").css(
              //   "margin-left",
              //   e.overlay.V.offsetLeft - 250 + e.currentTarget._map.offsetX
              // );
              console.log(e.overlay.V);
              console.log(e.overlay.V);
              $("#change-icon").css("margin-top", e.overlay.V.offsetTop - 300);
              $("#change-icon").css("margin-left", e.overlay.V.offsetLeft - 235);
              $(".add-label").css("display", "block");
              $(".add-label-shadow").css("display", "block");
            }
          }
          // 获取删除热力图不精确的点 半径以及中心点
          if (e.overlay.getRadius) {
            that.deleteRadius = e.overlay.getRadius();
            that.deletePoint = e.overlay.point;
            // that.deleteMap = !that.deleteMap;
          }
          if (that.deleteFlag) {
            that.deleteMap = !that.deleteMap;
          }
          // 隐藏面积的值
          if (e.label) {
            e.label.V.style.display = "none";
          }
          that.allAcreage = Math.ceil(e.calculate * 100) / 100;
          // 标注的经纬度
          that.iconPosition = e.overlay.point;
        });
        this.fun = {
          clearAll() {
            for (var i = 0; i < overlays.length; i++) {
              map.removeOverlay(overlays[i]);
            }
            // overlays.length = 0
          }
        };
      },
      // 选择区域
      getArea() {
        this.customizedId = "";
        this.isArea = !this.isArea;
        this.isShowIcon = false;
      },
      // 鼠标绘制矩形、多边形、圆形时的定位
      getShapePosition(point) {
        let that = this;
        var geocoder = new BMap.Geocoder();
        geocoder.getLocation(point, function (res) {
          console.log(res, "r");
          that.createCity = res.addressComponents.city;
          that.createProvince = res.addressComponents.province;
          that.createDistrict = res.addressComponents.district;
        });
      },
      // 画矩形
      rectangle() {
        this.isArea = false;
        this.closingPoint = []; //将闭合点置为空先
        // debugger
        // 关闭鼠标绘制模式
        if (this.drawingManager) {
          this.drawingManager.close();
        }
        // 移除测距功能
        if (this.myDis) {
          this.myDis.close();
        }
        // 设置为矩形
        let that = this;
        this.isPolyLine = false;
        this.closingPoint = [];
        this.drawing();
        this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
        that.drawingManager.addEventListener("rectanglecomplete", function (overlay) {
          // let { overlay } = e;
          //console.log("rect" + calculate);
          // 4个点坐标
          console.log("rect————————————————————————————" ,overlay);
          // console.log("rect" + JSON.stringify(overlay.to));
          // 提供闭合点
          that.closingPoint = overlay.ia;
          console.log(overlay.ia);
          // 传点获取地理位置
          var point = new BMap.Point(overlay.ia[0].lng, overlay.ia[0].lat);
          that.getShapePosition(point);
          if (overlay.ia) {
            setTimeout(function () {
              console.log(that.allAcreage, 1);
              if (that.allAcreage > 30000000) {
                alert("您创建的商圈不能超出3千万平方米的面积");
                that.fun.clearAll();
                that.drawingManager.close();
              } else {
                that.calCenter(overlay.ia, that.map);
                that.getMapImg();
                that.isCreated = true;
                that.shapeStatus = 0;
                //that.getMapImg()
                // setTimeout(function () {
                //   that.getMapImg()
                // },1000);
              }
            }, 500);
          }
        });
      },
      // 画多边形
      polygon() {
        this.isArea = false;
        this.isPolyLine = false;
        this.closingPoint = []; //将闭合点置为空先
        // 关闭鼠标绘制模式
        if (this.drawingManager) {
          this.drawingManager.close();
        }
        // 移除测距功能
        if (this.myDis) {
          this.myDis.close();
        }
        // 设置为多边形
        let that = this;
        this.closingPoint = [];
        this.drawing();
        this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
        this.drawingManager.addEventListener("polygoncomplete", function (
          overlay
        ) {
          // 多边形点坐标
          console.log("overlay" + JSON.stringify(overlay.to));
          // 多边形的闭合点
          //console.log("overlay-ia" + JSON.stringify(overlay.ia));
          that.closingPoint = overlay.ia;
          // 传点获取地理位置
          var point = new BMap.Point(overlay.ia[0].lng, overlay.ia[0].lat);
          that.getShapePosition(point);
          let map = that.map;
          if (overlay.ia) {
            setTimeout(function () {
              if (that.allAcreage > 30000000) {
                alert("您创建的商圈不能超出3千万平方米的面积");
                that.fun.clearAll();
                that.drawingManager.close();
              } else {
                that.calCenter(overlay.ia, map);
                that.getMapImg();
                // setTimeout(function () {
                //   that.getMapImg()
                // },1000);
                that.isCreated = true;
                that.shapeStatus = 1;
              }
            }, 300);
          }
        });
      },
      // 画圆形
      roundness() {
        this.deleteFlag = false;
        this.isPolyLine = false;
        this.isArea = false;
        this.closingPoint = []; //将闭合点置为空先
        // 关闭鼠标绘制模式
        if (this.drawingManager) {
          this.drawingManager.close();
        }
        // 移除测距功能
        if (this.myDis) {
          this.myDis.close();
        }
        // 设置为圆形
        let that = this;
        var map = this.map;
        this.closingPoint = [];
        this.drawing();
        this.drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
        console.log("drawingmanager:", this.drawingManager);
        var label = null;
        var polyline = null;
        map.addEventListener("mousemove", function () {
          if (that.drawingManager._mask != null) {
            that.drawingManager._mask.addEventListener("mousedown", showCirle);
            map.removeEventListener("mousemove", showCirle);
          }
        });
        var centerPoint = null; //圆心
        var showCirle = function (e) {
          if (centerPoint == null) {
            // debugger;
            centerPoint = e.point;
            that.drawingManager._mask.addEventListener("mousemove", showRadius); //showRadius计算画圆的半径，下面将进行讲解
            //将获取的圆心，作为marker点添加再地图上
            var maker = new BMap.Marker(e.point);
            map.addOverlay(maker);
          }
        };
        var showRadius = function (e) {
          var radius = that.drawingManager._map.getDistance(centerPoint, e.point);
          if (!isNaN(radius)) {
            map.removeOverlay(label); //清除上一个显示半径的label标注
            map.removeOverlay(polyline); //清除上一个圆的半径直线
            //添加文字标签
            var opts = {
              position: e.point, // 指定文本标注所在的地理位置（当前鼠标的位置）
              offset: new BMap.Size(5, -15) //设置文本偏移量
            };
            label = new BMap.Label(
              "半径：" + (radius / 1000).toFixed(2) + "公里",
              opts
            ); // 创建文本标注对象
            //文本标注样式
            label.setStyle({
              color: "#438eff",
              //fontSize:'14px',
              fontWeight: "bold",
              border: "0px solid #ccc",
              backgroundColor: "" //#2267AD
            });
            //从圆心画半径
            polyline = new BMap.Polyline([centerPoint, e.point], {
              strokeColor: "red",
              strokeWeight: 2,
              strokeOpacity: 0.5
            }); //后面参数为划线的样式
            map.addOverlay(polyline); //添加半径直线
            map.addOverlay(label); //添加label
          }
        };
        this.drawingManager.addEventListener("circlecomplete", function (overlay) {
          // 4个点坐标
          //console.log(overlay);
          // 中心点
          //console.log(overlay.point);
          that.closingPoint.push(overlay.point);
          // 半径
          //console.log(overlay.getRadius());
          that.radius = overlay.getRadius();
          //console.log(that.radius);
          // 传点获取地理位置
          var point = overlay.point;
          that.getShapePosition(point);
          if (overlay.getRadius()) {
            setTimeout(function () {
              console.log(that.allAcreage);
              if (that.allAcreage > 30000000) {
                alert("您创建的商圈不能超出3千万平方米的面积");
                that.fun.clearAll();
                that.drawingManager.close();
              } else {
                let map = that.map;
                let level = 15;
                if (that.radius > 1500) {
                  level = 14;
                }
                map.centerAndZoom(
                  new BMap.Point(overlay.point.lng, overlay.point.lat),
                  level
                );
                that.getMapImg();
                that.isCreated = true;
                that.shapeStatus = 2;
                // setTimeout(function () {
                //   that.getMapImg();
                // },1000)
              }
            }, 300);
          }
        });
      },
      // 画折线
      brokenLine() {
        this.isArea = false;
        this.isPolyLine = true;
        this.closingPoint = []; //将闭合点置为空先
        // 关闭鼠标绘制模式
        if (this.drawingManager) {
          this.drawingManager.close();
        }
        // 移除测距功能
        if (this.myDis) {
          this.myDis.close();
        }
        // 设置为折线
        let that = this;
        this.drawing();
        this.closingPoint = [];
        this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE);
        this.drawingManager.addEventListener("polylinecomplete", function (
          overlay
        ) {
          console.log(overlay);
          // 2个点坐标
          // 传点获取地理位置
          var point = overlay.getPath()[0];
          // console.log(point,'poitn')
          that.getShapePosition(point);
          that.closingPoint = overlay.getPath();
          if (overlay.getPath()) {
            that.shapeStatus = 3;
            that.getMapImg();
            that.isCreated = true;
          }
        });
      },

      // 点击显示城市列表数据
      getCity() {
        this.isCity = !this.isCity;
      },
      // 点击省份
      province() {
        this.isProvince = false;
      },
      // 获取标签
      selectIndustry(e) {
        //console.log(e.target.value);
        // 获取标签类目名称
        this.iconName = e.target.value;
        this.createIconName = e.target.value;
      },
      // 点击城市
      city() {
        this.isProvince = true;
      },
      calCenter(points, map) {
        let alllng = 0,
          alllat = 0;
        let len = points.length;
        for (let i = 0; i < points.length; i++) {
          alllng += points[i].lng;
          alllat += points[i].lat;
        }

        let center = new BMap.Point(alllng / len, alllat / len);
        let dis = 0;
        for (let i = 0; i < points.length; i++) {
          let point = points[0];
          let curDis = Math.sqrt(
            Math.pow(alllng / len - point.lng, 2) +
            Math.pow(alllat / len - point.lat, 2)
          );
          dis = curDis > dis ? curDis : dis;
        }

        let level = 15;
        if (dis > 1500) {
          level = 14;
        }
        map.centerAndZoom(center, level);
      },
      // 获取热门城市
      getHotCity(e) {
        // 改变城市地点以及地图级别
        if (this.hotList[e].name == "全国") {
          this.address = "全国";
          this.rank = 5;
          this.isNationwide = true;
        } else {
          this.address = this.hotList[e].name;
          this.rank = 10;
          this.isNationwide = false;
        }
      },
      // 点击字母跳转省份
      getInitial(e) {
        console.log(this.provinceCity.acronym[e].initial);
        let initial = this.provinceCity.acronym[e].initial;

        if (initial == "港澳") {
          $(".city-list").animate({ scrollTop: 1829 }, 800);
        } else {
          $(".city-list").animate(
            { scrollTop: document.querySelector(`#${initial}`).offsetTop - 200 },
            800
          );
        }
      },
      // 点击字母跳转城市
      toCitys(e) {
        console.log(e);
        let initial = this.citys.acronym[e];
        $(".city-list").animate(
          { scrollTop: document.querySelector(`#${initial}`).offsetTop - 200 },
          800
        );
      },
      // 点击省份规划内容
      getProvince(e) {
        let map = this.map;
        var bdary = new BMap.Boundary();
        bdary.get(e, function (rs) {
          //获取行政区域
          map.clearOverlays(); //清除地图覆盖物
          var count = rs.boundaries.length; //行政区域的点有多少个
          if (count === 0) {
            alert("当前输入行政区域未找到");
            return;
          }
          var pointArray = [];
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 2,
              strokeColor: "#ff0000",
              fillColor: "",
              fillOpacity: 0
            }); //建立多边形覆盖物
            map.addOverlay(ply); //添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
          }
          map.setViewport(pointArray); //调整视野
        });
      },
      // 获取输入框的内容
      getName() {
        let name = this.$refs.cityName.value;
        this.getProvince(name);
      },
      // 省份下的跳转城市
      toCity(e) {
        let name = e;
        this.address = name;
        this.rank = 10;
      },
      // 城市下的跳转城市
      goCity(e) {
        let name = e;
        this.address = name;
        this.rank = 10;
      },
      // 跳转默认城市
      nowCity() {
        this.address = this.defaultCitys;
        this.rank = 10;
      },
      // 设为默认城市
      defaultCity() {
        let that = this;
        var myGeo = new BMap.Geocoder();
        myGeo.getPoint(this.address, function (point) {
          console.log(point);
          let datas = JSON.stringify({
            userId: that.userInfo.userId,
            token: that.userInfo.token,
            lng: point.lng.toString(),
            lat: point.lat.toString(),
            brandId: that.brandId,
            city: that.address
          });
          defaultAddress(datas).then(res => {
            console.log(res);
            if (res.code == "000000") {
              that.isDefault = true;
              that.defaultCitys = that.address;
            }
          });
        });
      },
      // 删除默认城市
      noDefault() {
        this.isDefault = false;
      },
      // 创建商圈的商圈等级选择
      sureRadio() {
        this.tradingArea = 0;
      },
      sureRadios() {
        this.tradingArea = 1;
      },
      sureRadioes() {
        this.tradingArea = 2;
      },
      // 编辑商圈的商圈等级选择
      sureRadio1() {
        // 下标定为0
        console.log(0);
        this.tradingAreaGrand = 0;
      },
      sureRadio2() {
        //  下标定为1
        console.log(11);
        this.tradingAreaGrand = 1;
      },
      sureRadio3() {
        //  下标定为2
        console.log(2);
        this.tradingAreaGrand = 2;
      },
      // 创建的 未开开关
      createOnOff() {
        console.log(this.offOpen);
        if (this.offOpen == true) {
          this.businessOpen = 1;
        } else {
          this.businessOpen = 0;
        }
      },
      //创建的 未售开关
      createOffOn() {
        console.log(this.offSale);
        if (this.offSale == true) {
          this.businessUnsold = 1;
        } else {
          this.businessUnsold = 0;
        }
      },
      //编辑的 未售开关
      onOff(e) {
        // 状态值
        console.log(this.value1);
        // this.value1 = !this.value1;
        if (this.value1 == true) {
          this.businessOpen = 1;
        } else {
          this.businessOpen = 0;
        }
      },
      // 编辑的 未开开关
      offOn(e) {
        // 状态值
        // this.value2 = !this.value2;
        console.log(this.value2);
        if (this.value2 == true) {
          this.businessUnsold = 1;
        } else {
          this.businessUnsold = 0;
        }
      },
      // 关闭商圈
      closeStore() {
        this.isCreated = false;
        this.fun.clearAll();
        this.drawingManager.close();
        this.tradingAreaName = "";
        this.tradingAreaDescribe = "";
        this.tradingArea = 0;
        this.value1 = false;
        this.value2 = false;
        this.closingPoint = [];
      },
      // 立即创建
      createStore() {
        console.log(this.customizedId);
        console.log(this.screenshotImg, "screenshotImg");
        console.log(this.customizedObj);
        if (this.shapeStatus == 2) {
          if (this.closingPoint.length > 1) {
            this.netWork = true;
            return;
          }
        } else {
          this.radius = "";
        }
        if (this.allAcreage > 30000000) {
          return false;
        }
        if (this.tradingAreaName && this.tradingAreaDescribe) {
          let that = this;
          let map = this.map;
          if (localStorage.getItem("sonId" != "")) {
            this.sonId = localStorage.getItem("sonId");
          }
          let dats = JSON.stringify({
            userId: this.userInfo.userId,
            token: this.userInfo.token,
            memberLevel: this.userInfo.memberLevel,
            brandId: this.brandId,
            coordinates: this.closingPoint,
            businessType: this.shapeStatus,
            businessName: this.tradingAreaName,
            businessDescribe: this.tradingAreaDescribe,
            businessLevel: this.tradingArea,
            businessOpen: this.businessOpen,
            businessUnsold: this.businessUnsold,
            radius: this.radius,
            screenshotImg: this.screenshotImg,
            thermodynamicChart: "",
            businessArea: this.allAcreage
              ? this.allAcreage
              : this.customizationArea,
            province: this.createProvince,
            city: this.createCity,
            district: this.createDistrict,
            customizedId: this.customizedId,
            sonId: this.sonId
          });
          createBusinessZone(dats).then(res => {
            console.log(res);
            if (res.code == "000000") {
              that.closingPoint = [];
              that.tradingAreaName = "";
              that.tradingAreaDescribe = "";
              that.tradingArea = 0;
              that.businessOpen = 0;
              that.businessUnsold = 0;
              that.value1 = false;
              that.value2 = false;
              that.offSale = false;
              that.offOpen = false;
              that.radius = "";
              that.screenshotImg = "";
              that.thermodynamicChart = "";
              that.isCreated = !that.isCreated;
              if (that.customizedObj) {
                map.removeOverlay(that.customizedObj);
                map.removeOverlay(that.label);
              } else {
                that.fun.clearAll();
                that.drawingManager.close();
              }
              that.initializeBusiness();
              that.getBusinessSum();
              // 画完商圈，展示商圈
              that.isValue = true;
              that.showAll();
            } else if (res.code == "001010") {
              alert("商圈创建超出数量");
            } else if (res.code == "000003") {
              alert(res.msg);
            }
          });
        } else {
          alert("请填写商圈名称以及商圈描述");
        }
      },
      yesWork() {
        this.netWork = false;
        window.location.reload();
      },
      cancelWork() {
        this.netWork = false;
      },
      // 创建标签
      createPoint() {
        // 移除测距功能
        if (this.myDis) {
          this.myDis.close();
        }
        this.drawing();
        let map = this.map;
        let that = this;
        this.drawingManager.addEventListener("overlaycomplete", function (e) {
          if (e.drawingMode == "marker") {
            // 移除原生的marker
            map.removeOverlay(e.overlay.Bc);
            let poin = e.overlay.point; // 修改marker图标
            var pt = new BMap.Point(poin.lng, poin.lat);
            that.myIcon = new BMap.Icon(that.iconSrc, new BMap.Size(35, 45));
            var marker = new BMap.Marker(pt, {
              icon: that.myIcon
            });
            console.log(that.myIcon.imageUrl); // 创建标注 并弹出添加标签框
            map.addOverlay(marker);
            // 让标签置于地图中心
            map.panTo(point);
            that.clickMarker = marker;
            map.removeOverlay(e.overlay.Bc);
            // 关闭鼠标绘制模式
            that.drawingManager.close();
            //鼠标悬浮时获取该店的属性，修改图标时要用
            marker.addEventListener("mouseover", function () {
              that.clickMarker = this;
            });
            //点击打开添加标签页面
            // setTimeout(function() {
            //   console.log($(".add-label-shadow"));
            //   $(".add-label-shadow").css("display", "block");
            // }, 1000);
            marker.addEventListener("click", e => {
              console.log(e);
              console.log(marker);
              // 修改标签前回显数据
              let data = JSON.stringify({
                userId: that.userInfo.userId,
                token: that.userInfo.token,
                labelId: marker.labelId
              });
              selectLabelById(data).then(res => {
                console.log(res);
                that.iconName = res.data.labelName;
                thst.iconMessage = res.data.labelRemarks;
                that.iconSrc = res.data.labelStyleImg;
              });
              $(".add-label").css("display", "block");
              $(".add-label-shadow").css("display", "block");
              // $(".add-label").css("margin-top", e.clientY - 390);
              // $(".add-label").css("margin-left", e.clientX - 250);
              $("#change-icon").css("display", "none");
              $(".change-icon-shadow").css("display", "none");
            });
          }
        });
      },
      // 请求图标样式接口
      getIconimg() {
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token
        });
        showLabelStyle(data).then(res => {
          console.log(res);
          this.locationIconList = res.data;
          this.iconSrc = res.data[0].labelStyleImg;
        });
      },
      // 关闭标签窗口
      closeAdd() {
        $(".add-label").css("display", "none");
        $(".add-label-shadow").css("display", "none");
        let map = this.map;
        map.removeOverlay(this.clickMarker);
        this.drawingManager.close();
      },
      //前往修改图标
      toUpdateIcon(e) {
        console.log(e);
        $(".add-label").css("display", "none");
        $(".add-label-shadow").css("display", "none");
        $("#change-icon").css("display", "block");
        $(".change-icon-shadow").css("display", "block");
        $("#change-icon").css("margin-top", e.clientY - 280);
        $("#change-icon").css("margin-left", e.clientX - 90);
      },
      //关闭修改图标页面
      closeIcon() {
        if (this.iconEdit == false) {
          $("#change-icon").css("display", "none");
          $(".change-icon-shadow").css("display", "none");
          $(".add-label").css("display", "block");
          $(".add-label-shadow").css("display", "block");
        } else if (this.iconEdit == true) {
          $("#change-icon").css("display", "none");
          $(".change-icon-shadow").css("display", "none");
          $(".add-label1").css("display", "block");
          $(".change-icon-shadow1").css("display", "block");
        }
      },
      //选择要修改的图标
      chooseIcon(it) {
        console.log(this.iconSrc);
        this.formerIcon = this.iconSrc;
        console.log(this.clickMarker);
        $("#change-icon").css("display", "none"); //it是修改图标页面点击某个图标传过来的
        $(".change-icon-shadow").css("display", "none");
        console.log(it.labelStyleImg);
        this.iconSrc = it.labelStyleImg; //重新渲染点的图标
        // 获取标签ID
        this.iconId = it.labelStyleId;
        var pointAIcon2 = new BMap.Icon(this.iconSrc, new BMap.Size(16, 22)); //当前图标改变
        this.clickMarker.setIcon(pointAIcon2);
        if (this.iconEdit == true) {
          $(".add-label1").css("display", "block");
          $(".change-icon-shadow1").css("display", "block");
        } else {
          $(".add-label").css("display", "block");
          $(".add-label-shadow").css("display", "block");
        }
      },
      // 显示隐藏展示内容
      showIcon() {
        this.isShowIcon = !this.isShowIcon;
        this.isArea = false;
      },
      // 显示隐藏热力图列表
      showHotMap() {
        // 关闭鼠标绘制模式
        if (this.drawingManager) {
          this.drawingManager.close();
        }
        // 移除测距功能
        if (this.myDis) {
          this.myDis.close();
        }
        this.isHotmap = !this.isHotmap;
        this.isShowIcon = !this.isShowIcon;
      },
      // 关闭热力图列表
      closeHotList() {
        this.isHotmap = !this.isHotmap;
      },
      // 热力图开启
      openHeatmap(e, index) {
        console.log(e, "e");
        console.log(this.lookStuats, "this.lookStuats");
        console.log(index, "index");
        let that = this;
        this.hotType = e.heatType;
        this.heatMapId = e.heatMapId;
        this.hotIndex = index;
        // if (this.userInfo.memberLevel < 1) {
        //   this.toVip();
        // } else {
        if (this.lookStuats == index) {
          console.log("关闭热力图");
          that.closeHeatmap();
          that.lookStuats = -1;
          this.hotType = "";
        } else {
          this.lookStuats = index;
          // 调用热力图接口请求数据
          let datas = JSON.stringify({
            heatMapId: e.heatMapId,
            heatType: e.heatType.toString(),
            userId: this.userInfo.userId,
            token: this.userInfo.token,
            city: this.address
          });
          showThermodynamic(datas).then(res => {
            if (res.code == "000000") {
              let map = this.map;
              var points = [];
              map.removeOverlay(this.heatmapOverlay);
              for (let i = 0; i < res.data.length; i++) {
                points.push(res.data[i]);
              }
              // 热力图
              // 需要显示的经纬度以及数量
              if (!isSupportCanvas()) {
                alert(
                  "热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~"
                );
              }
              this.heatmapOverlay = new BMapLib.HeatmapOverlay({
                radius: 20,
                visible: true
              });
              map.addOverlay(this.heatmapOverlay);
              // 设置热力图层级
              this.heatmapOverlay.V.style.zIndex = -1;
              console.log(points, "dfdsfsfasfsaf");
              this.heatmapOverlay.setDataSet({ data: points, max: 100 });
              this.closeHeatmap();
              //判断浏览区是否支持canvas
              function isSupportCanvas() {
                var elem = document.createElement("canvas");
                return !!(elem.getContext && elem.getContext("2d"));
              }
              // 按钮
              this.heatmapOverlay.show();
            } else if (res.code == "001013") {
              this.isVip = true;
            } else {
              alert(res.msg);
            }
          });
        }
      },
      // 热力图开关接口
      switchHotMap(e) {
        let datas = JSON.stringify({
          heatMapId: e.heatMapId,
          heatType: e.heatType.toString(),
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          city: this.address
        });
        showThermodynamic(datas).then(res => {
          console.log(res);
          let map = this.map;
          var points = [];
          map.removeOverlay(this.heatmapOverlay);
          for (let i = 0; i < res.data.length; i++) {
            points.push(res.data[i]);
          }
          // 热力图
          // 需要显示的经纬度以及数量
          if (!isSupportCanvas()) {
            alert(
              "热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~"
            );
          }
          this.heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 20 });
          map.addOverlay(this.heatmapOverlay);
          // 设置热力图层级
          this.heatmapOverlay.V.style.zIndex = -1;
          this.heatmapOverlay.setDataSet({ data: points, max: 100 });
          this.closeHeatmap();
          //判断浏览区是否支持canvas
          function isSupportCanvas() {
            var elem = document.createElement("canvas");
            return !!(elem.getContext && elem.getContext("2d"));
          }
          // 按钮
          this.heatmapOverlay.show();
        });
      },
      // 关闭热力图
      closeHeatmap() {
        this.heatmapOverlay.hide();
      },
      // 无权限查看热力图
      toVip() {
        this.isVip = !this.isVip;
      },
      // 关闭会员弹框
      closeVip() {
        this.isVip = !this.isVip;
      },
      // 展示我的标签
      toMyicon() {
        // 关闭鼠标绘制模式
        if (this.drawingManager) {
          this.drawingManager.close();
        }
        // 移除测距功能
        if (this.myDis) {
          this.myDis.close();
        }
        this.isMyicon = !this.isMyicon;
        this.isShowIcon = !this.isShowIcon;
      },
      // 关闭我的标签
      closeMyicon() {
        this.isMyicon = !this.isMyicon;
      },
      // 查看标签
      lookIcon(e, index) {
        console.log(index);
        console.log(e);
        let map = this.map;
        let iconName = [];
        let that = this;
        let _labelList = this.iconList;
        iconName.push(e);
        let iconIndex = index;
        let datas = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          brandId: this.brandId,
          labelName: iconName,
          isAll: 1
        });
        showLabel(datas).then(res => {
          console.log(res);
          let dat = res.data.labelAll;
          _labelList.labelName.map((el,i)=>{
            dat.map((_el,_i)=>{
              if(_el.labelId===el.labelId){
                el.type = !el.type;
              }
            })
          })
          for (let i = 0; i < dat.length; i++) {
            let point = new BMap.Point(
              dat[i].coordinate.lng,
              dat[i].coordinate.lat
            );
            var myIcon = new BMap.Icon(
              dat[i].labelStyleImg,
              new BMap.Size(35, 45)
            );
            var marker = new BMap.Marker(point, {
              icon: myIcon
            });
            marker.labelId = dat[i].labelId;
            marker.labelName = dat[i].labelName;
            // this.map.addOverlay(marker);
            that.clickMarker = marker;
            // 新增的内容  控制标签的显示隐藏

            // debugger
            // 这段代码好好看看
            console.log("this.iconList.labelName[iconIndex]1____________",this.iconList.labelName)
            console.log("this.iconList.labelName[iconIndex]2______________",this.iconList.labelName[iconIndex])
            if (this.iconList.labelName[iconIndex].type == false) {
              // this.iconList.labelName[iconIndex].type = false;
              for (var i = 0, vlen = this.iconarrList.length; i < vlen; i++) {
                if (this.iconarrList[i] == iconIndex) {
                  console.log(i);
                  map.removeOverlay(this.iconArray[i]);
                }
              }
              $(".change-icon-shadow1").css("display", "none");
              $(".add-label1").css("display", "none");
              that.iconEdit = !that.iconEdit;
            } else if (this.iconList.labelName[iconIndex].type == true) {
              // this.iconList.labelName[iconIndex].type = true;
              // console.log(marker);
              map.addOverlay(marker);
              this.iconArray.push(marker);
              this.iconarrList.push(iconIndex);
              // console.log("asdasdasd——————————————————————",this.iconArray);
            }



            //鼠标经过坐标点显示标题
            // 鼠标经出坐标点隐藏标题
            // var optes = {
            //   position: that.clickMarker.point, //相对于point的偏移量
            //   offset: new BMap.Size(-15, -35)
            // };
            // var labelIcon = new BMap.Label(marker.labelName, optes);
            marker.addEventListener("mouseout", function () {
              // 鼠标经过显示标签名称
              console.log(this);
              iconName(this, 0);
              // map.removeOverlay(that.abc);
            });
            marker.addEventListener("mouseover", function () {
              console.log(this);
              that.clickMarker = this;
              // 鼠标经过显示标签名称
              // map.addOverlay(that.abc);
              iconName(this, 1);
            });
            marker.addEventListener("click", function (e) {
              console.log(e);
              // 将标签置于地图中间
              map.panTo(point);
              that.labelId = e.target.labelId;
              that.iconEdit = !that.iconEdit;
              setTimeout(function () {
                $(".add-label1").css("display", "block");
                $(".change-icon-shadow1").css("display", "block");
              }, 500);
              // $(".add-label1").css("margin-top", e.clientY - 390);
              // $(".add-label1").css("margin-left", e.clientX - 250);
              $("#change-icon").css("display", "none");
              $(".change-icon-shadow").css("display", "none");
              that.iconName = dat[i].labelName;
              that.iconMessage = dat[i].labelRemarks;
              that.iconSrc = dat[i].labelStyleImg;
              // 取一个接口获取的图标
              // portIcon = dat[i].labelStyleImg;
              that.iconId = dat[i].labelStyleId;
            });
          }
          this.iconList = _labelList;
          function iconName(e, num) {
            console.log("iconName" + e);
            console.log("iconName" + num);
            if (num == 0) {
              map.removeOverlay(that.diffculty);
            } else {
              var optes = {
                position: e.point, //相对于point的偏移量
                offset: new BMap.Size(-15, -35)
              };
              var labelIcon = new BMap.Label(e.labelName, optes);
              that.diffculty = labelIcon;
              map.addOverlay(that.diffculty);
            }
          }
        });
      },
      // 查看我的商圈
      toMystore() {
        // 关闭鼠标绘制模式
        if (this.drawingManager) {
          this.drawingManager.close();
        }
        // 移除测距功能
        if (this.myDis) {
          this.myDis.close();
        }
        this.isMystore = !this.isMystore;
        this.isShowIcon = !this.isShowIcon;
      },
      // 关闭我的商圈
      closeMystore() {
        this.isMystore = !this.isMystore;
      },
      // 删除编辑商圈
      deleteBusinessEdit() {
        let that = this;
        let datas = JSON.stringify({
          businessId: this.businessId,
          brandId: this.brandId,
          userId: this.userInfo.userId,
          token: this.userInfo.token
        });
        let res = window.confirm("确定要删除么？");
        if (!res) {
          return;
        }
        deleteBusinessZone(datas).then(res => {
          console.log(res);
          if (res.code == "000000") {
            $(".edit-shadow").css("display", "none");
            $(".create-circle").css("display", "none");
            that.tradingAreaName = "";
            that.tradingAreaDescribe = "";
            that.value1 = false;
            that.value2 = false;
            that.tradingAreaGrand = 0;
            that.initializeBusiness();
            // 画完商圈，展示商圈
            that.isValue = true;
            that.showAll();
          }
        });
      },
      // 关闭编辑商圈弹框
      closeBusinessEdit() {
        $(".edit-shadow").css("display", "none");
        $(".create-circle").css("display", "none");
        this.tradingAreaName = "";
        this.tradingAreaDescribe = "";
        this.value1 = false;
        this.value2 = false;
        this.tradingAreaGrand = 0;
        // $("#paixu1").attr("checked", "checked");
      },
      // 确认编辑商圈弹框
      sureBusinessEdit() {
        let that = this;
        console.log(this.businessClickType);
        console.log(this.tradingAreaGrand);
        console.log(this.businessUnsold);
        console.log(this.businessOpen);
        let dats = JSON.stringify({
          businessId: this.businessId,
          token: this.userInfo.token,
          userId: this.userInfo.userId,
          businessType: this.businessClickType,
          businessName: this.tradingAreaName,
          businessLevel: this.tradingAreaGrand.toString(),
          businessDescribe: this.tradingAreaDescribe,
          businessUnsold: this.value1 == true ? "1" : "0".toString(),
          businessOpen: this.value2 == true ? "1" : "0".toString()
        });
        updateBusinessZone(dats).then(res => {
          console.log(res);
          if (res.code == "000000") {
            $(".edit-shadow").css("display", "none");
            $(".create-circle").css("display", "none");
            that.tradingAreaName = "";
            that.tradingAreaDescribe = "";
            that.value1 = false;
            that.value2 = false;
            that.tradingAreaGrand = 0;
            that.initializeBusiness();
          } else if (res.code == "000003") {
            alert(res.msg);
          }
        });
      },
      // 展示商圈的弹框（编辑和商圈报告）
      getBusinessEdit(
        reportId,
        businessType,
        businessId,
        businessUnsold,
        businessOpen,
        coordinates,
        radius,
        thermodynamicChart
      ) {
        if (reportId.target.customizedId) {
          console.log(reportId.target.customizedId);
          this.customizedObj = reportId.target;
          this.customizedId = reportId.target.customizedId;
        }
        // 计算多边形、矩形的面积
        let path = reportId.target.coordinates;
        var rads = 6371009;
        var len = path.length;
        var total = 0;
        var prev = path[len - 1];
        var prevTanLat = Math.tan((Math.PI / 2 - (prev.lat / 180) * Math.PI) / 2);
        var prevLng = (prev.lng / 180) * Math.PI;
        var polarTriangleArea = function (tan1, lng1, tan2, lng2) {
          //计算图形面积2
          var deltaLng = lng1 - lng2;
          var t = tan1 * tan2;
          return (
            2 * Math.atan2(t * Math.sin(deltaLng), 1 + t * Math.cos(deltaLng))
          );
        };
        for (var i in path) {
          var tanLat = Math.tan(
            (Math.PI / 2 - (path[i].lat / 180) * Math.PI) / 2
          );
          var lng = (path[i].lng / 180) * Math.PI;
          total += polarTriangleArea(tanLat, lng, prevTanLat, prevLng);
          prevTanLat = tanLat;
          prevLng = lng;
        }
        if (reportId.target.radius) {
          console.log("圆");
          // 圆的面积
          this.radius = reportId.target.radius;
          this.customizationArea =
            Math.PI * reportId.target.radius * reportId.target.radius;
        } else {
          // 多边形、矩形的面积
          this.customizationArea = Math.abs(total * (rads * rads));
        }
        // 传点获取地理位置
        var point = new BMap.Point(reportId.point.lng, reportId.point.lat);
        this.getShapePosition(point);
        //获取各点的经纬度
        var maxLat = 0;
        var ind = 0;
        let that = this;
        let map = this.map;
        // 获取的实例
        let example = reportId.target;
        for (var i = 0; i < example.getPath().length; i++) {
          if (example.getPath()[i].lat > maxLat) {
            maxLat = example.getPath()[i].lat;
            ind = i;
          }
        }
        //获取四个点中最大的纬度
        var point = new BMap.Point(
          example.getPath()[ind].lng,
          example.getPath()[ind].lat
        );
        var opts = {
          position: point, //相对于point的偏移量
          offset: new BMap.Size(-200, -70)
        };
        // 创建文本标注对象
        if (businessType) {
          that.label = new BMap.Label(
            `<div class="polygon-opt" style=" width: 388px;height:30px;line-height:30px;padding-top:10px;;padding-bottom:10px;
              background: rgba(255, 255, 255, 1);border-radius: 10px;"><div class="polygon-btn" style="  display:
      flex;justify-content: space-around;font-size: 14px;
              font-family: PingFang-SC-Medium, PingFang-SC;font-weight: 500; color: rgba(96, 96, 96, 1);">
              <div class="edit" style=" width:97px;text-align:center; cursor: pointer;">编辑</div>
              <div class="report" style=" cursor: pointer;border-left:solid 1px #EBEBEB;border-right:solid 1px #EBEBEB;
      width:97px;text-align:center">商圈报告</div>
              <div style="border-right:solid 1px #EBEBEB; width:97px;text-align:center">` +
            `${businessUnsold == "0" ? "未售" : "已售"}` +
            `</div>
              <div style=" width:97px;text-align:center">` +
            `${businessOpen == "0" ? "未开" : "已开"}` +
            `</div>
              </div>
              </div>`,
            opts
          );
        }

        console.log("businessType" + businessType);
        if (!businessType) {
          that.label = new BMap.Label(
            `<div class="polygon-opt" style=" width: 388px;height:30px;line-height:30px;padding-top:10px;;padding-bottom:10px;
         background: rgba(255, 255, 255, 1);border-radius: 10px;"><div class="polygon-btn" style="  display:
flex;justify-content: space-around;font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;font-weight: 500; color: rgba(96, 96, 96, 1);">
        <div class="edit" style=" width:97px;text-align:center; cursor: pointer;">编辑</div>
        </div>
        </div>`,
            opts
          );
        }

        that.label.setStyle({
          borderColor: "white",
          borderRadius: "10px"
        });
        map.addOverlay(that.label);
        //点击编辑
        $(".edit").click(function () {
          if (!businessId) {
            // 移除编辑、商圈报告弹框
            map.removeOverlay(that.label);
            // 调用截图功能
            that.getMapImg();
            that.isCreated = !that.isCreated;
            that.shapeStatus = reportId.target.businessType;
            that.closingPoint = reportId.target.coordinates;
            that.radius = reportId.target.radius ? reportId.target.radius : "";
          } else {
            console.log("编辑");
            map.removeOverlay(that.label);
            that.businessId = businessId;
            if (!businessType) {
              that.isPolyLine = true;
            } else {
              that.isPolyLine = false;
            }
            console.log(that.isPolyLine, "111111that.isPolyLine");
            $(".edit-shadow").css("display", "block");
            $(".create-circle").css("display", "block");
            // 调用编辑回显接口
            let data = JSON.stringify({
              userId: that.userInfo.userId,
              token: that.userInfo.token,
              businessId: businessId
            });
            showBusinessZoneById(data).then(res => {
              console.log(res);
              if (res.code == "000000") {
                that.businessClickType = res.data.businessType;
                that.tradingAreaName = res.data.businessName;
                that.tradingAreaDescribe = res.data.businessDescribe;
                that.value1 = res.data.businessUnsold == "0" ? false : true;
                that.value2 = res.data.businessOpen == "0" ? false : true;
                if (res.data.businessLevel == "1") {
                  that.tradingAreaGrand = 1;
                } else if (res.data.businessLevel == "2") {
                  that.tradingAreaGrand = 2;
                } else if (res.data.businessLevel == "0") {
                  that.tradingAreaGrand = 0;
                }
              }
            });
          }
        });
        //点击商圈报告
        $(".report").click(function () {
          console.log(thermodynamicChart);
          if (businessId) {
            // 移除编辑、商圈报告弹框
            map.removeOverlay(that.label);
            // 调用商圈报告接口
            that.getReports(reportId);
            that.businessReportId = reportId.target.reportId;
            that.isReport = true;
            //   that.isReport = !that.isReport;
            console.log("商圈报告");
          }
        });
      },
      // 显示隐藏商圈的名称
      showHiddenBusiness(point, name, businessType) {
        console.log(point);
        console.log(name);
        console.log(businessType);
        let map = this.map;
        var optes = {
          position: point[0], //相对于point的偏移量
          offset: new BMap.Size(-15, -35)
        };
        var labelIcon = new BMap.Label(name, optes);
        businessType.addEventListener("mouseout", function () {
          map.removeOverlay(labelIcon);
        });
        businessType.addEventListener("mouseover", function () {
          // 鼠标经过显示标签名称
          map.addOverlay(labelIcon);
        });
      },
      // 请求我的商圈显示商圈列表接口
      myBusinessData() {
        let map = this.map;
        var overlaySum = map.getOverlays();
        let datas = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          brandId: this.brandId,
          businessOpen: this.isOpen == false ? 0 : 1,
          businessUnsold: this.isSale == false ? 0 : 1,
          all: this.isValue == false ? 0 : 1,
          cityName: this.address
        });
        showBusinessZone(datas).then(res => {
          console.log(res);
          if (typeof res.data == "string") {
            // map.clearOverlays();
            for (let i = 0; i < overlaySum.length; i++) {
              if (overlaySum[i].heatmap) {
              } else {
                map.removeOverlay(overlaySum[i]);
              }
            }
          } else if (res.code == "001011") {
            alert(res.msg);
            for (let i = 0; i < overlaySum.length; i++) {
              if (overlaySum[i].heatmap) {
              } else {
                map.removeOverlay(overlaySum[i]);
              }
            }
          } else if (res.code == "000000") {
            let allData = res.data;
            let that = this;
            for (var i = 0; i < allData.length; i++) {
              // 显示矩形
              if (allData[i].businessType == 0) {
                var arrs = [];
                for (var j = 0; j < allData[i].coordinates.length; j++) {
                  arrs.push(
                    new BMap.Point(
                      allData[i].coordinates[j].lng,
                      allData[i].coordinates[j].lat
                    )
                  );
                }
                // 商圈边框的样式
                let opts = {
                  strokeColor:
                    allData[i].businessLevel == "0"
                      ? "#4CCF7B"
                      : allData[i].businessLevel == "1"
                        ? "#FCCE45"
                        : "#E60B0E", //边线颜色
                  fillColor: "#027AFF", //填充颜色。当参数为空时，折线覆盖物将没有填充效果
                  strokeWeight: 3, //边线的宽度，以像素为单位
                  strokeOpacity: 1, //边线透明度，取值范围0 - 1
                  fillOpacity: 0.1, //填充的透明度，取值范围0 - 1
                  strokeStyle: "solid", //边线的样式，solid或dashed
                  enableMassClear: true, //是否在调用map.clearOverlays清除此覆盖物，默认为true
                  enableEditing: false, //是否启用线编辑，默认为false
                  enableClicking: true //是否响应点击事件，默认为true
                };
                let rectangle = new BMap.Polygon(arrs, opts);
                that.orthogonNew = rectangle;
                rectangle.reportId = allData[i].reportId;
                rectangle.businessId = allData[i].businessId;
                rectangle.businessOpen = allData[i].businessOpen;
                rectangle.businessUnsold = allData[i].businessUnsold;
                rectangle.businessType = allData[i].businessType;
                rectangle.coordinates = allData[i].coordinates;
                rectangle.customizedId = allData[i].customizedId;
                rectangle.businessName = allData[i].businessName;
                rectangle.thermodynamicChart = allData[i].thermodynamicChart;
                map.addOverlay(that.orthogonNew, opts);
                console.log(that.orthogonNew);
                // 监听矩形的商圈 展示商圈报告
                rectangle.addEventListener("click", function (e) {
                  map.removeOverlay(that.label);
                  console.log(e);
                  // 商圈报告ID
                  let reportId = e;
                  let businessType = rectangle;
                  // 商圈id
                  let businessId = e.target.businessId;
                  // 已售未收状态
                  let businessUnsold = e.target.businessUnsold;
                  // 已开未开状态
                  let businessOpen = e.target.businessOpen;
                  // 闭合点经纬度
                  let coordinates = e.target.coordinates;
                  // 商圈热力图截图
                  let thermodynamicChart = e.target.thermodynamicChart;
                  // 传递的参数 商圈类型  商圈报告ID
                  that.getBusinessEdit(
                    reportId,
                    businessType,
                    businessId,
                    businessUnsold,
                    businessOpen,
                    coordinates,
                    thermodynamicChart
                  );
                  console.log(e.target.coordinates);
                  console.log(e.target.businessName);
                  console.log(businessType);
                  // 调用显示隐藏商圈名称
                  that.showHiddenBusiness(
                    e.target.coordinates,
                    e.target.businessName,
                    e.target
                  );
                });
              }
              // 显示多边形
              if (allData[i].businessType == 1) {
                let opts = {
                  strokeColor:
                    allData[i].businessLevel == "0"
                      ? "#4CCF7B"
                      : allData[i].businessLevel == "1"
                        ? "#FCCE45"
                        : "#E60B0E", //边线颜色
                  fillColor: "#027AFF", //填充颜色。当参数为空时，折线覆盖物将没有填充效果
                  strokeWeight: 3, //边线的宽度，以像素为单位
                  strokeOpacity: 1, //边线透明度，取值范围0 - 1
                  fillOpacity: 0.1, //填充的透明度，取值范围0 - 1
                  strokeStyle: "solid", //边线的样式，solid或dashed
                  enableMassClear: true, //是否在调用map.clearOverlays清除此覆盖物，默认为true
                  enableEditing: false, //是否启用线编辑，默认为false
                  enableClicking: true //是否响应点击事件，默认为true
                };
                var array = [];
                for (let k = 0; k < allData[i].coordinates.length; k++) {
                  array.push(
                    new BMap.Point(
                      allData[i].coordinates[k].lng,
                      allData[i].coordinates[k].lat
                    )
                  );
                }
                var polygon = new BMap.Polygon(array, opts);
                that.rectangleNew = polygon;
                map.addOverlay(that.rectangleNew);
                polygon.reportId = allData[i].reportId;
                polygon.businessId = allData[i].businessId;
                polygon.businessOpen = allData[i].businessOpen;
                polygon.businessUnsold = allData[i].businessUnsold;
                polygon.businessType = allData[i].businessType;
                polygon.coordinates = allData[i].coordinates;
                polygon.customizedId = allData[i].customizedId;
                polygon.businessName = allData[i].businessName;
                polygon.thermodynamicChart = allData[i].thermodynamicChart;
                // 监听多边形的商圈 展示商圈报告
                //点击多边形
                polygon.addEventListener("click", function (e) {
                  map.removeOverlay(that.label);
                  console.log(e);
                  // 商圈报告ID
                  let reportId = e;
                  let businessType = polygon;
                  let businessId = e.target.businessId;
                  // 已售未收状态
                  let businessUnsold = e.target.businessUnsold;
                  // 已开未开状态
                  let businessOpen = e.target.businessOpen;
                  // 闭合点经纬度
                  let coordinates = e.target.coordinates;
                  // 商圈热力图截图
                  let thermodynamicChart = e.target.thermodynamicChart;
                  // 传递的参数 商圈类型  商圈报告ID
                  that.getBusinessEdit(
                    reportId,
                    businessType,
                    businessId,
                    businessUnsold,
                    businessOpen,
                    businessType,
                    coordinates,
                    thermodynamicChart
                  );
                  // 调用显示隐藏商圈名称
                  that.showHiddenBusiness(
                    e.target.coordinates,
                    e.target.businessName,
                    e.target
                  );
                });
              }
              // 显示圆
              if (allData[i].businessType == 2) {
                for (var j = 0; j < allData[i].coordinates.length; j++) {
                  var circle = new BMap.Circle(
                    new BMap.Point(
                      allData[i].coordinates[j].lng,
                      allData[i].coordinates[j].lat
                    ),
                    allData[i].radius,
                    {
                      strokeColor:
                        allData[i].businessLevel == "0"
                          ? "#4CCF7B"
                          : allData[i].businessLevel == "1"
                            ? "#FCCE45"
                            : "#E60B0E",
                      fillColor: "#027AFF",
                      strokeWeight: 3,
                      strokeOpacity: 1, //边线透明度，取值范围0 - 1
                      fillOpacity: 0.1, //填充的透明度，取值范围0 - 1
                      strokeStyle: "solid", //边线的样式，solid或dashed
                      enableMassClear: true, //是否在调用map.clearOverlays清除此覆盖物，默认为true
                      enableEditing: false, //是否启用线编辑，默认为false
                      enableClicking: true //是否响应点击事件，默认为true
                    }
                  );
                  that.circleNew = circle;
                  map.addOverlay(that.circleNew);
                }
                circle.reportId = allData[i].reportId;
                circle.businessId = allData[i].businessId;
                circle.businessOpen = allData[i].businessOpen;
                circle.businessUnsold = allData[i].businessUnsold;
                circle.businessType = allData[i].businessType;
                circle.coordinates = allData[i].coordinates;
                circle.radius = allData[i].radius;
                circle.customizedId = allData[i].customizedId;
                circle.businessName = allData[i].businessName;
                circle.thermodynamicChart = allData[i].thermodynamicChart;
                // 监听圆的商圈 展示商圈报告
                circle.addEventListener("click", function (e) {
                  map.removeOverlay(that.label);
                  console.log(e);
                  console.log(e.target.businessUnsold);
                  // 商圈报告ID
                  let reportId = e;
                  let businessType = circle;
                  let businessId = e.target.businessId;
                  // 已售未收状态
                  let businessUnsold = e.target.businessUnsold;
                  // 已开未开状态
                  let businessOpen = e.target.businessOpen;
                  // 闭合点经纬度
                  let coordinates = e.target.coordinates;
                  // 圆的半径
                  let radius = e.target.radius;
                  // 商圈热力图截图
                  let thermodynamicChart = e.target.thermodynamicChart;
                  // 传递的参数 商圈类型  商圈报告ID
                  that.getBusinessEdit(
                    reportId,
                    businessType,
                    businessId,
                    businessUnsold,
                    businessOpen,
                    coordinates,
                    radius,
                    thermodynamicChart
                  );
                  console.log(e.target.coordinates);
                  console.log(e.target.businessName);
                  console.log(businessType);
                  console.log(e);
                  // 调用显示隐藏商圈名称
                  that.showHiddenBusiness(
                    e.target.coordinates,
                    e.target.businessName,
                    e.target
                  );
                });
              }
              // 显示折线
              if (allData[i].businessType == 3) {
                var array = [];
                for (let k = 0; k < allData[i].coordinates.length; k++) {
                  array.push(
                    new BMap.Point(
                      allData[i].coordinates[k].lng,
                      allData[i].coordinates[k].lat
                    )
                  );
                }
                let opts = {
                  strokeColor:
                    allData[i].businessLevel == "0"
                      ? "#4CCF7B"
                      : allData[i].businessLevel == "1"
                        ? "#FCCE45"
                        : "#E60B0E", //边线颜色
                  fillColor: "#027AFF", //填充颜色。当参数为空时，折线覆盖物将没有填充效果
                  strokeWeight: 3, //边线的宽度，以像素为单位
                  strokeOpacity: 1, //边线透明度，取值范围0 - 1
                  fillOpacity: 0.000000000000000000000001, //填充的透明度，取值范围0 - 1
                  strokeStyle: "solid", //边线的样式，solid或dashed
                  enableMassClear: true, //是否在调用map.clearOverlays清除此覆盖物，默认为true
                  enableEditing: false, //是否启用线编辑，默认为false
                  enableClicking: true //是否响应点击事件，默认为true
                };
                var polyline = new BMap.Polyline(array, {
                  strokeColor: "#4CCF7B",
                  strokeWeight: 3,
                  strokeOpacity: 1
                });
                that.brokenNew = polyline;
                map.addOverlay(that.brokenNew);
                polyline.reportId = allData[i].reportId;
                polyline.coordinates = allData[i].coordinates;
                polyline.businessId = allData[i].businessId;
                //监听多边形的商圈 展示商圈报告
                //点击折线
                polyline.addEventListener("click", function (e) {
                  map.removeOverlay(that.label);
                  console.log(e, "点击折线");
                  // 商圈报告ID
                  let reportId = e;
                  let businessType = allData[i];
                  console.log(businessType, "businessType");
                  console.log(allData[i], 11111);
                  let businessId = e.target.businessId;
                  // 传递的参数 商圈类型  商圈报告ID
                  that.getBusinessEdit(reportId, businessType, businessId);
                });
              }
            }
          }
        });
        // // 显示折线
        // let polyline = new BMap.Polyline(
        //   [
        //     new BMap.Point(116.399, 39.91),
        //     new BMap.Point(116.405, 39.92),
        //     new BMap.Point(116.425, 39.9)
        //   ],
        //   { strokeColor: "blue", strokeWeight: 5, strokeOpacity: 0.5 }
        // );
        // map.addOverlay(polyline);
      },
      // 商圈列表，  是否显示全部
      showAll() {
        let map = this.map;
        let that = this;
        var overlaySum = map.getOverlays();
        if (this.isValue == true) {
          // 先移除所有覆盖物
          // map.clearOverlays();
          for (let i = 0; i < overlaySum.length; i++) {
            if (overlaySum[i].heatmap) {
            } else {
              map.removeOverlay(overlaySum[i]);
            }
          }
          // 请求我的商圈接口
          this.myBusinessData();
          // 初始化商圈列表
          this.initializeBusiness();
        } else if (this.isOpen == true || this.isSale == true) {
        } else if (this.isOpen == false || this.isSale == false) {
          for (let i = 0; i < overlaySum.length; i++) {
            if (overlaySum[i].heatmap) {
            } else {
              map.removeOverlay(overlaySum[i]);
            }
          }
          // map.clearOverlays();
        }
      },
      // 商圈列表，  未售/已售
      saled(e) {
        let map = this.map;
        var overlaySum = map.getOverlays();
        if (this.isValue == true) {
        } else if (this.isOpen == true && this.isSale == true) {
          this.myBusinessData();
        } else if (this.isOpen == false && this.isSale == false) {
          // map.clearOverlays();
          for (let i = 0; i < overlaySum.length; i++) {
            if (overlaySum[i].heatmap) {
            } else {
              map.removeOverlay(overlaySum[i]);
            }
          }
        } else {
          if (this.isSale == true) {
            // 先移除所有覆盖物
            // map.clearOverlays();
            for (let i = 0; i < overlaySum.length; i++) {
              if (overlaySum[i].heatmap) {
              } else {
                map.removeOverlay(overlaySum[i]);
              }
            }
            // 请求我的商圈接口
            this.myBusinessData();
          } else {
            // 请求我的商圈接口
            this.myBusinessData();
          }
        }
      },
      // 商圈列表，  未开/已开
      opened(e) {
        let map = this.map;
        var overlaySum = map.getOverlays();
        console.log(this.isOpen);
        if (this.isValue == true) {
        } else if (this.isOpen == true && this.isSale == true) {
          this.myBusinessData();
        } else if (this.isOpen == false && this.isSale == false) {
          // map.clearOverlays();
          for (let i = 0; i < overlaySum.length; i++) {
            if (overlaySum[i].heatmap) {
            } else {
              map.removeOverlay(overlaySum[i]);
            }
          }
        } else {
          if (this.isOpen == true) {
            // 先移除所有覆盖物
            // map.clearOverlays();
            for (let i = 0; i < overlaySum.length; i++) {
              if (overlaySum[i].heatmap) {
              } else {
                map.removeOverlay(overlaySum[i]);
              }
            }
            // 请求我的商圈接口
            this.myBusinessData();
          } else {
            // 请求我的商圈接口
            this.myBusinessData();
          }
        }
      },
      // 关闭我的商圈报告
      closeMyreport() {
        this.isReport = !this.isReport;
        document.getElementById("qrcode").innerHTML = "";
      },
      // 打开统计列表
      handleChange(val) {
        console.log(val);
      },
      // 初始化echarts
      getEcharts(e) {
        let myCharts = this.$echarts.init(document.getElementById("myCharts"));
        let option = {
          color: ["#55E0D9"],
          tooltip: {
            trigger: "axis"
            // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            // type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            // }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "0%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: ["小区", "办公", "其他聚客设施"],
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                // show: false
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLine: {
                // show: false
              }
            }
          ],
          series: [
            {
              name: "",
              type: "bar",
              barWidth: "50%",
              data: e
            }
          ]
        };
        myCharts.setOption(option);
      },
      // 渲染饼图
      drawPie(e) {
        let that = this;
        let myCharts = this.$echarts.init(document.getElementById("pieChart"));
        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            show: true,
            position: [50, 100]
          },
          formatter: function (name) {
            return that.$echarts.format.truncateText(
              name,
              10,
              "14px Microsoft Yahei",
              "…"
            );
          },
          legend: {
            x: "center",
            y: "bottom",
            orient: "horizontal",
            data: e
          },
          series: [
            {
              name: "",
              // 图形的位置
              center: ["50%", "28%"],
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
              // [
              //   { value: 335, name: "直接访问" },
              //   { value: 310, name: "邮件营销" },
              //   { value: 234, name: "联盟广告" },
              //   { value: 135, name: "视频广告" },
              //   { value: 1548, name: "搜索引擎" }
              // ]
              data: e
            }
          ]
        };
        myCharts.setOption(option);
      },
      paintingPie(e) {
        let that = this;
        let myCharts = this.$echarts.init(document.getElementById("piecharts"));
        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            show: true,
            position: [50, 100]
          },
          formatter: function (name) {
            return that.$echarts.format.truncateText(
              name,
              10,
              "14px Microsoft Yahei",
              "…"
            );
          },
          legend: {
            x: "center",
            y: "bottom",
            orient: "horizontal",
            selectedMode: ["single", false],
            data: e
          },
          series: [
            {
              name: "",
              // 图形的位置
              center: ["50%", "28%"],
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
              data: e
            }
          ]
        };
        myCharts.setOption(option);
      },
      // 点开二维码弹框
      getCode(e) {
        console.log(
          "www.hzdxq.cn/pointcoil/code/point/?id=" + this.businessReportId
        );
        console.log(
          encodeURI(
            "www.hzdxq.cn/pointcoil/pointcoil/code/point/?id=" +
            this.businessReportId
          )
        );
        //生成小程序二维码
        // var qrcode = new QRCode(this.$refs.qrcode, {
        //   width: 150,
        //   height: 150,
        //   text: encodeURI(
        //     "www.hzdxq.cn/pointcoil/code/point/?id=" +
        //     this.businessReportId
        //   ), // 二维码地址
        //   colorDark: "#000",
        //   colorLight: "#fff",
        //   correctLevel: QRCode.CorrectLevel.H
        // });
        this.isCode = !this.isCode;
        $("#qrcode").css("opacity", "1");
      },
      // 关闭二维码
      offCode() {
        this.isCode = !this.isCode;
        document.getElementById("qrcode").innerHTML = "";
      },
      // 跳转我的商圈页面
      toMyBusiness() {
        this.$router.push({ path: "/myBusiness" });
      },
      // 修改标签
      editIcon(e) {
        console.log(e);
        $(".add-label1").css("display", "none");
        $(".change-icon-shadow1").css("display", "none");
        $("#change-icon").css("display", "block");
        $(".change-icon-shadow").css("display", "block");
        $("#change-icon").css("margin-top", e.clientY - 280);
        $("#change-icon").css("margin-left", e.clientX - 90);
      },
      // 取消修改标签
      closeEdit(e) {
        let map = this.map;
        console.log(this.clickMarker);
        // map.removeOverlay(this.clickMarker);
        // $(".change-icon-shadow1").css("display", "none");
        // $(".add-label1").css("display", "none");
        // this.iconEdit = !this.iconEdit;

        $(".add-label1").css("display", "none");
        $(".change-icon-shadow1").css("display", "none");
        this.iconEdit = !this.iconEdit;
      },
      // 删除标签
      deleteIcon(logo) {
        let map = this.map;
        let that = this;
        let data = JSON.stringify({
          labelId: logo==="all"? this.iconList.labelName.map(el=>el.labelId):[...this.labelId],
          userId: this.userInfo.userId,
          token: this.userInfo.token
        });
        console.log(this.clickMarker);
        deleteLabel(data).then(res => {
          console.log(res);
          if (res.code == "000000") {
            console.log(that.clickMarker);
            map.removeOverlay(that.clickMarker);
            $(".change-icon-shadow1").css("display", "none");
            $(".add-label1").css("display", "none");
            that.iconEdit = !that.iconEdit;
            that.getMyIcon();
          }else{
            this.$message.error(res.msg)
          }
        });
      },
      // 确认修改标签
      sureIcon() {
        let that = this;
        let map = this.map;
        let dats = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          labelId: this.labelId,
          labelName: this.iconName,
          labelRemarks: this.iconMessage,
          labelStyleId: this.iconId
        });
        updateLabelById(dats).then(res => {
          console.log(res);
          if (res.code == "000000") {
            $(".change-icon-shadow1").css("display", "none");
            $(".add-label1").css("display", "none");
            map.removeOverlay(that.clickMarker);
            that.lookIcon(this.iconName);
            that.iconEdit = !that.iconEdit;
            that.getMyIcon();
          } else {
            alert(res.msg);
          }
        });
      },
      // 跳转会员中心
      goVip() {
        this.$router.push({ path: "/vipCenter" });
      },
      // 删除标签（列表中的）
      dleteIcon(e) { },
      // 定制热力图
      madeHotmap() {
        this.isMade = true;
      },
      sure() {
        this.isMade = false;
      }
    },
    watch: {
      // 监听切换城市的变化
      address: function (e) {
        this.getMap();
      }
    }
  };
</script>
<style scoped>
  #container {
    width: 100%;
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 40px;
    z-index: -1 !important;
  }

  .BMap_scaleCtrl {
    color: red;
    width: 130px !important;
  }

  /* 切换卫星地图按钮 */
  .satellite {
    z-index: 10;
    position: absolute;
    right: 40px;
    bottom: 120px;
  }

  /* 输入框找路线 */
  .address-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    margin-top: 80px;
  }

  .select-address {
    float: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin-top: 80px;
    margin-left: 80px;
  }

  .select-address input {
    width: 50%;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
    padding-left: 20px;
    border: none;
  }

  .select-city {
    display: flex;
    align-items: center;
  }

  .citys {
    display: flex;
    align-items: center;
    padding: 9px 20px;
    border-left: 1px solid #ebebeb;
    cursor: pointer;
  }

  .citys p {
    white-space: nowrap;
  }

  .citys img {
    width: 10px;
    height: 7px;
    margin-left: 5px;
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 50px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 0px 10px 10px 0px;
    cursor: pointer;
  }

  .search img {
    width: 20px;
    height: 20px;
  }

  /* 右侧功能栏 */
  .user-info {
    float: right;
    top: 70px;
    right: 80px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 9;
  }

  .areas {
    width: 117px;
    height: 170px;
    position: absolute;
    top: 50px;
    right: 59%;
    background: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(96, 96, 96, 1);
    padding-top: 10px;
  }

  .areas div {
    padding: 10px 0 10px 20px;
    cursor: pointer;
  }

  .areas div:hover {
    background: #f0f0f0;
  }

  .map-btn {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(96, 96, 96, 1);
  }

  .map-btn p {
    white-space: nowrap;
  }

  .ranging {
    display: flex;
    align-items: center;
    border-right: 1px solid #ebebeb;
    padding: 8px 20px;
    cursor: pointer;
  }

  .ranging img {
    width: 10px;
    height: 14px;
    margin-right: 11px;
  }

  .select-area {
    display: flex;
    align-items: center;
    border-right: 1px solid #ebebeb;
    padding: 0px 20px;
    cursor: pointer;
  }

  .select-area img {
    width: 10px;
    height: 6px;
    margin-left: 10px;
  }

  .label {
    display: flex;
    align-items: center;
    border-right: 1px solid #ebebeb;
    padding: 8px 20px;
    cursor: pointer;
  }

  .label img {
    width: 13px;
    height: 13px;
    margin-left: 10px;
  }

  .exhibition {
    display: flex;
    align-items: center;
    padding: 8px 20px;
    cursor: pointer;
  }

  .exhibition img {
    width: 10px;
    height: 6px;
    margin-left: 10px;
  }

  /* 个人信息 */
  .user-message {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 86px;
    height: 70px;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    margin-left: 30px;
    cursor: pointer;
  }

  .user-message img {
    width: 40px;
    height: 40px;
  }

  /* 城市列表数据 */
  .cities {
    width: 300px;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
    font-size: 12px;
    background: rgba(255, 255, 255, 1);
    position: absolute;
    top: 150px;
    margin-left: 80px;
  }

  .city-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dadada;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #4c4c4c;
    padding-left: 7px;
  }

  .city-title img {
    width: 12px;
    height: 12px;
    padding-right: 7px;
  }

  .present-city {
    display: flex;
    align-items: center;
    padding: 7px 0 0px 5px;
    line-height: 22px;
  }

  /* 默认城市 */
  .defil-city {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .default-city {
    color: #3d6dcc;
    margin-left: 10px;
    cursor: pointer;
  }

  /* 设为默认城市 */
  .default-cit {
    display: flex;
    align-items: center;
    padding-left: 5px;
  }

  .now-city {
    margin-right: 9px;
    color: #3d6dcc;
  }

  .delete-city span {
    color: #3d6dcc;
    cursor: pointer;
  }

  /* 点击省份或者城市的样式 */
  .active {
    background-position: -302px -24px;
    font-weight: 700;
    background-color: #f0f0f0;
  }

  /* 热门城市 */
  .hot-cites {
    display: flex;
    flex-wrap: wrap;
    color: #3d6dcc;
    padding: 0 5px;
    margin-bottom: 15px;
  }

  .hot-cites p {
    margin-right: 5px;
    font-size: 12px;
    white-space: nowrap;
    cursor: pointer;
  }

  .hot-cites p:nth-of-type(1) {
    font-weight: bold;
  }

  .search-city {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
  }

  .province-city {
    display: flex;
    align-items: center;
  }

  .province-city p {
    width: 52px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border: 1px solid #cbcbcb;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    cursor: pointer;
  }

  .province-city p:nth-of-type(1) {
    border-right-width: 0;
  }

  /* 搜索功能 */
  .inpt-city {
    display: flex;
    align-items: center;
  }

  .inpt-city input {
    width: 80px;
    padding-left: 3px;
  }

  .inpt-city p {
    height: 22px;
    line-height: 22px;
    width: 46px;
    cursor: pointer;
    margin-left: 5px;
    text-align: center;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
    background-color: #efefef;
    background: -webkit-linear-gradient(top, #fff, #efefef);
  }

  /* 省份及下面的城市 */
  .city-list {
    height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    scrollbar-arrow-color: red;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
    scrollbar-arrow-color: red;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  /*::-webkit-scrollbar-button {*/
  /*height: 0;*/
  /*width: 0;*/
  /*}*/

  .initial {
    display: flex;
    flex-wrap: wrap;
    color: #3d6dcc;
    padding: 15px 10px 10px 10px;
  }

  .initial p {
    margin-right: 12px;
    font-size: 12px;
    cursor: pointer;
  }

  .province-initial {
    display: flex;
  }

  .provinces {
    width: 300px;
    display: flex;
    flex-wrap: wrap;
  }

  .province-first {
    width: 20px;
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
    color: #ccc;
    padding: 0 14px 0 7px;
  }

  .cits {
    width: 250px;
    display: flex;
  }

  .province-name {
    width: 45px;
    color: #3d6dcc;
    font-weight: 700;
    padding-right: 20px;
    white-space: nowrap;
    cursor: pointer;
  }

  .cit-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }

  .under-city {
    color: #3d6dcc;
    margin-right: 9px;
    cursor: pointer;
  }

  /* 城市下面的数据 */
  .citye-list {
    display: flex;
    color: #3d6dcc;
  }

  .citye {
    margin-right: 12px;
    cursor: pointer;
  }

  /* 创建商圈 */
  .create-business {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: 10;
  }

  .createCircle {
    position: absolute;
    top: 25%;
    left: 35%;
    width: 500px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 20px;
    z-index: 10;
    /* display: none; */
  }

  .create-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
  }

  .create-title p {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #616161;
  }

  .create-title img {
    width: 20px;
    height: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .create-info p {
    width: 70px;
    white-space: nowrap;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
    margin-right: 20px;
  }

  /* 编辑商圈 */
  .create-circle {
    position: absolute;
    top: 25%;
    left: 35%;
    width: 500px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 20px;
    z-index: 10;
    display: none;
  }

  .business-area-name {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .business-area-name input {
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    padding-left: 10px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
  }

  .business-area-describe {
    display: flex;
    margin-top: 20px;
  }

  .business-area-describe textarea {
    width: 100%;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    padding-left: 10px;
    padding-top: 10px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
  }

  .business-area-grade {
    display: flex;
    align-items: center;
    margin: 24px 0;
  }

  /* 更改input框的样式 */
  #paixu1 {
    display: none;
  }

  #paixu2 {
    display: none;
  }

  #paixu3 {
    display: none;
  }

  .radio label {
    position: relative;
    margin-right: 20px;
  }

  .first::before {
    display: inline-block;
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1.5px solid #4ccf7b;
    margin-right: 6px;
    vertical-align: bottom;
  }

  .second::before {
    display: inline-block;
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1.5px solid #fcce45;
    margin-right: 6px;
    vertical-align: bottom;
  }

  .third::before {
    display: inline-block;
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1.5px solid #e60b0e;
    margin-right: 6px;
    vertical-align: bottom;
  }

  #paixu1:checked+.first::before {
    width: 19px;
    height: 19px;
    background-color: #4ccf7b;
    border: none;
  }

  #paixu1:checked+.first::after {
    display: inline-block;
    content: "✓";
    color: white;
    width: 1px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    bottom: 8px;
    border: none;
  }

  #paixu2:checked+.second::before {
    width: 19px;
    height: 19px;
    background-color: #4ccf7b;
    border: none;
  }

  #paixu2:checked+.second::after {
    display: inline-block;
    content: "✓";
    color: white;
    width: 1px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    bottom: 8px;
    border: none;
  }

  #paixu3:checked+.third::before {
    width: 19px;
    height: 19px;
    background-color: #4ccf7b;
    border: none;
  }

  #paixu3:checked+.third::after {
    display: inline-block;
    content: "✓";
    color: white;
    width: 1px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    bottom: 8px;
    border: none;
  }

  /* 商圈开售状态 */
  .business-area-open {
    display: flex;
    align-items: center;
  }

  .el-switch {
    margin-right: 20px !important;
  }

  .create-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 38px;
  }

  .create-btn p {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;

    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
  }

  .create-btn p:nth-of-type(1) {
    color: #ffffff;
    background: rgba(230, 46, 23, 1);
    margin-right: 25px;
    cursor: pointer;
  }

  .create-btn p:nth-of-type(2) {
    color: #ffffff;
    background: #027aff;
    margin-right: 25px;
    cursor: pointer;
  }

  .create-btn p:nth-of-type(3) {
    border: 1px solid rgba(2, 122, 255, 1);
    cursor: pointer;
  }

  /*添加标签样式*/
  .add-label {
    position: absolute;
    width: 460px;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    top: 10%;
    left: 37%;
    display: none;
    z-index: 10;
  }

  .add-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
  }

  .add-title div {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
  }

  .add-title img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .add-info {
    margin-top: 20px;
  }

  .icon-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon-name div {
    width: 29px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
    margin-right: 20px;
  }

  .icon-name input {
    width: 232px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    padding-left: 10px;
  }

  .icon-name select {
    width: 167px;
    height: 40px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
    padding-left: 10px;
    margin-left: 10px;
  }

  .icon-message {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .icon-message div {
    width: 33px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
    margin-right: 20px;
  }

  .icon-message textarea {
    width: 100%;
    height: 80px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
    padding: 10px 0 0 8px;
  }

  .add-btn {
    display: flex;
    align-items: center;
    margin-left: 50px;
  }

  .amend-icon {
    display: flex;
    align-items: center;
  }

  .amend-icon img {
    width: 20px;
    height: 27px;
    margin-right: 10px;
    cursor: pointer;
  }

  .amend-icon p {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
    cursor: pointer;
  }

  .cancel {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid rgba(2, 122, 255, 1);
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
    margin-left: 50px;
    cursor: pointer;
  }

  .sure-edit {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid rgba(2, 122, 255, 1);
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
    margin-left: 20px;
    cursor: pointer;
  }

  .create-now {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-left: 20px;
    cursor: pointer;
  }

  /*展示按钮*/
  .show-icon {
    position: absolute;
    right: 22%;
    top: 60px;
    width: 98px;
    height: 140px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .show-icon div {
    width: 68px;
    /*text-align-last: justify;*/
    cursor: pointer;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(96, 96, 96, 1);
    padding: 10px 0 10px 20px;
  }

  .show-icon div:hover {
    background: #f0f0f0;
  }

  /* 热力图操作 */
  .operat-map {
    position: absolute;
    top: 72%;
    left: 1%;
    background: rgba(255, 255, 255, 1);
    padding: 10px 25px;
    /* border-radius: 5px; */
  }

  /* 热力值弹框 */
  .heat-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 1);
    width: 300px;
    height: 200px;
    text-align: center;
    border-radius: 10px;
    z-index: 11;
  }

  .heat-value input {
    padding: 8px;
    margin-top: 20%;
  }

  .heat-btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10%;
  }

  .heat-btn p:nth-of-type(1) {
    padding: 5px 15px;
    border: 1px solid #027aff;
    cursor: pointer;
    color: #027aff;
    border-radius: 5px;
  }

  .heat-btn p:nth-of-type(2) {
    padding: 5px 15px;
    cursor: pointer;
    color: #ffffff;
    border-radius: 5px;
    background: rgba(2, 122, 255, 1);
  }

  .operat-map p {
    margin-top: 10px;
    cursor: pointer;
  }

  /*展示热力图列表*/
  .hot-maplist {
    position: absolute;
    right: 180px;
    top: 150px;
    width: 388px;
    background: rgba(255, 255, 255, 1);
    z-index: 9;
  }

  .show-hot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(2, 122, 255, 1);
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    padding: 20px;
    /*margin: 0 20px;*/
  }

  .show-hot img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .map-list {
    height: 250px;
    overflow-y: auto;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(96, 96, 96, 1);
  }

  .hot-lists {
    padding: 20px 0;
    margin: 0 20px;
    border-bottom: 1px solid #e1e1e1;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(96, 96, 96, 1);
  }

  .hot-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    margin: 0 20px;
    border-bottom: 1px solid #e1e1e1;
  }

  .in-baidu {
    width: 50px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 12px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(87, 82, 82, 1);
    cursor: pointer;
  }

  .actived {
    color: #ffffff;
    background: rgba(2, 122, 255, 1);
  }

  .my-icon {
    color: #ffffff;
    background: rgba(2, 122, 255, 1);
  }

  /*会员提示框*/
  /*遮罩层*/
  .shade {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 11;
  }

  .jurisdiction {
    width: 400px;
    height: 197px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 12;
  }

  .warm-prompt {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin: 30px 0 20px 0;
  }

  .no-money {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 30px;
  }

  .pay-money {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pay-money p:nth-of-type(1) {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid rgba(2, 122, 255, 1);
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
    margin-right: 15px;
    cursor: pointer;
  }

  .pay-money p:nth-of-type(2) {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-left: 15px;
    cursor: pointer;
  }

  /*我的商圈*/
  .show-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    margin: 0 20px;
    border-bottom: 1px solid #e1e1e1;
  }

  .off-on {
    margin-right: 0 !important;
  }

  /*商圈报告*/
  .business-report {
    position: absolute;
    right: 80px;
    top: 150px;
    width: 488px;
    z-index: 11;
    background: rgba(255, 255, 255, 1);
  }

  .store-name {
    display: flex;
    align-items: center;
  }

  .store-name img {
    width: 48px;
    height: 44px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .store-name p {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }

  .close-report {
    width: 20px;
    height: 20px;
  }

  .report-data {
    height: 600px;
    overflow-y: auto;
  }

  .heat-back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }

  .city-data {
    padding: 20px;
  }

  .follow-sum {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .attention {
    display: flex;
    align-items: center;
  }

  .attention img {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }

  .attention p {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(96, 96, 96, 1);
  }

  .attention span {
    color: #027aff;
  }

  .img-code {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .city-business {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(96, 96, 96, 1);
    margin-top: 4px;
  }

  .city-business img {
    width: 100%;
    height: 152px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 20px;
  }

  /*城市数据*/
  .city-datas {}

  .datas-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(96, 96, 96, 1);
    margin: 20px 0;
  }

  .city-name {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(96, 96, 96, 1);
  }

  .city-name p {
    margin-right: 10px;
  }

  .city-name p:nth-of-type(1) {
    margin-right: 40px;
  }

  .city-name span {
    color: rgba(2, 122, 255, 1);
  }

  .cit-datas {
    background: #ffffff;
    margin-top: 18px;
  }

  .city-info {
    width: 100%;
    height: 37px;
    line-height: 37px;
    background: rgba(2, 122, 255, 0.4);
    display: flex;
    align-items: center;
    margin-top: 2px;
  }

  .city-info p {
    flex: 2;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*商圈基础数据*/
  .basics-data {
    margin: 20px 0;
  }

  /* 柱状图 */
  #myCharts {
    width: 440px;
    height: 220px;
  }

  /* 饼图 */
  #pieChart {
    width: 200px;
    height: 265px;
  }

  #piecharts {
    width: 200px;
    height: 265px;
  }

  .basics-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(96, 96, 96, 1);
  }

  .basics-area {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(96, 96, 96, 1);
    margin-top: 20px;
  }

  .basics-area p {
    margin-right: 30px;
    white-space: nowrap;
  }

  .basics-area span {
    color: rgba(2, 122, 255, 1);
    margin-left: 5px;
  }

  .facility-statistics {
    padding: 20px 0;
  }

  .statistics-data {
    display: flex;
    padding: 0 30px;
  }

  .small-estate {
    flex: 2;
  }

  .small-estate p {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .small-estate p:nth-of-type(1) {
    color: #027aff;
  }

  .statistics-dats {
    padding: 0 30px;
  }

  .facility-list {
    display: flex;
    align-items: center;
  }

  .facility-list p {
    flex: 2;
    color: #027aff;
    font-weight: 600;
  }

  .facility-name {
    display: flex;
  }

  .facility-name p {
    flex: 2;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(96, 96, 96, 1);
  }

  .facility-data {
    padding-left: 20px;
    font-size: 16px !important;
    font-family: PingFangSC-Semibold, PingFang SC !important;
    font-weight: 600 !important;
    color: rgba(96, 96, 96, 1) !important;
    /* padding-left: 20px !important; */
  }

  .el-collapse-item__header {
    background-color: transparent !important;
  }

  .data-statistics {
    display: flex;
    align-items: center;
    background: rgba(246, 246, 246, 1);
    padding-left: 20px;
    height: 45px;
  }

  .data-statistics p {
    flex: 2;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(96, 96, 96, 1);
  }

  /*商业数据*/
  .business-data {
    padding: 20px;
  }

  .commerce-data p {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(96, 96, 96, 1);
  }

  .commerce-data p:nth-of-type(2) {
    width: 150px;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    background: #027aff;
    color: #ffffff;
    margin: 0 auto;
  }

  .commerce-data img {
    width: 100%;
    height: 152px;
    background: rgba(216, 216, 216, 1);
    border-radius: 8px;
    margin-bottom: 20px;
  }

  /*饼图*/
  .pie-chart {
    display: flex;
    justify-content: space-between;
  }

  .pie-name {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 500;
    color: rgba(96, 96, 96, 1);
    position: relative;
    text-align: center;
  }

  .pie-name p {}

  /*广告*/
  .advertising {
    width: 438px;
    height: 120px;
    border-radius: 1px;
    margin-top: 30px;
  }

  /*二维码弹框*/
  .two-code {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
  }

  .off-code {
    width: 30px;
    height: 30px;
    position: absolute;
    top: -35px;
    right: 0;
    cursor: pointer;
  }

  .pop-up {
    width: 296px;
    height: 292px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    text-align: center;
  }

  .pop-up p {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    padding-top: 20px;
    margin-bottom: 20px;
  }

  .QR-code {
    width: 170px;
    height: 170px;
  }

  /* 修改标签样式 */
  #change-icon {
    position: absolute;
    width: 460px;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    display: none;
  }

  .all-icon {
    display: flex;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .amend-icon img {
    width: 20px;
    height: 27px;
    margin-right: 10px;
    cursor: pointer;
  }

  .all-icon img {
    width: 40px;
    height: 35px;
    margin: 10px;
    cursor: pointer;
  }

  /* 阴影背景层 */
  .add-label-shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    display: none;
    z-index: 9;
  }

  .change-icon-shadow1 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    display: none;
  }

  .add-label1 {
    position: absolute;
    width: 460px;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    display: none;
    top: 10%;
    left: 37%;
    z-index: 10;
  }

  .create-now1 {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #e62e17;
    border-radius: 10px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-left: 20px;
    cursor: pointer;
  }

  .no-industry-data {
    position: absolute;
    top: 105px;
    left: 40px;
    font-size: 18px;
  }

  /* 编辑商圈的样式 */
  .edit-shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    display: none;
    z-index: 10;
  }

  /* 小程序二维码 */
  #qrcode {
    position: absolute;
    top: 44%;
    left: 46%;
    z-index: 99;
    opacity: 0;
  }

  /* 绘制面删除热力图不精确的点 */
  .delete-hotmap {
    /* display: flex;
  align-items: center; */
    border-right: 1px solid #ebebeb;
    padding: 8px 20px;
    cursor: pointer;
    border-right: 1px solid #ebebeb;
    display: flex;
    align-items: center;
  }

  /* 是否为超管的样式 */
  .is-admin {
    left: 35%;
  }

  .is-admins {
    left: 68%;
  }

  /* 是否删除该热力图样式 */
  .delete-map {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .delet-hot-map {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    background: #ffffff;
    text-align: center;
    padding: 12px;
    border-radius: 10px;
  }

  .delete-sure {
    padding: 10px 0;
  }

  .delete-on {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 15px;
  }

  .delete-on p:nth-of-type(1) {
    cursor: pointer;
    width: 100px;
    color: rgba(2, 122, 255, 1);
    border-radius: 10px;
    border: 1px solid rgba(2, 122, 255, 1);
    padding: 5px;
  }

  .delete-on p:nth-of-type(2) {
    cursor: pointer;
    width: 100px;
    color: rgba(255, 255, 255, 1);
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    padding: 5px;
  }

  /* 弹框 */
  .back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.3;
    z-index: 1;
  }

  .backs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.3;
    z-index: 11;
  }

  .pop-up {
    position: absolute;
    top: 50%;
    left: 49.6%;
    transform: translate(-50%, -50%);
    width: 420px;
    height: 239px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    text-align: center;
    z-index: 10;
  }

  .pop-ups {
    position: absolute;
    top: 50%;
    left: 49.6%;
    transform: translate(-50%, -50%);
    width: 420px;
    height: 239px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    text-align: center;
    z-index: 99;
  }

  .cancel-work {
    cursor: pointer;
    color: #616161;
    margin-left: 60px;
  }

  .hint {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin: 30px 0 20px 0;
  }

  .success {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 20px;
  }

  .contact {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 30px;
  }

  .yes {
    width: 140px;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(90deg,
        rgba(253, 177, 102, 1) 0%,
        rgba(254, 143, 95, 1) 100%);
    border-radius: 22px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
  }

  .yess {
    width: 80px;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(90deg,
        rgba(253, 177, 102, 1) 0%,
        rgba(254, 143, 95, 1) 100%);
    border-radius: 22px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    cursor: pointer;
  }

  @media screen and (min-width: 1200px) and (max-width: 1500px) {
    .map-list {
      height: 150px;
    }

    .map-btn {
      height: 45px;
      font-size: 13px;
    }

    .ranging {
      padding: 8px 10px;
    }

    .select-area {
      padding: 8px 10px;
    }

    .label {
      padding: 8px 10px;
    }

    .exhibition {
      padding: 8px 10px;
    }

    .user-message {
      width: 76px;
      height: 60px;
    }

    .areas {
      width: 85px;
      right: 61%;
      height: 155px;
    }

    .areas div {
      padding: 8px 0 8px 15px;
    }

    .show-icon {
      width: 72px;
      right: 23.5%;
    }

    .show-icon p {
      font-size: 13px;
    }

    .hot-maplist {
      width: 280px;
    }

    .show-hot {
      font-size: 13px;
      padding: 15px;
    }

    .show-hot img {
      width: 15px;
      height: 15px;
    }

    .hot-list {
      padding: 8px 0;
      margin: 0 8px;
      font-size: 12px;
    }

    .in-baidu {
      width: 45px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    }

    .show-btn {
      padding: 10px 0;
      margin: 0 10px;
      font-size: 12px;
    }

    .hot-lists {
      padding: 10px 0;
      margin: 0 10px;
      font-size: 13px;
    }

    .add-label {
      width: 380px;
      padding: 10px;
    }

    .add-title {
      padding-bottom: 10px;
    }

    .add-title div {
      font-size: 14px;
    }

    .add-title img {
      width: 15px;
      height: 15px;
    }

    .icon-name div {
      font-size: 12px;
      margin-right: 15px;
    }

    .icon-name input {
      width: 200px;
      height: 35px;
      font-size: 12px;
    }

    .icon-name select {
      height: 35px;
      font-size: 12px;
    }

    .icon-message div {
      font-size: 12px;
      margin-right: 15px;
    }

    .icon-message textarea {
      font-size: 12px;
    }

    .cancel {
      height: 35px;
      line-height: 35px;
      margin-left: 30px;
    }

    .create-now {
      height: 35px;
      line-height: 35px;
    }

    .amend-icon img {
      width: 25px;
      height: 25px;
    }

    .add-label1 {
      width: 350px;
      padding: 10px;
    }

    .create-circle {
      width: 350px;
      padding: 10px;
    }

    .create-title {
      padding-bottom: 8px;
    }

    .create-title p {
      font-size: 13px;
    }

    .create-title img {
      width: 15px;
      height: 15px;
      margin-bottom: 0;
    }

    .create-info p {
      font-size: 12px;
    }

    .business-area-name input {
      height: 32px;
      font-size: 12px;
    }

    .business-area-describe textarea {
      height: 75px;
      font-size: 12px;
    }

    .business-area-grade {
      margin: 15px 0;
    }

    .create-btn {
      margin-top: 20px;
    }

    .create-btn p {
      width: 130px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }

    .business-report {
      width: 350px;
    }

    .report-data {
      height: 450px;
    }

    .city-business {
      font-size: 13px;
    }

    .city-data {
      padding: 10px;
    }

    /*.city-business img {*/
    /*  margin-top: 10px;*/
    /*  width: 100%;*/
    /*  height: 100%;*/
    /*  object-fit: cover;*/
    /*}*/

    .datas-title {
      font-size: 13px;
      margin: 10px 0;
    }

    .cit-datas {
      margin-top: 10px;
    }

    .basics-data {
      margin: 10px 0;
    }

    .basics-title {
      font-size: 13px;
    }

    .basics-area {
      font-size: 12px;
      margin-top: 10px;
    }

    .basics-area p {
      margin-right: 5px;
    }

    #myCharts {
      width: 330px;
      height: 200px;
    }

    .statistics-dats {
      padding: 0 10px;
    }

    .data-statistics {
      padding-left: 10px;
      height: 30px;
    }

    .data-statistics p {
      font-size: 12px;
    }

    .small-estate p {
      font-size: 12px;
      margin-bottom: 5px;
    }

    .facility-list p {
      font-size: 12px;
    }

    .facility-statistics {
      padding: 10px 0;
    }

    .facility-name p {
      margin-top: 5px;
      font-size: 12px;
    }

    .business-data {
      padding: 10px;
    }

    .commerce-data p {
      font-size: 13px;
    }

    #pieChart {
      width: 150px;
    }

    #piecharts {
      width: 150px;
    }

    .store-name p {
      font-size: 13px;
    }

    .is-admin {
      left: 35%;
    }
  }
</style>