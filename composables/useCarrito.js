export const useCarrito = () => {
  const token = useCookie('token')
  const { formatPrice } = useFormatPrice()
  const cantidadItems = ref(0)
  const snackbar = ref(false)
  const mensaje = ref('')
  const colorSnack = ref('success')

  const obtenerCantidadCarrito = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/carrito/listar-carrito', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token.value}`,
        },
        credentials: 'include',
      })
      // Calcular la cantidad total sumando las cantidades de cada item
      if (!response.ok) {
        throw new Error('Error al obtener carrito')
      }
      const data = await response.json()
      console.log('response', data)
      cantidadItems.value = data.productos.reduce((total, item) => total + item.cantidad, 0)
      return cantidadItems.value
    } catch (error) {
      console.error('Error al obtener carrito:', error)
      return 0
    }
  }

  const agregarAlCarrito = async (producto) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/carrito/agregar-producto/'+producto.id, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token.value}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          producto_id: producto.id,
          cantidad: producto.cantidad,
          sobre_escribir: true
        })
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Error al agregar al carrito')
      }

      await obtenerCantidadCarrito()
      
      mensaje.value = `${producto.nombre} agregado al carrito - ${formatPrice(producto.precio * producto.cantidad)}`
      colorSnack.value = 'success'
      snackbar.value = true
      return response

    } catch (error) {
      mensaje.value = error.data?.detail || 'Error al agregar al carrito'
      colorSnack.value = 'red-darken-2'
      snackbar.value = true
      throw error
    }
  }

  onMounted(() => {
    if (token.value) {
      obtenerCantidadCarrito()
    }
  })

  return {
    agregarAlCarrito,
    cantidadItems,
    obtenerCantidadCarrito,
    snackbar,
    mensaje,
    colorSnack
  }
} 