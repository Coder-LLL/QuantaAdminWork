<template>
  <div class="container">
    <el-row type="flex" justify="start" class="el-row-one">
      <button @click="addStaffBtnClick">
        <img src="../../assets/img/新增 (1).png" alt="" v-if="isCheckAdd" />
        <img src="../../assets/img/新增.png" alt="" v-else />
        <span :class="[isCheckAdd ? 'isCheckAddFont' : 'noCheckAddFont']">
          新增
        </span>
      </button>

      <el-select
        @change="selectChange"
        v-model="currentTerm"
        placeholder="请选择"
      >
        <el-option
          v-for="item in termOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-row>

    <el-row class="el-row-two" v-if="!isCheckAdd">
      <el-table
        :data="showStaffData"
        :header-cell-style="{ height: '10%', 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="position" label="职务"> </el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              <img src="../../assets/img/modify.png" alt="" />
            </el-button>
            <el-button size="mini" @click="handleDelete(scope.row)">
              <img src="../../assets/img/delete.png" alt="" />
            </el-button>
          </template>
        </el-table-column>

        <el-table-column label="详细信息">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 添加员工板块 -->
    <el-row class="el-row-add" v-else>
      <el-form
        :model="addStaffForm"
        :rules="addStaffFormRules"
        ref="addStaffForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-col class="el-col-one">
          <el-form-item label="姓名" prop="name">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/姓名.png" alt="" />
                </i>
                <span>姓名</span>
              </span>
            </span>

            <el-input class="add-staff-input" v-model="addStaffForm.name">
            </el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/性别.png" alt="" />
                </i>
                <span>性别</span>
              </span>
            </span>

            <el-radio v-model="addStaffForm.gender" :label="1">男</el-radio>
            <el-radio v-model="addStaffForm.gender" :label="0">女</el-radio>
          </el-form-item>

          <el-form-item label="部门" prop="department">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/部门.png" alt="" />
                </i>
                <span>部门</span>
              </span>
            </span>

            <el-radio-group v-model="addStaffForm.department">
              <el-radio label="设计部"> 设计部 </el-radio>
              <el-radio label="运营部"> 运营部 </el-radio>
              <el-radio label="研发部"> 研发部 </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="职务" prop="position">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/公文包.png" alt="" />
                </i>
                <span>职务</span>
              </span>
            </span>

            <el-input v-model="addStaffForm.position"></el-input>
          </el-form-item>

          <el-form-item label="年级" prop="grade">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/年级.png" alt="" />
                </i>
                <span>年级</span>
              </span>
            </span>

            <el-select v-model="addStaffForm.grade" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="quanta届数" prop="term">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/选择 (1).png" alt="" />
                </i>
                <span>quanta届数</span>
              </span>
            </span>

            <el-select v-model="addStaffForm.term" placeholder="请选择">
              <el-option
                v-for="item in termOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col class="el-col-two">
          <el-form-item label="在职公司" prop="company">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/公司.png" alt="" />
                </i>
                <span>在职公司</span>
              </span>
            </span>

            <el-input v-model="addStaffForm.company"></el-input>
          </el-form-item>

          <el-form-item label="公司职务" prop="companyPosition">
            <span slot="label">
              <span class="span-box">
                <i class="">
                  <img src="../../assets/img/职务管理.png" alt="" />
                </i>
                <span>公司职务</span>
              </span>
            </span>

            <el-input v-model="addStaffForm.companyPosition"></el-input>
          </el-form-item>

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
              resize="none"
              v-model="addStaffForm.introduction"
              :autosize="{ minRows: 4, maxRows: 7 }"
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
                只能上传jpg/png文件 且只能上传一张
              </div>
            </el-upload>
          </el-form-item>

          <el-form-item class="login_reset_btn">
            <el-button type="primary" @click="submitForm('addStaffForm')">
              提交
            </el-button>
            <el-button @click="resetForm('addStaffForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

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
          <img :src="editForm.path" class="staffImage" />
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

        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="年级">
          <el-input v-model="editForm.grade"></el-input>
        </el-form-item>

        <el-form-item label="简介">
          <el-input
            type="textarea"
            resize="none"
            rows="4"
            v-model="editForm.introduction"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="部门">
          <el-select v-model="editForm.department" placeholder="请选择">
            <el-option label="管理层" value="管理层"> </el-option>
            <el-option label="设计部" value="设计部"> </el-option>
            <el-option label="运营部" value="运营部"> </el-option>
            <el-option label="研发部" value="研发部"> </el-option>
            <el-option label="公关部" value="公关部"> </el-option>
            <el-option label="技术部" value="技术部"> </el-option>
          </el-select>

          <!-- <el-radio-group v-model="editForm.department">
            <el-radio label="技术部 "> 管理层 </el-radio>
            <el-radio label="设计部"> 设计部 </el-radio>
            <el-radio label="运营部"> 运营部 </el-radio>
            <el-radio label="研发部"> 研发部 </el-radio>
            <el-radio label="公关部"> 公关部 </el-radio>
            <el-radio label="技术部 "> 技术部 </el-radio>
            <el-radio label="研发部前端"> 研发部前端 </el-radio>
            <el-radio label="研发部后端"> 研发部后端 </el-radio>
            <el-radio label="研发部安卓"> 研发部安卓 </el-radio>
          </el-radio-group> -->
        </el-form-item>

        <el-form-item label="职务">
          <el-input v-model="editForm.position"></el-input>
        </el-form-item>

        <el-form-item label="工作单位">
          <el-input v-model="editForm.company"></el-input>
        </el-form-item>

        <el-form-item label="工作职位">
          <el-input v-model="editForm.companyPosition"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 详细信息 -->
    <el-dialog
      title="详细信息"
      :visible.sync="deatailInfoVisible"
      width="40%"
      top="10px"
    >
      <el-form ref="detailInfo" :model="detailInfo" label-width="70px">
        <el-form-item label="图片">
          <img :src="detailInfo.path" class="staffImage" />
        </el-form-item>

        <el-form-item label="姓名">
          <el-input readonly v-model="detailInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="年级">
          <el-input readonly v-model="detailInfo.grade"></el-input>
        </el-form-item>

        <el-form-item label="简介">
          <el-input
            type="textarea"
            resize="none"
            readonly
            v-model="detailInfo.introduction"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="部门">
          <el-input readonly v-model="detailInfo.department"></el-input>
        </el-form-item>

        <el-form-item label="职务">
          <el-input readonly v-model="detailInfo.position"></el-input>
        </el-form-item>

        <el-form-item label="工作单位">
          <el-input readonly v-model="detailInfo.company"></el-input>
        </el-form-item>

        <el-form-item label="工作职位">
          <el-input readonly v-model="detailInfo.companyPosition"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deatailInfoVisible = false">关闭</el-button>
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
  getAllStaff,
  modifyStaff,
  insertStaff,
  deleteStaff,
} from "../../api/staff.js";

