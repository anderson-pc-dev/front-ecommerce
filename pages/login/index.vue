<template>
  <v-form @submit.prevent="login" ref="formulario">
    <!--v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img-->
    <v-row justify="center">
       <v-card-title class="my-6 text-h6 text-md-h5 text-lg-h4 text-medium-emphasis">MERCALOCAL</v-card-title>
    </v-row>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="form.email"
        :rules="validateEmail"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="form.password"
        :rules="validatePass"
      ></v-text-field>
<!--
      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>-->

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        type="submit"
        block
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <NuxtLink to="/registre">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </NuxtLink>
      </v-card-text>
    </v-card>
  </v-form>
</template>
<script setup>

  let visible = false
  let form = ref({
    email : '',
    password: ''
  })
  let validateEmail = [
    v => v? true:  'Email es requerido',
    v => (v && /.+@.+\..+/.test(v))? true: 'Correo no es valido.',
  ]
  let validatePass = [
    v => v? true:  'Contraseña es requerida',
    v => (v && v.length >= 6)? true:  'Debe tener 6 o mas caracteres.',
  ]
  const fm = useTemplateRef('formulario')


  const login = async () => {
    //const { valid } = await this.$refs.form.validate()
    const { valid } = await fm.value.validate()
    if (!valid) return;
    
    const res = await $fetch('http://127.0.0.1:8000/login', {
      
      method: 'POST',
      body: {
        ...form.value
      }
    })
    console.log('res ', res)
    if(res.token){
      const usuario = res.user
      console.log("Success:", usuario);
      const cook = useCookie('token')
      cook.value = res.token ;
      sessionStorage.setItem('usuario', JSON.stringify(usuario))
      navigateTo('/')
    }else{
      fm.value.reset()
      alert('error')
    }
  }/**/
  
</script>