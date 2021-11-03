<template>
  <div>
    <keep-alive>
      <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped></style>
