<template>
  <div>
    <div class="main-index">
      <!--左边用户信息功能栏-->
      <!--      <navigation class="info-left"></navigation>-->
      <navigation></navigation>
      <!--右边我的用户数据-->
      <div class="user-data">
        <div class="mine-user">
          <p>我的用户</p>
          <p @click="createAccount">创建</p>
        </div>
        <div class="user-messages">
          <div class="message-name">
            <p style="width:200px">电话</p>
            <p style="width:120px">姓名</p>
            <p style="width:100px">性别</p>
            <p style="width:300px">邮箱</p>
            <p style="width:60px">管理</p>
          </div>
          <div class="no-account" v-if="userMessages.total==0">您未有子账号</div>
          <div class="all-messages" v-for="(messsage,k) in userMessages.data" :key="k">
            <p style="width:200px">{{messsage.accountPhone}}</p>
            <p style="width:120px">{{messsage.accountName}}</p>
            <p v-if="messsage.accountSex==0" style="width:100px">女</p>
            <p v-if="messsage.accountSex==1" style="width:100px">男</p>
            <p style="width:300px">{{messsage.accountEmail}}</p>
            <p class="delete" @click="removeUser(messsage.id)">删除</p>
            <!-- <p style="width:200px">188449966994</p>
            <p style="width:120px">发多少</p>
            <p style="width:100px">男</p>
            <p style="width:300px">619341169@qq.com</p>
            <p class="delete" @click="removeUser(messsage.id)" style="width:60px">删除</p> -->
          </div>
          <!--分页-->
          <div class="page">
            <p>共{{userMessages.total}}条</p>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="1" layout="prev, pager, next, jumper"
                :total="userMessages.count"></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <!--创建账号弹框-->
      <div class="shade" v-if="isCreate"></div>
      <div class="create-account" v-if="isCreate">
        <div class="create-head">
          <p>创建账号</p>
          <img src="../../../static/img/ShutdownII.png" @click="closeCreate" alt />
        </div>
        <div class="create-cont">
          <div class="account-info">
            <p>姓名</p>
            <input type="text" placeholder="请输入姓名" v-model="userName" />
          </div>
          <div class="account-info">
            <p class="account-sex">性别</p>
            <select @change="changeSex()" id="seleted">
              <option value disabled selected>请选择性别</option>
              <option v-for="(item,index) in sexList" :key="index">{{item.name}}</option>
            </select>
          </div>
          <div class="account-info">
            <p>手机号</p>
            <input type="text" placeholder="请输入手机号码（账号）" maxlength="11" v-model="userPhone" />
          </div>
          <div class="account-info">
            <p>邮箱</p>
            <input type="text" placeholder="请输入邮箱" v-model="userEmail" />
          </div>
        </div>
        <div class="create-btn">
          <p @click="closeCreate">取消</p>
          <p @click="createSuccess">立即创建</p>
        </div>
      </div>
      <!--创建账号成功-->
      <div class="create-success" v-if="isSuccess">创建成功</div>
      <!--删除该用户-->
      <div class="shade" v-if="isDelete"></div>
      <div class="remove-user" v-if="isDelete">
        <div class="remove-title">温馨提示</div>
        <div class="remove-cont">是否删除该用户</div>
        <div class="never-hint">
          <el-checkbox v-model="isHint">不再提示</el-checkbox>
        </div>
        <div class="remove-btn">
          <p @click="closeDelete">取消</p>
          <p @click="deleteUser">删除</p>
        </div>
      </div>
      <!--上限创建账号,升级会员-->
      <div class="shade" v-if="upVip"></div>
      <div class="vip-grade" v-if="upVip">
        <div class="vip-title">温馨提示</div>
        <div class="vip-cont">
          温馨提示您的账号权限无法创建更多子账号，
          <br />如需帮助，请联系网站管理员
        </div>
        <div class="vip-btn">
          <p @click="cancelVip">确定</p>
          <!-- <p @click="goVip">立即升级</p> -->
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
  import {
    mySubAccount,
    createSubAccount,
    deleteSubAccount
  } from "@/api/index/index.js";
  export default {
    data() {
      return {
        userMessages: [],
        // 分页默认页
        currentPage: 1,
        // 性别
        sexList: [
          {
            name: "男"
          },
          {
            name: "女"
          }
        ],
        // 创建账号的显示隐藏
        isCreate: false,
        // 是否还能创建子账号  升级会员
        upVip: false,
        // 创建账号是否成功
        isSuccess: false,
        // 不再提示
        isHint: false,
        // 是否删除
        isDelete: false,
        // 用户信息
        userInfo: "",
        // 创建用户的姓名
        userName: "",
        // 创建用户的手机号码
        userPhone: "",
        // 创建用户的邮箱
        userEmail: "",
        // 创建用户的性别
        userSex: "",
        // 删除子用户的id
        userDelete: ""
      };
    },
    components: { bottom, navigation },
    created() {
      console.log(this.$route.query.barIndex);
      // 获取cookie的用户信息
      let user = this.$cookies.get("userInfo");
      this.userInfo = user;
      console.log(user);
    },
    mounted() {
      // 获取我的用户列表
      this.getMyuserList();
    },
    methods: {
      // 获取我的用户列表
      getMyuserList() {
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          page: this.currentPage
        });
        mySubAccount(data).then(res => {
          console.log(res);
          this.userMessages = res;
        });
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      // 选择性别
      changeSex() {
        // 下标
        let index = $("#seleted")[0].selectedIndex - 1;
        this.userSex = this.sexList[index].name;
      },
      // 创建账号弹框
      createAccount() {
        let a = 1;
        this.isCreate = !this.isCreate;
        if (a == 1) {
          // this.upVip = !this.upVip;
        }
      },
      // 关闭创建账号
      closeCreate() {
        this.isCreate = !this.isCreate;
        this.userName = "";
        this.userPhone = "";
        this.userEmail = "";
      },
      // 创建成功
      createSuccess() {
        let that = this;
        let sex = "";
        if (this.userSex == "女") {
          sex = 0;
        } else if (this.userSex == "男") {
          sex = 1;
        }
        if (!this.userEmail) {
          alert("请填写邮箱");
        } else {
          let datas = JSON.stringify({
            userId: this.userInfo.userId,
            token: this.userInfo.token,
            memberLevel: this.userInfo.memberLevel,
            accountName: this.userName,
            accountSex: sex,
            accountPhone: this.userPhone,
            accountEmail: this.userEmail
          });
          createSubAccount(datas).then(res => {
            console.log(res);
            if (res.code == "000000") {
              that.isCreate = !that.isCreate;
              that.isSuccess = !that.isSuccess;
              that.userName = "";
              that.userPhone = "";
              that.userEmail = "";
              that.getMyuserList();
              setTimeout(function () {
                that.isSuccess = !that.isSuccess;
              }, 1000);
            } else if (res.code == "001014") {
              that.isCreate = !that.isCreate;
              that.upVip = !that.upVip;
              that.userName = "";
              that.userPhone = "";
              that.userEmail = "";
            } else {
              alert(res.msg);
            }
          });
        }
      },
      // 删除该用户
      removeUser(e) {
        console.log(e);
        console.log(this.isHint);
        this.userDelete = e;
        if (this.isHint == true) {
          let data = JSON.stringify({
            userId: this.userInfo.userId,
            token: this.userInfo.token,
            subAccountId: e
          });
          deleteSubAccount(data).then(res => {
            console.log(res);
            if (res.code == "000000") {
              this.getMyuserList();
            } else {
              alert(res.msg);
            }
          });
        } else {
          this.isDelete = !this.isDelete;
        }
      },
      // 删除该用户
      deleteUser() {
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          subAccountId: this.userDelete
        });
        deleteSubAccount(data).then(res => {
          console.log(res);
          if (res.code == "000000") {
            this.isDelete = !this.isDelete;
            this.getMyuserList();
          } else {
            alert(res.msg);
          }
        });
      },
      // 取消删除该用户
      closeDelete() {
        this.isDelete = !this.isDelete;
        this.isHint = false;
      },
      // 取消升级会员
      cancelVip() {
        this.upVip = !this.upVip;
      },
      // 升级会员跳转
      goVip() {
        this.$router.push({ path: "/vipCenter" });
      }
    },
    watch: {
      currentPage: function () {
        this.getMyuserList();
      }
    }
  };
