<template>
  <div class="search">
    <div class="input-group">
      <input 
        type="text"
        placeholder="Enter keyword..."
        class="form-control"
        v-model="keyword"
        @input="handleSearch($event)"
      >
      <div class="input-group-append">
        <button type="submit" class="btn btn-success">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    props: {
      clear: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        keyword: ''
      }
    },
    methods: {
      handleSearch(e) {
        this.keyword = e.target.value
        this.$emit('search', this.keyword)
      },
    },
    watch: {
      clear(newVal, oldVal) {
        this.keyword = ''
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
