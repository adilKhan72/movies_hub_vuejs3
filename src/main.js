import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHatWizard, fas } from "@fortawesome/free-solid-svg-icons";
import { fab, faJs, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHatWizard, faJs, faVuejs, fab, fas);
createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
