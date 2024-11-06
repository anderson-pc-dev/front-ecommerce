<template>
    <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
    >
        <v-list>
            <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
            ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <NuxtLink to="/productos"><v-list-item prepend-icon="mdi-folder" title="Productos" value="myfiles"></v-list-item></NuxtLink>
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

const logout = () => {
    const token = useCookie('token')
    token.value = null
    sessionStorage.setItem('usuario', '')
    navigateTo('/login')
}
//console.log('drawer - ', drawer)
</script>