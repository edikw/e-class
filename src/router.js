import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Profile from './views/Profile.vue'
import Changepassword from './views/Changepassword.vue'
import Deactive from './views/Deactive.vue'
import Course from './views/Course.vue'
import Search from './views/Search.vue'
import Courses from './views/MyCourses.vue'
import NewPassword from'./views/NewPassword.vue'
import Selected from './views/selectedCategory.vue'
import Privacy from './views/Privacy.vue'
import Contact from './views/Contact.vue'
Vue.use(Router)

var sitename = 'Eclass';

function sitetitle(route){
  return sitename + ' - ' + route;

}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: sitetitle('Home')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: sitetitle('Login')
      }
    },
    {
      path: '/login/verified',
      name: 'login-verified',
      component: Login,
      meta: {
        title: sitetitle('Login')
      }
    },
    {
      path: '/login/activated',
      name: 'login-activated',
      component: Login,
      meta: {
        title: sitetitle('Login')
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        title: sitetitle('Sign Up')
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        title: sitetitle('Profile')
      }
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: Changepassword,
      meta: {
        title: sitetitle('Change Password')
      }
    },
    {
      path: '/deactive',
      name: 'deactive',
      component: Deactive,
      meta: {
        title: sitetitle('Deactive')
      }
    },
    {
      path: '/course/:id',
      name: 'course',
      component: Course,
      meta: {
        title: sitetitle('Course')
      }
    },
     {
      path: '/search/',
      name: 'search',
      component: Search,
      meta: {
        title: sitetitle('Search')
      }
    },
    {
      path: '/mycourses',
      name: 'mycourses',
      component: Courses,
      meta: {
        title: sitetitle('My Course')
      }
    },
    {
      path: '/newpassword/:token',
      name: 'newpassword',
      component: NewPassword,
      meta: {
        title: sitetitle('New Password')
      }
    },
    {
      path: '/selected/:name',
      name: 'selected',
      component: Selected,
      meta: {
        title: sitetitle('Selected')
      }
    },
    {
      path: '/selected/subcategory/:name',
      name: 'selected-subcategory',
      component: Selected,
      meta: {
        title: sitetitle('Selected-Subcategory')
      }
    },
     {
      path: '/selected/subcategory/topic/:name',
      name: 'selected-topic',
      component: Selected,
      meta: {
        title: sitetitle('Selected-Topic')
      }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: Privacy,
      meta: {
        title: sitetitle('Privacy')
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        title: sitetitle('Contact')
      }
    },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  if(!nearestWithMeta) return next();
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });
    tag.setAttribute('data-vue-router-controlled', '');
    return tag;
  })
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;