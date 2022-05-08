import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cardapio',
    name: 'cardapio',
    component: () => import(/* webpackChunkName: "cardapio" */ '../views/CardapioView.vue')
  },
  {
    path: '/funcionarios',
    name: 'funcionarios',
    component: () => import(/* webpackChunkName: "funcionarios" */ '../views/FuncionariosLoginView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/FuncionariosMain.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
