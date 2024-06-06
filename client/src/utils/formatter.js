const formatPrice = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
});

export { formatPrice };
