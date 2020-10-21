<template>
  <div class="user-infos">
    <div class="user-head">
      <img src="../../static/img/people.png" alt />
      <div @click="quit">退出登录</div>
    </div>
    <!--功能栏-->
    <div class="navigation-bar">
      <div class="bar-list return">
        <img src="../../static/img/Homepage.png" alt />
        <p @click="goBack">返回首页</p>
      </div>
      <div class="bar-list user-btn">
        <img src="../../static/img/Theearth.png" alt />
        <p @click="toMap">地图</p>
      </div>
      <div class="bar-list user-btn" :class="this.barIndex==2?'active':''">
        <img src="../../static/img/Businesscircle.png" alt />
        <p @click="myBusiness">我的商圈</p>
      </div>
      <div class="bar-list user-btn" :class="this.barIndex==3?'active':''">
        <img src="../../static/img/Focuson.png" alt />
        <p @click="myFollow">我的关注</p>
      </div>
      <div
        class="bar-list user-btn"
        :class="this.barIndex==4?'active':''"
        v-if="userInfo.isSubAccount=='0'"
      >
        <img src="../../static/img/Theuser.png" alt />
        <p @click="toUser">用户管理</p>
      </div>
      <div :class="this.barIndex==5?'active':''" class="bar-list vip">
        <img src="../../static/img/members.png" alt />
        <p @click="toVip">会员中心</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 下标
      barIndex: 2,
      // 用户信息
      userInfo: ""
    };
  },
  created() {
    let user = this.$cookies.get("userInfo");
    this.userInfo = user;
    console.log(user.isSubAccount);
  },
  mounted() {
    // 左侧导航的下标
    console.log(this.$router.app._route.name);
    if (this.$router.app._route.name == "vipCenter") {
      this.barIndex = 5;
    } else if (this.$router.app._route.name == "userManage") {
      this.barIndex = 4;
    } else if (this.$router.app._route.name == "myFollow") {
      this.barIndex = 3;
    } else if (this.$router.app._route.name == "myBusiness") {
      this.barIndex = 2;
    }
  },
  methods: {
    // 退出登录  去登录页
    quit() {
      this.$router.push({ path: "/login" });
      this.$cookies.remove("userInfo");
      this.$cookies.remove("phone");
    },
    // 返回首页
    goBack() {
      this.$router.push({ path: "/businessIndex" });
    },
    // 跳转地图页
    toMap() {
      this.$router.push({ path: "/mapIndex" });
    },
    // 跳转我的商圈
    myBusiness() {
      this.$router.push({ path: "/myBusiness", query: { barIndex: 2 } });
    },
    // 跳转我的关注
    myFollow() {
      this.$router.push({ path: "/myFollow", query: { barIndex: 3 } });
    },
    // 跳转用户管理
    toUser() {
      this.$router.push({ path: "/userManage", query: { barIndex: 4 } });
    },
    // 跳转会员中心
    toVip() {
      this.$router.push({ path: "/vipCenter", query: { barIndex: 5 } });
    }
  }
};
</script>
<style scoped>
/*左边用户信息功能栏*/
.user-infos {
  width: 236px;
  height: 100%;
  text-align: center;
}

.user-head {
  background: #ffffff;
}

.user-head img {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  margin: 50px 0 25px 0;
}

.user-head div {
  width: 196px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid rgba(2, 122, 255, 1);
  font-size: 14px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(2, 122, 255, 1);
  display: inline-block;
  margin-bottom: 30px;
  cursor: pointer;
}

/*功能栏*/
.navigation-bar {
  margin-top: 20px;
  background: #ffffff;
  padding: 20px 0 0 0;
  height: 75%;
}

.bar-list {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.bar-list img {
  width: 15px;
  height: 15px;
  margin-right: 50px;
}

.bar-list p {
  width: 65px;
  text-align-last: justify;
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(86, 86, 86, 1);
  cursor: pointer;
}

.return {
  margin-bottom: 40px;
}

.vip {
  margin-top: 40px;
}

.user-btn {
  margin-bottom: 30px;
}

/*点击切换样式*/
.active {
  border-left: 2px solid #027aff;
}
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .navigation-bar{
    height: 72%;
  }
}
</style>
