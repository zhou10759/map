<template>
  <div>
    <div class="main-index">
      <!--左边用户信息功能栏-->
      <!--      <navigation class="vip-left"></navigation>-->
      <navigation></navigation>
      <!--右边我的会员中心-->
      <div class="user-data">
        <!--会员中心名称以及等级-->
        <div class="vip-name">
          <div class="user-name">
            <p style="white-space: nowrap;">DLA-</p>
            <span>{{userInfo.userName}}({{userInfo.starTime}}-{{userInfo.endTime}})</span>
          </div>
          <div class="user-grade">
            <p>VIP：</p>
            <span>{{userInfo.memberLevel}}LV</span>
          </div>
        </div>
        <div class="grade-distribute">
          <div :class="isProvinces?'mask':''" @click="closeMask"></div>
          <div class="city-title">
            <div class="title-head">
              <div class="oblique">
                <span></span>
                <span></span>
              </div>
              <div class="title-name">选择城市</div>
              <div class="oblique">
                <span></span>
                <span></span>
              </div>
            </div>
            <div class="citys">
              <div class="shu"></div>
              <div class="first-city">一类城市</div>
            </div>
            <div class="city-list">
              <el-checkbox-group v-model="checkedOneCity" @change="handleCheckedOneCityChange">
                <el-checkbox v-for="(city,index) in cities.city" :label="city" :key="index">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="citys">
              <div class="shu"></div>
              <div class="first-city">二类城市</div>
            </div>
            <div class="city-list" style="z-index: 5;">
              <el-checkbox-group v-model="checkedTwoCity" @change="handleCheckedTwoCityChange">
                <el-checkbox v-for="city in citys.city" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="citys">
              <div class="shu"></div>
              <div class="first-city">所有城市</div>
            </div>
            <div class="city-list">
              <div class="selete-city">
                <select name="" id="" @click="selectFn" class="select-key">
                  <option style="display:none;" selected class="select-key">{{selectProvince}}</option>
                </select>
                <!-- 城市列表下拉框 -->
                <div v-if="isCity" class="provinces-lists">
                  <!-- <div class="provinces" v-for="(item,index) in cityList" :key='index' @click="sureCitys(item)">{{item}}
              </div> -->
                  <el-checkbox-group v-model="checkedAllCity" @change="handleCheckedAllCityChange">
                    <el-checkbox v-for="city in cityList" :label="city" :key="city">{{city}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <!-- <select name="" id="" @click="selectCityFn" class="select-key" style="margin-left: 30px;">
                  <option style="display:none;" selected class="select-key">{{selectCity}}</option>
                </select> -->
                <!-- <el-checkbox v-model="checked" class="checked" @change="checkSelect"></el-checkbox> -->
              </div>
            </div>
            <!-- 省份列表下拉框 -->
            <div v-if="isProvinces" class="provinces-list">
              <div class="provinces" v-for="(item,index) in provinces" :key='index' @click="sureProvince(item)">
                {{item.province}}
              </div>
            </div>
            <!-- 选择完城市出现的价格 -->
            <div class="prece-list" v-if="cityArray.length>0">
              <div class="pay-money" :class="payDate==1?'active':''" @click="payMoneys(1)">
                <div class="pay-pri">
                  <p>{{monthMoney}}</p> /月
                </div>
                <!-- <select name="" id="" v-model="nameVal" @click="sureTime" class="select-time">
                  <option style="display:none;" selected class="select-key">{{nameVal}}</option>
                  <option value="3">三个月</option>
                  <option value="6">六个月</option>
                  <option value="9">九个月</option>
                </select> -->
                <!-- <input type="number" placeholder="可手动输入购买月份" class="select-time"> -->
                <div class="vip-date">VIP会员 月续费</div>
                <!-- <div class="recommended">推荐</div> -->
              </div>
              <div class="pay-money" :class="payDate==12?'active':''" @click="payMoneys(2)">
                <div class="pay-pri">
                  <p>{{yearMoney}}</p> /年
                </div>
                <div class="vip-date">VIP会员 年续费</div>
                <div class="recommended">推荐</div>
              </div>
            </div>
            <button class="buy-now" @click="buyNow">立即购买</button>
          </div>
        </div>
        <!--会员等级分布-->
        <!-- <div class="grade-distribute">
          <div class="grade-name">
            <p>等级</p>
            <p>品牌</p>
            <p>商圈数</p>
            <p>标签数</p>
            <p>子账号数</p>
            <p>2年/元</p>
            <p>1年/元</p>
            <p>定制服务折扣</p>
            <p></p>
          </div>
          <div class="grade-content" v-for="(item,g) in gradeList" :key="g">
            <p>{{item.memberLevel}}</p>
            <p>{{item.brandNum}}</p>
            <p>{{item.businessNum}}</p>
            <p>{{item.labelNum}}</p>
            <p>{{item.subAccountNum}}</p>
            <p>{{item.twoElement}}</p>
            <p>{{item.oneElement}}</p>
            <p>{{item.customizedServer}}</p>
            <p :class="[item.memberLevel != 0  ? 'transaction':'transaction_disable']" @click="transact(item)">立即办理</p>
          </div>
        </div> -->
        <!--会员标题-->
        <!-- <div class="vip-title">
          <div class="oblique">
            <span></span>
            <span></span>
          </div>
          <p>周期内VIP升级，按天补差价</p>
          <div class="oblique">
            <span></span>
            <span></span>
          </div>
        </div> -->
        <!--定制服务-->
        <!-- <div class="custom-service">
          <div class="custom-title">定制服务</div>
          <div class="custom-cont">
            致力于打造首个农业平台，将感知农场的服务科技化、情感化、多元化，我们认为，用户在娱乐的过程中，形式上是消费了产品服务，但本质上是通过产品代入而放大、宣扬自己的情感，从博得认同的过程中体验快感。服务的本质归根结底在于"情感"，通过用户对使用产品的过程，将自己的情感以定制化作物的形式进行转移或释放。"感知农业社区"始终以时尚、人文、情感的现代生活的价值理念为中心构建产品，于是"梦想庄园"应运而生。
            在梦想庄园里，用户利用租下来的田地通过感知中心实现远程操控管理，用户可以根据感知中心反馈的作物及环境信息下达各种指令，如种植作物的品种选择、嫁接、搭架、浇水、采摘等指令，感知农场根据用户的指令信息进行实际操作，并及时反馈至用户，让用户在家就可以种植蔬菜。
          </div>
          <div class="contact-us">
            <p>同时也可以在线下直接联系我们！</p>
            <input type="text" placeholder="请输入真实姓名" v-model="userName" class="inpt-name" />
            <input type="text" placeholder="请输入联系电话" maxlength="11" v-model="userPhone" class="inpt-name" />
            <textarea cols="30" rows="10" placeholder="请输入定制内容" v-model="userCont"></textarea>
            <span @click="submit">提交</span>
          </div>
        </div> -->
        <!--办理会员弹框（支付）-->
        <div class="shade" v-if="isPay">
          <div class="pay-grade" v-if="isPay">
            <div class="pay-title">选择支付</div>
            <div class="pay-function">
              <!-- <div class="pay-price">
                <p class="price">价 格:</p>
                <div class="choose-price">
                  <div>
                    <p>{{oneYear}}￥/年</p>
                    <p>{{twoYear}}￥/2年</p>
                  </div>
                  <div>
                    <div class="price-radio">
                      <input type="radio" name="paixu1" id="paixu3" checked @click="surePriceOne()" />
                      <label for="paixu3" style="cursor:pointer" class="three"></label>
                    </div>
                    <div class="price-radio">
                      <input type="radio" name="paixu1" id="paixu4" @click="surePriceTwo()" />
                      <label for="paixu4" style="cursor:pointer" class="four"></label>
                    </div>
                  </div>
                </div>
              </div> -->
              <div class="choose-pay">
                <div class="pay">支付方式:</div>
                <div style="display: flex">
                  <div class="pay-img">
                    <div>
                      <img src="../../../static/img/Pay treasure.png" alt />
                    </div>
                    <img src="../../../static/img/WeChat.png" alt />
                  </div>
                  <div class="pay-fun">
                    <p>支付宝</p>
                    <p>WeChat</p>
                  </div>
                  <div>
                    <div class="radio">
                      <input type="radio" name="paixu" id="paixu1" checked @click="sureRadio1()" />
                      <label for="paixu1" style="cursor:pointer" class="first"></label>
                    </div>
                    <div class="radio">
                      <input type="radio" name="paixu" id="paixu2" @click="sureRadio2()" />
                      <label for="paixu2" style="cursor:pointer" class="second"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pay-btn">
              <p @click="closePay">取消</p>
              <p @click="payNow">确定</p>
            </div>
          </div>
        </div>
        <!-- 支付宝二维码 -->
        <div class="qr-code" v-if="isScan">

          <!--扫码支付-->
          <div class="shade">
            <div class="scan-code">
              <img src="../../../static/img/ShutdownIII.png" class="close-pay" @click="cancelPay" alt />
              <div class="pay-amount">
                充值金额:
                <span>{{payNowMoney}}￥</span>
              </div>
              <div>
                <div class="pay-caption">请扫码支付</div>
                <div class="two-code"></div>
                <div id="qrcode" ref="twoCode" v-if="wxOrZfb==0"></div>
                <div id="wxcode" v-if="wxOrZfb==1"></div>
                <!-- <div class="pay-way"> -->
                <!-- <img src="../../../static/img/Pay treasureI.png" alt /> -->
                <!-- <p>跳转{{wxOrZfb==0?"支付宝":"微信"}}网页版支付</p>
                </div> -->
              </div>
              <!-- <div class="elect-pay">请选择您的付款方式</div> -->
            </div>
          </div>
        </div>
        <!--支付成功-->
        <div class="shade" v-if="paymentSuccess">
          <div class="pay-success">
            <p>支付成功</p>
            <p @click="surePay">确定</p>
          </div>
        </div>
        <!--定制提交成功-->
        <!-- <div class="shade" v-if="isCustomization">
          <div class="pay-success">
            <p>定制提交成功</p>
            <p @click="affirm">确定</p>
          </div>
        </div> -->
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>


<script>
  import navigation from "@/components/my-business-left";
  import bottom from "@/components/index-bottom";
  // 引入QRCODE，js转二维码
  import QRCode from "qrcodejs2";
  // 引入接口
  import {
    customizedService,
    memberInit,
    qrCode,
    aliPay,
    isPay,
    memberCityInit,
    wxPay
  } from "@/api/index/index.js";
  export default {
    data() {
      return {
        twoCode: "",
        // 会员等级数据
        gradeList: [],
        // 用户姓名
        userName: "",
        // 用户电话
        userPhone: "",
        // 内容
        userCont: "",
        // 支付方式弹框
        isPay: false,
        // 选择支付宝支付
        isAlipay: false,
        // 选择微信支付
        isWeChat: false,
        // 是否扫码支付
        isScan: false,
        // 支付成功
        paymentSuccess: false,
        // 定制成功
        isCustomization: false,
        // 用户信息
        userInfo: "",
        // 选择的金额
        payMoney: "",
        // 一年的支付金额
        oneYear: "",
        // 二年的支付金额
        twoYear: "",
        // 选择的年份
        chooseYear: "one",
        // 二维码图
        codeImg: "",
        // socket通道
        websocket: "",
        //  socket通道的路径
        path: "",
        // WebSocket的连接状态
        heartJump: null,
        // 会员ID
        vipId: "",
        cities: [],
        checkedOneCity: [], //一类城市
        checkedTwoCity: [],//二类城市
        checkedAllCity: [],//所有城市
        citys: [],
        checkedCitys: [],
        provinces: [],
        isCity: false,    //城市的下拉展示框
        isProvinces: false,  //省份的下拉展示框
        checked: false,  //下拉的城市和省份是否都选中了
        cityList: [],
        selectProvince: '请选择省份',
        selectCity: '请选择城市',
        cityList: [],   //城市列表
        cityArray: [],   //存放选中的城市
        monthMoney: '',   //一个月需要付的钱
        yearMoney: '',    //一年需要付的钱
        selectPrice: '',    //下拉框选中的城市价格
        chooseCity: [],       //所有城市选中的值
        wxOrZfb: 0,            //选择支付宝还是微信，默认是支付宝
        payNowMoney: '',        //需要支付的金额
        payDate: '12',              //支付的时间
        // nameVal: "选择月份",
        // timeValue: ''     //选择的月份
      };
    },
    components: { bottom, navigation },
    created() {
      console.log(this.$route.query.barIndex);
      // 获取cookie的用户信息
      let user = this.$cookies.get("userInfo");
      this.userInfo = user;
      console.log(user);
      // WebSocket的路径
      this.path = "wss://www.hzdxq.cn/pointcoil/websocket/" + user.userId;
    },
    mounted() {
      // 会员制度接口
      this.getVipData();
      // 获取城市数据
      this.getCityData()
    },
    methods: {
      // 选省份的下拉弹框
      selectFn() {
        this.isProvinces = !this.isProvinces;
        this.isCity = true;
      },
      // 获取城市数据接口
      getCityData() {
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token
        })
        memberCityInit(data).then(res => {
          console.log(res)
          if (res.code == '000000') {
            this.cities = res.data.oneCity;
            this.citys = res.data.twoCity;
            this.provinces = res.data.cityDTOS;
          } else {
            alert(res.msg)
          }
        })
      },
      // 选城市的下拉弹框
      selectCityFn() {
        this.isCity = !this.isCity;
        this.isProvinces = false;
      },
      handleCheckedOneCityChange(value) {
        let newAray = Array.from(this.checkedOneCity);
        this.cityArray = this.cityArray.concat(newAray);
        console.log(this.checkedOneCity)
      },
      handleCheckedTwoCityChange(value) {
        let newAray = Array.from(this.checkedTwoCity);
        this.cityArray = this.cityArray.concat(newAray);
        console.log(value)
      },
      handleCheckedAllCityChange(value) {
        console.log(value)
        let newAray = Array.from(this.checkedAllCity);
        this.cityArray = this.cityArray.concat(newAray);
      },
      // 确认选择的省份
      sureProvince(e) {
        console.log(e)
        this.cityList = e.cityName;
        this.isProvinces = false;
        this.selectProvince = e.province;
        this.selectCity = e.cityName[0];
        this.checked = true;
        let newAray = Array.from(e.cityName);
        this.cityArray = newAray;
        this.selectPrice = e.price;
      },
      checkSelect(e) {
        if (e == false) {
          this.selectProvince = '请选择省份';
          this.selectCity = '请选择城市';
          this.calculatePrice();
        }
      },
      // 确认选择的城市
      sureCitys(e) {
        console.log(e);
        this.selectCity = e;
        this.isCity = false;
      },
      // sureTime() {
      //   console.log(this.nameVal);
      //   this.timeValue = this.nameVal;
      //   this.calculatePrice()
      // },
      // 计算需要支付的价格（选择的城市数量）
      calculatePrice(e) {
        console.log(e)
        console.log(this.cityList.price)
        console.log(this.checkedAllCity.length)
        this.monthMoney = this.checkedOneCity.length * this.cities.price + this.checkedTwoCity.length * this.citys.price + this.checkedAllCity.length * this.selectPrice
        this.yearMoney = (this.checkedOneCity.length * this.cities.price + this.checkedTwoCity.length * this.citys.price + this.checkedAllCity.length * this.selectPrice) * 10
      },
      closeMask() {
        this.isProvinces = false;
        // this.isCity = false;
      },
      payMoneys(e) {
        console.log(e)
        if (e == 1) {
          this.payNowMoney = this.monthMoney;
          this.payDate = 1;
        } else if (e == 2) {
          this.payNowMoney = this.yearMoney;
          this.payDate = 12;
        }
      },
      // 立即购买  弹框
      buyNow() {
        this.isPay = !this.isPay;
      },
      // 会员制度接口
      getVipData() {
        let datas = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token
        });
        memberInit(datas).then(res => {
          console.log(res);
          this.gradeList = res.data;
        });
      },
      // 提交数据
      submit() {
        console.log(this.userName);
        console.log(this.userPhone);
        console.log(this.userCont);
        let telephone = this.userPhone;
        if (!/^1[3456789]\d{9}$/.test(telephone)) {
          alert("请填写正确手机号");
          return;
        } else if (this.userName && this.userPhone && this.userCont) {
          this.isCustomization = !this.isCustomization;
        } else {
          alert("请将信息填写完整");
          return;
        }
        let datas = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          name: this.userName,
          telephone: this.userPhone,
          content: this.userCont
        });
        customizedService(datas).then(res => {
          console.log(res);
          if (res.code == "000000") {
            this.userName = "";
            this.userPhone = "";
            this.userCont = "";
          }
        });
      },
      // 提交定制
      affirm() {
        this.isCustomization = !this.isCustomization;
      },
      // 立即办理会员
      transact(e) {
        //console.log(e);
        if (e.memberLevel == 0) {
          return;
        }
        this.vipId = e.memberId;
        this.isPay = !this.isPay;
        this.oneYear = e.oneElement;
        this.twoYear = e.twoElement;
      },
      // 关闭支付
      closePay() {
        this.isPay = !this.isPay;
        this.vipId = "";
        console.log(this.isAlipay);
        console.log(this.isWeChat);
      },
      surePriceOne() {
        // 一年的金额
        console.log("一年");
        this.chooseYear = "one";
      },
      surePriceTwo() {
        // 两年的金额
        console.log("两年");
        this.chooseYear = "two";
      },
      sureRadio1() {
        // 下标定为0
        console.log(0);
        this.wxOrZfb = 0;
      },
      sureRadio2() {
        // 下标定为0
        console.log(1);
        this.wxOrZfb = 1;
      },
      //去支付
      payNow() {
        let cityName = this.checkedOneCity.concat(this.checkedTwoCity)
        cityName.push(this.selectCity)
        let that = this;
        let patMoney = this.payNowMoney == '' ? this.yearMoney : this.payNowMoney
        this.payNowMoney = patMoney;
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          cityName: Array.from(cityName),
          time: this.payDate,
          totalMoney: this.wxOrZfb == 1 ? patMoney : '',
          totalAmount: this.wxOrZfb == 0 ? patMoney : '',
          yearOrMonth: this.wxOrZfb == 0 ? 0 : ''
        })
        if (this.cityName == '请选择城市' || this.cityName == '') {
          alert("请选择城市")
          return;
        }
        console.log(this.payNowMoney)
        if (this.payNowMoney == 0 && this.yearMoney == 0) {
          alert("请选择一个城市再进行支付");
          return;
        }
        if (this.wxOrZfb == 0) {//支付宝支付
          aliPay(data).then(res => {
            console.log(res);
            if (res.code == "000000") {
              that.isPay = !that.isPay;
              that.codeImg = res.data;
              that.isScan = !that.isScan;
              // document.getElementById('qrcode').innerHTML = ''
              that.$nextTick(() => {
                var qrcode = new QRCode("qrcode", {
                  width: 132,
                  height: 132,
                  text: res.data, // 二维码地址
                  colorDark: "#000",
                  colorLight: "#fff",
                  correctLevel: QRCode.CorrectLevel.H
                });
              });
              // 调用是否付款成功接口
              // setInterval(() => {
              that.isPaySuccess();
              // }, 500);
            }
          });
        } else if (this.wxOrZfb == 1) {
          wxPay(data).then(res => {//微信支付
            console.log(res)
            if (res.code == '000000') {
              that.isPay = !that.isPay;
              that.isScan = !that.isScan;
              that.$nextTick(() => {
                var qrcode = new QRCode("wxcode", {
                  width: 132,
                  height: 132,
                  text: res.data, // 二维码地址
                  colorDark: "#000",
                  colorLight: "#fff",
                  correctLevel: QRCode.CorrectLevel.H
                });
              });
              that.isPaySuccess();
            }
          })
        }
      },
      // 判断支付是否成功
      isPaySuccess() {
        if ("WebSocket" in window) {
          console.log(this.path);
          this.websocket = new WebSocket(this.path);
          // 监听socket的状态
          this.initWebSocket();
          this.heartJump = setInterval(() => {
            try {
              this.websocket.send("心跳");
            } catch (error) {
              // console.log(error);
              // this.closeWebSocket()
              this.websocket = new WebSocket(this.path);
              this.initWebSocket();
            }
          }, 5000);
        } else {
          alert("当前浏览器 Not support websocket");
        }
        // let data = JSON.stringify({
        //   userId: this.userInfo.userId,
        //   token: this.userInfo.token
        // });
        // isPay(data).then(res => {
        //   console.log(res);
        // });
      },
      // socket的状态
      initWebSocket() {
        //连接错误
        this.websocket.onerror = this.setErrorMessage;
        //连接成功
        this.websocket.onopen = this.setOnopenMessage;
        //收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage;
        //连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage;
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload;
      },
      // 连接错误
      setErrorMessage() {
        alert("WebSocket连接发生错误");
      },
      // 第一次连接
      setOnopenMessage() {
        console.log("WebSocket连接成功");
      },
      // 获取socket的反馈
      setOnmessageMessage(e) {
        console.log(e);
        if (e.data == "心跳") {
          return;
        }
        if (e.data == "支付成功！") {
          this.setOncloseMessage();
        }
      },
      // 关闭socket
      setOncloseMessage() {
        this.websocket.close();
        clearInterval(this.heartJump);
        this.heartJump = null;
        this.isPay = false;
        this.isScan = false;
        this.paymentSuccess = true;
        this.vipId = "";
        console.log("关闭socket");
        if (this.wxOrZfb == 0) {
          document.getElementById("qrcode").innerHTML = "";
        } else if (this.wxOrZfb == 1) {
          document.getElementById("wxcode").innerHTML = "";
        }
      },
      // 取消支付
      cancelPay() {
        console.log(this.isPay);
        // 关闭二维码
        if (this.wxOrZfb == 0) {
          document.getElementById("qrcode").innerHTML = "";
        } else if (this.wxOrZfb == 1) {
          document.getElementById("wxcode").innerHTML = "";
        }
        this.chooseYear = "one";
        this.isScan = false;
        this.isPay = false;
        this.vipId = "";
      },
      // 确认支付
      surePay() {
        this.paymentSuccess = !this.paymentSuccess;
      },
    },
    watch: {
      cityArray: function () {
        this.calculatePrice()
      }
    }
  };
