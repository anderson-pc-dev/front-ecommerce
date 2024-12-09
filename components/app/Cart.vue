<template>
    <v-navigation-drawer
    v-model="drawercart"
    location="right"
    temporary
    >
        <v-list-subheader>Carrito</v-list-subheader>
        <div v-for="item in carritoStore.productos"  class="">
          <!-- <CardProduct :producto="item" /> 
          <div>{{ item.nombre }}</div>-->
          <ProductCart :product="item" />
        </div>
        <v-divider></v-divider>
              <v-list-item class="justify-space-between">
                <div class="text-h6">Total:</div>
                <div class="text-h6 text-primary">
                  {{ formatPrice(carritoStore.totalCarrito) }}
                </div>
              </v-list-item>
        <template v-slot:append>
            <div class="pa-2">
            <!--v-btn block-->
            <v-btn @click="realizarCompra" color="teal-darken-3" block :disabled="(carritoStore.productos.length == 0)">
                Realizar compra
            </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
    <div class="pa-4 text-center">
      <v-dialog
        v-model="dialog"
        max-width="auto"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            class="text-none font-weight-regular"
            prepend-icon="mdi-account"
            text="Edit Profile"
            variant="tonal"
            v-bind="activatorProps"
          ></v-btn>
        </template>

        <v-card
        prepend-icon="mdi-package-variant"
        :title="`Confirmar compra por: ${formatPrice(carritoStore.totalCarrito)}`"
        :subtitle="`Total de productos: ${carritoStore.productos.length}`"
        color="teal-darken-3"
        >

        <v-data-table
          :items="carritoStore.productos"
          :headers="headers"
        >
          <template v-slot:header.precio>
            <div class="text-end">Precio</div>
          </template>
          <template v-slot:item.precio="{ item }">
            <div class="text-end">{{ formatPrice(item.precio) }}</div>
          </template>

          <template v-slot:item.imagen="{ item }">
            <v-card class="my-2" elevation="2" rounded>
              <v-img
                :src="`http://127.0.0.1:8000${item.imagen}`"
                height="64"
                width="64"
                cover
              ></v-img>
            </v-card>
          </template>

        </v-data-table>
        <v-form ref="formulario">
          <v-text-field
            variant="solo-filled"
              ref="direccion"
              v-model="address"
              :rules="[
                () => !!address || 'Este campo es requerido',
                () => !!address && address.length <= 100 || 'La direccion debe tener menos de 100 caracteres'
              ]"
              counter="100"
              label="Direccion"
              placeholder="cr8#35"
              required
            ></v-text-field>
        </v-form>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Cancelar"
              variant="plain"
              @click="dialog = false"
            ></v-btn>

            <v-btn
              color="yellow-darken-3"
              text="Guardar"
              variant="flat"
              @click="guardar"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
<script setup>
import { inject } from 'vue'

let drawercart = inject('drawercart')
const { formatPrice } = useFormatPrice()

const carritoStore = useCarritoStore()

const dialog = ref(false)
const realizarCompra = () => {
  drawercart.value = false
  dialog.value = true
}
const headers = [
  { title: 'Nombre', key: 'nombre' },
  { title: 'Imagen', key: 'imagen' },
  { title: 'Cantidad', key: 'cantidad' },
  { title: 'Precio', key: 'precio' },
]
const address = ref('')
const fm = useTemplateRef('formulario')
const userStore = useUserStore()
const guardar = async () => {
  const { valid } = await fm.value.validate()
  if (!valid) return;
  console.log('direccion ', address.value)
  try {
    const { data, status, error, refresh, clear } = await useFetch('http://127.0.0.1:8000/pedido/pedir-productos', {
      method: 'POST',
      body: { pedido: {
        direccion: address.value,
        total: carritoStore.totalCarrito,
        usuario: userStore.usuario.id
      },
      detalle:{
        ...carritoStore.productos.map(item => ({
          producto: item.id,
          cantidad: item.cantidad,
          precio: item.precio
        }))
      }},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${useCookie('token').value}`
      }
    })
    console.log('data', data.value)
    console.log('status', status.value)
    if (status.value === 'success') {
      console.log('compra realizada', data.value)
      carritoStore.clearCarrito()
      carritoStore.mostrarMensaje(data.value.message + ' - id: ' + data.value.pedido, 'success')
    }
  } catch (error) {
    console.log('error al realizar la compra', error)
    carritoStore.mostrarMensaje('Error al realizar la compra', 'error')
  }
  dialog.value = false
}
</script>