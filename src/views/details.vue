<template>
  <div class="about">
    <div class="container">
      <!-- <div class="row" style="margin-top: 20px">
        <div class="col-sm-12">
          <h1 class="default-color">
            <span class="badge default-background">{{ getmoviebyid.title }}</span>
          </h1>
        </div>
      </div> -->
      <div class="row" style="margin-top: 20px">
        <div class="col-sm-4">
          <img 
            v-bind:src="'https://image.tmdb.org/t/p/w500/' + getmoviebyid.poster_path"
            class="img-fluid img-thumbnail"
            alt="Cover Image"
            />
        </div>
        <div class="col-sm-8 default-background" style="border: 5px solid #dee2e6; border-radius: 0.25rem;">
            <div class="row" style="margin-top: 10px">
                <div class="col-sm-12">
                    <h3 class="default-color-white">
                        {{ getmoviebyid.title }}
                       
                    </h3>
                   <p>
                    <span class="badge default-color" style="background-color:white;"><small>{{ getmoviebyid.tagline }}</small></span>
                    <span style="color:white; margin-left: 10px;"> <small>Genres :</small>   </span>    
                    <span 
                    v-for="genres in getmoviebyid.genres"
                    :key="genres.id" 
                    class="badge default-color" style="background-color: #a2a2a2; margin-left: 5px; color: white;"><small>{{ genres.name }}</small></span>
                    </p>
                </div>
            </div>
            <div class="row default-color-white">
                <div class="col-sm-3">
                    <small>
                        Released : {{ getmoviebyid.release_date }}
                    </small>
                </div>
                <div class="col-sm-3">
                    <small>
                        Revenue : {{ getmoviebyid.revenue }}$
                    </small>
                </div>
                <div class="col-sm-3">
                    <small>
                        Duration : {{ getmoviebyid.runtime }} Mins
                    </small>
                </div>
                <div class="col-sm-3">
                    
                    <font-awesome-icon icon="fa-solid fa-thumbs-up" />

                    <small>
                        Vote :  {{ getmoviebyid.vote_count }} ( {{ getmoviebyid.vote_average }}% )
                    </small>
                </div>
            </div>
            <hr style="width:70%; color:white; background-color: white; height: 2px;;" />
            <div class="row" style="margin-top: 10px">
                <div class="col-sm-12">
                    <p class="default-color-white">{{ getmoviebyid.overview }}</p>
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
  name: "Details",
  methods: {

    getMovieDetails(id) {
        this.$store.dispatch("getMovieDetails", {
        id: id,
        });
    }
  },
  computed: mapState({
    getSearchTerm: (state) => state.search_term,
    getmoviebyid: (state) => state.moviebyid,
    getmovies: (state) => state.allmovies,
    getpage: (state) => state.page,
    getsortby: (state) => state.sort_by,
    getsortbyType: (state) => state.sort_by_type,
    searchedMovies: (state) => state.searched_movies,
  }),
  beforeMount() {
    this.getMovieDetails(this.$route.params.id);
  }
};
</script>