</script>

<style scoped>
  .qr-code {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .user-data {
    width: 934px;
    height: 100%;
    margin-left: 30px;
  }

  #qrcode {
    position: absolute;
    z-index: 99;
    top: 44%;
    left: 37%;
  }

  #wxcode {
    position: absolute;
    z-index: 99;
    top: 44%;
    left: 37%;
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

  /*左边功能栏*/
  .vip-left {
    position: fixed;
    left: 350px;
  }

  /*右边我的会员中心*/
  .mg-vip {
    width: 934px;
    height: 100%;
    margin-left: 13.5%;
    padding-bottom: 7%;
    position: relative;
  }

  /*会员中心名称以及等级*/
  .vip-name {
    width: 934px;
    height: 88px;
    background: rgba(255, 255, 255, 1);
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 20px;
  }

  .user-name {
    display: flex;
    align-items: center;
  }

  .user-name span {
    font-weight: 500;
  }

  .user-grade {
    display: flex;
    align-items: center;
  }

  .user-grade span {
    color: #ffd124;
  }

  /*会员等级分布*/
  .grade-distribute {
    width: 994px;
    background: rgba(255, 255, 255, 1);
    /* padding: 30px; */
  }

  .grade-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
    margin-right: 100px;
    margin-bottom: 20px;
  }

  .grade-content {
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
    padding: 25px 0;
    border-top: 1px solid #f8f8f8;
  }

  .grade-content p:nth-of-type(1) {
    width: 30px;
    text-align: center;
  }

  .grade-content p:nth-of-type(2) {
    width: 145px;
    text-align: center;
  }

  .grade-content p:nth-of-type(3) {
    width: 100px;
  }

  .grade-content p:nth-of-type(4) {
    width: 120px;
  }

  .grade-content p:nth-of-type(5) {
    width: 95px;
  }

  .grade-content p:nth-of-type(6) {
    width: 100px;
  }

  .grade-content p:nth-of-type(7) {
    width: 100px;
  }

  .grade-content p:nth-of-type(8) {
    width: 88px;
    text-align: center;
    margin-right: 75px;
  }

  .transaction {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .transaction_disable {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #cccccc;
    border-radius: 4px;

    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }


  /*会员标题*/
  .vip-title {
    width: 934px;
    height: 84px;
    background: rgba(255, 255, 255, 1);
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(86, 86, 86, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    margin-top: 20px;
  }

  .vip-title p {
    margin: 0 20px;
  }

  /*2个斜杠*/
  .oblique {
    display: flex;
    align-items: center;
  }

  .oblique span {
    width: 6px;
    height: 20.6px;
    background: linear-gradient(180deg,
        rgba(153, 201, 255, 1) 0%,
        rgba(2, 122, 255, 1) 100%);
    border-radius: 2px;
    transform: rotate(25deg);
    display: block;
    margin-right: 8px;
  }

  /*定制服务*/
  .custom-service {
    width: 934px;
    background: rgba(255, 255, 255, 1);
    padding: 30px;
    margin-top: 20px;
  }

  .custom-title {
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 50px;
  }

  .custom-cont {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    text-indent: 2em;
    margin-bottom: 30px;
  }

  .contact-us p {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 30px;
  }

  .inpt-name {
    width: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 1px solid rgba(217, 217, 217, 1);
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
    padding: 14px 0 14px 20px;
    margin-bottom: 20px;
  }

  .contact-us input {
    display: block !important;
  }

  .contact-us textarea {
    width: 400px;
    height: 179px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 1px solid rgba(217, 217, 217, 1);
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
    padding: 14px 0 0 20px;
  }

  .contact-us span {
    width: 400px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    display: block;
    margin-top: 30px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    padding: 0 12px;
    cursor: pointer;
  }

  /*办理会员  */
  /*遮罩层*/
  .shade {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 8;
  }

  .pay-grade {
    width: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 0;
    z-index: 9;
  }

  .pay-title {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    text-align: center;
  }

  .pay-function {
    text-align: center;
  }

  .pay-price {
    display: flex;
    margin-left: 18%;
    padding: 24px 0;
  }

  .price {
    width: 70px;
    text-align-last: justify;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin-right: 20px;
  }

  .choose-price {
    width: 57%;
    display: flex;
    justify-content: space-between;
  }

  .choose-price p {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    text-align: left;
    margin-bottom: 10px;
  }

  .price-radio {
    position: relative;
    height: 20px;
    margin-bottom: 15px;
  }

  .choose-pay {
    display: flex;
    margin-left: 18%;
    margin-top: 5%;
  }

  .pay {
    width: 70px;
    text-align-last: justify;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin-right: 20px;
  }

  .radio {
    position: relative;
    height: 55px;
  }

  .pay-img {
    display: inline-block;
    margin-right: 12px;
  }

  .pay-img img {
    width: 30px;
    height: 30px;
    margin-bottom: 22px;
  }

  .pay-fun p {
    width: 60px;
    height: 55px;
    text-align-last: justify;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin-right: 60px;
  }

  .pay-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pay-btn p:nth-of-type(1) {
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

  .pay-btn p:nth-of-type(2) {
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

  #paixu1 {
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
    /*border-radius: 50%;*/
    border: 1px solid #d8d8d8;
    margin-right: 6px;
    vertical-align: bottom;
  }

  #paixu1:checked+.first::before {
    width: 19px;
    height: 19px;
    background-color: #027aff;
    border: none;
  }

  #paixu1:checked+.first::after {
    display: inline-block;
    content: "√";
    color: #ffffff;
    width: 1px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: 4px;
    bottom: 8px;
    border: none;
  }

  #paixu2 {
    display: none;
  }

  .second::before {
    display: inline-block;
    content: "";
    width: 16px;
    height: 16px;
    border: 1px solid #d8d8d8;
    margin-right: 6px;
    vertical-align: bottom;
  }

  #paixu2:checked+.second::before {
    width: 19px;
    height: 19px;
    background-color: #027aff;
    border: none;
  }

  #paixu2:checked+.second::after {
    display: inline-block;
    content: "√";
    color: white;
    width: 1px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: 4px;
    bottom: 8px;
    border: none;
  }

  #paixu3 {
    display: none;
  }

  .three::before {
    display: inline-block;
    content: "";
    width: 16px;
    height: 16px;
    border: 1px solid #d8d8d8;
    margin-right: 6px;
    vertical-align: bottom;
  }

  #paixu3:checked+.three::before {
    width: 19px;
    height: 19px;
    background-color: #027aff;
    border: none;
  }

  #paixu3:checked+.three::after {
    display: inline-block;
    content: "?";
    color: white;
    width: 1px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: 4px;
    bottom: 8px;
    border: none;
  }

  #paixu4 {
    display: none;
  }

  .four::before {
    display: inline-block;
    content: "";
    width: 16px;
    height: 16px;
    border: 1px solid #d8d8d8;
    margin-right: 6px;
    vertical-align: bottom;
  }

  #paixu4:checked+.four::before {
    width: 19px;
    height: 19px;
    background-color: #027aff;
    border: none;
  }

  #paixu4:checked+.four::after {
    display: inline-block;
    content: "?";
    color: white;
    width: 1px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: 4px;
    bottom: 8px;
    border: none;
  }

  /*扫码支付*/
  .close-pay {
    position: absolute;
    top: -12%;
    right: 0;
    cursor: pointer;
  }

  .scan-code {
    width: 430px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    z-index: 999;
  }

  .pay-amount {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 30px;
  }

  .pay-amount span {
    font-weight: 600;
    color: rgba(2, 122, 255, 1);
    margin-left: 20px;
  }

  .pay-caption {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
  }

  .two-code {
    width: 200px;
    height: 180px;
    border: 1px solid rgba(224, 224, 224, 1);
    padding: 15px;
    margin: 20px auto;
  }

  .two-code img {
    width: 170px;
    height: 170px;
  }

  .pay-way {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e0e0e0;
  }

  .pay-way img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  .pay-way p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(26, 172, 235, 1);
  }

  .elect-pay {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
    margin-top: 20px;
  }

  /*支付成功*/
  .pay-success {
    width: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .pay-success p:nth-of-type(1) {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    padding: 30px 0;
  }

  .pay-success p:nth-of-type(2) {
    width: 140px;
    height: 40px;
    line-height: 40px;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin: 0 auto;
    margin-bottom: 30px;
    cursor: pointer;
  }

  .city-title {
    width: 100%;
    border-bottom: 2px solid #E8E8E8;
    padding: 30px 0;
    position: relative;
  }

  .title-head {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #E8E8E8;
    padding-bottom: 30px;
  }

  .title-name {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin: 0 30px;
  }

  .citys {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }

  .shu {
    width: 4px;
    height: 20px;
    background: rgba(2, 122, 255, 1);
    margin-right: 26px;
  }

  .first-city {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
  }

  .city-list {
    margin-left: 30px;
    font-size: 16px !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    margin-top: 30px;
  }

  .selete-city {
    display: flex;
    align-items: center;
  }

  .select-key {
    width: 174px;
    height: 35px;
    font-size: 16px;
    border-radius: 5px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(181, 181, 181, 1);
  }

  .provinces-list {
    width: 174px;
    height: 100px;
    overflow-y: auto;
    border: 1px solid #E9E9E9;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    z-index: 99;
    margin-left: 30px;
    position: absolute;
    background: #f7f7f7;
  }

  .provinces-lists {
    width: 300px;
    height: 100px;
    overflow-y: auto;
    border: 1px solid #E9E9E9;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    z-index: 0;
    margin-left: 30%;
    position: absolute;
    padding: 10px;
  }

  .city-position {
    margin-left: 23.5%;
  }

  .provinces {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(2, 122, 255, 1);
    margin: 10px 15px 10px 10px;
    cursor: pointer;
  }

  .checked {
    margin-left: 10px;
  }

  .prece-list {
    display: flex;
    align-items: center;
    margin-top: 10%;
  }

  .pay-money {
    width: 240px;
    height: 105px;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 1px solid rgba(196, 196, 196, 1);
    margin-left: 30px;
    position: relative;
  }

  .pay-pri {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 22px;
  }

  .pay-pri p {
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
    margin-right: 6px;
  }

  .vip-date {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(171, 171, 171, 1);
  }

  .active {
    background: rgba(242, 248, 255, 1);
    border: 1px solid rgba(2, 122, 255, 1);
  }

  .recommended {
    position: absolute;
    top: -5px;
    right: 0;
    width: 49px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
    background: rgba(2, 122, 255, 1);
    border-radius: 0px 10px 0px 10px;
  }

  .buy-now {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 400px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    /* border: none; */
    margin-top: 156px;
    margin-bottom: 50px;
  }

  .el-checkbox {
    width: 70px !important;
    z-index: 0;
  }

  .mask {
    background: white;
    z-index: 10;
    width: 1000px;
    height: 1000px;
    opacity: 0;
    position: absolute;
  }

  .zindex {
    z-index: -1;
  }

  .select-time {
    width: 80px;
    height: 30px;
    border-radius: 8px;
    color: rgba(181, 181, 181, 1);
  }

  @media screen and (min-width: 1200px) and (max-width: 1500px) {
    .vip-left {
      left: 60px;
    }

    .mg-vip {
      margin-left: 22%;
    }

    .vip-name {
      width: 888px;
    }

    .grade-distribute {
      width: 888px;
    }

    .vip-title {
      width: 888px;
    }

    .custom-service {
      width: 888px;
    }
  }
</style>