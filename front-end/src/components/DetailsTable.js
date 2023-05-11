import React from 'react';
import { useHistory } from 'react-router-dom';

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
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            products?.map((product, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `${ROUTE}element-order-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
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
        data-testid={ `${ROUTE}element-order-total-price` }
      >
        {`Total: R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}`}
      </p>
    </div>
  );
}

export default DetailsTable;
