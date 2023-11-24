<template>
  <Form @submit="handleSubmit" :validation-schema="productSchema">
    <div class="form-group mb-3">
      <label for="title" class="form-label">Title</label>
      <Field
        id="title"
        name="title"
        type="text"
        class="form-control"
        v-model="localProduct.title"
      />
      <ErrorMessage name="title" class="error-feedback text-warning" />
    </div>
    <div class="form-group mb-3">
      <label for="description" class="form-label">Description</label>
      <Field
        as="textarea" 
        name="description" 
        id="description"  
        rows="7"
        class="form-control"
        v-model="localProduct.description"
      />
      <ErrorMessage name="description" class="error-feedback text-warning" />
    </div>
    <div class="row mb-3">
      <div class="form-group mb-3 col-6">
        <label for="price" class="form-label">Price</label>
        <Field
          id="price"
          name="price"
          type="number"
          class="form-control"
          min="0"
          v-model="localProduct.price"
        />
        <ErrorMessage name="price" class="error-feedback text-warning" />
      </div>
      <div class="form-group mb-3 col-6">
        <label for="position" class="form-label">Position</label>
        <Field
          id="position"
          name="position"
          type="number"
          class="form-control"
          min="1"
          placeholder="Auto increase"
          v-model="localProduct.position"
        />
        <ErrorMessage name="position" class="error-feedback text-warning" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="form-group mb-3 col-6">
        <label for="stock" class="form-label">Stock</label>
        <Field
          id="stock"
          name="stock"
          type="number"
          class="form-control"
          min="1"
          v-model="localProduct.stock"
        />
        <ErrorMessage name="stock" class="error-feedback text-warning" />
      </div>
      <div class="form-group mb-3 col-6">
        <label for="thumbnail" class="form-label">Image</label>
        <Field
          id="avatar"
          name="avatar"
          type="text"
          class="form-control"
          placeholder="url..."
          v-model="localProduct.thumbnail"
        />
        <ErrorMessage name="thumbnail" class="error-feedback text-warning" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="form-group mb-3 col-6">
        <label for="discountPercentage" class="form-label">Discount percentage (%)</label>
        <Field
          id="discountPercentage"
          name="discountPercentage"
          type="number"
          class="form-control"
          min="0"
          v-model="localProduct.discountPercentage"
        />
        <ErrorMessage name="discountPercentage" class="error-feedback text-warning" />
      </div>
    </div>
    <div class="row mb-3 d-flex align-items-center">
      <div class="form-inline mb-3 col-6 d-flex align-items-end">
        <label for="category" class="form-label me-3">Choose a category:</label>
        <SelectCategory @select="handleChooseCategory" :defaultOption="localProduct.category"/>
      </div>
      <div class="form-group mb-3 col-6">
        <div class="form-check form-check-inline">
          <input
            id="active"
            name="status"
            type="radio"
            class="form-check-input"
            v-model="localProduct.status"
            value="active"
            checked
          />
          <label for="active" class="form-check-label">Active</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            id="inactive"
            name="status"
            type="radio"
            class="form-check-input"
            v-model="localProduct.status"
            value="inactive"
          />
          <label for="inactive" class="form-check-label">Inactive</label>
        </div>
        <ErrorMessage name="status" class="error-feedback text-warning" />
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary"
    >
      Submit
    </button>
  </Form>

</template>

<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import SelectCategory from '@/components/admin/SelectCategory/SelectCategory.vue'
  export default {
    name: "ProductForm",
    components: {
      Form,
      Field,
      ErrorMessage,
      SelectCategory,
    },
    emits: ["submit:product"],
    props: {
      product: {
        type: Object,
        default: {}
      }
    },
    data() {
      const productSchema = yup.object().shape({
        title: yup
          .string()
          .required('The title must have value')
          .min(2, "The title must be at least 2 characters")
          .max(50, "The title can have a maximum of 200 characters."),
        description: yup
          .string()
          .min(2, "The description must be at least 2 characters")
          .max(1000, "The description can have a maximum of 200 characters."),
        price: yup
          .number("The price must be a numerical value") 
          .required('The price must have value')
          .min(1, "The minimum price is 1")
          .positive("The price must be a positive number")
          .integer("The price must be an integer."),
        position: yup
          .number("The position must be a numerical value") 
          .min(1, "The minimum position is 1")
          .positive("The position must be a positive number")
          .integer("The position must be an integer."),
        stock: yup
          .number("The stock must be a numerical value") 
          .required('The stock must have value')
          .min(1, "The stock position is 1")
          .positive("The stock must be a positive number")
          .integer("The stock must be an integer."),
        discountPercentage: yup
          .number("The discount percentage be a numerical value")
          .required('The discount percentage must have value')
          .min(0, "The discount percentage position is 0")
      })
      return {
        localProduct: this.product,
        productSchema,
      }
    },
    methods: {
      handleChooseCategory(selectedCategory) {
        this.localProduct.category = selectedCategory
      },
      handleSubmit() {
        this.$emit("submit:product", this.localProduct)
      }
    },
    watch: {
      product(newVal, oldVal) {
        this.localProduct = newVal
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
