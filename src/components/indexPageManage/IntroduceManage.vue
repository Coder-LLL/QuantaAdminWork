<template>
  <div class="container">
    <el-row class="el-row-one"></el-row>
    <el-row type="flex" justify="center" class="el-row-two">
      <el-col :span="8">
        <div class="tips">Recent quanta project</div>
        <div class="underTpis">
          <el-button type="primary" size="medium" round>展示三个</el-button>
          <img class="emojiPng" src="../../assets/img/emoji.png" alt="" />
        </div>
      </el-col>

      <el-col :span="8" class="el-col-imgShow">
        <img class="imgShow" src="../../assets/img/preview.jpg" alt="" />
      </el-col>
    </el-row>
    <el-row class="el-row-one"></el-row>
    <el-row type="flex" justify="start" class="el-row-three">
      <span>选择修改内容</span>
    </el-row>

    <el-row class="el-row-four">
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
      >
        <el-col class="el-row-left">
          <el-form-item label="部门" label-width="25%" prop="radioType">
            <el-radio-group v-model="ruleForm.radioType">
              <el-radio :label="1">quanta介绍</el-radio>
              <el-radio :label="2">运营部介绍</el-radio>
              <el-radio :label="3">设计部介绍</el-radio>
              <el-radio :label="4">育人理念</el-radio>
              <el-radio :label="5">管理方式</el-radio>
              <el-radio :label="6">优质产品</el-radio>
              <el-radio :label="7">quanta文化</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="el-row-right">
          <el-form-item label="简介" label-width="15%" prop="textarea">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              v-model="ruleForm.textarea"
              resize="none"
            ></el-input>
          </el-form-item>

          <el-form-item class="login_reset_btn">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        radioType: "",
        textarea: "",
      },

      rules: {
        radioType: [
          { required: true, message: "请选择要修改的目标", trigger: "change" },
        ],
        textarea: [
          { required: true, message: "请填写活动形式", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    resetForm() {
      // 点击重置按钮,重置登录表单
      // this.$refs[addProjectFormRef].resetFields()
      this.$refs.ruleFormRef.resetFields();
    },
    submitForm() {
      this.addProjectLoading = true;
      this.$refs.ruleFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) {
          // 如果valid的值为false
          // return (this.addProjectLoading = false);
        }
        // this.$message.success("添加成功!");

        // this.$router.push("/home");
        // this.addProjectLoading = false;
      });
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.addProjectForm.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
}
.el-col-imgShow {
  /* background-color: pink; */
  display: flex;
  align-items: center;
}
/* .el-main {
  background-color: pink;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0;
} */

.tips {
  height: 50%;
  /* line-height: 60px; */
  font-size: x-large;
  /* text-align: center; */
  font-weight: 900;
  font-style: italic;
  /* background: #99a9bf; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 5px 1px 6px hsl(0, 2%, 33%);
}

.underTpis {
  height: 50%;
  background-color: #fff;
  align-items: center;
  align-content: center;
  display: flex;
  justify-content: center;
}
.underTpis .el-button {
  background-color: rgb(96, 103, 233);
}

.emojiPng {
  /* width: 150px;
  height: 150px; */
  height: 100%;
  /* background-color: aqua; */
}
.imgShow {
  width: 100%;
  height: 80%;
}

.el-row-three {
  height: 5%;

  padding: 5px 2%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(221, 221, 221);
}

.el-row-three span {
  color: rgb(171, 168, 182);
  font-size: 14px;
  /* height: 100%; */
  /* margin-right: 3%; */
  display: flex;
  align-items: center;
}

.el-row-four {
  height: 55%;
  /* padding: 10px; */
  /* background-color: pink; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-row-four .el-form {
  width: 100%;
  height: 100%;
}
.el-row-four .el-row-left {
  width: 40%;
  height: 100%;
  /* background-color: pink; */
}

.el-row-four .el-row-right {
  width: 60%;
  height: 100%;
  /* background-color: #0066ff; */
  padding: 20px;
}

.el-row-left .el-form-item {
  width: 100%;
  height: 100%;
  /* background-color: gray; */
}
.el-row-left .el-radio-group {
  width: 100%;
  height: 100%;
  /* padding-bottom: 50px;
  padding-left: 50px;
     */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* background-color: yellow; */
  padding: 0 20px;
}
.el-row-left .el-radio-group .el-radio {
  margin-top: 20px;
  font-size: 14px;
  color: rgb(152, 148, 165);
}

.login_reset_btn {
  /* background-color: pink; */
  display: flex;
  justify-content: space-around;
}
/* .el-row-four .el-card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid rgb(221, 221, 221);
  padding: 10px;
}
.el-row-four .el-card .el-card__body {
  width: 100%;
  height: 100%;
} */
</style>
