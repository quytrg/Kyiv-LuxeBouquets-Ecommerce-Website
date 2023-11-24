<template>
  <div class="create-product container mt-3">
    <ProductForm 
      :product="product"
      @submit:product="createProduct"
    />
  </div>
</template>

<script>
  import ProductForm from '@/components/admin/ProductForm/ProductForm.vue';
  import ProductService from '@/services/admin/product.service.js'
  export default {
    name: "CreateProduct",
    components: {
      ProductForm,
    },
    methods: {
      async createProduct(data) {
        try {
          await ProductService.create(data)
          this.$router.push({ name: "ProductsAdmin" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    data() {
      return {
        product: {
          status: 'active',
          discountPercentage: 0,
          category: ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
