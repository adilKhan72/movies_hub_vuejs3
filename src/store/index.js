import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    api_key : "1045cc497c2cf63a5b86c9dbfb0e94f0",
    search_term : "",
    page : 1,
    moviebyid: {},
    allmovies: {},
    searched_movies: {},
    sort_by_type: {
      "popularity" : { "key_val" : "popularity", "text" : "Popularity", "selected" : true },
      "release_date" : { "key_val" : "release_date", "text" : "Release Date", "selected" : false }, 
      "revenue" : { "key_val" : "revenue", "text" : "Revenue", "selected" : false }, 
      "primary_release_date" : { "key_val" : "primary_release_date", "text" : "Primary Release Date", "selected" : false }, 
      "original_title" : { "key_val" : "original_title", "text" : "Original Title", "selected" : false },
      "vote_average" : { "key_val" : "vote_average", "text" : "Vote Average", "selected" : false },
      "vote_count" : { "key_val" : "vote_count", "text" : "Vote Count", "selected" : false }, 
  },
  sort_by : { "asc":{ "key_val": "asc", "text" : "Ascending" , "selected" : false }, "desc":{ "key_val": "desc", "text" : "Descending" , "selected" : true } }
  },
  mutations: {
    movieByIdEmpty(state) {
      state.moviebyid = {};
    },
    movieById(state, movies) {
      state.moviebyid = movies;
    },
    allMovies(state, movies) {
      state.allmovies = movies;
      state.page = movies.page;
    },
    searchedMovies(state, movies) {
      state.searched_movies = movies;
      state.page = movies.page;
    },
    searchTermUpdate(state, searchTerm) {
      state.search_term = searchTerm;
    },
    sortbyTypeset(state,sortbyType) {
      Object.keys(state.sort_by_type).forEach(function(key) {
        if(key == sortbyType)
        {
          state.sort_by_type[key].selected = true;
        }
        else
        {
          state.sort_by_type[key].selected = false;
        }
      });
    },
    sortbyset(state,sortbyset) {
      Object.keys(state.sort_by).forEach(function(key) {
        if(key == sortbyset)
        {
          state.sort_by[key].selected = true;
        }
        else
        {
          state.sort_by[key].selected = false;
        }
      });
    }
  },
  actions: {
    getMovieDetails({state, commit}, payload) {
      commit("movieByIdEmpty", payload)
      axios("https://api.themoviedb.org/3/movie/"+payload.id+"?api_key="+state.api_key+"&language=en-US").then(response => {
      commit("movieById", response.data)
      });
    },

    getMovies({state, commit}, payload) {
      var sort_by_type;
      var sortby;
      Object.keys(state.sort_by_type).forEach(function(key) 
      {
        if(state.sort_by_type[key].selected == true)
        {
          sort_by_type = key;
        }
      });
      Object.keys(state.sort_by).forEach(function(key) 
      {
        if(state.sort_by[key].selected == true)
        {
          sortby = key;
        }
      });
      axios("https://api.themoviedb.org/3/discover/movie?api_key="+state.api_key+"&language=en-US&sort_by="+sort_by_type+"."+sortby+"&include_adult=false&include_video=false&page="+payload.pagenumber+"&with_watch_monetization_types=free").then(response => {
      commit("allMovies", response.data)
      });
    },
    sortbyTypeOnChange({commit}, payload) {
      commit("sortbyTypeset", payload.sortbyType)
    },
    sortbyOnChange({commit}, payload) {
      commit("sortbyset", payload.sortby)
    },
    searchTermUpdate({state, commit}, payload) {
      commit("searchTermUpdate", payload.searchTerm);
      if(payload.searchTerm == "" || payload.searchTerm == " ")
      {
        commit("searchedMovies", {result:null})
      }
      else
      {
        axios("https://api.themoviedb.org/3/search/movie?api_key="+state.api_key+"&language=en-US&query="+payload.searchTerm+"&page=1&include_adult=false").then(response => {
        commit("searchedMovies", response.data)
        });
      }
    },
  },
  modules: {

  },
});
