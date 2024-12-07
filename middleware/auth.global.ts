export default defineNuxtRouteMiddleware(async(to, from) => {
    const token = useCookie('token')
    //console.log('maddleware', token.value)
    //console.log('to-> ', to)
    //console.log('from->  ', from)
    if(!token.value && to.path !== '/login' && to.path !== '/registre'){
        return navigateTo('/login')
    }
})