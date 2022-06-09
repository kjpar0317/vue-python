import { defineStore } from "pinia";
import { useQuery } from "vue-query";

import { getMovieList } from "@/api/movie";

export const commonStore = defineStore("common", () => {
  const { data, isSuccess } = useQuery("movies", getMovieList);

  return {
    isSuccess,
    data,
  };
});
