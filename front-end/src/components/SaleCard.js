import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function SaleCard(sale) {
  const { props:
    { sale:
      { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } } } = sale;
  const { props: { index } } = sale;
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
    <div className="order-link">
      <Link to={ redirectUrl } data-testid={ `sale-${index}` }>
        <div className="order-top">
          <p
            data-testid={ `${ROUTE}element-order-id-${id}` }
          >
            <b>Pedido: </b>
            { id }
          </p>
          <p
            data-testid={ `${ROUTE}element-order-date-${id}` }
          >
            <b>{ date }</b>
          </p>
        </div>
        <div className="order-bottom">
          <p
            data-testid={ `${ROUTE}element-delivery-status-${id}` }
          >
            <b>Status: </b>
            { status }
          </p>
          <p
            data-testid={ `${ROUTE}element-card-price-${id}` }
          >
            <b>Total: </b>
            { `R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
          </p>
        </div>
        {
          pathname.includes('seller') && (
            <p
              className="order-address"
              data-testid={ `${ROUTE}element-card-address-${id}` }
            >
              <b>Endereço: </b>
              {`${deliveryAddress}, ${deliveryNumber}`}
            </p>
          )
        }
      </Link>
    </div>
  );
}

export default SaleCard;
