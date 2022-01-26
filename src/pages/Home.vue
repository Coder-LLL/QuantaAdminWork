<template>
  <el-container class="home-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <div class="indexLogo">
          <img src="../assets/img/quantaLogo.png" alt="" />
        </div>

        <!-- 导航栏 -->
        <el-menu
          background-color="transparent"
          text-color="gray"
          active-text-color="#fff"
          unique-opened
          :router="true"
          :default-active="activePath"
          @select="handleSelect"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.path + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <img
                class="iconImg"
                :src="item.iconPath"
                alt=""
                v-if="item.path != activeOneLevelPath"
              />

              <img class="iconImg" :src="item.iconActivePath" alt="" v-else />
              <span>{{ item.authName }} </span>
            </template>

            <el-menu-item
              :index="sunItem.path"
              v-for="sunItem in item.children"
              :key="sunItem.id"
            >
              <template slot="title">
                <img
                  class="iconImg"
                  :src="iconsObjTwoLevel[sunItem.id]"
                  alt=""
                />
                <!-- 图标 -->
                <span>{{ sunItem.authName }}</span>
                <!-- 文本 -->
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>

        <div class="bottomLogo">
          <img src="../assets/img/rocketImgModify.png" alt="" />
        </div>
      </el-aside>

      <!-- 右侧内容主题 -->
      <el-main>
        <div class="routerViewContainer">
          <!-- 路由占位符 -->
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 左侧菜单数据
      menuList: [
        {
          authName: "首页管理",
          id: 1,
          order: 1,
          path: "/indexPageManage",
          iconPath: require("../assets/img/组 17_1.png"),
          iconActivePath: require("../assets/img/组 15.png"),
          children: [
            {
              authName: "首页插画管理",
              id: 11,
              order: 1,
              path: "/pictureManage",
              children: [],
            },
            // {
            //   authName: "部门介绍管理",
            //   id: 12,
            //   order: 1,
            //   path: "/introduceManage",
            //   children: [],
            // },
            {
              authName: "最新活动管理",
              id: 13,
              order: 1,
              path: "/recentActivityManage",
              children: [],
            },
            {
              authName: "近期项目管理",
              id: 14,
              order: 1,
              path: "/recentProjectManage",
              children: [],
            },
          ],
        },

        {
          id: 3,
          authName: "Quanta管理",
          path: "/quantaManage",
          iconPath: require("../assets/img/组 2.png"), //未激活状态下的图标
          iconActivePath: require("../assets/img/组 5.png"), //激活状态下的图标
          children: [
            // {
            //   id: 31,
            //   authName: "发展之路管理",
            //   path: "/developmentHistory",
            //   children: [],
            //   order: null,
            // },
            {
              id: 32,
              authName: "活动管理",
              path: "/activityManage",
              children: [],
              order: null,
            },
            {
              id: 33,
              authName: "管理层管理",
              path: "/staffManage",
              children: [],
              order: null,
            },
          ],
          order: 2,
        },

        {
          id: 2,
          authName: "项目管理",
          path: "/projectManage",
          iconPath: require("../assets/img/组 2_7.png"),
          iconActivePath: require("../assets/img/组 4.png"),
          children: [
            {
              id: 21,
              authName: "项目管理",
              path: "/projectsManage",
              children: [],
              order: null,
            },
          ],
          order: 1,
        },
      ],

      iconsObjTwoLevel: {
        // 一级菜单的icon图标
        11: require("../assets/img/插画_1.png"),
        12: require("../assets/img/介绍.png"),
        13: require("../assets/img/文化活动.png"),
        14: require("../assets/img/项目推进.png"),
        21: require("../assets/img/组 2_7.png"),
        31: require("../assets/img/发展.png"),
        32: require("../assets/img/活动-1.png"),
        33: require("../assets/img/管理层.png"),
      },
      activePath: "/pictureManage",
      activeOneLevelPath: "/indexPageManage",
    };
  },
  created() {
    // this.getMenuList();
    // this.activePath = window.sessionStorage.getItem("activePath");
    //
    // 首先判断当前有无存储activePath，有的话就
    if (window.sessionStorage.getItem("activePath")) {
      this.activePath = window.sessionStorage.getItem("activePath");
    }
    if (window.sessionStorage.getItem("activeOneLevelPath")) {
      this.activeOneLevelPath =
        window.sessionStorage.getItem("activeOneLevelPath");
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      // console.log(keyPath);
      window.sessionStorage.setItem("activePath", keyPath[1]);
      this.activePath = keyPath[1];

      window.sessionStorage.setItem("activeOneLevelPath", keyPath[0]);
      this.activeOneLevelPath = keyPath[0];
    },
  },
};
</script>

<style scoped>
.indexLogo {
  width: 150px;
  margin: 40px auto;
}
.indexLogo img {
  width: 150px;
}
.home-container {
  /* background-color: yellow; */
  width: 100%;
  height: 100%;
  padding: 50px 20px;
  /* background-image: url("../assets/img/backgroundImg.png"); */
}
.home-container .el-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  width: 20% !important;

  padding: 0 20px;
  border-radius: 20px;
  border: 1px solid blue;
  box-sizing: border-box;
  /* background-color: #333744; */
}
.el-aside .el-menu {
  border-right: none;
}
.iconImg {
  width: 18px;
  height: 18px;
}
.el-main {
  background-color: transparent;
  /* background-color: blue; */
  padding: 0;
  padding-left: 20px;
}
.routerViewContainer {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 0 20px;
  /* background-color: #fff; */
  /* background-color: pink; */
}
.iconfont {
  padding-right: 10px;
}
.toggle-button {
  background: #4a5064;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}

/* 当前激活菜单栏的背景色 */
.el-menu-item {
  border-radius: 20px;
}

.el-submenu.is-active >>> .el-submenu__title {
  color: black !important;
}

/* .el-submenu.is-active >>> .el-submenu__title .iconImg {
  background-color: black !important;
} */
.el-menu-item.is-active {
  background-color: rgb(96, 103, 233) !important;
  color: #fff;
}

/* 给左侧导航栏定义relative布局，以便给火箭设置 absolute 布局并设置到底部*/
.el-aside {
  position: relative;
}
.bottomLogo {
  /* .el-aside有一个20px的左右边距，所以要去掉40px，不然.el-aside会超出.el-aside然后有滚动条 */
  width: calc(100% - 40px);
  /* background-color: yellow; */
  position: absolute;
  bottom: 0px;
}
.bottomLogo img {
  width: 90%;
}
</style>
