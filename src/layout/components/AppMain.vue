<template>
  <section>
    <!--    <transition name="fade" mode="out-in">-->
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
    <!--    </transition>-->
  </section>
</template>

<script lang="js">
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route['path'];
    },
  },
};
</script>

<style scoped></style>
