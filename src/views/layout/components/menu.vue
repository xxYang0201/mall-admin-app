<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[
        $router.currentRoute.matched[1]
          ? $router.currentRoute.matched[1].name
          : '',
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu v-for="route in $store.state.menuRoutes" :key="route.name">
        <span slot="title">
          <a-icon :type="route.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
        <a-menu-item v-for="children in route.children" :key="children.name">
          <router-link :to="{ name: children.name }">
            {{ children.meta.title }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
export default {
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
