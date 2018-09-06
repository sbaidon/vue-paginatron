<template>
  <div id="app">
    <h1>App</h1>
    <paginatron @change="updateItems" @next="advanced" @previous="decreased" :items-per-page="5" :items="items">
      <div slot-scope="{ setPage, nextPage, prevPage, page, pages, hasNextPage, hasPrevPage, nextButtonEvents, prevButtonEvents, nextButtonAttrs, prevButtonAttrs }">
        <button v-on="prevButtonEvents" v-bind="prevButtonAttrs" >Prev</button>
        {{ activeItems }}
        <button v-on="nextButtonEvents" >Next</button>
        <div v-for="(page, index) in pages" :key="index">
          <p @click="setPage(index)">{{ page }}</p>
        </div>
      </div>
    </paginatron>
  </div>
</template>
<script>
import Paginatron from "./components/Paginatron";

export default {
  name: "app",
  components: { Paginatron },
  data() {
    return {
      activeItems: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  methods: {
    updateItems(activeItems) {
      this.activeItems = activeItems;
    },
    decreased({ prev, current }) {
      console.log(prev, current);
    },
    advanced({ activeItems, prev, current }) {
      console.log(prev, current);
    }
  }
};
</script>

<style>
</style>
