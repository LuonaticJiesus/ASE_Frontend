<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img
          class="pic-404__parent"
          src="/src/assets/404_images/404.png"
          alt="404"
        />
        <img
          class="pic-404__child left"
          src="/src/assets/404_images/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child mid"
          src="/src/assets/404_images/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child right"
          src="/src/assets/404_images/404_cloud.png"
          alt="404"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...';
    },
  },
};
</script>

<style lang="css" scoped></style>
