import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function SaleCard(sale) {
  const { props:
    { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } } = sale;
  const [date, setDate] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;

  const handleDate = (dbDate) => {
    const newDate = new Date(dbDate);

    const day = newDate.getDate();
    let month = newDate.getMonth() + 1; // Months are zero-based, so we add 1
    if (String(month).length === 1) month = `0${month}`;
    const year = newDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    setDate(formattedDate);
  };

  let ROUTE = '';
  let redirectUrl = '';

  if (pathname.includes('customer')) {
    ROUTE = 'customer_orders__';
    redirectUrl = `/customer/orders/${id}`;
  } else if (pathname.includes('seller')) {
    ROUTE = 'seller_orders__';
    redirectUrl = `/seller/orders/${id}`;
  }

  useEffect(() => {
    handleDate(saleDate);
  }, [saleDate]);

  return (
    <Link to={ redirectUrl }>
      <span
        data-testid={ `${ROUTE}element-order-id-${id}` }
      >
        { id }
      </span>
      <span
        data-testid={ `${ROUTE}element-delivery-status-${id}` }
      >
        { status }
      </span>
      <span
        data-testid={ `${ROUTE}element-order-date-${id}` }
      >
        { date }
      </span>
      <span
        data-testid={ `${ROUTE}element-card-price-${id}` }
      >
        { `R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
      </span>
      {
        pathname.includes('seller') && (
          <span
            data-testid={ `${ROUTE}element-card-address-${id}` }
          >
            {`${deliveryAddress}, ${deliveryNumber}`}
          </span>
        )
      }
    </Link>
  );
}

export default SaleCard;
