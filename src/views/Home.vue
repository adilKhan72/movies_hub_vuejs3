<template>
  <div class="home">
    <div class="container">
      <div class="row" style="margin-top: 20px">
        <div class="col-sm-7">
          <h1 class="default-color">
            Movies Hub <span class="badge default-background">Discover</span>
          </h1>
        </div>
        <div class="col-sm-3 align-self-end">
          <select @change="sortbyTypeOnChange($event, getmovies.page)"
            class="form-select form-select-sm"
            aria-label="Default select example"
          >
            <option 
            v-for="sort in getsortbyType"
            :key="sort.key_val"   
            :value="sort.key_val" :selected="sort.selected">{{ sort.text }}</option>
          </select>
        </div>
        <div class="col-sm-2 align-self-end">
          <select @change="sortbyOnChange($event, getmovies.page)"
            class="form-select form-select-sm"
            aria-label="Default select example"
          >
            <option 
            v-for="sort in getsortby"
            :key="sort.key_val"   
            :value="sort.key_val" :selected="sort.selected" >{{ sort.text }}</option>
          </select>
        </div>
      </div>
      <div class="row" style="margin-top: 10px">
        <div
          v-for="movie in getmovies.results"
          :key="movie.id"
          class="col-lg-3 col-md-4 col-sm-6 ms-auto"
          style="margin-top: 10px"
        >
          <div class="card">
            <div class="container_image">
              <img v-if="movie.poster_path != null"
                v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                class="card-img-top image"
                alt="Cover Image"
              />
              <img v-else :src="require('@/assets/image_not_found.jpg')"
                class="card-img-top image"
                alt="Cover Image"
              />
              <div class="middle_image">
                <div class="text_image">
                  <router-link 
                   :to="{ path: '/details/'+ movie.id}"
                  class="link-secondary" 
                  style="text-decoration: none; color: white"> {{ movie.title }} </router-link>
                </div>
              </div>
            </div>

            <div class="card-body">
              <h5 v-if="movie.title.length < 20" class="card-title">
                <router-link 
                  :to="{ path: '/details/'+ movie.id}"
                  class="link-secondary" 
                  style="text-decoration: none; color: #184957"> {{ movie.title }} </router-link>

              </h5>
              <h5 v-else class="card-title">
                <a
                  href="#"
                  class="link-secondary"
                  style="text-decoration: none; color: #184957"
                >
                  {{ movie.title.substring(0, 20) + ".." }}
                </a>
              </h5>
            </div>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item default-background default-color-white"
                style="font-size: smaller"
              >
                <div>
                  <font-awesome-icon icon="fa-solid fa-percent" />
                  {{ movie.vote_average }}
                </div>
                <div>
                  <font-awesome-icon icon="fa-solid fa-calendar-day" />
                  {{ movie.release_date }}
                </div>
                <div>
                  <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                  {{ movie.vote_count }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row" style="margin-top: 20px">
        <div class="col-sm-4">
          <h6 class="default-color">
            <span class="badge default-background">
              <a @click="getmoviesapi(getmovies.page -= 1)"
                href="#"
                class="link-secondary"
                style="text-decoration: none; color: white"
              >
                Previous
              </a>
            </span>
            Page - {{ getmovies.page }}
            <span class="badge default-background">
              <a @click="getmoviesapi(getmovies.page += 1)"
                href="#"
                class="link-secondary"
                style="text-decoration: none; color: white"
              >
                Next
              </a>
            </span>
          </h6>
        </div>
        <div class="col-sm-4">
          <h6 class="default-color">
            Total Pages
            <span class="badge default-background">
              {{ getmovies.total_pages }}
            </span>
          </h6>
        </div>
        <div class="col-sm-4 align-self-end">
          <h6 class="default-color">
            Total Results
            <span class="badge default-background">
              {{ getmovies.total_results }}
            </span>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  methods: {
    getmoviesapi(pagenumber) {
      if(pagenumber < 1)
      {
        pagenumber = 1;
      }
      this.$store.dispatch("getMovies", {
        pagenumber: pagenumber,
      });
    },
    sortbyTypeOnChange(event, pagenumber) {
      this.$store.dispatch("sortbyTypeOnChange", {
        sortbyType: event.target.value
      });
      this.$store.dispatch("getMovies", {
        pagenumber: pagenumber,
      });
    },
    sortbyOnChange(event, pagenumber) {
      this.$store.dispatch("sortbyOnChange", {
        sortby: event.target.value
      });
      this.$store.dispatch("getMovies", {
        pagenumber: pagenumber,
      });
    }
  },
  computed: mapState({
    getSearchTerm: (state) => state.search_term,
    getmovies: (state) => state.allmovies,
    getpage: (state) => state.page,
    getsortby: (state) => state.sort_by,
    getsortbyType: (state) => state.sort_by_type,
  }),
  beforeMount() {
    this.getmoviesapi(1);
  },
};
</script>
