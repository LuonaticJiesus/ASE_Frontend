<script>
import { useRoute } from 'vue-router';
import router from '/@/router/index';

export default {
  name: 'RedirectRoute',
  created() {
    const route = useRoute();
    const { params, query } = route;
    const { path } = params;
    router.replace({ path: '/' + path, query });
  },
  render: function (h) {
    return h(); // avoid warning message
  },
};
</script>
