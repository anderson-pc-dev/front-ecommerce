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
        <!--a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a-->
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
  <v-snackbar v-model="snackbar" :timeout="5000"
      color="red-darken-2"
       >
       <div class="text-subtitle-1 pb-2">  {{ mensajerror }} </div>
  </v-snackbar>
</template>
<script setup>

  let snackbar = ref(false)
  let mensajerror = ref('')
  let visible = ref(false)
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
    const userStore = useUserStore()
    
    const { data, status, error, refresh, clear } = await useFetch('http://127.0.0.1:8000/login', {
      onRequest({ request, options }) {
        // Set the request headers
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        //options.headers.set('Authorization', '...')
        options.method = "POST"
        options.body = {...form.value}
      },
      onRequestError({ request, options, error }) {
        // Handle the request errors
      },
      onResponse({ request, response, options }) {
        // Process the response data
        //localStorage.setItem('token', response._data.token)
        console.log('res ok ', response)
        if(response.ok){
          const usuario = response._data.user
          console.log("Success:", usuario);
          const cook = useCookie('token')
          cook.value = response._data.token ;
          userStore.setUser(usuario)
          navigateTo('/')
        }

      },
      onResponseError({ request, response, options }) {
        console.log('res error ', response)
        mensajerror.value = response._data.detail? response._data.detail: response._data.error

        snackbar.value = true
      }
    })

  }/**/
  
</script>