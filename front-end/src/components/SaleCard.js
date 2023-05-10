import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SaleCard(sale) {
  const { props: { id, status, saleDate, totalPrice } } = sale;
  const [date, setDate] = useState('');

  const handleDate = (dbDate) => {
    const newDate = new Date(dbDate);

    const day = newDate.getDate();
    let month = newDate.getMonth() + 1; // Months are zero-based, so we add 1
    console.log(month.length);
    if (String(month).length === 1) month = `0${month}`;
    const year = newDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    setDate(formattedDate);
  };

  useEffect(() => {
    handleDate(saleDate);
  }, [saleDate]);

  return (
    <Link to={ `/customer/orders/${id}` }>
      <span
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { id }
      </span>
      <span
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </span>
      <span
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { date }
      </span>
      <span
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { `R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
      </span>
    </Link>
  );
}

export default SaleCard;
