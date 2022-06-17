import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import states from "../views/states.vue";
import Details from "../views/details.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/states",
    name: states,
    component: states
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
