<template functional>
    <a-menu-item :key="props.currentRoute.path">
        <router-link :to="props.currentRoute.path">
            <a-icon v-if="props.currentRoute.meta.icon" :type="props.currentRoute.meta.icon"/>
            <span style="margin-left:16px" class="menu-title">{{ props.currentRoute.meta.title }}</span>
        </router-link>
    </a-menu-item>
</template>

<script>
export default {
  name: 'menuItem',
  props: {
    currentRoute: {
      type: Object,
      required: true
    }
  }
};
</script>