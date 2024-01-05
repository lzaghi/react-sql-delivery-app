import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../css/Orders.module.css';

function SaleCard(sale) {
  const { props:
    { sale:
      { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } } } = sale;
  const { props: { index } } = sale;
  const [date, setDate] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;

  const FOUR = 4;

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
    <div className={ styles.orderLink }>
      <Link to={ redirectUrl } data-testid={ `sale-${index}` }>
        <div className={ styles.orderTop }>
          <p
            data-testid={ `${ROUTE}element-order-id-${id}` }
          >
            <span>Nº do pedido: </span>
            <b>{ String(id).padStart(FOUR, '0') }</b>
          </p>
          <p
            data-testid={ `${ROUTE}element-order-date-${id}` }
          >
            <b>{ date }</b>
          </p>
        </div>
        <p
          data-testid={ `${ROUTE}element-card-price-${id}` }
        >
          <b>{ `R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }</b>
        </p>
        {
          pathname.includes('seller') && (
            <p
              className={ styles.orderAddress }
              data-testid={ `${ROUTE}element-card-address-${id}` }
            >
              <b>Endereço: </b>
              {`${deliveryAddress}, ${deliveryNumber}`}
            </p>
          )
        }
        <p
          data-testid={ `${ROUTE}element-delivery-status-${id}` }
          className={ styles.status }
        >
          <b>Status: </b>
          { status }
        </p>
        <div className={ styles.progressContainer }>
          <div className={ styles[status.replace(' ', '')] } />
        </div>
        <p className={ styles.details }>Clique para mais detalhes</p>
      </Link>
    </div>
  );
}

export default SaleCard;
