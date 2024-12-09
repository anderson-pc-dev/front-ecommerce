<template>
  <!--
  </NuxtLayout>-->
  <NuxtPage />
</template>
<script setup>
const carritoStore = useCarritoStore()
const userStore = useUserStore()
onMounted(() => {
  carritoStore.obtenerCarrito()
  userStore.getUser()
})
</script>
