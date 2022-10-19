// import Vue from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import LandingPage from '@/components/views/LandingPage/LandingPage.vue'
import BoardPage from '@/components/views/BoardPage/BoardPage.vue'
import NoticePage from '@/components/views/NoticePage/NoticePage.vue'
import NewsPage from '@/components/views/NewsPage/NewsPage.vue'
import RegisterPage from '@/components/views/RegisterPage/RegisterPage.vue'
import LoginPage from '@/components/views/LoginPage/LoginPage.vue'
import MyPage from '@/components/views/MyPage/MyPage.vue'

import store from '@/store'

// Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: LandingPage,
    meta: {
      roles: []
    }
  },
  {
    path: '/board',
    name: 'boardPage',
    component: BoardPage,
    meta: {
      roles: ['1', '0']
    }
  },
  {
    path: '/notice',
    name: 'noticePage',
    component: NoticePage,
    meta: {
      roles: []
    }
  },
  {
    path: '/news',
    name: 'newsPage',
    component: NewsPage,
    meta: {
      roles: []
    }
  },
  {
    path: '/register',
    name: 'registerPage',
    component: RegisterPage,
    meta: {
      roles: []
    }
  },
  {
    path: '/login',
    name: 'loginPage',
    component: LoginPage,
    meta: {
      roles: []
    }
  },
  {
    path: '/mypage',
    name: 'myPage',
    component: MyPage,
    meta: {
      roles: ['1', '0']  // '1':admin, '0':user
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userInfo = store.getters['userStore/getUserInfo']
  if (userInfo === null) {
    if (to.meta.roles.length !== 0) {
      alert('해당 페이지에 접근 권한이 없습니다.')
      // console.log('router index.js 해당 페이지에 접근 권한이 없습니다.');
      next(from)
    } else {
      console.log('router index.js moved: ', to);
      next()
    }
  } else {
    const roleStatus = userInfo.role
    if (to.meta.roles.length !== 0 && !to.meta.roles.includes(roleStatus)) {
      alert('해당 페이지에 접근 권한이 없습니다.')
      // console.log('router index.js 해당 페이지에 접근 권한이 없습니다.');
      next(from)
    } else {
      console.log('router index.js moved: ', to);
      next()
    }
  }
})

export default router