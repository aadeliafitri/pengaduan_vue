import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import LihatPengaduan from '../views/LihatPengaduan.vue'
import datapetugas from '../views/datapetugas.vue'
import dataPengaduan from '../views/dataPengaduan.vue'
import dataMasyarakat from '../views/dataMasyarakat.vue'
import reportPengaduan from '../views/reportPengaduan.vue'
import kategori from '../views/kategori.vue'
import Login from '../views/Login.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login, header: Navbar, footer: Footer}
  },
  {
    path: '/register',
    name: 'register',
    components: {default: Register, header: Navbar, footer: Footer}
  },
  {
    path: '/',
    name: 'home',
    components: {default: Home, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/dataPetugas',
    name: 'dataPetugas',
    components: {default: datapetugas, header: Navbar, footer: Footer},
    meta: 
    {
      requiresAuth: true
    }
  },
  {
    path: '/dataMasyarakat',
    name: 'dataMasyarakat',
    components: {default: dataMasyarakat, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  },
  {
    path: '/dataPengaduan',
    name: 'dataPengaduan',
    components: {default: dataPengaduan, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  }, 
  {
    path: '/reportPengaduan',
    name: 'reportPengaduan',
    components: {default: reportPengaduan, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  },
  {
    path: '/kategori',
    name: 'kategori',
    components: {default: kategori, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  },
  {
    path: '/lihatPengaduan',
    name: 'lihatPengaduan',
    components: {default: LihatPengaduan, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
