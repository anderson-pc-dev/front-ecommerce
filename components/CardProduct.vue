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
  
        <div class="text-subtitle-1">
          {{ formatPrice(product.precio) }}
        </div>
  
      </v-card-text>
        
          <div class="text-grey text-subtitle-1">stock:{{ product.stock }}</div>
        
        <v-number-input id="cantidad" name="cantidad"
            control-variant="split"
          :max="product.stock"
          :min="1"
          :model-value="product.cantidad"
          :step="1"
        ></v-number-input>
      <v-card-actions>
        <v-btn 
          color="yellow-darken-4"
          text="Agregar"
          variant="flat"
          block
          border
          :loading="loading"
          @click="agregarCar(product)"
        ></v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar 
      v-model="carritoStore.snackbar" 
      :timeout="4000"
      :color="carritoStore.colorSnack"
    >
      <div class="text-subtitle-1 pb-2">
        {{ carritoStore.mensaje }}
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
    //console.log('product->', props.product)
    const { formatPrice } = useFormatPrice()
    const carritoStore = useCarritoStore()
    const agregarCar =  (producto) => {
      loading.value = true
      try {
        carritoStore.agregarAlCarrito(producto)
      } catch (error) {
        console.error('Error al agregar al carrito:', error)
      } finally {
        loading.value = false
      }
    }
  </script>