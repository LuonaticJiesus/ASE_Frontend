<template>
  <section class="app-main">
    <!--    <transition name="fade" mode="out-in">-->
    <!-- <keep-alive>
      <router-view :key="key" />
    </keep-alive> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
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
