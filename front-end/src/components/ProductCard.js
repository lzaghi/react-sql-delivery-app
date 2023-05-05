import React, { useState } from 'react';

function ProductCard(product) {
  const { props: { id, name, price, urlImage } } = product;
  const ROUTE = 'customer-products';

  const [qtty, setQtty] = useState(0);

  return (
    <div
      className="product-card"
    >
      {console.log(`${ROUTE}__element-card-title-${id}`)}
      <h3
        data-testid={ `${ROUTE}__element-card-title-${id}` }
      >
        {name}
      </h3>
      <h3
        data-testid={ `customer-products__element-card-price-${id}` }
      >
        {price}
      </h3>
      <img
        data-testid={ `customer-products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="bebida"
        height={ 80 }
      />
      <input
        data-testid={ `customer-products__input-card-quantity-${id}` }
        type="number"
        value={ qtty }
        onChange={ () => setQtty(qtty) }
      />
      <button
        data-testid={ `customer-button-card-rm-item-${id}` }
        type="button"
        disabled={ qtty === 0 }
        onClick={ () => setQtty(qtty - 1) }
      >
        -
      </button>
      <button
        data-testid={ `customer-button-card-add-item-${id}` }
        type="button"
        onClick={ () => setQtty(qtty + 1) }
      >
        +
      </button>
    </div>
  );
}

export default ProductCard;
