import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    productos: [],
    cantidadItems: 0,
    snackbar: false,
    mensaje: '',
    colorSnack: 'success',
    totalCarrito: 0
  }),

  actions: {
    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.productos))
    },

    calcular() {
      this.totalCarrito = this.productos.reduce((total, item) => total + (item.precio * item.cantidad), 0)
      this.cantidadItems = this.productos.reduce((total, item) => total + item.cantidad, 0)
      //console.log('calculos', this.totalCarrito, this.cantidadItems)
    },

    obtenerCarrito() {
      
        const localCarrito = localStorage.getItem('carrito')
        if (localCarrito) {
          this.productos = JSON.parse(localCarrito)
          //console.log('store', this.productos)
          this.calcular()
        }
      
      //return this.cantidadItems
    },

    agregarAlCarrito(producto) {
      try {
        const productoExistente = this.productos.find(
          item => item.id === producto.id
        )
        //console.log('productoExistente', productoExistente)
        if (productoExistente) {
          productoExistente.cantidad += producto.cantidad
        } else {
          this.productos.push({
            ...producto
          })
        }

        this.guardarCarrito()
        this.calcular()
        this.mensaje = `${producto.nombre} agregado al carrito`
        this.colorSnack = 'success'
        this.snackbar = true

      } catch (error) {
        this.mensaje = 'Error al agregar al carrito'
        this.colorSnack = 'red-darken-2'
        this.snackbar = true
        throw error
      }
    },

    eliminarDelCarrito(productoId) {
      try {
        this.productos = this.productos.filter(
          item => item.id !== productoId
        )
        this.guardarCarrito()
        this.calcular()
        this.mensaje = 'Producto eliminado del carrito'
        this.colorSnack = 'success'
        this.snackbar = true
      } catch (error) {
        this.mensaje = 'Error al eliminar del carrito'
        this.colorSnack = 'red-darken-2'
        this.snackbar = true
      }
    },

    actualizarCantidad(productoId, nuevaCantidad) {
      try {
        const producto = this.productos.find(
          item => item.id === productoId
        )
        if (producto) {
          producto.cantidad = nuevaCantidad
          this.guardarCarrito()
          this.calcular()
          this.mensaje = 'Cantidad actualizada'
          this.colorSnack = 'success'
          this.snackbar = true
        }
      } catch (error) {
        this.mensaje = 'Error al actualizar cantidad'
        this.colorSnack = 'red-darken-2'
        this.snackbar = true
      }
    },
    clearCarrito() {
      this.productos = []
      this.guardarCarrito()
      this.calcular()
    },
    mostrarMensaje(mensaje, color) {
      this.mensaje = mensaje
      this.colorSnack = color
      this.snackbar = true
    }
  },    

  /*getters: {
    totalCarrito: (state) => {
      return state.productos.reduce((total, item) => total + (item.precio * item.cantidad), 0)
    },
    cantidadItems: (state) => {
      return state.productos.reduce((total, item) => total + item.cantidad, 0)
    }
  }*/
}) 