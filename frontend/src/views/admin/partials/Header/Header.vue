<template>
  <div class="header-wrapper fluid-container d-flex">
    <h4 class="py-sm-4 py-3 my-0">{{ extractTitle }}</h4>
    <div class="dropdown py-sm-4 py-3 mt-sm-auto ms-auto flex-shrink-1 me-2">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        id="dropdownUser"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/397979544_1027723701709119_3488965936286601906_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KOsGdU2w7c8AX98Q9H-&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCJNKd81WnWqoJ0HWdAZW584HXf26nqGiYOa95pqCGiqA&oe=655B23CD"
          alt="hugenerd"
          width="32"
          height="32"
          class="rounded-circle"
        />
        <span class="d-none d-sm-inline mx-1">quytrg</span>
      </a>
      <ul
        class="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="dropdownUser"
      >
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    tilte: {
      type: String,
      default: "Dashboard",
    },
  },
  computed: {
    extractTitle() {
      const path = this.$route.path
      const lastIndex = path.lastIndexOf("/");
      let result = path.substring(lastIndex + 1);
      if (result === 'admin') {
        result = 'dashboard'
      }
      return result
    }
  },
};
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable.scss';
  .header-wrapper {
    background-color: #11101d;
    h4 {
      color: $white;
      text-transform: capitalize;
    }

    a:visited {
      color: $white;
    }
  }
</style>
