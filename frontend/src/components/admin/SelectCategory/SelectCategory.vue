<template>
  <div class="select-category">
    <div class="group-form">
      <select 
        name="category"
        id="category" 
        v-model="selectedCategory" 
        @change="handleSelect"
        class="form-select"
      >
        <option value="">All categories</option>
        <option v-for="category in categories" :key="categories._id" :value="category.slug">
          {{ category.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  import CategoryService from '@/services/admin/category.service'
  export default {
    name: "SelectCategory",
    props: {
      clear: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      defaultOption: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        selectedCategory: this.defaultOption,
        categories: [],
      }
    },
    methods: {
      handleSelect() {
        this.$emit('select', this.selectedCategory)
      },
      async getAllCategories() {
        try {
          this.categories = await CategoryService.getAll()
        }
        catch(err) {
          console.log(err)
        }
      },
    },
    created() {
      this.getAllCategories()
    },
    watch: {
      clear(newVal, oldVal) {
        this.selectedCategory = ''
        const selectElement = document.querySelector('#category')
        selectElement.selectedIndex = 0
      },
      defaultOption(newVal, oldVal) {
        this.selectedCategory = newVal
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
