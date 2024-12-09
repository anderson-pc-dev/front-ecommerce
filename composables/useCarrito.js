export const useCarrito = () => {
  const { formatPrice } = useFormatPrice()
  const cantidadItems = ref(0)
  const snackbar = ref(false)
  const mensaje = ref('')
  const colorSnack = ref('success')
  const carrito = ref({ productos: [] })
  const totalCarrito = ref(0)

  const calcularTotalCarrito = () => {
    totalCarrito.value = carrito.value.productos.reduce((total, item) => total + item.precio * item.cantidad, 0)
    return totalCarrito.value
  }

  const listarCarrito = () => {
    calcularTotalCarrito()
    carrito.value = JSON.parse(localStorage.getItem('carrito'))
    return carrito.value
  }
  // Función para guardar en localStorage
  const guardarCarrito = (data) => {
    
    localStorage.setItem('carrito', JSON.stringify(data))
    carrito.value = data
    cantidadItems.value = data.productos.reduce((total, item) => total + item.cantidad, 0)
    calcularTotalCarrito()
  }

  const obtenerCantidadCarrito = () => {
    
    const localCarrito = localStorage.getItem('carrito')
    if (localCarrito) {
    const data = JSON.parse(localCarrito)
    carrito.value = data
    cantidadItems.value = data.productos.reduce((total, item) => total + item.cantidad, 0)
    }
    
    return cantidadItems.value
  }

  const agregarAlCarrito = (producto) => {
    try {
      // Buscar si el producto ya existe en el carrito
      const productoExistente = carrito.value.productos.find(
        item => item.id === producto.id
      )

      if (productoExistente) {
        // Actualizar cantidad si ya existe
        productoExistente.cantidad += producto.cantidad
      } else {
        // Agregar nuevo producto al carrito
        carrito.value.productos.push({
          //producto: producto,
          //cantidad: producto.cantidad
          ...producto
        })
      }

      // Guardar en localStorage y actualizar cantidades
      guardarCarrito(carrito.value)
      
      mensaje.value = `${producto.nombre} agregado al carrito - ${formatPrice(producto.precio * producto.cantidad)}`
      colorSnack.value = 'success'
      snackbar.value = true

      return carrito.value

    } catch (error) {
      mensaje.value = 'Error al agregar al carrito'
      colorSnack.value = 'red-darken-2'
      snackbar.value = true
      throw error
    }
  }

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (productoId) => {
    try {
      carrito.value.productos = carrito.value.productos.filter(
        item => item.id !== productoId
      )
      guardarCarrito(carrito.value)
      
      mensaje.value = 'Producto eliminado del carrito'
      colorSnack.value = 'success'
      snackbar.value = true
    } catch (error) {
      mensaje.value = 'Error al eliminar del carrito'
      colorSnack.value = 'red-darken-2'
      snackbar.value = true
    }
  }

  // Función para actualizar la cantidad de un producto
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    try {
      const producto = carrito.value.productos.find(
        item => item.id === productoId
      )
      if (producto) {
        producto.cantidad = nuevaCantidad
        guardarCarrito(carrito.value)
        
        mensaje.value = 'Cantidad actualizada'
        colorSnack.value = 'success'
        snackbar.value = true
      }
    } catch (error) {
      mensaje.value = 'Error al actualizar cantidad'
      colorSnack.value = 'red-darken-2'
      snackbar.value = true
    }
  }

  // Cargar datos iniciales del localStorage
  onMounted(() => {
    obtenerCantidadCarrito()
  })

  return {
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    listarCarrito,
    cantidadItems,
    obtenerCantidadCarrito,
    snackbar,
    mensaje,
    colorSnack,
    carrito, 
    totalCarrito       
  }
} 