</script>

<style scoped>
  .info-left {
    height: 95% !important;
  }

  .main-index {
    width: 100%;
    height: 95%;
    background: #f7f7f7;
    display: flex;
    justify-content: center;
    position: absolute;
  }

  .user-data {
    width: 934px;
    height: 100%;
    margin-left: 30px;
  }

  .my-users {
    width: 100%;
    height: 100%;
    display: flex;
    background: #f7f7f7;
    justify-content: center;
    position: absolute;
  }

  /*右边我的用户数据*/
  .user-datas {
    width: 934px;
    height: 100%;
    margin-left: 30px;
  }

  .mine-user {
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

  .mine-user p:nth-of-type(2) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .user-messages {
    width: 934px;
    background: rgba(255, 255, 255, 1);
    padding: 30px;
  }

  .message-name {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
    padding-bottom: 20px;
    justify-content: space-between;
    text-align: center;
  }

  .message-name p:nth-of-type(1) {
    width: 200px;
  }

  .message-name p:nth-of-type(2) {
    width: 185px;
  }

  .message-name p:nth-of-type(3) {
    width: 155px;
  }

  .message-name p:nth-of-type(4) {
    width: 290px;
  }

  .no-account {
    text-align: center;
    font-size: 20px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
  }

  .all-messages {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-top: 1px solid #f8f8f8;
    text-align: center;
    justify-content: space-between;
  }

  .all-messages p {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
  }

  .all-messages p:nth-of-type(1) {
    width: 200px;
  }

  .all-messages p:nth-of-type(2) {
    width: 185px;
  }

  .all-messages p:nth-of-type(3) {
    width: 155px;
  }

  .all-messages p:nth-of-type(4) {
    width: 290px;
  }

  .all-messages p:nth-of-type(5) {
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(230, 46, 23, 1);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  /*分页*/
  .page {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }

  .page p {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
    margin-right: 127px;
  }

  /*创建账号弹框*/
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

  /*创建账号*/
  .create-account {
    width: 800px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
  }

  .create-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    padding-bottom: 30px;
    border-bottom: 1px solid #e1e1e1;
  }

  .create-head img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .account-info {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
    margin-top: 30px;
  }

  .account-info p {
    width: 55px;
    text-align-last: justify;
    margin-right: 20px;
  }

  .account-info input {
    width: 100%;
    padding: 14px 0 14px 20px;
    border-radius: 4px;
    outline: none;
    border: 1px solid #e1e1e1;
  }

  .account-sex {
    width: 50px !important;
  }

  #seleted {
    width: 140px;
    padding: 14px 0 14px 20px;
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
  }

  .create-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }

  .create-btn p:nth-of-type(1) {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid rgba(2, 122, 255, 1);
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(2, 122, 255, 1);
    margin-right: 40px;
    cursor: pointer;
  }

  .create-btn p:nth-of-type(2) {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    margin-left: 40px;
    cursor: pointer;
  }

  /*上限创建账号,升级会员*/
  .vip-grade {
    width: 320px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 40px;
    z-index: 10;
  }

  .vip-title {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    text-align: center;
    margin-bottom: 20px;
  }

  .vip-cont {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    text-align: center;
    margin-bottom: 20px;
  }

  .vip-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vip-btn p:nth-of-type(1) {
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

  .vip-btn p:nth-of-type(2) {
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

  /*创建账号成功*/
  .create-success {
    width: 300px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    top: 120px;
    left: 700px;
  }

  /*删除该用户*/
  .remove-user {
    width: 400px;
    height: 222px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  .remove-title {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    text-align: center;
    padding: 30px 0 20px 0;
  }

  .remove-cont {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    text-align: center;
  }

  .never-hint {
    color: #aaaaaa;
    text-align: center;
    padding: 15px 0 20px 0;
  }

  .remove-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remove-btn p:nth-of-type(1) {
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

  .remove-btn p:nth-of-type(2) {
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

  @media screen and (min-width: 1200px) and (max-width: 1500px) {
    .mine-user {
      width: 888px;
    }

    .user-messages {
      width: 888px;
      padding: 20px;
    }

    .create-account {
      width: 550px;
      padding: 20px;
    }

    .message-name {
      padding-bottom: 10px;
      font-size: 14px;
    }

    .all-messages {
      padding: 8px 0;
    }

    .all-messages p {
      font-size: 13px;
    }

    .all-messages p:nth-of-type(5) {
      height: 25px;
      line-height: 25px;
      font-size: 13px;
    }

    .create-head {
      font-size: 15px;
      padding-bottom: 20px;
    }

    .create-head img {
      width: 15px;
      height: 15px;
    }

    .account-info {
      font-size: 13px;
      margin-top: 20px;
    }

    #seleted {
      font-size: 13px;
    }

    .create-btn {
      margin-top: 20px;
    }

    .create-btn p:nth-of-type(1) {
      width: 160px;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
    }

    .create-btn p:nth-of-type(2) {
      width: 160px;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
    }

    .info-left {
      height: 90% !important;
    }
  }
</style>