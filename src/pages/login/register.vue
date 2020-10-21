<template>
  <div>
    <div class="logo">
      <p class="logo-title">logo</p>
      <div class="user-register">
        <p></p>
        <div>用户注册</div>
        <p></p>
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="message">
      <div class="user-inpt">
        <div class="inpt-list">
          <input type="text" placeholder="请输入真实姓名" autocomplete="off" @blur="isName" id="name" v-model="userName" />
          <img src="../../../static/img/for.png" v-if="trueName==true" alt />
          <p v-if="trueName==false">*</p>
        </div>
        <div class="inpt-list">
          <input type="text" placeholder="请输入联系电话" autocomplete="off" @blur="isPhone" id="phone" maxlength="11"
            v-model="userPhone" />
          <img src="../../../static/img/for.png" v-if="truePhone==true" alt />
          <p v-if="truePhone==false">*</p>
        </div>
        <div class="inpt-list">
          <input type="text" placeholder="请输入邮箱" autocomplete="off" @blur="isEmail" id="e-mail" v-model="userEmail" />
          <img src="../../../static/img/for.png" alt v-if="trueEmail==true" />
          <p v-if="trueEmail==false">*</p>
        </div>
        <div class="inpt-list">
          <input type="text" placeholder="请输入企业名称" autocomplete="off" @blur="isCompany" id="company"
            v-model="company" />
          <img src="../../../static/img/for.png" v-if="trueCompany==true" alt />
          <p v-if="trueCompany==false">*</p>
        </div>
        <div class="inpt-list">
          <input type="text" placeholder="请输入品牌名称" autocomplete="off" @blur="isBrand" id="brand" v-model="brand" />
          <img src="../../../static/img/for.png" v-if="trueBrand==true" alt />
          <p v-if="trueBrand==false">*</p>
        </div>
      </div>
      <!-- 上传图片 -->
      <div class="upload-img">
        <div class="upload">上传营业执照</div>
        <div class="img-list">
          <div class="upload-btn">
            <input type="file" accept="image/*" @change="upload($event)" />
            <img src="../../../static/img/tianjia.png" alt />
          </div>
          <div class="imgs" v-for="(imgList,i) in Images" :key="i">
            <img :src="imgList" alt />
          </div>
        </div>
      </div>
      <!-- 注册按钮 -->
      <div class="register">
        <div class="register-btn" @click="register()">注册</div>
        <div class="login">
          已有账号，立即
          <span @click="login()">登录</span>
        </div>
      </div>
    </div>
    <!-- 注册成功弹框 -->
    <!-- 背景 -->
    <div class="back" v-if="isShow==true"></div>
    <div class="pop-up" v-if="isShow==true">
      <div class="hint">温馨提示</div>
      <div class="success">账号申请成功，平台会线下联系您！</div>
      <div class="contact">公司联系方式：19941207730</div>
      <div class="yes" @click="sure()">好的</div>
    </div>
  </div>
