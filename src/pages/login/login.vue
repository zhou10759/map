<template>
  <div>
    <!-- 头部 -->
    <top></top>
    <div class="login-back">
      <div class="register">
        <div class="login-left">
          <p>logo</p>
          <img src="../../../static/img/background.png" alt />
        </div>
        <div class="phone-login">
          <p>欢迎登陆</p>
          <input
            type="text"
            placeholder="请输入手机号码登陆"
            v-model="telephone"
            maxlength="11"
            class="phone"
            autocomplete="on"
          />
          <div class="get-code">
            <input type="text" placeholder="请输入验证码" v-model="securityCode" class="auth-code" />
            <div v-if="show" class="send-code" @click="sendCode()">发送验证码</div>
            <div
              v-if="!show"
              class="send-code"
              style="background:#dcdcdc;cursor:not-allowed;"
            >{{count}}s后重试</div>
          </div>
          <div class="logn" @click="login()">登陆</div>
          <div class="apply-now" @click="applyNow()">立即申请</div>
        </div>
      </div>
      <!-- <div class="bottom">Copyright @ 2009-2019 All Rights Reserved 粤ICP备10067299号</div> -->
    </div>
  </div>
</template>
<script>
import top from "@/components/top";
import bottom from "@/components/bottom";
// 引入接口
import { sendMessage, login, getMangerInfo } from "@/api/index/index.js";

