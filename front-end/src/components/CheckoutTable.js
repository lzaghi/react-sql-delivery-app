import React from 'react';
import { useSelector } from 'react-redux';

function CheckoutTable() {
  const ROUTE = 'customer_checkout__element-order-table';
  const cart = useSelector((state) => state.cart.productsValues);
  const totalCart = Object.values(cart)
    .reduce((acc, curr) => acc + (curr.qtty * curr.price), 0);
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
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>
          {
            (Object.entries(cart)
              .filter((product) => product[1].qtty > 0))
              .map((product, index) => (
                <tr key={ index }>
                  <td
                    data-testid={ `${ROUTE}-item-number-${index + 1}` }
                  >
                    { index + 1}
                  </td>
                  <td
                    data-testid={ `${ROUTE}-name-${index + 1}` }
                  >
                    { product[1].name }
                  </td>
                  <td
                    data-testid={ `${ROUTE}-quantity-${index + 1}` }
                  >
                    { product[1].qtty }
                  </td>
                  <td
                    data-testid={ `${ROUTE}-unit-price-${index + 1}` }
                  >
                    { `R$ ${(product[1].price).replace('.', ',')}` }
                  </td>
                  <td
                    data-testid={ `${ROUTE}-sub-total-${index + 1}` }
                  >
                    { `R$
                      ${(product[1].qtty * product[1].price).toFixed(2).replace('.', ',')}
                      `}
                  </td>
                  <td
                    data-testid={ `${ROUTE}-remove-${index + 1}` }
                  >
                    <button type="button">Remover</button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        {`Total: R$ ${totalCart.toFixed(2).replace('.', ',')}`}
      </p>
    </div>
  );
}

export default CheckoutTable;
