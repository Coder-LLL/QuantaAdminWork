<template>
  <div class="container">
    <el-row type="flex" justify="start" class="el-row-one">
      <button class="addStaffBtn" @click="addActivityBtnClick">
        <img src="../../assets/img/新增 (1).png" alt="" v-if="isCheckAdd" />
        <img src="../../assets/img/新增.png" alt="" v-else />
        <span :class="[isCheckAdd ? 'isCheckAddFont' : 'noCheckAddFont']">
          新增
        </span>
      </button>

      <!-- <el-date-picker
        @change="dataChange"
        v-model="dataValue"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker> -->
    </el-row>

    <el-row class="el-row-two" v-if="!isCheckAdd">
      <div class="el-row-two-container">
        <el-card
          class="el-card-item"
          v-for="item in allActivityData"
          v-bind:key="item.name"
          :body-style="{ padding: '5px', height: '100%', overflowY: 'auto' }"
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

          <div class="activityHrefDiv" v-if="item.href">
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
      </div>
    </el-row>

    <!-- 添加活动板块 -->
    <el-row class="el-row-add" v-else>
      <el-form
        :model="addActivityForm"
        :rules="addActivityFormRules"
        ref="addActivityForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-col class="el-col-one">
          <el-form-item label="活动名称" prop="title">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/活动.png" alt="" />
                </i>
                <span>活动名称</span>
              </span>
            </span>

            <el-input class="add-staff-input" v-model="addActivityForm.title">
            </el-input>
          </el-form-item>

          <el-form-item label="优先级" prop="priority">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/优先级.png" alt="" />
                </i>
                <span>优先级</span>
              </span>
            </span>

            <el-select v-model="addActivityForm.priority" placeholder="请选择">
              <el-option label="1(最低优先级)" :value="1"> </el-option>
              <el-option label="2" :value="2"> </el-option>
              <el-option label="3(最高优先级)" :value="3"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="参与部门" prop="participant">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/部门.png" alt="" />
                </i>
                <span>参与部门</span>
              </span>
            </span>

            <el-checkbox-group v-model="addActivityForm.participant">
              <el-checkbox label="运营部"></el-checkbox>
              <el-checkbox label="设计部"></el-checkbox>
              <el-checkbox label="研发部"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="活动日期" prop="time">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/日历.png" alt="" />
                </i>
                <span>活动日期</span>
              </span>
            </span>

            <el-date-picker
              v-model="addActivityForm.time"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/介绍.png" alt="" />
                </i>
                <span>内容</span>
              </span>
            </span>

            <el-input
              type="textarea"
              resize="none"
              v-model="addActivityForm.content"
              :autosize="{ minRows: 2, maxRows: 3 }"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="公众号链接" prop="href">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/介绍.png" alt="" />
                </i>
                <span>公众号链接</span>
              </span>
            </span>

            <el-input v-model="addActivityForm.href"> </el-input>
          </el-form-item>

          <el-form-item label="图片" class="imageUploadFormItem">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://120.76.194.85:9091/common/upload"
              :on-change="fileChange"
              :file-list="fileList"
              :auto-upload="false"
              list-type="picture"
              accept=".jpg,.png,.jpeg,JPG,JPEG"
              :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary">
                选取文件
              </el-button>

              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件（没传会使用默认图片）
              </div>
            </el-upload>
          </el-form-item>

          <el-form-item class="login_reset_btn">
            <el-button type="primary" @click="submitForm('addActivityForm')">
              提交
            </el-button>
            <el-button @click="resetForm('addActivityForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

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
          <el-input readonly v-model="detailInfo.href"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deatailInfoVisible = false">关闭</el-button>
      </span>
    </el-dialog>

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
  getAllActivity,
  insertActivity,
  modifyActivity,
  deleteActivity,
} from "../../api/activity.js";
import { imageUpload } from "../../api/imageUpload.js";
export default {
  data() {
    return {
      departmentOptions: ["研发部", "运营部", "设计部"],

      priorityOptions: [
        {
          value: "1",
          label: "1（最低优先级）",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3（最高优先级）",
        },
      ],

      allActivityData: [],
      isCheckAdd: false,
      dataValue: "",
      editForm: {},
      idx: "",
      editVisible: false,
      modifyCheckboxGroup: [],
      addActivityForm: {
        path: "https://quantacenter.oss-cn-shenzhen.aliyuncs.com/images/4a4161ce-a2a3-477e-a2a7-efeaf7ad3f37.jpg",
        title: "",
        content: "",
        priority: "",
        participant: [],
        time: "",
        href: "",
      },

      addActivityFormRules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { max: 20, message: "长度在 20 个字符以内", trigger: "blur" },
        ],

        priority: [
          { required: true, message: "请选择活动优先级", trigger: "change" },
        ],

        participant: {
          type: "array",
          required: true,
          message: "请至少选择一个参与部门",
          trigger: "change",
        },

        time: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [
          { required: true, message: "请填写活动内容", trigger: "blur" },
        ],
        href: [
          {
            required: true,
            message: "请填写活动的微信公众号链接",
            trigger: "blur",
          },
        ],
      },
      fileList: [],
      imgFile: "",

      detailInfo: {},
      deatailInfoVisible: false,

      deleteItem: {},
      deleteConfirmDialogVisible: false,

      editImgFile: "",
      editFileList: [],
    };
  },
  created() {
    this.getAllActivityData();
  },
  filters: {
    participantFilter(item) {
      return item.split("&").join("  ");
    },
  },
  methods: {
    getAllActivityData() {
      getAllActivity().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.allActivityData = res.data;
          // console.log(this.allActivityData);
        } else {
          this.$message.error("数据获取出错");
        }
      });
    },
    addActivityBtnClick() {
      this.isCheckAdd = !this.isCheckAdd;
    },
    dataChange(value) {
      // console.log(value);
    },
    modifyClick(item) {
      // this.idx = index;
      this.editForm = item;
      this.modifyCheckboxGroup = this.editForm.participant.split("&");
      //  console.log(item);
      this.editVisible = true;
    },
    saveEditTwo() {
      // console.log(this.editForm);

      // let editForm = this.editForm;
      // editForm["participant"] = this.modifyCheckboxGroup.join("&");

      // console.log(editForm);
      modifyActivity(editForm).then((res) => {
        // console.log(res);
        this.getAllActivityData();
        this.editVisible = false;
        if (res.code == 200) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
      // console.log(this.editForm);
    },

    editDialogClose() {
      // 点击编辑对话框的关闭按钮的时候，把当前编辑栏选择的图片数据清空，以免点开别的编辑栏时造成数据错乱
      this.editImgFile = "";
      this.editFileList = [];
      this.getAllActivityData();
    },
    handleRemove() {
      this.editImgFile = "";
      this.editFileList = [];
      // console.log(this.imgFile);
    },
    editFileChange(file, fileList) {
      this.editImgFile = file.raw;
      //   console.log(this.editImgFile);
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
            this.getAllActivityData();
            // console.log(res);
            if (res.code == 200) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          });
        });
      } else {
        // console.log(editForm);
        // console.log("222");
        modifyActivity(editForm).then((res) => {
          this.editVisible = false;
          this.getAllActivityData();
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
        this.getAllActivityData();
        if (res.code == 200) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    fileChange(file, fileList) {
      // console.log(file);
      this.imgFile = file.raw;
      // console.log(this.imgFile.image);
      // console.log(fileList);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(this.addActivityForm);

        if (valid) {
          // addActivityForm["participant"] =
          //   this.addActivityForm["participant"].join("&");
          //    console.log(addActivityForm);

          let addActivityForm = this.addActivityForm;

          addActivityForm["participant"] =
            this.addActivityForm["participant"].join("&");
          //    console.log(this.addActivityForm);
          // 判断是否上传了图片
          if (this.imgFile) {
            let formData = new FormData();
            formData.append("image", this.imgFile);
            // 如果上传了图片。则先进行图片的上传。拿到返回值即图片路径path之后赋值给addStaffForm，再进行添加员工
            imageUpload(formData).then((res) => {
              // console.log(res);
              addActivityForm.path = res;
              console.log(addActivityForm);
              insertActivity(addActivityForm).then((res) => {
                // console.log(res);
                if (res.code == 200) {
                  this.getAllActivityData();
                  this.resetForm("addActivityForm");
                  this.$message.success("添加成功");
                } else {
                  this.resetForm("addActivityForm");
                  this.$message.error("添加失败");
                }
              });
            });
          } else {
            // 没有上传图片，则使用默认的图片，无需上传图片，直接添加员工
            insertActivity(addActivityForm).then((res) => {
              // console.log(res);
              if (res.code == 200) {
                this.getAllActivityData();
                this.resetForm("addActivityForm");
                this.$message.success("添加成功");
              } else {
                this.resetForm("addActivityForm");
                this.$message.error("添加失败");
              }
            });
          }

          // 判断是否上传了图片
          // if (this.imgFile) {
          //   let formData = new FormData();
          //   formData.append("image", this.imgFile);
          //   // 如果上传了图片。则先进行图片的上传。拿到返回值即图片路径path之后赋值给addStaffForm，再进行添加员工
          //   imageUpload(formData).then((res) => {
          //     console.log(res);
          //     addActivityForm["path"] = res;
          //     insertActivity(addActivityForm).then((res) => {
          //       console.log(res);
          //       if (res.code == 200) {
          //         this.getAllActivityData();
          //         this.$message.success("添加成功");
          //       } else {
          //         this.$message.error("添加失败");
          //       }
          //     });
          //   });
          // } else {
          //   // 没有上传图片，则使用默认的图片，无需上传图片，直接添加员工
          //   insertActivity(addActivityForm).then((res) => {
          //     console.log(res);
          //     if (res.code == 200) {
          //       this.getAllActivityData();
          //       this.$message.success("添加成功");
          //     } else {
          //       this.$message.error("添加失败");
          //     }
          //   });
          // }

          // this.resetForm("addActivityForm");
        } else {
          return false;
        }
      });
    },

    handleDetail(item) {
      this.detailInfo = item;
      this.deatailInfoVisible = true;
      // console.log(this.detailInfo);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 50px;
  border-radius: 20px;
  overflow: hidden;
}
.el-row-one {
  border-bottom: 1px solid rgb(221, 221, 221);
  /* background-color: yellow; */
  justify-content: space-between;
}

.el-row-one .addStaffBtn {
  background-color: transparent;
}

.el-row-two {
  width: 100%;
  height: 100%;
  padding-top: 10px;
}
.el-row-two-container {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
  overflow-y: scroll !important;

  display: flex;
  display: -webkit-flex;
  /* justify-content: space-between; */
  /* flex-direction: row;*/
  flex-wrap: wrap;
}
.el-row-two-container .el-card {
  width: 30%;
  height: 60%;
  border-radius: 10px;
  border: 1px solid rgb(221, 221, 221);
  padding: 10px;
  /* background-color: pink; */
  margin-top: 10px;
  margin-left: 10px;
}
.el-row-two-container .el-card .el-card__body {
  width: 100%;
  height: 100%;
}
.el-row-two-container .el-card .modify_delete_btn {
  height: 10%;
  /* background-color: #ffff00; */
  margin: 2px 0;
  display: flex;
  justify-content: flex-end;
}
.el-row-two-container .modify_delete_btn button {
  background-color: #fff;
  width: 20px;
  margin-left: 10px;
}
.el-row-two-container .modify_delete_btn .showDetailBtn {
  background-color: #fff;
  width: auto;
  /* float: right; */
}

.el-row-two-container .modify_delete_btn img {
  width: 20px;
  height: 20px;
  background-color: #fff;
}

.el-row-two-container .activityNameDiv {
  min-height: 10%;
  /* background-color: #000066; */
  color: rgb(151, 147, 164);
  font-size: 14px;
  margin-top: 5px;
  /* display: flex;
  align-items: center; */
}
.el-row-two-container .activityDateDiv {
  height: 10%;
  /* background-color: #ff0000; */
  color: rgb(151, 147, 164);
  font-size: 14px;
  vertical-align: middle;
  margin-top: 5px;
  /* display: flex;
  align-items: center; */
}
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

.el-row-two-container .activityTagDiv {
  height: 15%;
  /* background-color: #ff0000; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 部门标签样式 */
.activityTagDiv .el-tag {
  padding: 0px 15px;
  background-color: rgb(96, 103, 233);
  color: #fff;
  border-radius: 15px;
}
.el-row-two-container .activityImgDiv img {
  width: 100%;
  border-radius: 10px;
}

.el-row-two-container::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-row-two-container::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.el-row-two-container::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.el-row-add .el-col-one {
  width: 50%;
  height: 100%;
  margin-left: 25%;
  /* background-color: pink; */
}

.el-col-one .span-box img {
  width: 20px;
  height: 20px;
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

/* 详细信息对话框里面的图片 */
.activityDetailImg {
  width: 90%;
}

/* 不同状态下的新增按钮的字体颜色 */
.isCheckAddFont {
  color: rgb(102, 108, 234) !important;
}
.noCheckAddFont {
  color: rgb(151, 147, 164) !important;
}

/* 信息编辑栏中图片的大小 */
.editInfoImage {
  width: 90%;
}
</style>