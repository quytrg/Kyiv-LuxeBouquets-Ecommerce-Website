<template>
  <div class="modify-product container mt-3">
    <ProductForm 
      :product="product"
      @submit:product="updateProduct"
    />
  </div>
</template>

<script>
  import ProductForm from '@/components/admin/ProductForm/ProductForm.vue';
  import ProductService from '@/services/admin/product.service.js'
  export default {
    name: "ModifyProduct",
    components: {
      ProductForm,
    },
    data() {
      return {
        product: {}
      }
    },
    methods: {
      async getProduct() {
        this.product = await ProductService.getProductBySlug(this.$route.params.slug)
      },
      async updateProduct(data) {
        try {
          await ProductService.update(data._id, data)
          this.$router.push({ name: "ProductsAdmin" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getProduct()
    }
  }
</script>

<style scoped lang="scss">

</style>
