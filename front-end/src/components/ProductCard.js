import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsValues } from '../redux/actions';
import styles from '../css/Products.module.css';

function ProductCard(product) {
  const { props: { id, name, price, urlImage } } = product;

  const [qtty, setQtty] = useState(0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.productsValues);

  const handleInputChange = (event) => {
    const newQtty = Number(event.target.value);
    if (newQtty >= 0) {
      setQtty(newQtty);
      dispatch(setProductsValues(id, name, newQtty, price));
    }
  };

  useEffect(() => {
    if (cart[id]) {
      setQtty(cart[id].qtty);
    }
  }, [cart, id]);

  return (
    <div className={ styles.productCard }>
      <div className={ styles.cardTop }>
        <h3
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </h3>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt="bebida"
          height={ 100 }
        />
        <h3
          data-testid={ `customer_products__element-card-price-${id}` }
          className={ styles.price }
        >
          {`R$ ${price.replace('.', ',')}`}
        </h3>
      </div>
      <div className={ styles.cardBottom }>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          disabled={ qtty === 0 || qtty === '' }
          className={ styles.minus }
          onClick={ () => {
            const newQtty = qtty - 1;
            setQtty(newQtty);
            dispatch(setProductsValues(id, name, newQtty, price));
          } }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          min={ 0 }
          value={ qtty }
          onChange={ (event) => handleInputChange(event) }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          className={ styles.plus }
          onClick={ () => {
            const newQtty = qtty + 1;
            setQtty(newQtty);
            dispatch(setProductsValues(id, name, newQtty, price));
          } }
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
