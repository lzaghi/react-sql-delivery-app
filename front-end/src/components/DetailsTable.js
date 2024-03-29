import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../css/Details.module.css';

function DetailsTable(sale) {
  const history = useHistory();
  const { location: { pathname } } = history;

  let ROUTE = '';
  if (pathname.includes('customer')) {
    ROUTE = 'customer_order_details__';
  } else if (pathname.includes('seller')) {
    ROUTE = 'seller_order_details__';
  }
  const { props: { products, totalPrice } } = sale;
  return (
    <div>
      <table className={ styles.detailsTable }>
        <thead>
          <tr>
            <th className={ styles.numberHeader }> </th>
            <th>Item</th>
            <th>Qtd.</th>
            <th>Valor unitário</th>
            <th className={ styles.subTotalHeader }>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            products?.map((product, index) => (
              <tr key={ product.name }>
                <td
                  data-testid={ `${ROUTE}element-order-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  className={ styles.descricaoData }
                  data-testid={ `${ROUTE}element-order-table-name-${index}` }
                >
                  { product.name }
                </td>
                <td
                  data-testid={ `${ROUTE}element-order-table-quantity-${index}` }
                >
                  { product.SaleProduct.quantity }
                </td>
                <td
                  data-testid={ `${ROUTE}element-order-table-unit-price-${index}` }
                >
                  { `R$ ${(product.price).replace('.', ',')}` }
                </td>
                <td
                  data-testid={ `${ROUTE}element-order-table-sub-total-${index}` }
                >
                  { `R$ ${(product.SaleProduct.quantity * product.price)
                    .toFixed(2).replace('.', ',')} ` }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p
        className={ styles.detailsTotal }
        data-testid={ `${ROUTE}element-order-total-price` }
      >
        Total:
        <b>{` R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}`}</b>
      </p>
    </div>
  );
}

export default DetailsTable;