export default {
  data() {
    return {
      //验证码按钮
      show: true,
      //剩余秒数
      count: "",
      //计时器
      timer: null,
      // 手机号
      telephone: "",
      // 验证码
      securityCode: ""
    };
  },
  components: { top, bottom },
  mounted() {
    //   移除登录注册按钮  新闻的切换按钮
    $(".login").remove();
    $(".show-hide").remove();
    $(".trade").remove();
    console.log(this.$cookies.get("phone"));
    if (this.$cookies.get("phone")) {
      this.telephone = this.$cookies.get("phone");
      if (
        this.telephone == "13989838220" ||
        this.telephone == "17612714215" ||
        this.telephone == "13967693028"
      ) {
        let data = {
          phoneNumber: this.telephone
        };
        getMangerInfo(data).then(res => {
          console.log(res, "是否登录");
          if (res.code == "000000") {
            if (res.data.flag == "1") {
              this.$router.push({
                path: "/businessIndex"
              });
              localStorage.setItem("sonId", res.data.sonId);
              let userMessage = {
                userId: res.data.userId,
                token: res.data.token,
                memberLevel: res.data.memberLevel,
                isSubAccount: res.data.isSubAccount,
                starTime: res.data.starTime,
                endTime: res.data.endTime,
                admin: res.data.admin,
                userName: res.data.userName
              };
              // 用户信息存cookie  7天有效期
              this.$cookies.set("userInfo", userMessage, "7d");
              // 保存手机号，以防再次输入
              this.$cookies.set("phone", this.telephone, "7d");
            }
          }
        });
      }
    }
  },
  methods: {
    // 登录按钮
    login() {
      // 固定手机号在cookies有效期内可以直接进入
      // console.log(this.telephone, "手机号");
      // console.log(this.$cookies.get("userInfo"), "信息");
      // if (
      //   (this.telephone == "13989838220" || this.telephone == "17612714215") &&
      //   this.$cookies.get("userInfo")
      // ) {
      //   this.$router.push({
      //     path: "/businessIndex"
      //   });
      // } else
      if (!this.telephone) {
        alert("请先填写手机号");
      } else if (!this.securityCode) {
        alert("请填写验证码");
      } else {
        let data = JSON.stringify({
          phoneNumber: this.telephone,
          code: this.securityCode
        });
        console.log(this.telephone);
        console.log(this.securityCode);
        console.log(data);
        login(data).then(res => {
          console.log(res);
          if (res.code == "000000") {
            this.$router.push({
              path: "/businessIndex"
            });
            localStorage.setItem("sonId", res.data.sonId);
            let userMessage = {
              userId: res.data.userId,
              token: res.data.token,
              memberLevel: res.data.memberLevel,
              isSubAccount: res.data.isSubAccount,
              starTime: res.data.starTime,
              endTime: res.data.endTime,
              admin: res.data.admin,
              userName: res.data.userName
            };
            // 用户信息存cookie  7天有效期
            this.$cookies.set("userInfo", userMessage, "7d");
            // 保存手机号，以防再次输入
            this.$cookies.set("phone", this.telephone, "7d");
          } else if (res.code == "000001") {
            alert(res.msg);
          } else if (res.code == "000004") {
            alert("验证码输入错误");
          }
        });
      }
    },
    // 发送验证码
    sendCode() {
      if (!/^1[3456789]\d{9}$/.test(this.telephone)) {
        alert("手机号码有误，请重填");
      } else {
        let that = this;
        // 发送验证码接口
        let data = JSON.stringify({
          phoneNumber: this.telephone
        });
        sendMessage(data).then(res => {
          console.log(res);
          if (res.code == "000003") {
            alert("手机号码有误，请重填");
          } else if (res.code == "001002") {
            alert("手机号还未审核通过,即将跳转注册页");
            setTimeout(() => {
              this.$router.push({ path: "/register" });
            }, 1500);
          } else if (res.code == "000000") {
            this.show = false;
            let allTime = 60;
            this.count = allTime - 1;
            this.timer = setInterval(back, 1000);
            function back() {
              if (that.count > 1 && that.count <= allTime) {
                that.count--;
              } else {
                that.show = true;
                clearInterval(that.timer);
                that.timer = null;
              }
            }
          }
        });
      }
    },
    // 立即申请
    applyNow() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>
<style scoped>
.login-back {
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url("../../../static/img/backgroundI.png");
  background-size: 100% 100%;
}

.register {
  display: flex;
  justify-content: center;
  padding-top: 7%;
  padding-left: 20%;
  width: 60%;
}

.login-left {
  width: 50%;
  position: relative;
}

.login-left p {
  position: absolute;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  height: 100%;
  font-size: 60px;
  font-family: SingKaiEG-Bold-GB, SingKaiEG-Bold;
  font-weight: normal;
  color: rgba(122, 122, 122, 1);
  background: linear-gradient(
    97deg,
    rgba(0, 230, 244, 1) 2%,
    rgba(57, 99, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 10;
}

.register img {
  width: 600px;
  height: 580px;
  position: absolute;
  right: 0;
}

.phone-login {
  width: 50%;
  height: 580px;
  background: rgba(255, 255, 255, 1);
  border-radius: 0px 8px 8px 0px;
  text-align: center;
  margin-bottom: 40px;
}

.phone-login p {
  font-size: 36px;
  font-family: PingFang-SC-Heavy, PingFang-SC;
  font-weight: 800;
  color: rgba(74, 74, 74, 1);
  margin-top: 30px;
  margin-bottom: 70px;
}

.phone {
  width: 70%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: 1px solid rgba(217, 217, 217, 1);
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(196, 196, 196, 1);
  padding-left: 20px;
  margin-bottom: 40px;
  margin-left: 20px;
}

.get-code {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-bottom: 40px;
}

.auth-code {
  width: 60%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: 1px solid rgba(217, 217, 217, 1);
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(196, 196, 196, 1);
  padding-left: 26px;
  margin-right: 30px;
}

.send-code {
  width: 40%;
  height: 50px;
  line-height: 50px;
  background: linear-gradient(
    90deg,
    rgba(253, 177, 102, 1) 0%,
    rgba(254, 143, 95, 1) 100%
  );
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}

.logn {
  width: 60%;
  height: 50px;
  line-height: 50px;
  background: linear-gradient(
    90deg,
    rgba(253, 177, 102, 1) 0%,
    rgba(254, 143, 95, 1) 100%
  );
  border-radius: 10px;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
}

.apply-now {
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(255, 145, 96, 1);
  margin-top: 30px;
  cursor: pointer;
}

.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(139, 139, 139, 1);
  background: #e1e1e1;
}

@media screen and(min-width: 1200px) {
  .register img {
    width: 500px;
  }

  .phone-login {
    width: 500px;
  }
}
</style>