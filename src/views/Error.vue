<template>
  <img src="@/assets/404.svg" class="align-image" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const dynamic = () => router.push(route.query.redirect);
const direct = () => router.push('/');

const action = route.query.redirect ? dynamic : direct;
setTimeout(() => action(), 3000);
</script>

<style scoped lang="scss">
.align-image {
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
