import React from 'react'

export default function Price({ price = 0, locale = 'en-PH', currency = 'PHP' }) {
    const formatPrice = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(price));

    return <span>{formatPrice}</span>;
}
