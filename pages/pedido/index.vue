<template>
    <NuxtLayout>
        <v-card>
            <v-card-title>
                Pedidos
            </v-card-title>

            <v-data-table :items="pedidos" :headers="headers">
                <template v-slot:item="{ item }">
                    <v-hover v-slot="{ isHovering, props }">

                        <tr :class="isHovering ? 'bg-teal-lighten-4' : ''" v-bind="props" @click="verDetalle(item.id)">
                            <td>{{ item.id }}</td>
                            <td>{{ item.fecha_creacion }}</td>
                            <td>{{ item.estado }}</td>
                            <td>{{ formatPrice(item.total) }}</td>
                        </tr>
                    </v-hover>
                </template>
            </v-data-table>
        </v-card>
        <v-card>
            <v-card-title>
                Detalle del pedido # {{ numeroPedido }}
            </v-card-title>

            <v-data-table :items="detallePedido" :headers="headersDetalle">
                <template v-slot:item.precio="{ item }">
                    {{ formatPrice(item.precio) }}
                </template>
            </v-data-table>
        </v-card>
    </NuxtLayout>
</template>

<script setup>
    const { formatPrice } = useFormatPrice()
    const pedidos = ref([])
    const detallePedido = ref([])
    const numeroPedido = ref(0)
    const headers = ref([
        { title: 'ID', key: 'id' },
        { title: 'Fecha', key: 'fecha_creacion' },
        { title: 'Estado', key: 'estado' },
        { title: 'Total', key: 'total' },
    ])
    const headersDetalle = ref([
        { title: 'ID', key: 'id' },
        { title: 'Nombre', key: 'producto.nombre' },
        { title: 'Cantidad', key: 'cantidad' },
        { title: 'Precio', key: 'precio' },
    ])
    try {
        const { data, status, error, refresh, clear } = await useFetch('http://127.0.0.1:8000/pedido/obtener-pedidos', {
            headers: {
                'Authorization': `Token ${useCookie('token').value}`
            }
        })
        if (status.value === 'success') {
            pedidos.value = data.value
        }
    } catch (error) {
        console.log('error al obtener los pedidos', error)
    }
    const verDetalle = async (id) => {
        numeroPedido.value = id
        try {
            const { data, status, error, refresh, clear } = await useFetch(`http://127.0.0.1:8000/pedido/obtener-detalle/${id}`, {
                headers: {
                    'Authorization': `Token ${useCookie('token').value}`
                }
            })
            if (status.value === 'success') {
                detallePedido.value = data.value.detalles
            }
        } catch (error) {
            console.log('error al obtener el detalle del pedido', error)
        }
    }
</script>