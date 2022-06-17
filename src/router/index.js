import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import CommingSoon from "../views/comming_soon.vue";
import Details from "../views/details.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/comming_soon",
    name: CommingSoon,
    component: CommingSoon
  },
  {
    path: "/details/:id",
    name: Details,
    component: Details
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
