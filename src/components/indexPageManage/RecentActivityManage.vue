<template>
  <div class="container">
    <el-row class="el-row-one"></el-row>
    <el-row type="flex" justify="center" class="el-row-two">
      <el-col :span="12">
        <div class="tipsTopContanier">
          <div class="tipsTop">
            <img
              class="tipsTopImgOne"
              src="../../assets/img/activityTipsTop.png"
              alt=""
            />
            <img
              class="tipsTopImgTwo"
              src="../../assets/img/activityTipsBottom (2).png"
              alt=""
            />

            <div class="tipsTopBtn">
              <el-button type="primary" round>确认修改</el-button>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="8" class="el-col-imgShow">
        <img class="imgShow" src="../../assets/img/preview.jpg" alt="" />
      </el-col>
    </el-row>
    <!-- <el-row class="el-row-one"></el-row> -->
    <el-row class="el-row-three"> </el-row>

    <el-row class="el-row-four">
      <el-card
        class="el-card-item"
        v-for="item in allActivityData"
        v-bind:key="item.name"
        :body-style="{ padding: '0px', height: '100%', overflowY: 'auto' }"
      >
        <div class="modify_delete_btn">
          <button @click="modifyClick(item)">
            <img src="../../assets/img/modify.png" alt="" />
          </button>
          <button @click="deleteClick(item)">
            <img src="../../assets/img/delete.png" alt="" />
          </button>

          <el-button
            size="mini"
            @click="handleDetail(item)"
            class="showDetailBtn"
          >
            详情
          </el-button>
        </div>

        <div class="activityNameDiv">
          <span>活动名称：</span>
          <span>{{ item.title }}</span>
        </div>
        <div class="activityDateDiv">
          <span>发表日期：</span>
          <span>{{ item.time }}</span>
        </div>

        <div class="activityHrefDiv">
          <span>公众号链接：</span>
          <span> <a :href="item.href" target="_blank">点击跳转</a> </span>
        </div>

        <div class="activityImgDiv">
          <img :src="item.path" alt="" />
        </div>

        <div class="activityTagDiv">
          <el-tag v-for="i in item.participant.split('&')" :key="i">
            {{ i }}</el-tag
          >
          <!-- <el-tag> {{ item.participant | participantFilter }}</el-tag> -->
        </div>
      </el-card>
    </el-row>

    <!-- 信息编辑的弹出框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editVisible"
      width="30%"
      top="10px"
      @close="editDialogClose"
    >
      <el-form ref="editForm" :model="editForm" label-width="70px">
        <el-form-item label="图片">
          <img :src="editForm.path" class="editInfoImage" />
        </el-form-item>

        <el-form-item class="imageUploadFormItem">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://120.76.194.85:9091/common/upload"
            :on-remove="handleRemove"
            :on-change="editFileChange"
            :file-list="editFileList"
            :auto-upload="false"
            list-type="picture"
            accept=".jpg,.png,.jpeg,JPG,JPEG"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">
              更换照片
            </el-button>

            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件 且只能上传一张
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="日期" prop="time">
          <el-date-picker
            v-model="editForm.time"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>

        <el-form-item label="优先级">
          <el-select v-model="editForm.priority" placeholder="请选择">
            <el-option label="1" value="1"> </el-option>
            <el-option label="2" value="2"> </el-option>
            <el-option label="3" value="3"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="参与部门">
          <el-checkbox-group v-model="modifyCheckboxGroup">
            <el-checkbox label="设计部"></el-checkbox>
            <el-checkbox label="运营部"></el-checkbox>
            <el-checkbox label="研发部"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="内容">
          <el-input
            type="textarea"
            v-model="editForm.content"
            resize="none"
          ></el-input>
        </el-form-item>

        <el-form-item label="链接">
          <el-input v-model="editForm.href"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 详细信息板块 -->
    <el-dialog
      title="详细信息"
      :visible.sync="deatailInfoVisible"
      width="40%"
      top="10px"
    >
      <el-form ref="detailInfo" :model="detailInfo" label-width="70px">
        <el-form-item label="图片">
          <img :src="detailInfo.path" class="activityDetailImg" />
        </el-form-item>

        <el-form-item label="标题">
          <el-input readonly v-model="detailInfo.title"> </el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input readonly v-model="detailInfo.content"> </el-input>
        </el-form-item>

        <el-form-item label="时间">
          <el-input readonly v-model="detailInfo.time"> </el-input>
        </el-form-item>

        <el-form-item label="优先级">
          <el-input readonly v-model="detailInfo.priority"> </el-input>
        </el-form-item>

        <el-form-item label="参与部门">
          <el-input readonly v-model="detailInfo.participant"> </el-input>
        </el-form-item>

        <el-form-item label="链接">
          <el-input v-model="editForm.href"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deatailInfoVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 确定删除对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="deleteConfirmDialogVisible"
      width="30%"
      center
    >
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteRefuse">取 消</el-button>
        <el-button type="primary" @click="deleteAgree">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRecentActivity,
  modifyActivity,
  deleteActivity,
} from "../../api/activity.js";

