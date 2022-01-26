<template>
  <div class="container">
    <el-row class="el-row-one"></el-row>
    <el-row type="flex" justify="center" class="el-row-two">
      <el-col :span="12">
        <div class="tipsTopContanier">
          <div class="tipsTop">
            <img
              class="tipsTopImgOne"
              src="../../assets/img/tipsTop.png"
              alt=""
            />
            <img
              class="tipsTopImgTwo"
              src="../../assets/img/tipsBottom.png"
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

    <el-row type="flex" justify="start" class="el-row-three">
      <button @click="addPictureBtnClick">
        <img src="../../assets/img/新增 (1).png" alt="" v-if="isCheckAdd" />
        <img src="../../assets/img/新增.png" alt="" v-else />
        <span :class="[isCheckAdd ? 'isCheckAddFont' : 'noCheckAddFont']">
          新增
        </span>
      </button>
    </el-row>

    <el-row class="el-row-four" v-if="!isCheckAdd">
      <el-table
        :data="allPictureData"
        :style="{ width: '100%' }"
        :header-cell-style="{ height: '10%', 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="description" label="图片描述"> </el-table-column>
        <el-table-column prop="priority" label="优先级"> </el-table-column>
        <el-table-column label="修改">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              <img src="../../assets/img/modify.png" alt="" />
            </el-button>
          </template>
        </el-table-column>

        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <img src="../../assets/img/delete.png" alt="" />
            </el-button>
          </template>
        </el-table-column>

        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showDetailInfo(scope.$index, scope.row)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="address" label="地址"> </el-table-column> -->
      </el-table>
    </el-row>

    <el-row class="el-row-add" v-else>
      <el-card :body-style="{ padding: '10px 0 0 0 ' }">
        <el-form
          :rules="addPictureFormRules"
          ref="addPictureFormRef"
          :model="addPictureForm"
          label-width="130px"
        >
          <el-col class="el-col-one">
            <el-form-item label="轮播图描述" prop="description">
              <span slot="label">
                <span class="span-box">
                  <i class="">
                    <img src="../../assets/img/活动.png" alt="" />
                  </i>
                  <span>轮播图描述</span>
                </span>
              </span>

              <el-input v-model="addPictureForm.description"></el-input>
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
              <el-select
                v-model="addPictureForm.priority"
                placeholder="请选择活动区域"
              >
                <el-option label="1（最低优先级）" :value="1"></el-option>
                <el-option label="2" :value="2"></el-option>
                <el-option label="3（最高优先级）" :value="3"></el-option>
              </el-select>
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
                  只能上传jpg/png文件（不上传会使用默认图片）
                </div>
              </el-upload>
            </el-form-item>

            <el-form-item class="login_reset_btn">
              <el-button
                type="primary"
                @click="submitForm('addPictureFormRef')"
              >
                提交
              </el-button>
              <el-button @click="resetForm('addPictureFormRef')">
                重置
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-row>

    <!-- 详细信息 -->
    <el-dialog
      title="详细信息"
      :visible.sync="deatailInfoVisible"
      width="30%"
      top="10px"
    >
      <el-form ref="detailInfo" :model="detailInfo" label-width="70px">
        <el-form-item label="图片">
          <img :src="detailInfo.path" class="detailInfoImage" />
        </el-form-item>

        <el-form-item label="描述">
          <el-input readonly v-model="detailInfo.description"></el-input>
        </el-form-item>

        <el-form-item label="优先级">
          <el-input readonly v-model="detailInfo.priority"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deatailInfoVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 信息编辑的弹出框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editInfoVisible"
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
            :on-change="fileChange"
            :on-remove="handleRemove"
            :file-list="fileList"
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

        <el-form-item label="描述">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>

        <el-form-item label="优先级">
          <el-select v-model="editForm.priority" placeholder="请选择活动区域">
            <el-option label="1（最低优先级）" :value="1"></el-option>
            <el-option label="2" :value="2"></el-option>
            <el-option label="3（最高优先级）" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
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
      <span>确定永久删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteRefuse">取 消</el-button>
        <el-button type="primary" @click="deleteAgree">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllPicture,
  insertPicture,
  modifyPicture,
  deletePicture,
} from "../../api/picture.js";
import { imageUpload } from "../../api/imageUpload.js";
export default {
  data() {
    return {
      allPictureData: [],
      ruleForm: {},
      fileList: [],
      formData: { imagesFile: "" },
      isCheckAdd: false,

      addPictureForm: {
        description: "",
        priority: "",
        path: "",
      },
      addPictureFormRules: {
        description: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { max: 15, message: "长度在 15 个字符以内", trigger: "blur" },
        ],
        priority: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
      detailInfo: {},
      deatailInfoVisible: false,

      editInfoVisible: false,
      editForm: {},

      initialImgUrl: "",
      imgFile: "",

      deleteConfirmDialogVisible: false,
      deleteItem: {},
    };
  },
  created() {
    this.getAllPictureData();
  },
  methods: {
    getAllPictureData() {
      getAllPicture().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          // 把对象转换成数组
          var arr = [];
          for (let i in res.data) {
            arr.push(res.data[i]); //属性
          }
          // 再把数组赋值为allPictureData
          this.allPictureData = arr;
        } else {
          this.$message.error("数据获取出错");
        }
      });
    },

    handleEdit(index, row) {
      // this.idx = index;
      this.editForm = row;
      // 保存一下初始的图片地址，防止后续修改图片地址时找不到原本的图片地址
      this.initialImgUrl = row.path;
      this.editInfoVisible = true;
      // console.log(this.editForm);
      // console.log(this.initialImgUrl);
    },
    handleRemove() {
      this.imgFile = "";
      // console.log(this.imgFile);
    },
    cancelEdit() {
      this.editInfoVisible = false;

      // 点击取消按钮的时候，把当前编辑栏选择的图片数据清空，以免点开别的编辑栏时造成数据错乱
      this.imgFile = "";
      this.fileList = [];
    },
    saveEdit() {
      // console.log(this.imgFile);
      // console.log(this.fileList);
      // 判断有无新上传照片文件
      if (this.imgFile != "") {
        let formData = new FormData();
        formData.append("image", this.imgFile);
        // 有上传新照片则先调用图片上传的接口
        imageUpload(formData).then((res) => {
          // console.log(res);
          this.editForm.path = res;
          // console.log(this.editForm);
          modifyPicture(this.editForm).then((res) => {
            // console.log(res);
            if (res.code == 200) {
              this.getAllPictureData();
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          });
        });
      } else {
        modifyPicture(this.editForm).then(
          (res) => {
            this.editInfoVisible = false;
            this.getAllPictureData();
            // console.log(res);
            if (res.code == 200) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          },
          (err) => {
            // console.log(err);
          }
        );
      }
      // console.log("save edit");
    },
    handleDelete(index, row) {
      this.deleteConfirmDialogVisible = true;
      this.deleteItem = row;
      // console.log(this.deleteItem);
      // console.log(index, row);
    },
    addPictureBtnClick() {
      this.isCheckAdd = !this.isCheckAdd;
    },

    fileChange(file, fileList) {
      this.imgFile = file.raw;
      // console.log(this.imgFile);
    },

    submitForm(formName) {
      // console.log(this.addPictureForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断是否上传了图片
          if (this.imgFile) {
            let formData = new FormData();
            formData.append("image", this.imgFile);
            // 如果上传了图片。则先进行图片的上传。拿到返回值即图片路径path之后赋值给addStaffForm，再进行添加员工
            imageUpload(formData).then((res) => {
              // console.log(res);
              this.addPictureForm.path = res;

              insertPicture(this.addPictureForm).then((res) => {
                // console.log(res);
                if (res.code == 200) {
                  this.getAllPictureData();
                  this.resetForm("addPictureFormRef");
                  this.imgFile = "";
                  this.$message.success("添加成功");
                } else {
                  this.$message.error("添加失败");
                }
              });
            });
          } else {
            // 没有上传图片，则使用默认的图片，无需上传图片，直接添加员工
            insertPicture(this.addPictureForm).then((res) => {
              // console.log(res);
              if (res.code == 200) {
                this.getAllPictureData();
                this.resetForm("addPictureFormRef");
                this.imgFile = "";
                this.$message.success("添加成功");
              } else {
                this.$message.error("添加失败");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    showDetailInfo(index, row) {
      this.detailInfo = row;

      this.deatailInfoVisible = true;
      // console.log(this.detailInfo);
    },

    editDialogClose() {
      // 点击编辑对话框的关闭按钮的时候，把当前编辑栏选择的图片数据清空，以免点开别的编辑栏时造成数据错乱
      this.imgFile = "";
      this.fileList = [];
      this.getAllPictureData();
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
      deletePicture(this.deleteItem).then((res) => {
        // console.log(res);
        this.deleteConfirmDialogVisible = false;
        // 删除成功后重新获取数据
        this.getAllPictureData();
        if (res.code == 200) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
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
  box-sizing: border-box;
  /* background-color: yellow; */
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
.el-row-three button {
  width: 6%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: inherit;
}

.el-row-four {
  height: 60%;
  padding-bottom: 30px;
  box-sizing: border-box;

  /* background-color: pink; */
  /* display: flex; */
  /* justify-content: space-around; */
  /* align-items: center; */
}

.el-row-four .el-table {
  width: 100%;
  height: 100%;
  /* background-color: yellow; */
}
.el-row-four .el-table >>> .el-table__body-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll !important;
}

.el-row-four .el-table >>> .el-table__body-wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-row-four .el-table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.el-row-four .el-table >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.el-row-add {
  height: 55%;
  /* background-color: pink; */
}
.el-row-add .el-col-one {
  width: 50%;
  /* height: 100% !important; */
  margin-left: 25%;
  /* background-color: pink; */
}

.detailInfoImage {
  width: 90%;
}

.editInfoImage {
  width: 90%;
}

/* 不同状态下的新增按钮的字体颜色 */
.isCheckAddFont {
  color: rgb(102, 108, 234) !important;
}
.noCheckAddFont {
  color: rgb(151, 147, 164) !important;
}
</style>
