<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[defaultSelectKey]"
      :default-open-keys="[defaultOpenKey]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu v-for="route in $store.state.menuRoutes" :key="route.name">
        <span slot="title">
          <a-icon :type="route.icon" />
          <span>{{ route.meta.title }}</span>
        </span>

        <template v-for="children in route.children">
          <a-menu-item v-if="children.show" :key="children.name">
            <router-link :to="{ name: children.name }">
              {{ children.meta.title }}
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
export default {
  computed: {
    defaultSelectKey: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : '';
      },
    },
    defaultOpenKey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
  watch: {
    $route(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="less">
.menu-list {
  width: 200px;
  position: fixed;
  height: 100%;
  .ant-menu {
    height: 100%;
  }
}
</style>
