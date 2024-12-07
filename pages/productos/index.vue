
<template>
    <NuxtLayout>
      <v-container
        class="bg-surface-variant mb-6"
      >
      <div v-if="status === 'pending'">
        Loading ...
      </div>
      <div v-else >
        <v-row class="ga-3"
          align="start"
          no-gutters
        >
          <v-col v-for="product in productos" tabindex="0" md="3" cols="12">
             
              <CardProduct :product="product"  />
             
          </v-col>
        </v-row>
      </div>
      </v-container>
    </NuxtLayout>
</template>
<script setup>

/*let productos = [
    {id: 1, nombre: 'Cafe', imagen: "https://cdn.vuetifyjs.com/images/cards/cooking.png", precio: 2500, cantresena: 200, tienda: 'Fruver el paisa', calificacion: 3, cantidad: 0},
    {id: 2, nombre: 'Flor morada', imagen: "https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg", precio: 800, cantresena: 20, tienda: 'Fruver Valle Lili', calificacion: 3.6, cantidad: 0},
    {id: 3, nombre: 'Cactus', imagen: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg", precio: 5500, cantresena: 30, tienda: 'Fruver Melendez', calificacion: 4.1, cantidad: 0},
    {id: 4, nombre: 'Casa', imagen: "https://cdn.vuetifyjs.com/images/cards/house.jpg", precio: 1500, cantresena: 200, tienda: 'Fruver San Fernando', calificacion: 3.5, cantidad: 0},
    {id: 5, nombre: 'Avion', imagen: "https://cdn.vuetifyjs.com/images/cards/plane.jpg", precio: 50000, cantresena: 12, tienda: 'Fruver la 20', calificacion: 4.5, cantidad: 0},
]*/

const { productos, status, error } = useProductos()
//console.log('productos', productos)

</script>