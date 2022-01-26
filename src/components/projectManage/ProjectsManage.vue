<template>
  <div class="ProjectsManageContainer">
    <div class="cardItemContanier">
      <el-card
        v-for="item in allProjectData"
        v-bind:key="item.name"
        :body-style="{ padding: '0px', display: 'flex' }"
      >
        <div class="projectImgDiv">
          <img :src="item.path" class="image" />
        </div>
        <div class="projectDescriptionDiv">
          <div class="gap">{{ item.name }}</div>
          <div class="gap">
            <div>运营：{{ item.pm | participantFilter }}</div>
            <div>设计：{{ item.designer | participantFilter }}</div>
            <div>研发：{{ item.engineer | participantFilter }}</div>
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
    </div>

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
  getAllProject,
  modifyProject,
  deleteProject,
} from "../../api/project.js";
import { imageUpload } from "../../api/imageUpload.js";
export default {
  mounted() {
    // 当滚动过快的时候，会有很多歌el-tooltip显示出来，此时会造成html的滚动条出来，页面发生跳动，所以在这里监听滚动条滚动时间，然后设置html忽略浮动
    document
      .querySelector(".cardItemContanier")
      .addEventListener("scroll", this.listenScroll);
  },
  data() {
    return {
      timer: "",

      editImgFile: "",
      editFileList: [],
      editForm: {},
      editVisible: false,

      allProjectData: {},

      deleteConfirmDialogVisible: false,
      deleteItem: {},
    };
  },
  created() {
    this.getAllProjectData();
  },
  filters: {
    participantFilter(participantStr) {
      let resultArr = [];
      resultArr = participantStr.split("&");
      let resultStr = [];
      resultStr = resultArr.join("  ");
      return resultStr;
    },
  },
  methods: {
    getAllProjectData() {
      getAllProject().then((res) => {
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
    // saveEdit() {
    //   console.log(this.editForm);
    //   modifyProject(this.editForm).then((res) => {
    //     this.editVisible = false;
    //     if (res.code == 200) {
    //       this.$message.success("项目修改成功");
    //     } else {
    //       this.$message.error("项目修改出错");
    //     }
    //   });
    // },

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
      this.getAllProjectData();
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
      // console.log(this.editImgFile);
      if (this.editImgFile != "") {
        let formData = new FormData();
        formData.append("image", this.editImgFile);
        //    console.log("111");
        // 有上传新照片则先调用图片上传的接口
        imageUpload(formData).then((res) => {
          // console.log(res);
          this.editForm.path = res;
          this.editImgFile = "";
          this.editFileList = [];
          // console.log(this.editForm);
          modifyProject(this.editForm).then((res) => {
            this.editVisible = false;
            this.getAllProjectData();
            //     console.log(res);
            if (res.code == 200) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          });
        });
      } else {
        //    console.log(this.editForm);
        //    console.log("222");
        modifyProject(this.editForm).then((res) => {
          this.editVisible = false;
          this.getAllProjectData();
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
        this.getAllProjectData();
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
.ProjectsManageContainer {
  width: 100%;
  height: 100%;

  /* overflow-y: scroll; */
}
.cardItemContanier {
  width: 100%;
  height: 100%;

  background-color: #fff;
  /* background-color: gray; */
  padding: 50px 50px;
  border-radius: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  overflow-y: scroll;
}

/* el-card的滚动条样式 */
.cardItemContanier::-webkit-scrollbar {
  background-color: blue;
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.cardItemContanier::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.cardItemContanier::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.ProjectsManageContainer .el-card {
  width: 100%;
  margin-top: 20px;
  border: 1px solid rgb(211, 211, 211);
  border-radius: 15px;
}
.ProjectsManageContainer .el-card:nth-child(1) {
  width: 100%;
  margin-top: 0px;
  /* background-color: pink; */
}

.el-card .projectImgDiv {
  width: 40%;
  /* background-color: blue; */
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-card .projectImgDiv img {
  width: 95%;
  border-radius: 10px;
}
.el-card .projectDescriptionDiv {
  width: 60%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  /* background-color: blue; */
  justify-content: space-around;
}
.el-card .projectDescriptionDiv div {
  font-size: 14px;
  color: rgb(159, 155, 171);
  /* word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; */
}
.el-card .projectDescriptionDiv .projectDescriptionContainer {
  /* max-height: 33%; */
  display: -webkit-box;

  width: 100%;
  font-size: 14px;
  color: rgb(159, 155, 171);
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  padding: 0 5px;
}
.tools {
  text-align: right;
  /* background-color: yellow; */
}
.gap {
  margin-top: 5px;
}

.editInfoImage {
  width: 90%;
}
</style>