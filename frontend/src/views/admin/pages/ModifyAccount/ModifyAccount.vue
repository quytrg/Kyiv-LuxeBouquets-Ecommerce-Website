<template>
  <div class="modify-account container mt-3">
    <AccountForm 
      :account="account"
      @submit:account="updateAccount"
    />
  </div>
</template>

<script>
  import AccountForm from '@/components/admin/AccountForm/AccountForm.vue';
  import AccountService from '@/services/admin/account.service.js'
  export default {
    name: "ModifyProduct",
    components: {
      AccountForm,
    },
    data() {
      return {
        account: {}
      }
    },
    methods: {
      async getAccount() {
        this.account = await AccountService.getAccountById(this.$route.params.id)
        console.log(this.account);
      },
      async updateAccount(data) {
        try {
          await AccountService.update(data._id, data)
          this.$router.push({ name: "Accounts" })
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    created() {
      this.getAccount()
    }
  }
</script>

<style scoped lang="scss">

</style>
