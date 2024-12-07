<template>
    <v-card
      :disabled="loading"
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        height="250"
        :src="`http://127.0.0.1:8000${product.imagen}`"
        cover
      ></v-img>
  
      <v-card-item>
        <v-card-title>{{ product.nombre }}</v-card-title>
  
        <v-card-subtitle>
          <span class="me-1">{{ product.vendedor.nombre_tienda }}</span>
  
          <v-icon
            color="error"
            icon="mdi-fire-circle"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>
  
      <v-card-text>
        <!--v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :model-value="product.calificacion"
            :name="`rating-${product.id}`"
            :id="`rating-${product.id}`"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
            :key="product.id"
          ></v-rating
  
          <div class="text-grey ms-4">
             ({{ product.cantresena }})
          </div>>
        </v-row-->
  
        <div class="text-subtitle-1">
          {{ formatPrice(product.precio) }}
        </div>
  
      </v-card-text>
      <!--
        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
      <v-divider class="mx-4 mb-1"></v-divider>
  
      <v-card-title>Tonight's availability</v-card-title>
  
      <div class="px-4 mb-2">
        <v-chip-group v-model="selection" selected-class="bg-deep-purple-lighten-2">
          <v-chip>5:30PM</v-chip>
  
          <v-chip>7:30PM</v-chip>
  
          <v-chip>8:00PM</v-chip>
  
          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </div>
  -->
        
          <div class="text-grey text-subtitle-1">max:20</div>
        
        <v-number-input id="cantidad" name="cantidad"
            control-variant="split"
          :max="20"
          :min="1"
          :model-value="product.cantidad"
          :step="1"
        ></v-number-input>
      <v-card-actions>
        <v-btn 
          color="deep-purple-lighten-2"
          text="Agregar"
          block
          border
          :loading="loading"
          @click="agregarCar(product)"
        ></v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar 
      v-model="snackbar" 
      :timeout="4000"
      :color="colorSnack"
    >
      <div class="text-subtitle-1 pb-2">
        {{ mensaje }}
      </div>  
    </v-snackbar>
  </template>
  <script setup>
    import { VNumberInput } from 'vuetify/labs/VNumberInput'
    const props = defineProps({
      product: Object
    })
    let selection = 1
    let loading = ref(false)

    const { formatPrice } = useFormatPrice()
    const { agregarAlCarrito, mensaje, colorSnack, snackbar } = useCarrito()

    const agregarCar = async (producto) => {
      loading.value = true
      try {
        await agregarAlCarrito(producto)
      } catch (error) {
        console.error('Error al agregar al carrito:', error)
      } finally {
        loading.value = false
      }
    }
    /*export default {
      data: () => ({
        loading: false,
        selection: 1,
      }),
  
      methods: {
        reserve () {
          this.loading = true
  
          setTimeout(() => (this.loading = false), 2000)
        },
      },
    }*/
  </script>