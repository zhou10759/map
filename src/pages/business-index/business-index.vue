<template>
  <div>
    <!-- 品牌 -->
    <div class="brand-list" :style="brands.length<=3?'margin-top:15%;':''">
      <div class="brands" v-for="(brands,index) in brands" :key="index">
        <div class="brand-img" @click="toBrand(brands.brandId)">
          <img :src="brands.brandImg" alt />
        </div>
        <div class="brands-name">
          <p>{{brands.title}}</p>
          <img src="../../../static/img/Setupthe.png" class="set" @click="editBrand(brands)" alt />
        </div>
      </div>
      <div class="add-brands" @click="createBrand()" v-if="userInfo.isSubAccount != 1">
        <!-- <img src="/static/img/tianjia.png" class="add" alt /> -->
        <img src="../../../static/img/Addabrand.png" alt />
        <!-- <div>添加品牌</div> -->
      </div>
    </div>
    <!-- 创建品牌 -->
    <!-- 背景 -->
    <div class="create-back" v-if="isCreate==true"></div>
    <div class="create-brand" v-if="isCreate==true">
      <div class="created">
        <p>创建品牌</p>
        <img src="../../../static/img/ShutdownII.png" alt @click="close()" />
      </div>
      <div class="title">
        <p>标题</p>
        <input type="text" placeholder="请输入标题" v-model="titleName" />
      </div>
      <div class="industry">
        <p>行业</p>
        <select @change="getIndustryOne($event)" id="seleted">
          <option value disabled selected>一级行业</option>
          <option v-for="(item,index) in industryOne" :key="index">{{item.industryName}}</option>
        </select>
        <select @change="getIndustryTwo()" id="select">
          <option value="二级行业" disabled selected>二级行业</option>
          <option v-for="(item,index) in selection" :key="index">{{item.industryLevelTwoName}}</option>
        </select>
      </div>
      <div class="upload-img">
        <p>图片</p>
        <div class="images">
          <div class="img-list">
            <div>
              <img :src="images" alt />
            </div>
            <div class="upload">
              <img src="../../../static/img/add.png" alt />
              <div>上传品牌logo</div>
              <input type="file" class="upload-file" @change="uploadImg" />
            </div>
          </div>
        </div>
      </div>
      <div class="create-now" @click="createNow">立即创建</div>
    </div>
    <!-- 会员提醒弹框 -->
    <div class="create-back" v-if="isVip==true"></div>
    <div class="member" v-if="isVip==true">
      <div class="hint">温馨提示</div>
      <div class="up-member">您的会员权限不够，是否升级会员！</div>
      <div class="btn">
        <p @click="cancle()">取消</p>
        <p @click="toVip">立即开通</p>
      </div>
    </div>
    <!-- 品牌编辑弹框 -->
    <div class="create-back" v-if="isEdit==true"></div>
    <div class="edit" v-if="isEdit==true">
      <div class="created">
        <p>编辑</p>
        <img src="../../../static/img/ShutdownII.png" alt @click="closeEdit()" />
      </div>
      <div class="title">
        <p>标题</p>
        <input type="text" placeholder="请输入标题" v-model="editTitle" />
      </div>
      <div class="industry">
        <p>行业</p>
        <select @change="getEditIndustryOne($event)" id="edit-seleted">
          <option value disabled selected>一级行业</option>
          <option v-for="(item,index) in industryOne" :value="item.industryName" :key="index">{{item.industryName}}
          </option>
        </select>
        <select @change="getEditIndustryTwo()" id="edit-select">
          <option value="二级行业" disabled selected>二级行业</option>
          <option v-for="(item,index) in selection" :key="index" :value="item.industryLevelTwoName">
            {{item.industryLevelTwoName}}</option>
        </select>
      </div>
      <div class="upload-img">
        <p>图片</p>
        <div class="images">
          <div class="images-list">
            <div>
              <img :src="editLogo" alt />
            </div>
            <div class="up-imgs">
              上传图片
              <input type="file" @change="uploadImg" />
            </div>
          </div>
        </div>
      </div>
      <div class="editing">
        <p @click="closeEdit">取消</p>
        <p @click="deleteBrand()">删除</p>
        <p @click="alterBrand()">确认修改</p>
      </div>
    </div>
    <!-- 底部 -->
    <indexBottom></indexBottom>
  </div>
