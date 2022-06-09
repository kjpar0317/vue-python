<template>
  <div class="px-4 pt-1 min-w-96">
    <div
      v-if="movieList"
      class="grid w-full gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
    >
      <div v-for="(movie, index) in movieList" :key="index">
        <div class="w-full shadow-xl x-fit card bg-base-100">
          <figure>
            <img
              :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ movie.title }}</h2>
            <p>{{ movie.overview }}</p>
            <div class="justify-end card-actions">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";

import { commonStore } from "@/store/common";

export default {
  async setup() {
    const store = commonStore();
    const data = reactive({ movieList: computed(() => store.data?.results )});

    return {
      ...toRefs(data)
    };
  },
};
</script>