import { imageUpload } from "../../api/imageUpload.js";
export default {
  data() {
    return {
      // 年级选择
      options: [
        { value: "2004", label: "2004" },
        { value: "2005", label: "2005" },
        { value: "2006", label: "2006" },
        { value: "2007", label: "2007" },
        { value: "2008", label: "2008" },
        { value: "2009", label: "2009" },
        { value: "2010", label: "2010" },
        { value: "2011", label: "2011" },
        { value: "2012", label: "2012" },
        { value: "2013", label: "2013" },
        { value: "2014", label: "2014" },
        { value: "2015", label: "2015" },
        { value: "2016", label: "2016" },
        { value: "2017", label: "2017" },
        { value: "2018", label: "2018" },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" },
      ],
      // 届数选择
      termOptions: [
        { value: "1", label: "第1届" },
        { value: "2", label: "第2届" },
        { value: "3", label: "第3届" },
        { value: "4", label: "第4届" },
        { value: "5", label: "第5届" },
        { value: "6", label: "第6届" },
        { value: "7", label: "第7届" },
        { value: "8", label: "第8届" },
        { value: "9", label: "第9届" },
        { value: "10", label: "第10届" },
        { value: "11", label: "第11届" },
        { value: "12", label: "第12届" },
        { value: "13", label: "第13届" },
        { value: "14", label: "第14届" },
        { value: "15", label: "第15届" },
        { value: "16", label: "第16届" },
      ],
      currentGrade: "2019", // 当前页面所展示的管理层是年份
      currentTerm: "15", // 当前页面所展示的管理层是年份，
      isCheckAdd: false,
      allStaffData: {}, // 所有管理层数据
      showStaffData: [],

      addStaffForm: {
        name: "",
        path: "https://quantacenter.oss-cn-shenzhen.aliyuncs.com/images/4a4161ce-a2a3-477e-a2a7-efeaf7ad3f37.jpg",
        gender: "",
        position: "",
        department: "",
        grade: "",
        term: "",
        company: "",
        companyPosition: "",
        introduction: "",
      },
      addStaffFormRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 10, message: "长度在 10 个字符以内", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        position: [
          { required: true, message: "请输入职位", trigger: "blur" },
          { max: 10, message: "长度在 10 个字符以内", trigger: "blur" },
        ],
        department: [
          { required: true, message: "请选择部门", trigger: "change" },
        ],

        grade: [{ required: true, message: "请选择年级", trigger: "change" }],
        term: [
          { required: true, message: "请选择quanta届数", trigger: "change" },
        ],
        company: [
          { required: true, message: "请输入在职公司", trigger: "blur" },
          { max: 15, message: "长度在 15 个字符以内", trigger: "blur" },
        ],

        companyPosition: [
          { required: true, message: "请输入公司职务", trigger: "blur" },
          { max: 15, message: "长度在 15 个字符以内", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请填写介绍", trigger: "blur" },
        ],
      },
      fileList: [],
      detailInfo: {},
      deatailInfoVisible: false,
      editInfoVisible: false,
      editForm: {},
      deleteConfirmDialogVisible: false,
      imgFile: "",

      editImgFile: "",
      editFileList: [],
    };
  },
  created() {
    this.getAllStaffData();
  },
  methods: {
    getAllStaffData() {
      getAllStaff().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.allStaffData = res.data;
          this.showStaff();
          // console.log(this.allStaffData);
        } else {
          this.$message.error("数据获取出错");
        }
      });
    },
    showStaff() {
      // console.log(111);
      var arr = [];
      for (let i in this.allStaffData) {
        arr.push(this.allStaffData[i]); //属性
      }
      this.showStaffData = arr.filter((element) => {
        return element.term == this.currentTerm;
      });
    },
    handleDetail(index, row) {
      this.detailInfo = row;
      this.deatailInfoVisible = true;
    },
    handleEdit(index, row) {
      // this.idx = index;
      this.editForm = row;
      this.editInfoVisible = true;
    },
    saveEditTwo() {
      modifyStaff(this.editForm).then((res) => {
        this.editInfoVisible = false;
        this.getAllStaffData();
        // console.log(res);
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
      this.getAllStaffData();
    },
    handleRemove() {
      this.editImgFile = "";
      this.editFileList = [];
      // console.log(this.imgFile);
    },
    editFileChange(file, fileList) {
      this.editImgFile = file.raw;
      //  console.log(this.editImgFile);
    },
    saveEdit() {
      // 判断有无新上传照片文件
      //    console.log(this.editImgFile);
      if (this.editImgFile != "") {
        let formData = new FormData();
        formData.append("image", this.editImgFile);
        //     console.log("111");
        // 有上传新照片则先调用图片上传的接口
        imageUpload(formData).then((res) => {
          // console.log(res);
          this.editForm.path = res;
          this.editImgFile = "";
          this.editFileList = [];
          // console.log(this.editForm);
          modifyStaff(this.editForm).then((res) => {
            this.editInfoVisible = false;
            this.getAllStaffData();
            //    console.log(res);
            if (res.code == 200) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          });
        });
      } else {
        //      console.log(this.editForm);
        //   console.log("222");
        modifyStaff(this.editForm).then((res) => {
          this.editInfoVisible = false;
          this.getAllStaffData();
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

    deleteClick() {},
    handleDelete(item) {
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
      deleteStaff(this.deleteItem).then((res) => {
        // console.log(res);
        this.deleteConfirmDialogVisible = false;
        this.getAllStaffData();
        if (res.code == 200) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    addStaffBtnClick() {
      this.isCheckAdd = !this.isCheckAdd;
    },
    selectChange(value) {
      // 每次选择框里面的年份变化时都要重新渲染
      this.showStaff();
      // console.log(value);
    },

    fileChange(file, fileList) {
      // console.log(file);
      this.imgFile = file.raw;
      // console.log(this.imgFile.image);
      // console.log(fileList);
    },

    submitForm(formName) {
      // console.log(this.addStaffForm);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断是否上传了图片
          if (this.imgFile) {
            let formData = new FormData();
            formData.append("image", this.imgFile);
            // 如果上传了图片。则先进行图片的上传。拿到返回值即图片路径path之后赋值给addStaffForm，再进行添加员工
            imageUpload(formData).then((res) => {
              // console.log(res);
              this.addStaffForm.path = res;

              insertStaff(this.addStaffForm).then((res) => {
                // console.log(res);
                if (res.code == 200) {
                  this.getAllStaffData();
                  this.resetForm("addStaffForm");
                  this.$message.success("添加成功");
                } else {
                  this.resetForm("addStaffForm");
                  this.$message.error("添加失败");
                }
              });
            });
          } else {
            // 没有上传图片，则使用默认的图片，无需上传图片，直接添加员工
            insertStaff(this.addStaffForm).then((res) => {
              // console.log(res);
              if (res.code == 200) {
                this.getAllStaffData();
                this.resetForm("addStaffForm");
                this.$message.success("添加成功");
              } else {
                this.resetForm("addStaffForm");
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
  /* height: 5%; */
  /* background-color: pink; */
  display: flex;
  justify-content: space-between;
}
.el-row-one button {
  width: 6%;
  height: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: inherit;
}
.el-row-one span {
  color: gray;
  /* font-size: 12px; */
  /* height: 100%; */
  /* margin-right: 3%; */
}

.el-row-two {
  height: 90%;
  /* background-color: pink; */
  padding: 10px 0;
}
.el-row-two .el-table {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 10px;
}
.el-row-two .el-table >>> .el-table__body-wrapper {
  width: 100%;
  height: 90%;
  overflow-y: scroll;
}

.el-row-two .el-table >>> .el-table__body-wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-row-two .el-table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.el-row-two .el-table >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.el-row-add {
  height: 90%;
  /* background-color: pink; */
  padding: 10px 0;
}
.el-row-add .el-form {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
}
.el-row-add .el-col-one {
  width: 50%;
  height: 100%;
  /* background-color: pink; */
}
.el-row-add .el-col-two {
  width: 50%;
  height: 100%;
  /* background-color: blue; */
}

.el-col-one .el-input >>> .el-input__inner {
  width: 95%;
  border-radius: 30px !important;
}
.el-col-two .el-textarea >>> .el-textarea__inner {
  width: 95%;
}
.staffImage {
  width: 90%;
  /* height: 100px; */
}

/* 不同状态下的新增按钮的字体颜色 */
.isCheckAddFont {
  color: rgb(102, 108, 234) !important;
}
.noCheckAddFont {
  color: rgb(151, 147, 164) !important;
}
</style>