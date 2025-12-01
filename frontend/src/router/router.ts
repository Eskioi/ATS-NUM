import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../components/login/login.vue'
import Machine from '../components/machine/machine.vue'
import Verify from '../components/verify/verify.vue'
import Register from '../components/register/register.vue'
import Home from '../components/home/home.vue'
import Admin from '../components/admin/adminPage/admin.vue'
import User from '../components/user/user.vue'
import AddMachine from '../components/admin/addMachine/addMachine.vue'
import AddSensor from '../components/admin/addSensor/addSensor.vue'
import AddSensorData from '../components/admin/addSensorData/addSensorData.vue'
import ChangePassword from '../components/changePassword/changepassword.vue'

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
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/admin/addMachine',
      name: 'AddMachine',
      component: AddMachine,
    },
    {
      path: '/admin/addSensor',
      name: 'AddSensor',
      component: AddSensor,
    },
    {
      path: '/admin/addSensorData',
      name: 'AddSensorData',
      component: AddSensorData,
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword,
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