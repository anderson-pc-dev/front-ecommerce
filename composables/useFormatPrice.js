export const useFormatPrice = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatPriceSimple = (price) => {
    return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }

  return {
    formatPrice,
    formatPriceSimple
  }
} 