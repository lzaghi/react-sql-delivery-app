import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQttyToZero } from '../redux/actions';

function CheckoutTable() {
  const ROUTE = 'customer_checkout__element-order-table';

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.productsValues);
  const totalCart = Object.values(cart)
    .reduce((acc, curr) => acc + (curr.qtty * curr.price), 0);

  const removeFromCart = (id) => {
    dispatch(setQttyToZero(id));
  };

  return (
    <div className="checkout-resumo">
      <table className="checkout-table">
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
                    data-testid={ `${ROUTE}-item-number-${index}` }
                  >
                    { index + 1}
                  </td>
                  <td
                    className="descricao"
                    data-testid={ `${ROUTE}-name-${index}` }
                  >
                    { product[1].name }
                  </td>
                  <td
                    data-testid={ `${ROUTE}-quantity-${index}` }
                  >
                    { product[1].qtty }
                  </td>
                  <td
                    data-testid={ `${ROUTE}-unit-price-${index}` }
                  >
                    { `R$ ${(product[1].price).replace('.', ',')}` }
                  </td>
                  <td
                    data-testid={ `${ROUTE}-sub-total-${index}` }
                  >
                    { `R$
                      ${(product[1].qtty * product[1].price).toFixed(2).replace('.', ',')}
                      `}
                  </td>
                  <td
                    data-testid={ `${ROUTE}-remove-${index}` }
                  >
                    <button
                      type="button"
                      onClick={ () => removeFromCart(product[0]) }
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <p data-testid="customer_checkout__element-order-total-price">
        Total:
        {' '}
        <b>{`R$ ${totalCart.toFixed(2).replace('.', ',')}`}</b>
      </p>
    </div>
  );
}

export default CheckoutTable;
