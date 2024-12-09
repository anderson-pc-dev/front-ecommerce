import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    usuario: null
  }),
  
  actions: {
    setUser(user) {
      this.usuario = user
      // Guardar en sessionStorage
      sessionStorage.setItem('usuario', JSON.stringify(user))
    },
    
    getUser() {
      if (!this.usuario) {
        // Intentar obtener del sessionStorage
        const storedUser = sessionStorage.getItem('usuario')
        if (storedUser) {
          this.usuario = JSON.parse(storedUser)
        }
      }
      return this.usuario
    },

    clearUser() {
      this.usuario = null
      sessionStorage.removeItem('usuario')
    }
  }
}) 