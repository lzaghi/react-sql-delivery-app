import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsValues } from '../redux/actions';

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
    <div
      className="product-card"
    >
      <h3
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </h3>
      <h3
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {price.replace('.', ',')}
      </h3>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="bebida"
        height={ 80 }
      />
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        min={ 0 }
        value={ qtty }
        onChange={ (event) => handleInputChange(event) }
      />
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        disabled={ qtty === 0 || qtty === '' }
        onClick={ () => {
          const newQtty = qtty - 1;
          setQtty(newQtty);
          dispatch(setProductsValues(id, name, newQtty, price));
        } }
      >
        -
      </button>
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => {
          const newQtty = qtty + 1;
          setQtty(newQtty);
          dispatch(setProductsValues(id, name, newQtty, price));
        } }
      >
        +
      </button>
    </div>
  );
}

export default ProductCard;
