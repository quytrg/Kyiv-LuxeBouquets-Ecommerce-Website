<template>
  <div class="product-detail fluid-section">
    <div class="product-thumb grid-wrapper-left">
      <img :src="product.thumbnail" :alt="product.title">
    </div>
    <div class="product-content grid-wrapper-right">
      <div class="product-content__link">
        <router-link :to="{name: 'Products', params: { categoryname: `${product.category}`}}">
          <h6>{{ handleCategoryString() }}</h6>
        </router-link>
        <h5>/</h5>
        <h6 class="gray-text">{{ product.title }}</h6>
      </div>
      <div class="product-content__title">
        <h3>{{ product.title }} - ${{ product.price }}</h3>
      </div>
      <div class="product-content__desc">
        <h5>{{ product.description }}</h5>
      </div>
      <div class="product-content__quantity">
          <h5>Quantity:</h5>
          <button @click="handleDecreaseQuantity">-</button>
          <input type="text" v-model="quantity"/>
          <button @click="handleIncreaseQuantity">+</button>
      </div>
      <Button textContent="ADD TO BASKET" type="dark" :fullWidth="true"/>
    </div>
  </div>
</template>

<script>
  import ProductService from '@/services/client/product.service.js'
  import Button from '@/components/client/Button/Button.vue'
  export default {
    name: "ProductDetail",
    components: {
      Button,
    },
    data() {
      return {
        product: {},
        quantity: 1,
      }
    },
    methods: {
      async getProductDetail() {
          this.product = await ProductService.getProductDetail(this.$route.params.slug)
      },
      handleCategoryString() {
        if (this.product.category !== undefined)
          return this.product.category.replace(/-/g, ' ').toUpperCase()
      },
      handleIncreaseQuantity() {
        this.quantity++
      },
      handleDecreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--
        }
      }
    },
    created() {
      this.getProductDetail()
    },
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable';
  .product {
    &-thumb {
      img {
        width: 100%;
        aspect-ratio: 1 / 1;
      }
    }

    &-content {
      padding: 2.56vw;
      border-left: 1px solid var(--black);
      
      &__link {
        display: flex;
        h6 {
          font-weight: 500;
          text-transform: uppercase;
        }
      }

      &__title {
        padding: 1.98vw 0;
      }
      
      &__desc {
        margin-bottom: 2.24vw;
      }

      &__quantity {
        font-size: 23px;

        input {
          width: 4.3vw;
          height: 3.5vw;
          text-align: center;
          border: 1px solid #a4a4a4;
          border-left: none;
          border-right: none;
        }

        button {
          width: 4.3vw;
          height: 3.5vw;
          border-radius: 0;
          border: 1px solid #a4a4a4;
          background-color: var(--white);
          font-size: 22px;
        }

        button:hover {
          background-color: $extra-light;
        }

        h5 {
          font-weight: 400;
        }

        margin-bottom: 4.48vw;
      }
    }
  }
</style>
