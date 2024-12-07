export const useAuth = () => {
  const token = useCookie('token')
  const router = useRouter()

  const logout = async () => {
    try {
      await $fetch('http://127.0.0.1:8000/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token.value}`
        }
      })

      // Limpiar token y datos de sesión
      token.value = null
      sessionStorage.removeItem('usuario')
      
      // Redirigir al login
      router.push('/login')
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return {
    logout
  }
} 