import { imageUpload } from "../../api/imageUpload.js";
export default {
  data() {
    return {
      allActivityData: {},
      multipleSelection: [],
      textarea: "",
      addProjectLoading: false, // 登录限制
      addProjectForm: {
        // 登录的表单数据的绑定对象
        activityName: "广外社团管理系统",
        activityDate: "",
        department: [],
        priorityLevel: "",
        activityDescription: "",
      },
      addProjectFormRules: {
        // 验证项目名是否合法
        activityName: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证优先级是否合法
        activityDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],

        department: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        priorityLevel: [
          { required: true, message: "请选择优先级", trigger: "change" },
        ],
        activityDescription: [
          { required: true, message: "请输入项目简介", trigger: "blur" },
        ],
      },

      dialogVisible: false,
      editForm: {},
      modifyCheckboxGroup: [],
      idx: "",
      editVisible: false,

      detailInfo: {},
      deatailInfoVisible: false,

      deleteItem: {},
      deleteConfirmDialogVisible: false,

      editImgFile: "",
      editFileList: [],
    };
  },
  created() {
    this.getRecentActivityData();
  },
  // filters: {
  //   participantFilter(item) {
  //     return item.split("&").join("  ");
  //   },
  // },
  methods: {
    getRecentActivityData() {
      getRecentActivity().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.allActivityData = res.data;
          // console.log(this.allActivityData);
        } else {
          this.$message.error("数据获取出错");
        }
      });
    },

    modifyClick(item) {
      // this.idx = index;
      this.editForm = item;
      this.modifyCheckboxGroup = this.editForm.participant.split("&");
      // console.log(item);
      this.editVisible = true;
    },
    saveEditTwo() {
      // console.log(this.editForm);

      let editForm = this.editForm;
      editForm["participant"] = this.modifyCheckboxGroup.join("&");

      // console.log(editForm);
      modifyActivity(editForm).then((res) => {
        // console.log(res);
        this.getRecentActivityData();
        this.editVisible = false;
        if (res.code == 200) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },

    editDialogClose() {
      // 点击编辑对话框的关闭按钮的时候，把当前编辑栏选择的图片数据清空，以免点开别的编辑栏时造成数据错乱
      this.editImgFile = "";
      this.editFileList = [];
      this.getRecentActivityData();
    },

    handleRemove() {
      this.editImgFile = "";
      this.editFileList = [];
      // console.log(this.imgFile);
    },
    editFileChange(file, fileList) {
      this.editImgFile = file.raw;
      // console.log(this.editImgFile);
    },
    saveEdit() {
      let editForm = this.editForm;
      editForm["participant"] = this.modifyCheckboxGroup.join("&");

      // 判断有无新上传照片文件
      // console.log(this.editImgFile);
      if (this.editImgFile != "") {
        let formData = new FormData();
        formData.append("image", this.editImgFile);
        // console.log("111");
        // 有上传新照片则先调用图片上传的接口
        imageUpload(formData).then((res) => {
          // console.log(res);
          editForm.path = res;
          this.editImgFile = "";
          this.editFileList = [];
          // console.log(this.editForm);
          modifyActivity(editForm).then((res) => {
            this.editVisible = false;
            this.getRecentActivityData();
            //  console.log(res);
            if (res.code == 200) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          });
        });
      } else {
        //   console.log(editForm);
        //  console.log("222");
        modifyActivity(editForm).then((res) => {
          this.editVisible = false;
          this.getRecentActivityData();
          if (res.code == 200) {
            this.$message.success("项目修改成功");
          } else {
            this.$message.error("项目修改出错");
          }
        });

        // modifyProject(this.editForm).then((res) => {
        //   this.editVisible = false;
        //   this.getRecentProjectData();
        //   // console.log(res);
        //   if (res.code == 200) {
        //     this.$message.success("修改成功");
        //   } else {
        //     this.$message.error("修改失败");
        //   }
        // });
      }

      // console.log(this.editForm);
      // modifyProject(this.editForm).then((res) => {
      //   this.editVisible = false;
      //   if (res.code == 200) {
      //     this.$message.success("项目修改成功");
      //   } else {
      //     this.$message.error("项目修改出错");
      //   }
      // });
    },

    deleteClick(item) {
      this.deleteConfirmDialogVisible = true;
      this.deleteItem = item;
      // console.log(this.deleteItem);
    },
    deleteRefuse() {
      this.deleteConfirmDialogVisible = false;
      this.$message({
        showClose: true,
        message: "取消删除",
        type: "warning",
      });
    },
    deleteAgree() {
      deleteActivity(this.deleteItem).then((res) => {
        // console.log(res);
        this.deleteConfirmDialogVisible = false;
        this.getRecentActivityData();
        if (res.code == 200) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    handleDetail(item) {
      this.detailInfo = item;
      this.deatailInfoVisible = true;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 20px;
  border-radius: 20px;
  overflow: hidden;
}
.el-row-one {
  height: 5%;
  /* background-color: yellow; */
}
.el-row-two {
  height: 30%;
  /* background-color: pink; */
}
.el-col-imgShow {
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .el-main {
  background-color: pink;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0;
} */

.tipsTopContanier {
  height: 100%;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  /* background-color: blue; */
}
.tipsTop {
  height: 90%;
  /* background-color: yellow; */
  /* line-height: 60px; */
  /* font-size: x-large; */
  /* text-align: center; */
  /* font-weight: 900; */
  /* font-style: italic; */
  /* background: #99a9bf; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  background-image: url("../../assets/img/emojiModify.png");
  background-repeat: no-repeat;
  background-position: 70% 75%;
  background-size: 25% 60%;
  /* text-shadow: 5px 1px 6px hsl(0, 2%, 33%); */

  /* 子元素tipsTopBtn 要设置margintop 所以在这个设置overflow，清楚影响 */
  overflow: hidden;
}
.tipsTopImgOne {
  width: 100%;
  background-color: transparent;
}
.tipsTopImgTwo {
  width: 50%;
  background-color: transparent;
}

.tipsTopBtn {
  /* background-color: pink; */
  margin-top: 10px;
}

.tipsTopBtn .el-button {
  width: 30%;
  margin-left: 30px;
  background-color: rgb(96, 103, 233);
}

.emojiPng {
  /* width: 150px;
  height: 150px; */
  height: 100%;
  /* background-color: aqua; */
}
.imgShow {
  width: 80%;
  height: 80%;
}

.el-row-three {
  /* background-color: pink; */
  height: 5%;

  padding: 5px 2%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(221, 221, 221);
}
.el-row-four {
  height: 60%;
  /* overflow-y: scroll !important; */
  padding: 0px 5px;
  /* background-color: pink; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-row-four .el-card {
  width: 30%;
  height: 95%;
  border-radius: 10px;
  /* border: 1px solid rgb(221, 221, 221); */
  padding: 10px;
  /* box-sizing: border-box; */
  /* background-color: pink; */
}
.el-row-four .el-card .el-card__body {
  width: 100%;
  height: 100%;
}

.el-row-four .modify_delete_btn {
  /* background-color: pink !important; */

  /* width: 50px; */
  height: 10%;
  /* background-color: #ffff00; */
  margin: 5px 0;
  display: flex;
  justify-content: flex-end;
  /* justify-content: space-between; */
}
.el-row-four .modify_delete_btn button {
  background-color: #fff;
  width: 20px;
  margin-left: 10px;
}
.el-row-four .modify_delete_btn .showDetailBtn {
  background-color: #fff;
  width: auto;
  /* float: right; */
}

.el-row-four .modify_delete_btn img {
  width: 20px;
  height: 20px;
  background-color: #fff;
}

.el-row-four .activityNameDiv {
  min-height: 10%;
  /* background-color: #000066; */
  color: rgb(151, 147, 164);
  font-size: 14px;
  margin-top: 5px;
  /* display: flex;
  align-items: center; */
}
.el-row-four .activityDateDiv {
  height: 10%;
  /* background-color: #ff0000; */
  color: rgb(151, 147, 164);
  font-size: 14px;
  vertical-align: middle;
  margin-top: 5px;
  /* display: flex;
  align-items: center; */
}
.el-row-four .activityTagDiv {
  height: 15%;
  /* background-color: #ff0000; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-row-four .activityImgDiv img {
  width: 100%;
}

.el-row-four .activityImgDiv img {
  width: 100%;
  border-radius: 10px;
}
.el-row-add {
  height: 55%;
  width: 100%;
  /* background-color: yellow; */
  padding: 10px;
}

.el-row-add .el-card {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
}
.el-row-add .el-card .el-card__body {
  width: 100%;
  height: 100%;
  background-color: gray;
}
.el-row-add .el-card .el-form {
  display: block;
  width: 100%;
  height: 100% !important;
  /* background-color: pink; */
}
.el-row-add .el-card .el-form .add-el-col-one .el-form-item {
  height: 40px;
  /* background-color: #7cfc00; */
  margin-top: 20px;
}
.add-el-col-one {
  width: 50%;
  /* background-color: pink; */
}
.add-el-col-two {
  width: 50%;
  padding: 20px;
  /* background-color: #7cfc00; */
}
.addProject-el-input {
  width: 65%;
  border-radius: 10px;
  /* background-color: pink; */
}
.el-col-add-two {
  width: 50%;
}
.login_reset_btn {
  /* background-color: pink; */
  display: flex;
  justify-content: space-around;
}

/* el-card的滚动条样式 */
.el-card-item >>> .el-card__body::-webkit-scrollbar {
  background-color: blue;
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-card-item >>> .el-card__body::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.el-card-item >>> .el-card__body::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.activityDetailImg {
  width: 90%;
}

/* 部门标签样式 */
.activityTagDiv .el-tag {
  padding: 0px 15px;
  background-color: rgb(96, 103, 233);
  color: #fff;
  border-radius: 15px;
}

/* 信息编辑栏中图片的大小 */
.editInfoImage {
  width: 90%;
}

/* 活动的微信公众号链接 */
.activityHrefDiv {
  height: 10%;
  /* background-color: #ff0000; */
  color: rgb(151, 147, 164);
  font-size: 14px;
  vertical-align: middle;
  margin-top: 5px;
  /* display: flex;
  align-items: center; */
}
.activityHrefDiv a {
  color: rgb(151, 147, 164);
}
</style>
