<template>
  <div class="container">
    <el-row class="el-row-one"></el-row>
    <el-row type="flex" justify="center" class="el-row-two">
      <el-col :span="8">
        <div class="tips">Recent quanta project</div>
        <div class="underTpis">
          <el-button type="primary" size="medium" round @click="submitForm()"
            >确认修改</el-button
          >
          <img class="emojiPng" src="../../assets/img/emoji.png" alt="" />
        </div>
      </el-col>

      <el-col :span="8" class="el-col-imgShow">
        <img class="imgShow" src="../../assets/img/preview.jpg" alt="" />
      </el-col>
    </el-row>
    <el-row class="el-row-one"></el-row>
    <el-row type="flex" class="el-row-three"> </el-row>

    <el-row class="el-row-four">
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-position="top"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-col>
          <el-form-item label="选择修改内容" prop="radioType">
            <el-radio-group v-model="ruleForm.radioType">
              <el-radio
                v-for="item in tableData"
                v-bind:key="item.id"
                :label="item.id"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="简介" label-width="15%" prop="textarea">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
              v-model="ruleForm.textarea"
              resize="none"
            ></el-input>
          </el-form-item>

          <el-form-item class="login_reset_btn">
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
      tableData: [
        {
          name: "quanta介绍",
          id: "1",
        },
        {
          name: "quanta传承",
          id: "2",
        },
        {
          name: "quanta发展",
          id: "3",
        },
        {
          name: "quanta框架",
          id: "4",
        },
      ],
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
        if (!valid) {
          // 如果valid的值为false
          // return (this.addProjectLoading = false);
        }
        // this.$message.success("添加成功!");

        // this.$router.push("/home");
        // this.addProjectLoading = false;
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

.el-row-four {
  height: 55%;
  /* background-color: gray; */
  padding: 10px 10px;
  /* display: flex; */
  /* justify-content: space-around; */
  /* align-items: center; */
}
.el-row-four .el-form {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
}
.el-row-four .el-form .el-col:nth-child(1) {
  width: 40%;
  height: 100%;
  /* background-color: blue; */
}
.el-row-four .el-form .el-col:nth-child(2) {
  width: 60%;
  height: 100%;
  /* background-color: yellow; */
}
.el-radio-group {
  width: 100%;
  /* background-color: pink; */
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}
.el-radio-group .el-radio {
  margin-top: 20px;
  font-size: 14px;
  color: rgb(152, 148, 165);
}
</style>
