<template>
    <v-card>
      <v-layout>
        <v-app-bar
          color="teal-darken-3"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>MercaLocal</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-if="$vuetify.display.mdAndUp">
            <!--<v-btn icon="mdi-magnify" variant="text"></v-btn>

            v-btn icon="mdi-filter" variant="text"></v-btn
            <div>
              <button @click="setLocale('es')">Es</button>
              <button @click="setLocale('en')">En</button>
              <p>{{ $t('bienvenido') }}</p>
            </div>-->
          </template>
          <v-btn class="text-none" stacked @click="drawercart = !drawercart">
            <v-badge color="error" :content="carritoStore.cantidadItems">
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <AppSidebar />
        <AppCart />
        <v-main style="min-height: 100vh">
          <slot />
        </v-main>
      </v-layout>
      <AppFooter />
    </v-card>

</template>

<script setup>
//import { AppSidebar } from '#build/components';

import { ref, provide } from 'vue' ;
let drawer = ref(false);
provide('drawer', drawer)
let drawercart = ref(false);
provide('drawercart', drawercart)
const { locale, setLocale } = useI18n()
const carritoStore = useCarritoStore()

</script>