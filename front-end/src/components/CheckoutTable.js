import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setQttyToZero } from '../redux/actions';
import styles from '../css/Checkout.module.css';

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
      <table className={ styles.checkoutTable }>
        <thead>
          <tr>
            <th className={ styles.countHeader }> </th>
            <th>Item</th>
            <th>Qtd.</th>
            <th>Valor unitário</th>
            <th className={ styles.subTotalHeader }>Sub-total</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {
            (Object.entries(cart)
              .filter((product) => product[1].qtty > 0))
              .map((product, index) => (
                <tr key={ product[1].name }>
                  <td
                    className={ styles.countData }
                    data-testid={ `${ROUTE}-item-number-${index}` }
                  >
                    { index + 1}
                  </td>
                  <td
                    className={ styles.descricaoData }
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
                      <span
                        className="material-icons-outlined"
                      >
                        highlight_off
                      </span>
                    </button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <div className={ styles.orderInfo }>
        <Link to="/customer/products" className={ styles.alterOrder }>
          <span
            className="material-icons-outlined"
          >
            keyboard_return
          </span>
          <span className={ styles.alterText }>Alterar pedido</span>
        </Link>
        <p
          data-testid="customer_checkout__element-order-total-price"
          className={ styles.checkoutTotal }
        >
          Total:
          <b>{` R$ ${totalCart.toFixed(2).replace('.', ',')}`}</b>
        </p>
      </div>
    </div>
  );
}

export default CheckoutTable;
