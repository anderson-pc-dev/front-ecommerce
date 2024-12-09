<template>
    <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
    >
        <v-list>
            <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            :subtitle="userStore.usuario?.email"
            :title="userStore.usuario?.first_name"
            ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <NuxtLink to="/productos"><v-list-item prepend-icon="mdi-folder" title="Productos" value="productos"></v-list-item></NuxtLink>
            <NuxtLink to="/pedido"><v-list-item prepend-icon="mdi-order-bool-ascending-variant" title="Pedidos" value="pedidos"></v-list-item></NuxtLink>
            <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
            <!--v-btn block-->
            <v-btn @click="logout">
                Logout
            </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>
<script setup>
import { inject } from 'vue'

let drawer = inject('drawer')
const { logout } = useAuth()
const usuario = ref(null)
const userStore = useUserStore()
// Cargar datos del usuario solo en el cliente

const getUserData = computed(() => {
  if (isClient) {
    return JSON.parse(sessionStorage.getItem('usuario'))
  }
  return null
})

//console.log('usuario - ', usuario)
//console.log('drawer - ', drawer)
</script>