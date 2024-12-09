<template>
    <v-card
      class="mx-auto my-12"
      max-width="374"
    >
      <v-img
        height="70"
        width="70"
        position="center"
        :src="`http://127.0.0.1:8000${product.imagen}`"
        cover
      ></v-img>
  
      <v-card-item>
        <div class="text-subtitle-1">{{ product.nombre }}</div>
  
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
  
        <div class="text-overline">
          {{ formatPrice(product.precio) }}
        </div>
  
      </v-card-text>
        
        <div class="text-grey text-overline">stock:{{ product.stock }}</div>
        
        <v-number-input :id="`cantidad-${product.id}`" :name="`cantidad-${product.id}`" density="compact" @update:model-value="agregarCar"
            control-variant="split"
          :max="product.stock"
          :min="1"
          :model-value="product.cantidad"
          :step="1"
        ></v-number-input>
      <v-card-actions>
        <v-btn 
          color="deep-gray-darken-7"
          text=""
          prepend-icon="mdi-delete-outline"
          class=""
          block
          border
          @click="eliminarProducto"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
  <script setup>
    import { VNumberInput } from 'vuetify/labs/VNumberInput'
    const props = defineProps({
      product: Object
    })

    const { formatPrice } = useFormatPrice()
    const carritoStore = useCarritoStore()
    
    const eliminarProducto = () => {
        carritoStore.eliminarDelCarrito(props.product.id)
    }

    const agregarCar =  (nuevaCantidad) => {
        props.product.cantidad = nuevaCantidad
        //console.log('producto ---- ', props.product)
      try {
        carritoStore.actualizarCantidad(props.product.id, nuevaCantidad)
      } catch (error) {
        console.error('Error al agregar al carrito:', error)
      } 
    }
  </script>