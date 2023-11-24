<template>
  <div class="status-list d-flex">
    <div 
      class="status-item" 
      v-for="item, index in statusList" 
      :key="item.name" 
      @click="handleActive($event, index)"
    >
      <button 
        class="btn btn-sm ms-1 btn-outline-success" 
        :class="{ 'active': item.isActive }"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FilterStatus",
    props: {
      statusListProp: {
        type: Array,
        default: [
          {
            name: 'All',
            status: '',
            isActive: true
          },
          {
            name: 'Active',
            status: 'active',
            isActive: false
          },
          {
            name: 'Inactive',
            status: 'inactive',
            isActive: false
          }
        ],
      },
      clear: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleActive(e, index) {
        this.statusList[this.indexActiveStatus].isActive = false
        this.statusList[index].isActive = true
        this.indexActiveStatus = index

        this.$emit('active', this.statusList[this.indexActiveStatus].status)
      }
    },
    data() {
      return {
        statusList: [],
        indexActiveStatus: 0,
      }
    },
    created() {
      this.statusList = this.statusListProp
      this.indexActiveStatus = this.statusList.findIndex(item => item.isActive === true)
    },
    watch: {
      clear(newVal, oldVal) {
        this.statusList[this.indexActiveStatus].isActive = false
        this.statusList[0].isActive = true
        this.indexActiveStatus = 0
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
