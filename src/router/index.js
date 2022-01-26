import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('../pages/Login.vue')
const Home = () => import('../pages/Home.vue')

// 首页管理四个组件
const RecentActivityManage = () => import('../components/indexPageManage/RecentActivityManage.vue')
const IntroduceManage = () => import('../components/indexPageManage/IntroduceManage.vue')
const PictureManage = () => import('../components/indexPageManage/PictureManage.vue')
const RecentProjectManage = () => import('../components/indexPageManage/RecentProjectManage.vue')

// 项目管理一个组件
const ProjectsManage = () => import('../components/projectManage/ProjectsManage.vue')

//Quanta管理三个组件
const ActivityManage = () => import('../components/quantaManage/ActivityManage.vue')
const DevelopmentHistory = () => import('../components/quantaManage/DevelopmentHistory.vue')
const StaffManage = () => import('../components/quantaManage/StaffManage.vue')



Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //     path: '/login',
    //     component: Login
    //   },
    //   {
    //     path: '/home',
    //     component: Home
    //   },

    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/pictureManage',
      children: [{
          path: '/recentActivityManage',
          component: RecentActivityManage
        },
        {
          path: '/introduceManage',
          component: IntroduceManage
        },
        {
          path: '/pictureManage',
          component: PictureManage
        },
        {
          path: '/recentProjectManage',
          component: RecentProjectManage
        },
        {
          path: '/projectsManage',
          component: ProjectsManage
        },
        {
          path: '/activityManage',
          component: ActivityManage
        },
        {
          path: '/developmentHistory',
          component: DevelopmentHistory
        },
        {
          path: '/staffManage',
          component: StaffManage
        }

      ]
    }


  ]
})



// 路由跳转前判断一下有无登陆（即有无保存"quantaToken" 如果没有，则不论想要访问哪个页面都跳转到登陆页）
router.beforeEach((to, from, next) => {
  // to 将访问哪一个路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  //   next() 放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const quantaToken = window.sessionStorage.getItem('quantaToken')
  if (!quantaToken) return next('/login')
  next()
})
export default router
