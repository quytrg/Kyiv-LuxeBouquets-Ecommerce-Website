<template>
  <div class="product fluid-container mx-3">
    <h3 class="product-title my-3">Product List</h3>

    <div class="card mb-3">
      <div class="card-header d-flex justify-content-between">
        <h5 class="my-0 mt-ms-auto d-flex align-items-center">Filters and Search</h5>
        <button class="btn btn-sm btn-danger" @click="handleClear">Clear Filters</button>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <FilterStatus @active="handleFilterStatus" :clear="clear"/>
          </div>
          <div class="col-6">
            <Search @search="handleSearch" :clear="clear"/>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header d-flex justify-content-between">
        <h5 class="my-0 d-flex align-items-center">Products</h5>
        <div class="d-flex">
          <h5 class="my-0 d-flex align-items-center mx-2">Filter by category: </h5>
          <SelectCategory @select="handleFilterCategory" :clear="clear"/>
        </div>
      </div>
      <div class="card-body">
        <div class="product-action d-flex justify-content-between">
          <ChangeMulti @apply="handleChangeMulti"/>
          <router-link :to="{ name: 'CreateProduct' }">
            <button class="btn btn-outline-success">+ New product</button>
          </router-link>
        </div>
        <table class="table table-hover table-sm mt-3">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox"
                  name="checkall"
                  @change="handleCheckAll"
                  v-model="checkall"
                >
              </th>
              <th>STT</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Position</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="products.length">
            <tr v-for="product, index in products" :key="product._id">
              <td>
                <input 
                  type="checkbox"
                  name="id"
                  :value="product._id"
                  v-model="checkedItems[index]"
                  @change="handleCheckbox"
                >
              </td>
              <td>{{ index + 1 }}</td>
              <td>
                <img 
                  :src="product.thumbnail" 
                  :alt="product.title"
                  :style="{ 
                    width: '100px', 
                    aspectRatio: '1 / 1' 
                  }"
                >
              </td>
              <td>{{ product.title }}</td>
              <td>${{ product.price }}</td>
              <td>
                <input 
                  type="number"
                  name="position"
                  :value="product.position"
                  :style="{ 
                    width: '60px', 
                    padding: '3px', 
                    border: '0px', 
                  }"
                >
              </td>
              <td>
                <button
                  v-if="product.status === 'active'"
                  class="btn btn-sm btn-success"
                  @click="handleChangeStatus($event, product)"
                >
                  Active
                </button>
                <button
                  v-else
                  class="btn btn-sm btn-danger"
                  @click="handleChangeStatus($event, product)"
                >
                  Inactive
                </button>
              </td>
              <td>
                <router-link 
                  :to="{ name: 'ModifyProduct', params: { slug: `${product.slug}`} }"
                >
                  <button
                    class="btn btn-warning btn-sm"
                  >
                    Modify
                  </button>
                </router-link>
                <button
                  class="btn btn-danger btn-sm ms-1"
                  @click="handleDelete(product._id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td>
                <div class="text-center">
                  No result.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import FilterStatus from '@/components/admin/FilterStatus/FilterStatus.vue'
  import Search from '@/components/admin/Search/Search.vue'
  import ProductService from '@/services/admin/product.service.js'
  import SelectCategory from '@/components/admin/SelectCategory/SelectCategory.vue'
  import ChangeMulti from '@/components/admin/ChangeMulti/ChangeMulti.vue'
  import Swal from 'sweetalert2'

  export default {
    name: "Product",
    components: {
      FilterStatus,
      Search,
      SelectCategory,
      ChangeMulti,
    },
    data() {
      return {
        products: [],
        filter: {},
        clear: false,
        checkall: false,
        checkedItems: []
      }
    },
    methods: {
      async getProducts() {
        this.filter = Object.fromEntries(
          Object.entries(this.filter).filter(([key, value]) => value !== '')
        );
        this.products = await ProductService.get({
          params: this.filter
        })
      },
      handleFilterStatus(filterStatus) {
        this.filter.status = filterStatus
        this.getProducts()
      },
      handleFilterCategory(category) {
        this.filter.category = category
        this.getProducts()
      },
      handleSearch(keyword) {
        this.filter.keyword = keyword
        this.getProducts()
      },
      handleClear() {
        this.clear = !this.clear
        this.filter = {}
        this.getProducts()
      },
      async handleChangeStatus(e, product) {
        const changeStatusTo = product.status === 'active' ? 'inactive' : 'active'
        const data = {
          status: changeStatusTo
        }
        await ProductService.changeStatus(product._id, data)
        product.status = changeStatusTo
      },
      handleCheckAll() {  
        this.checkedItems = this.products.map(() => this.checkall)
      },
      async handleChangeMulti(type) {
        const checkedIdList = this.checkedItems.map((checked, index) => {
          if (checked) {
            return this.products[index]._id
          }
        })
        
        if (type !== '') {
          const data = {
            idList: checkedIdList,
            type
          }

          await ProductService.changeMulti(data);
          this.getProducts()
        }
      },
      handleCheckbox() {
  
      },
      async handleDelete(id) {
        try {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
              await ProductService.deleteOne(id)
              this.getProducts()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
          
        }
        catch (err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getProducts()
    }
  }
</script>

<style scoped lang="scss">
  .card {
    border: 0;
    // border-radius: 0;
  }
</style>
