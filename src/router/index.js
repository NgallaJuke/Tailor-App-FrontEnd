import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';
import Login from '../views/Auth/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunckName: "register"*/ '@/views/Auth/Register.vue'),
  },
  {
    path: '/register-success',
    name: 'register-success',
    component: () => import(/* webpackChunckName: "register-success"*/ '@/views/Auth/SuccessRegister.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/profil/:userName',
    name: 'profil',
    component: () => import(/* webpackChunckName: "profil"*/ '@/views/Account/Profil.vue'),
  },

  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunckName: "Users"*/ '@/views/Account/Users.vue'),
  },
  {
    path: '/account',
    name: 'setting',
    redirect: '/account/profile',
    component: () => import(/* webpackChunckName: "setting"*/ '@/views/Account/Setting.vue'),
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunckName: "Profile"*/ '@/components/TheSettingEditProfile.vue'),
      },

      {
        path: 'general',
        name: 'General',
        component: () => import(/* webpackChunckName: "General"*/ '@/components/TheSettingAccount.vue'),
      },
      {
        path: 'password',
        name: 'Password',
        component: () => import(/* webpackChunckName: "Password"*/ '@/components/TheSettingPassword.vue'),
      },
      {
        path: 'social_profile',
        name: 'Social Profile',
        component: () => import(/* webpackChunckName: "Social Profile"*/ '@/components/TheSettingSocialProfile.vue'),
      },
      {
        path: 'notification',
        name: 'Notification',
        component: () => import(/* webpackChunckName: "Notification"*/ '@/components/TheSettingNotification.vue'),
      },
      {
        path: '',
        redirect: 'profile', // default child path
      },
    ],
  },
  // {
  //   path: '/hire',
  //   name: 'hire',
  //   component: () => import(/* webpackChunckName: "Users"*/ '@/views/Account/Hire.vue'),
  // },

  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// redirect to login page if not logged in or trying to access a restricted page
router.beforeEach((to, from, next) => {
  const publicPagesRoute = ['/login', '/register', '/register-success'];
  const authIsRequired = !publicPagesRoute.includes(to.path);
  const loggedIn = localStorage.getItem('user_token');
  if (authIsRequired && !loggedIn) return next('/login');

  next();
});

export default router;
