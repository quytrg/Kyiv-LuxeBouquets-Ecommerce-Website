<template>
  <VueSidebarMenuAkahon 
    :isUsedVueRouter="true"
    menuTitle="KyivAdmin"
    menuIcon="bxs-florist"
    :menuItems="menuItems"
    profileName="quytrg"
    profileRole="administrator"
    profileImg="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/397979544_1027723701709119_3488965936286601906_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KOsGdU2w7c8AX98Q9H-&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCJNKd81WnWqoJ0HWdAZW584HXf26nqGiYOa95pqCGiqA&oe=655B23CD"
  />
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

export default {
  name: "Sidebar",
  components: { VueSidebarMenuAkahon },
  data() {
    return {
      menuItems: [
        { link: { name: 'Dashboard' }, name: 'Dashboard', tooltip: 'Dashboard', icon: 'bx-grid-alt' },
        { link: { name: 'ProductsAdmin' }, name: 'Products', tooltip: 'Products', icon: 'bxl-dropbox' },
        { link: { name: 'Accounts' }, name: 'Accounts', tooltip: 'Accounts', icon: 'bx-user' },
        { link: { name: 'Dashboard' }, name: 'Orders', tooltip: 'Orders', icon: 'bx-cart-alt' },
        { link: { name: 'Dashboard' }, name: 'File Manager', tooltip: 'File Manager', icon: 'bx-folder' },
        { link: { name: 'Dashboard' }, name: 'Setting', tooltip: 'Setting', icon: 'bx-cog' },
      ]
    }
  },
};
</script>

<style scoped lang="scss"></style>
