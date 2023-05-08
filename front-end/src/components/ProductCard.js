import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart, setTotal, subProductToCart } from '../redux/actions';

function ProductCard(product) {
  const { props: { id, name, price, urlImage } } = product;

  const [qtty, setQtty] = useState(0);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const newQtty = event.target.value;
    if (newQtty >= 0) {
      setQtty(newQtty);
      dispatch(setTotal(newQtty * price));
    }
  };

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
        disabled={ qtty === 0 || qtty === '0' || qtty === '' }
        onClick={ () => {
          setQtty(qtty - 1);
          dispatch(subProductToCart(price));
        } }
      >
        -
      </button>
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => {
          setQtty(qtty + 1);
          dispatch(addProductToCart(price));
        } }
      >
        +
      </button>
    </div>
  );
}

export default ProductCard;
