<template>
  <div>
    <iconDiv />
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBarItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const iconDiv = () => '<div><el-icon>\<{icon.value}\/\></el-icon></div>';
    return {
      iconDiv,
    };
  },
  // render(h, context) {
  //   const { icon, title } = context.props;
  //   const vnodes = [];
  //   if (icon) {
  //     if (icon.includes('el-icon')) {
  //       // const iconDiv = () => '<el-icon>\<{icon.value}\/\></el-icon>';
  //       // vnodes.push(iconDiv())
  //       vnodes.push(<i class={[icon, 'sub-el-icon']}></i>);
  //     } else {
  //       vnodes.push(<svg-icon icon-class={icon}></svg-icon>);
  //     }
  //   }
  //
  //   if (title) {
  //     vnodes.push(
  //       <span slot="title" style="padding-left:10px">
  //         {title}
  //       </span>,
  //     );
  //   }
  //   return vnodes;
  // },
});
</script>

<style scoped></style>
