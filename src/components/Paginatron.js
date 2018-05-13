export default {
  name: "paginatron",
  props: {
    itemsPerPage: {
      type: Number,
      default: 10
    },
    items: {
      type: Array,
      default: () => []
    },
    rotate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: 0
    };
  },
  watch: {
    activeItems(value) {
      this.$emit("change", value);
    }
  },
  beforeMount() {
    if (this.itemsPerPage > this.items.length)
      throw new Error("# of Items per page is higher than the items length");
    this.$emit("change", this.activeItems);
  },
  render() {
    return this.$scopedSlots.default({
      pages: this.pages,
      activeItems: this.activeItems,
      nextPage: this.nextPage,
      prevPage: this.prevPage,
      setPage: this.setPage,
      page: this.page,
      hasNextPage: this.hasNextPage,
      hasPrevPage: this.hasPrevPage,
      nextButtonAttrs: {
        style: [!this.hasNextPage ? { display: "none" } : {}]
      },
      prevButtonAttrs: {
        style: [!this.hasPrevPage ? { display: "none" } : {}]
      },
      nextButtonEvents: {
        click: () => {
          this.nextPage();
        }
      },
      prevButtonEvents: {
        click: () => {
          this.prevPage();
        }
      }
    });
  },
  computed: {
    pages() {
      if (!this.items.length) return 0;
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    activeItems() {
      const from = this.itemsPerPage * this.page;
      const to = this.itemsPerPage * (this.page + 1);
      return this.items.slice(from, to);
    },
    hasPrevPage() {
      return this.page > 0;
    },
    hasNextPage() {
      return this.page < this.pages - 1;
    }
  },
  methods: {
    setPage(page) {
      if (page > this.pages - 1 || page < 0) {
        throw new Error("Page is not valid");
      }
      this.page = page;
    },
    nextPage() {
      // rotate back to beginning
      if (!this.hasNextPage) {
        if (this.rotate) this.page = 0;
      } else {
        this.page++;
      }
      this.$emit("next", { prev: this.page - 1, current: this.page });
    },
    prevPage() {
      if (!this.hasPrevPage) {
        if (this.rotate) this.page = this.pages - 1;
      } else {
        this.page--;
      }
      this.$emit("previous", { prev: this.page + 1, current: this.page });
    }
  }
};
