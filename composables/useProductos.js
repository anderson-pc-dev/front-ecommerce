export const useProductos = () => {
  const token = useCookie('token')
  
  const { data: productos, refresh, status, error } = useLazyFetch('http://127.0.0.1:8000/producto/listar-productos', {
    immediate: true,
    headers: {
      'Authorization': `Token ${token.value}`,
    },
    credentials: 'include',
    watch: [token],
    enabled: computed(() => !!token.value),
    transform: (productos) => {
      return productos.map(producto => ({
        ...producto,
        cantidad: 1
      }))
    }
  })

  return {
    productos,
    refresh,
    status,
    error
  }
} 