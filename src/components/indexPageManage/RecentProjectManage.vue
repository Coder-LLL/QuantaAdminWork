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
              src="../../assets/img/projectTipsBottom (3).png"
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
    <el-row type="flex" justify="start" class="el-row-three">
      <button @click="addProjectBtnClick">
        <img src="../../assets/img/新增 (1).png" alt="" v-if="isCheckAdd" />
        <img src="../../assets/img/新增.png" alt="" v-else />
        <span :class="[isCheckAdd ? 'isCheckAddFont' : 'noCheckAddFont']">
          新增
        </span>
      </button>
    </el-row>

    <el-row class="el-row-four" v-if="!isCheckAdd">
      <el-card
        v-for="item in allProjectData"
        v-bind:key="item.name"
        :body-style="{ padding: '0px', display: 'flex' }"
      >
        <div class="projectImgDiv">
          <img :src="item.path" class="image" />
        </div>
        <div class="projectDescriptionDiv">
          <div>{{ item.name }}</div>
          <div>
            <div>运营：{{ item.pm }}</div>
            <div>设计：{{ item.engineer }}</div>
            <div>研发：{{ item.designer }}</div>
          </div>
          <div class="projectDescriptionContainer gap">
            <el-tooltip
              :content="item.introduction"
              placement="top-start"
              :open-delay="0"
            >
              <div>{{ item.introduction }}</div>
            </el-tooltip>
          </div>
          <!-- 
          <div class="projectDescriptionContainer">
            <el-tooltip
              :content="item.content"
              placement="top-start"
              :open-delay="0"
            >
              <div>{{ item.content }}</div>
            </el-tooltip>
          </div> -->

          <div class="tools gap">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="modifyClick(item)"
            ></el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteClick(item)"
            ></el-button>
          </div>
        </div>
      </el-card>
    </el-row>

    <!-- 新增项目板块 -->
    <el-row class="el-row-add" v-else>
      <el-card :body-style="{ padding: '0px' }">
        <el-form
          :rules="addProjectFormRules"
          ref="addProjectFormRef"
          class="add_project_form"
          :model="addProjectForm"
          label-width="130px"
        >
          <el-col class="add-el-col-one">
            <!--    项目名称    -->
            <el-form-item label="项目名称" prop="name">
              <span slot="label">
                <span class="span-box">
                  <i class="">
                    <img src="../../assets/img/活动.png" alt="" />
                  </i>
                  <span>活动名称</span>
                </span>
              </span>

              <el-input
                class="addProject-el-input"
                v-model="addProjectForm.name"
                prefix-icon="iconfont icon-user"
              ></el-input>
            </el-form-item>
            <!--    项目优先级    -->
            <el-form-item label="优先级" prop="priority">
              <span slot="label">
                <span class="span-box">
                  <i class="">
                    <img src="../../assets/img/优先级.png" alt="" />
                  </i>
                  <span>优先级</span>
                </span>
              </span>

              <el-radio-group v-model="addProjectForm.priority" size="medium">
                <el-radio border :label="1"></el-radio>
                <el-radio border :label="2"></el-radio>
                <el-radio border :label="3"></el-radio>
              </el-radio-group>
            </el-form-item>

            <!--    运营人员    -->
            <el-form-item label="运营" prop="pm">
              <span slot="label">
                <span class="span-box">
                  <i class="">
                    <img src="../../assets/img/运营经理.png" alt="" />
                  </i>
                  <span>运营</span>
                </span>
              </span>

              <el-input
                class="addProject-el-input"
                v-model="addProjectForm.pm"
                prefix-icon="iconfont icon-user"
                placeholder="不同人名之间请使用&分隔"
              ></el-input>
            </el-form-item>

            <!--    设计人员    -->
            <el-form-item label="设计" prop="designer">
              <span slot="label">
                <span class="span-box">
                  <i class="">
                    <img src="../../assets/img/设计规范.png" alt="" />
                  </i>
                  <span>设计</span>
                </span>
              </span>

              <el-input
                class="addProject-el-input"
                v-model="addProjectForm.designer"
                prefix-icon="iconfont icon-user"
                placeholder="不同人名之间请使用&分隔"
              ></el-input>
            </el-form-item>
            <!--    开发人员    -->
            <el-form-item label="研发" prop="engineer">
              <span slot="label">
                <span class="span-box">
                  <i class="">
                    <img src="../../assets/img/研发 (1).png" alt="" />
                  </i>
                  <span>研发</span>
                </span>
              </span>
              <el-input
                class="addProject-el-input"
                v-model="addProjectForm.engineer"
                prefix-icon="iconfont icon-user"
                placeholder="不同人名之间请使用&分隔"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--    项目简介    -->
          <el-col class="add-el-col-two">
            <el-form-item label="简介" prop="introduction">
              <span slot="label">
                <span class="span-box">
                  <i class="">
                    <img src="../../assets/img/介绍.png" alt="" />
                  </i>
                  <span>简介</span>
                </span>
              </span>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                resize="none"
                placeholder="项目简介"
                v-model="addProjectForm.introduction"
              >
              </el-input>
            </el-form-item>
            <!--    项目内容   -->
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
                :autosize="{ minRows: 2, maxRows: 4 }"
                resize="none"
                placeholder="项目内容"
                v-model="addProjectForm.content"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="个人图片" class="imageUploadFormItem">
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
                  只能上传jpg/png文件（不上传则会使用默认图片）
                </div>
              </el-upload>
            </el-form-item>

            <el-form-item class="login_reset_btn">
              <el-button
                type="primary"
                @click="submitForm('addProjectFormRef')"
              >
                提交
              </el-button>
              <el-button @click="resetForm"> 重置 </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-row>

    <!-- 信息编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="editVisible"
      width="30%"
      top="10px"
      @close="editDialogClose"
    >
      <el-form ref="editForm" :model="editForm" label-width="100px">
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

        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="简介">
          <el-input
            type="textarea"
            resize="none"
            v-model="editForm.introduction"
            rows="4"
          ></el-input>
        </el-form-item>

        <el-form-item label="设计部成员">
          <el-input v-model="editForm.designer"></el-input>
        </el-form-item>

        <el-form-item label="运营部成员">
          <el-input v-model="editForm.pm"></el-input>
        </el-form-item>

        <el-form-item label="研发部成员">
          <el-input v-model="editForm.engineer"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 确定删除弹框 -->
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
  insertProject,
  getRecentProject,
  modifyProject,
  deleteProject,
} from "../../api/project.js";
import { imageUpload } from "../../api/imageUpload.js";
export default {
  mounted() {
    // document
    //   .querySelector(".el-row-four")
    //   .addEventListener("scroll", this.listenScroll);
  },
  data() {
    return {
      allProjectData: {},
      multipleSelection: [],
      textarea: "",
      isCheckAdd: false,

      addProjectForm: {
        // 登录的表单数据的绑定对象
        name: "",
        introduction: "",
        content: "",
        priority: "",
        path: "https://quantacenter.oss-cn-shenzhen.aliyuncs.com/images/4a4161ce-a2a3-477e-a2a7-efeaf7ad3f37.jpg",
        pm: "",
        designer: "",
        engineer: "",
      },
      addProjectFormRules: {
        // 验证项目名是否合法
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          {
            max: 15,
            message: "长度在 15 个字符以内",
            trigger: "blur",
          },
        ],
        // 验证优先级是否合法
        priority: [
          { required: true, message: "请选择优先级", trigger: "change" },
        ],
        pm: [
          { required: true, message: "请输入运营人员名称", trigger: "blur" },
          {
            max: 50,
            message: "长度在 50 个字符以内",
            trigger: "blur",
          },
        ],
        designer: [
          { required: true, message: "请输入设计人员名称", trigger: "blur" },
          {
            max: 50,
            message: "长度在 50 个字符以内",
            trigger: "blur",
          },
        ],
        engineer: [
          { required: true, message: "请输入开发名称", trigger: "blur" },
          {
            max: 50,
            message: "长度在 50 个字符以内",
            trigger: "blur",
          },
        ],
        introduction: [
          { required: true, message: "请输入项目简介", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入项目内容", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      timer: "",

      imgFile: "",
      fileList: [],

      deleteConfirmDialogVisible: false,
      deleteItem: {},

      editImgFile: "",
      editFileList: [],
      editForm: {},
      editVisible: false,
    };
  },
  filters: {
    participantFilter(participantList) {
      let resultStr = "";
      // 最后一个人名的后面不用加顿号
      for (let i = 0; i < participantList.length - 1; i++) {
        resultStr += participantList[i] + "、";
      }
      resultStr += participantList[participantList.length - 1];
      return resultStr;
    },
  },
  created() {
    this.getRecentProjectData();
  },
  methods: {
    getRecentProjectData() {
      getRecentProject().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.allProjectData = res.data;
          // console.log(this.allProjectData);
        } else {
          this.$message.error("数据获取出错");
        }
      });
    },
    listenScroll() {
      document.querySelector("html").style["overflow"] = "hidden";
      this.endScroll();
    },
    endScroll() {
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        document.querySelector("html").style["overflow"] = "auto";
      }, 1000);
    },
    addProjectBtnClick() {
      this.isCheckAdd = !this.isCheckAdd;
    },
    resetForm() {
      // 点击重置按钮,重置登录表单
      // this.$refs[addProjectFormRef].resetFields()
      this.$refs["addProjectFormRef"].resetFields();
    },

    submitForm(formName) {
      // console.log(this.addProjectForm);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断是否上传了图片
          if (this.imgFile) {
            let formData = new FormData();
            formData.append("image", this.imgFile);
            // 如果上传了图片。则先进行图片的上传。拿到返回值即图片路径path之后赋值给addStaffForm，再进行添加员工
            imageUpload(formData).then((res) => {
              // console.log(res);
              this.addProjectForm.path = res;

              insertProject(this.addProjectForm).then((res) => {
                // console.log(res);
                if (res.code == 200) {
                  this.getRecentProjectData();
                  this.resetForm();
                  this.$message.success("添加成功");
                } else {
                  this.resetForm();
                  this.$message.error("添加失败");
                }
              });
            });
          } else {
            // 没有上传图片，则使用默认的图片，无需上传图片，直接添加员工
            insertProject(this.addProjectForm).then((res) => {
              // console.log(res);
              if (res.code == 200) {
                this.getRecentProjectData();
                this.resetForm();
                this.$message.success("添加成功");
              } else {
                this.resetForm();
                this.$message.error("添加失败");
              }
            });
          }
        } else {
          return false;
        }
      });
    },

    fileChange(file, fileList) {
      // console.log(file);
      this.imgFile = file.raw;
      // console.log(this.imgFile.image);
      // console.log(fileList);
    },
    editDialogClose() {
      // 点击编辑对话框的关闭按钮的时候，把当前编辑栏选择的图片数据清空，以免点开别的编辑栏时造成数据错乱
      this.editImgFile = "";
      this.editFileList = [];
      this.getRecentProjectData();
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
      // 判断有无新上传照片文件
      //  console.log(this.editImgFile);
      if (this.editImgFile != "") {
        let formData = new FormData();
        formData.append("image", this.editImgFile);
        //   console.log("111");
        // 有上传新照片则先调用图片上传的接口
        imageUpload(formData).then((res) => {
          // console.log(res);
          this.editForm.path = res;
          this.editImgFile = "";
          this.editFileList = [];
          //    console.log("111");
          //    console.log(this.editForm);
          modifyProject(this.editForm).then((res) => {
            this.editVisible = false;
            this.getRecentProjectData();
            //   console.log(res);
            if (res.code == 200) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          });
        });
      } else {
        //   console.log("222");
        //  console.log(this.editForm);

        modifyProject(this.editForm).then((res) => {
          this.editVisible = false;
          this.getRecentProjectData();
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

    modifyClick(item) {
      // this.idx = index;
      this.editForm = item;
      // console.log(item);
      this.editVisible = true;
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
      deleteProject(this.deleteItem).then((res) => {
        // console.log(res);
        this.deleteConfirmDialogVisible = false;
        this.getRecentProjectData();
        if (res.code == 200) {
          this.$message.success("项目删除成功");
        } else {
          this.$message.error("项目删除出错");
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* background-color: gray; */
  padding: 0 20px;
  border-radius: 20px;
  overflow: hidden;
}
.el-row-one {
  height: 5%;
  /* background-color: red; */
}
.el-row-two {
  height: 30%;
  /* background-color: yellow; */
  /* margin-top: 5%; */
  /* padding-top: 5px; */
  box-sizing: border-box;
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
  /* padding: 10px 0; */
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
.el-row-three button {
  width: 6%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: inherit;
}

.el-row-four {
  height: 60%;
  overflow-y: scroll !important;
  padding: 0px 5px 30px 5px;
  /* background-color: blue; */
  box-sizing: border-box;
}

.el-row-four .el-card {
  margin-top: 20px;
  padding: 10px 0;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 15px;
  box-sizing: border-box;
}

.el-row-four .el-card .projectImgDiv {
  width: 40%;
  /* background-color: blue; */
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-row-four .el-card .projectImgDiv img {
  width: 95%;
  border-radius: 10px;
}
.el-row-four .el-card .projectDescriptionDiv {
  width: 60%;
  /* background-color: red; */
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.el-row-four .el-card .projectDescriptionDiv div {
  font-size: 14px;
  color: rgb(159, 155, 171);
  /* word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; */
}
.el-row-four .el-card .projectDescriptionDiv .projectDescriptionContainer {
  /* max-height: 33%; */
  /* background-color: blue; */
  display: -webkit-box;

  width: 100%;
  font-size: 14px;
  color: rgb(159, 155, 171);
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  margin-top: 10px;
  padding: 0 5px;
}

.el-row-four .el-card img {
  width: 85%;
}
.el-row-four::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-row-four::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.el-row-four::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
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
  border: 1px solid rgb(221, 221, 221);
  border-radius: 15px;
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

.imageUploadFormItem {
  margin-bottom: 5px !important;
}
.addProject-el-input {
  width: 65%;
  border-radius: 10px;
}
.el-col-add-two {
  width: 50%;
}
.login_reset_btn {
  /* background-color: pink; */
  display: flex;
  justify-content: space-around;
}

.tools {
  text-align: right;
  /* background-color: yellow; */
}
.gap {
  margin-top: 5px;
}

/* 不同状态下的新增按钮的字体颜色 */
.isCheckAddFont {
  color: rgb(102, 108, 234) !important;
}
.noCheckAddFont {
  color: rgb(151, 147, 164) !important;
}

.editInfoImage {
  width: 90%;
}
</style>