</template>
<script>
  // 引入接口
  import { register } from "@/api/index/index.js";

  export default {
    data() {
      return {
        // 控制弹框显示隐藏
        isShow: false,
        // 用户名
        userName: "",
        trueName: false,
        // 用户电话
        userPhone: "",
        truePhone: false,
        // 用户邮箱
        userEmail: "",
        trueEmail: false,
        //  企业名称
        company: "",
        trueCompany: false,
        //  品牌名称
        brand: "",
        trueBrand: false,
        // 上传的图片
        Images: []
      };
    },
    mounted() { },
    methods: {
      //上传图片
      upload(e) {
        console.log(e);
        let file = e.target.files;
        var formData = new FormData();
        for (let i = 0; i <= file.length; i++) {
          formData.append("file", file[i]);
        }
        this.upLoad(formData);
      },
      //上传
      //
      upLoad(formData) {
        let that = this;
        this.$axios({
          method: "post",
          url: "https://www.hzdxq.cn/pointcoil/admin/adminUpload/mapUpload",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formData
        })
          .then(function (res) {
            console.log(res.data);
            that.Images.push(res.data.data);
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      // 注册接口
      register() {
        if (
          this.trueName &&
          this.truePhone &&
          this.trueEmail &&
          this.trueCompany &&
          this.trueBrand
          // this.Images.length
        ) {
          let datas = JSON.stringify({
            userName: this.userName,
            userPhone: this.userPhone,
            userEmail: this.userEmail,
            enterpriseName: this.company,
            makeName: this.brand,
            businessLicense: this.Images.join(",")
          });
          register(datas).then(res => {
            console.log(res);
            if (res.code == "000000") {
              this.userName = "";
              this.userPhone = "";
              this.userEmail = "";
              this.company = "";
              this.brand = "";
              this.trueName = false;
              this.truePhone = false;
              this.trueEmail = false;
              this.trueCompany = false;
              this.trueBrand = false;
              this.Images = [];
              this.isShow = true;
            } else {
              alert(res.msg);
            }
          });
        } else {
          alert("请将信息填写完整");
        }
      },
      // 登录
      login() {
        this.$router.push({ path: "/login" });
      },
      // 点击好的
      sure() {
        this.isShow = false;
      },
      // 校验姓名
      isName() {
        let reg2 = /^[\u4e00-\u9fa5][\u4e00-\u9fa5]{1,5}$/;
        if (reg2.test(this.userName) == true) {
          this.trueName = true;
        } else {
          this.trueName = false;
        }
      },
      // 校验电话
      isPhone() {
        let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (reg.test(this.userPhone) == true) {
          this.truePhone = true;
        } else {
          this.truePhone = false;
        }
      },
      // 校验邮箱
      isEmail() {
        let reg = /^\w+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
        if (reg.test(this.userEmail) == true) {
          this.trueEmail = true;
        } else {
          this.trueEmail = false;
        }
      },
      // 校验企业名称
      isCompany() {
        // 中英文公司名称
        let reg = /^(([\u4e00-\u9fff]{2,50})|([a-z\.\s\,]{2,50}))$/i;
        if (reg.test(this.company) == true) {
          this.trueCompany = true;
        } else {
          this.trueCompany = false;
        }
      },
      // 校验品牌名称
      isBrand() {
        // 有内容
        if (this.brand) {
          this.trueBrand = true;
        } else {
          this.trueBrand = false;
        }
      }
    }
  };
</script>

<style scoped>
  .logo {
    width: 47.5%;
    margin: 0 auto;
  }

  .logo-title {
    font-size: 36px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: rgba(122, 122, 122, 1);
    margin-top: 20px;
    margin-bottom: 60px;
  }

  .user-register {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
  }

  .user-register p {
    width: 497px;
    height: 1px;
    border: 1px solid #c4c4c4;
  }

  .user-register div {
    width: 146px;
    font-size: 36px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: rgba(74, 74, 74, 1);
    margin: 0 30px;
    white-space: nowrap;
  }

  /* 用户信息 */
  .message {
    width: 100%;
    margin: 0 auto;
  }

  .inpt-list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }

  .inpt-list input {
    width: 400px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid rgba(217, 217, 217, 1);
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
    padding-left: 20px;
  }

  .inpt-list p {
    width: 13px;
    height: 33px;
    margin-left: 10px;
    font-size: 24px;
    color: #fd1616;
  }

  .inpt-list img {
    width: 16px;
    height: 16px;
    margin-left: 10px;
  }

  /* 上传图片 */
  .upload-img {
    width: 440px;
    margin: 0 auto;
  }

  .upload {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 20px;
  }

  .upload-btn input {
    width: 100px;
    height: 100px;
    opacity: 0;
  }

  .upload-btn img {
    width: 100px;
    height: 100px;
    z-index: -1;
  }

  .upload-btn {
    position: relative;
  }

  .upload-btn img {
    position: absolute;
    left: 0;
    top: 0;
  }

  /* 注册按钮 */
  .register {
    text-align: center;
    margin-top: 40px;
  }

  .register-btn {
    width: 440px;
    height: 50px;
    line-height: 50px;
    background: linear-gradient(90deg,
        rgba(253, 177, 102, 1) 0%,
        rgba(254, 143, 95, 1) 100%);
    border-radius: 10px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    margin: 0 auto;
    cursor: pointer;
  }

  .img-list {
    display: flex;
    flex-wrap: wrap;
  }

  .imgs img {
    width: 140px;
    height: 140px;
    margin-left: 30px;
  }

  .login {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin-top: 30px;
    padding-bottom: 50px;
  }

  .login span {
    color: #ff9160;
    cursor: pointer;
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
</style>
