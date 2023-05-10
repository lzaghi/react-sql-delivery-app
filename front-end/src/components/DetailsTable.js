import React from 'react';

function DetailsTable(sale) {
  const ROUTE = 'customer_order_details__element-order';
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
                  data-testid={ `${ROUTE}-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `${ROUTE}-table-name-${index}` }
                >
                  { product.name }
                </td>
                <td
                  data-testid={ `${ROUTE}-table-quantity-${index}` }
                >
                  { product.SaleProduct.quantity }
                </td>
                <td
                  data-testid={ `${ROUTE}-table-unit-price-${index}` }
                >
                  { `R$ ${(product.price).replace('.', ',')}` }
                </td>
                <td
                  data-testid={ `${ROUTE}-table-sub-total-${index}` }
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
        data-testid={ `${ROUTE}-total-price` }
      >
        {`Total: R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}`}
      </p>
    </div>
  );
}

export default DetailsTable;