</template>
<script>
  import indexBottom from "@/components/index-bottom";
  // 引入接口
  import {
    businessInit,
    industryInit,
    addBrand,
    selectBrand,
    updateBrand,
    deleteBrand
  } from "@/api/index/index.js";

  export default {
    data() {
      return {
        // 品牌列表
        brands: [],
        industryOne: [],
        industryTwo: [],
        // 标题名称
        titleName: "",
        // 控制创建品牌的显示隐藏
        isCreate: false,
        // 控制会员的显示隐藏
        isVip: false,
        // 控制编辑品牌的显示隐藏
        isEdit: false,
        // 用户信息
        userInfo: "",
        // 一级行业
        value1: "",
        // 一级行业id
        brandIndustryOne: "",
        // 二级行业
        selection: "",
        //  二级行业id
        brandIndustryTwo: "",
        // 品牌图标
        images: "",
        // 编辑的品牌标题
        editTitle: "",
        // 编辑的品牌的logo
        editLogo: "",
        // 编辑的一级行业值
        editValue: "",
        // 当前编辑的品牌Id
        brandIdNow: "",
        // 编辑默认的一级行业id
        brandIndustryOneid: "",
        // 编辑默认的二级行业id
        brandIndustryTwoid: "",
        // sonId
        sonId:''
      };
    },
    components: { indexBottom },
    created() {
      // 获取cookie的用户信息
      let user = this.$cookies.get("userInfo");
      this.userInfo = user;
      console.log( "user" + JSON.stringify(user));

    },
    mounted() {
      // 加载品牌接口
      this.getBrand();
      // 加载行业接口
      this.getIndustry();
    },
    methods: {
      // 加载品牌接口
      getBrand() {
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token
        });
        businessInit(data).then(res => {
          console.log(res);
          this.brands = res.data.brandInit;
        });
      },
      // 加载行业接口
      getIndustry() {
        let datas = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token
        });
        industryInit(datas).then(res => {
          console.log(res);
          this.industryOne = res.data;
          console.log(this.industryOne);
        });
      },
      // 获取一级行业下标以及内容
      getIndustryOne(event) {
        console.log(event);
        console.log(event.target.value);
        // 选中的值
        this.value1 = event.target.value;
        // 下标
        let index = $("#seleted")[0].selectedIndex - 1;
        console.log(index);
        this.brandIndustryOne = this.industryOne[index].industryId;
      },
      // 获取二级行业下标以及内容
      getIndustryTwo(event) {
        let index = $("#select")[0].selectedIndex - 1;
        this.brandIndustryTwo = this.selection[index].industryLevelTwoId;
      },
      // 获取编辑一级行业下标以及内容
      getEditIndustryOne(event) {
        console.log(event);
        console.log(event.target.value);
        // 选中的值
        this.editValue = event.target.value;
        // 下标
        let index = $("#edit-seleted")[0].selectedIndex - 1;
        console.log(index);
        this.brandIndustryOne = this.industryOne[index].industryId;
      },
      // 获取编辑二级行业下标以及内容
      getEditIndustryTwo(event) {
        let index = $("#edit-select")[0].selectedIndex - 1;
        this.brandIndustryTwo = this.selection[index].industryLevelTwoId;
      },
      // 创建品牌
      createBrand() {
        this.isCreate = true;
      },
      // 关闭创建品牌
      close() {
        this.isCreate = false;
        this.titleName = "";
        this.images = "";
      },
      // 关闭会员弹框
      cancle() {
        this.isVip = false;
      },
      // 编辑品牌
      editBrand(e) {
        console.log(e);
        this.isEdit = true;
        this.brandIdNow = e.brandId;
        let that = this;
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          brandId: e.brandId
        });
        // setTimeout(function() {
        selectBrand(data).then(res => {
          console.log(res);
          that.brandIndustryOneid = res.data.brandIndustryOne;
          that.brandIndustryTwoid = res.data.brandIndustryTwo;
          that.editTitle = res.data.brandTitle;
          that.editLogo = res.data.brandImg;
          // $("#edit-seleted")
          //   .find(`option[value=${res.data.industryLevelOneName}]`)
          //   .attr("selected", true);
          $("#edit-seleted").val(res.data.industryLevelOneName);
          for (let i = 0; i < res.data.mapIndustryDTO.length; i++) {
            if (
              res.data.mapIndustryDTO[i].industryName ==
              res.data.industryLevelOneName
            ) {
              if (res.data.mapIndustryDTO[i].industryLevelTwo.length > 0) {
                $("#edit-select").val("二级行业");
                that.selection = res.data.mapIndustryDTO[i].industryLevelTwo;
                // $("#edit-select").val(res.data.industryLevelTwoName);
              } else {
                that.selection = "";
                $("#select").val("二级行业");
              }
            }
          }
          // 用来延迟让二级行业加载完数据
          setTimeout(function () {
            $("#edit-select").val(res.data.industryLevelTwoName);
          }, 300);
        });
        // }, 500);
      },
      // 关闭编辑品牌弹框
      closeEdit() {
        this.isEdit = false;
      },
      // 取消编辑品牌
      closeEdit() {
        this.isEdit = false;
      },
      // 删除编辑品牌
      deleteBrand() {
        this.isEdit = false;
        console.log(this.brandIdNow);
        let data = JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          brandId: this.brandIdNow
        });
        deleteBrand(data).then(res => {
          console.log(res);
          this.getBrand();
        });
      },
      // 修改编辑品牌
      alterBrand() {
        let datas = JSON.stringify({
          brandId: this.brandIdNow,
          brandTitle: this.editTitle,
          brandIndustryOne: this.brandIndustryOne
            ? this.brandIndustryOne
            : this.brandIndustryOneid,
          brandIndustryTwo: this.brandIndustryTwo
            ? this.brandIndustryTwo
            : this.brandIndustryTwoid,
          brandImg: this.editLogo,
          userId: this.userInfo.userId,
          token: this.userInfo.token
        });
        updateBrand(datas).then(res => {
          console.log(res);
          if (res.code == "000000") {
            this.isEdit = false;
            this.getBrand();
          }
        });
      },
      // 跳转地图商圈
      toBrand(e) {
        this.$cookies.set("brandId", e, "7d");
        this.$router.push({ path: "/mapIndex", query: { brandId: e } });
      },
      // 上传品牌图标
      uploadImg(e) {
        console.log(e);
        let file = e.target.files;
        var formData = new FormData();
        for (let i = 0; i <= file.length; i++) {
          formData.append("file", file[i]);
        }
        this.upLoad(formData);
        console.log(formData);
      },
      upLoad(formData) {
        let that = this;
        this.$axios({
          // http://dxq.hzsw-tech.com/pointcoil
          method: "post",
          url: "https://www.hzdxq.cn/pointcoil/admin/adminUpload/mapUpload",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formData
        })
          .then(function (res) {
            console.log(res.data);
            if (that.isEdit == true) {
              that.editLogo = res.data.data;
            } else {
              that.images = res.data.data;
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      // 立即创建
      createNow() {
        if (this.titleName && this.images && this.brandIndustryOne) {
          let that = this;
          this.sonId = localStorage.getItem('sonId');
          let datas = JSON.stringify({
            brandTitle: this.titleName,
            brandIndustryOne: this.brandIndustryOne,
            brandIndustryTwo: this.brandIndustryTwo,
            brandImg: this.images,
            userId: this.userInfo.userId,
            token: this.userInfo.token,
            memberLevel: this.userInfo.memberLevel,
            sonId:this.sonId
          });
          addBrand(datas).then(res => {
            console.log(res);
            if (res.code == "001009") {
              that.isCreate = !that.isCreate;
              that.isVip = !that.isVip;
              that.titleName = "";
              that.images = "";
            } else if (res.code == "000001") {
              alert(res.msg);
            } else if (res.code == "000003") {
              alert(res.msg);
            } else if (res.code == "000000") {
              that.isCreate = !that.isCreate;
              that.titleName = "";
              that.images = "";
              that.getBrand();
            }
          });
        } else {
          alert("请将信息填写完整");
        }
      },
      // 跳转会员中心
      toVip() {
        this.$router.push({ path: "/vipCenter" });
      }
    },
    watch: {
      value1: function () {
        let that = this;
        for (let i = 0; i < this.industryOne.length; i++) {
          if (that.industryOne[i].industryName == that.value1) {
            if (that.industryOne[i].industryLevelTwo.length > 0) {
              $("#select").val("二级行业");
              that.selection = that.industryOne[i].industryLevelTwo;
            } else {
              that.selection = "";
              $("#select").val("二级行业");
            }
          }
        }
      },
      editValue: function () {
        let that = this;
        for (let i = 0; i < this.industryOne.length; i++) {
          if (that.industryOne[i].industryName == that.editValue) {
            if (that.industryOne[i].industryLevelTwo.length > 0) {
              $("#edit-select").val("二级行业");
              that.selection = that.industryOne[i].industryLevelTwo;
            } else {
              that.selection = "";
              $("#edit-select").val("二级行业");
            }
          }
        }
      }
    }
  };
</script>
<style scoped>
  .brand-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    /* margin-top: 15%; */
  }

  .brands {
    width: 360px;
    height: 250px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 15px 0px rgba(40, 142, 255, 0.2);
    border-radius: 10px;
    text-align: center;
    position: relative;
    margin-right: 60px;
    margin-top: 20px;
  }

  .brand-img {
    width: 360px;
    height: 200px;
    overflow: hidden;
  }

  .brand-img img {
    width: 360px;
    height: 200px;
  }

  .brands-name {
    /* display: flex;
    align-items: center; */
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .brands-name p {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(86, 86, 86, 1);
    display: inline-block;
  }

  .set {
    width: 19px;
    height: 19px;
    position: absolute;
    right: 20px;
    top: 15px;
  }

  .add-brands {
    width: 360px;
    height: 300px;
    /* background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 15px 0px rgba(40, 142, 255, 0.2);
    border-radius: 10px; */
    text-align: center;
    position: relative;
    margin-top: 20px;
    cursor: pointer;
  }

  .add-brands img {
    width: 360px;
    height: 275px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .add-brands div {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .add {
    width: 75px;
    height: 75px;
  }

  /* 创建品牌 */
  .create-back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
    opacity: 0.3;
  }

  .create-brand {
    width: 800px;
    height: 519px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin: 0 auto;
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 30px;
    transform: translate(-50%, -50%);
  }

  .created {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;
    border-bottom: 1px solid #e1e1e1;
  }

  .created p {
    font-size: 20px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
  }

  .created img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .title {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }

  .title p {
    width: 40px;
    font-size: 18px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
    margin-right: 20px;
  }

  .title input {
    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
    padding-left: 20px;
  }

  /* 下拉框样式 */
  .industry {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }

  .industry p {
    font-size: 18px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
  }

  .industry select {
    width: 362px;
    height: 50px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    margin-left: 20px;
    padding-left: 20px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
  }

  .upload-img {
    display: flex;
    margin-top: 30px;
  }

  .upload-img p {
    width: 40px;
    font-size: 18px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(133, 133, 133, 1);
  }

  .upload-img img {
    width: 100px;
    height: 100px;
  }

  .images {
    display: flex;
    flex-wrap: wrap;
  }

  .img-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
  }

  .img-list img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }

  .upload {
    position: relative;
    cursor: pointer;
  }

  .upload-file {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .upload div {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
    margin-top: 10px;
  }

  .create-now {
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
    margin: 0 auto;
    margin-top: 30px;
    cursor: pointer;
  }

  /* 会员提醒弹框 */
  .member {
    position: absolute;
    top: 37%;
    left: 42.5%;
    width: 400px;
    height: 197px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    text-align: center;
  }

  .hint {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(74, 74, 74, 1);
    margin: 30px 0 20px 0;
  }

  .up-member {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    margin-bottom: 30px;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .btn p:nth-of-type(1) {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid rgba(2, 122, 255, 1);
    margin-right: 15px;
    cursor: pointer;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(2, 122, 255, 1);
  }

  .btn p:nth-of-type(2) {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    margin-left: 15px;
    cursor: pointer;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }

  /* 品牌编辑弹框 */
  .edit {
    width: 800px;
    height: 505px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    position: absolute;
    top: 25%;
    left: 35%;
    padding: 30px;
  }

  .images-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 20px;
  }

  .images-list img {
    width: 100px;
    height: 100px;
  }

  .up-imgs {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    margin-left: 20px;
    position: relative;
    cursor: pointer;
  }

  .up-imgs input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 40px;
    opacity: 0;
  }

  .editing {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }

  .editing p:nth-of-type(1) {
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgba(224, 224, 224, 1);
    border-radius: 10px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    margin-right: 25px;
    cursor: pointer;
  }

  .editing p:nth-of-type(2) {
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgba(230, 46, 23, 1);
    border-radius: 10px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    margin: 0 25px;
    cursor: pointer;
  }

  .editing p:nth-of-type(3) {
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgba(2, 122, 255, 1);
    border-radius: 10px;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    margin-left: 25px;
    cursor: pointer;
  }

  @media screen and (min-width: 1200px) and (max-width: 1500px)  {
    .create-brand {
      width: 400px;
      height: 400px;
    }

    .created {
      padding-bottom: 20px;
    }

    .created p {
      font-size: 15px;
    }

    .created img {
      width: 15px;
      height: 15px;
    }
    .title p{
      font-size: 12px;
    }
    .title input{
      height: 35px;
      font-size: 12px;
    }
    .industry p{
      font-size: 12px;
      white-space: nowrap;
    }
    .industry select{
      width: 200px;
      height: 35px;
      font-size: 12px;
      margin-left: 30px;
    }
    .upload-img p{
      font-size: 12px;
    }
    .img-list{
      margin-left: 0;
    }
    .img-list img{
      width: 70px;
      height: 70px;
    }
    .upload-file{
      width: 70px;
      height: 70px;
    }
    .upload div{
      font-size: 12px;
    }
    .create-brand{
      height: 370px;
    }
    .create-now{
      font-size: 16px;
    }
    .brand-list{
      margin-bottom: 6%;
    }
  }
</style>
