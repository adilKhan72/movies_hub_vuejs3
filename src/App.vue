<template>
  <nav class="navbar navbar-expand-lg navbar-dark default-background">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <font-awesome-icon icon="fa-solid fa-clapperboard" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/comming_soon" class="nav-link"
              >Comming Soon</router-link
            >
          </li>
        </ul>
        <!-- <form class="d-flex"> -->
          <!-- <input v-on:keyup="search($event)"
            class="form-control me-2"
            type="search"
            placeholder="Enter Keywords..."
            aria-label="Search"
          /> -->
          <button type="button" class="btn button-default" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </button>
          <!-- <button class="btn button-default" type="submit">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </button> -->
        <!-- </form> -->


      </div>
    </div>
  </nav>
  <router-view />
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="true" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
          <input v-on:keyup="search($event)"
            class="form-control me-2"
            type="search"
            placeholder="Search Keywords..."
            aria-label="Search"
          />
      </div>
      <div class="modal-body">
        

        <div  v-for="movie in searchedMovies.results"
          :key="movie.id" 
          class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">

              <img v-if="movie.backdrop_path != null"
                v-bind:src="
                  'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path
                "
                class="img-fluid rounded-start"
                alt="Cover Image"
              />

              <img v-else :src="require('@/assets/not_found_2.jpg')"
                class="img-fluid rounded-start"
                alt="Cover Image"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title"><a
                    href="#"
                    class="link-secondary"
                    style="text-decoration: none; color: black"
                  >
                    {{ movie.title }}
                  </a></h5>
                <p class="card-text">{{ movie.overview }}</p>
                
                  <div class="row">
                    <div class="col-sm-4"><small class="text-muted">Released Date : {{ movie.release_date }}</small></div>
                    <div class="col-sm-4"><small class="text-muted">Popularity : {{ movie.popularity }}</small></div>
                    <div class="col-sm-4"><small class="text-muted">Vote Average : {{ movie.vote_average }}</small></div>
                  </div>
              </div>
            </div>
          </div>
        </div>
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
    search(event) 
    {
      this.$store.dispatch("searchTermUpdate", {
        searchTerm: event.target.value
      });
    }
  },
  computed: mapState({
    searchedMovies: (state) => state.searched_movies,
    getSearchTerm: (state) => state.search_term,
    getmovies: (state) => state.allmovies,
    getpage: (state) => state.page,
    getsortby: (state) => state.sort_by,
    getsortbyType: (state) => state.sort_by_type,
  }),
};
</script>
