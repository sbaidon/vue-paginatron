# Vue paginatron

## How to Install

`npm install vue-paginatron --save`


## How to use
vue-paginatron exposes several scoped-slot props that you can use to get basic pagination functionality, you have complete control over what is rendered.

```javascript
import Paginatron from 'vue-paginatron'
export default {
...
components: { Paginatron }
... 
};
```

### Props
- items `Array`: items to be paginated
- itemPerPage `Number`: number of items per page
- rotate `Boolean`: Wether or not to rotate at the end of the pages

### Scoped slots props
 - Methods: 
   - `setPage` : Sets an specific page
   - `nextPage`: Advance to the next page
   - `prevPage`: Return to the previous page
 - Data:
   - `activeItems`: Items shown in the current page
   - `page`: Current active page
   -` pages`: Total of pages
   -` hasPrevPage`:  wether or not the current page is the first one
   - `hasNextPage`: wether or not the current page is the last one
 - Attribute bindings:
   - `prevButtonAttrs`: hides/shows button if there is a previous page
   - `nextButtonAttrs`: hides/shows button if there is a next page
 - Event bindings:
   - `prevButtonEvents`: handles click event to go to the next page
   - `nextButtonEvents`: handles click event to go to the previous page

### Events

`@changed` 
 - Called every time active items has changed
 - Payload: `Array` `activeItems` of the current page

`@next`  
 - Called when method nextPage is called
 -  Payload: `Object` `{ prev, current }`: object with the previous and current page

`@previous`  
 - Called when method prevPage is called
 -  Payload: `{ prev, current }`: object with the previous and current page

`@setPage`
 - Called every time active page has changed
 - Payload: `Number` active page


### Example
```html
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
import Paginatron from 'vue-paginatron';

export default {
  name: 'app',
  components: { Paginatron },
  data() {
    return {
      activeItems: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    },
  },
};
</script>

<style>

</style>
```
