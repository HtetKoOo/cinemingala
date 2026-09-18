const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

export const TMDB_ENDPOINTS = {
  topRatedMovies: `${TMDB_API_BASE_URL}/movie/top_rated`,
  popularMovies: `${TMDB_API_BASE_URL}/movie/popular`,
  nowPlayingMovies: `${TMDB_API_BASE_URL}/movie/now_playing`,
  upcomingMovies: `${TMDB_API_BASE_URL}/movie/upcoming`,
  movieDetails: `${TMDB_API_BASE_URL}/movie`,
  movieSearch: `${TMDB_API_BASE_URL}/search/movie`,
  tvSearch: `${TMDB_API_BASE_URL}/search/tv`,
  personSearch: `${TMDB_API_BASE_URL}/search/person`,
  popularTv: `${TMDB_API_BASE_URL}/tv/popular`,
  topRatedTv: `${TMDB_API_BASE_URL}/tv/top_rated`,
  onAirTv: `${TMDB_API_BASE_URL}/tv/on_the_air`,
  airingTodayTv: `${TMDB_API_BASE_URL}/tv/airing_today`,
  tvDetails: `${TMDB_API_BASE_URL}/tv`,
  popularPeople: `${TMDB_API_BASE_URL}/person/popular`,
  trendingPeopleToday: `${TMDB_API_BASE_URL}/trending/person/day`,
  trendingPeopleWeek: `${TMDB_API_BASE_URL}/trending/person/week`,
  peopleDetails: `${TMDB_API_BASE_URL}/person`,
} as const;
