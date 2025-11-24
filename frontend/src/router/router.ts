import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../components/login/login.vue'
import Machine from '../components/machine/machine.vue'
import Verify from '../components/verify/verify.vue'
import Register from '../components/register/register.vue'
import Home from '../components/home/home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },  
  {
      path: '/machine/:id',
        name: 'Machine',
        component: Machine,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/verify',
        name: 'Verify',
        component: Verify,
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwtToken')

  if ((to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Verify') && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router