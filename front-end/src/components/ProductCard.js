import React from 'react';

function ProductCard(product) {
  const { props: { id, name, price, urlImage } } = product;
  return (
    <div>
      <h3 data-testid={ `customer-products__element-card-price-${id}` }>{price}</h3>
      <img
        data-testid={ `customer-products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="bebida"
      />
      <h3 data-testid={ `customer-products__element-card-title-${id}` }>{name}</h3>
      <h3 data-testid={ `customer-products__input-card-quantity-${id}` }>quantidade</h3>
      <button
        data-testid={ `customer-button-card-rm-item-${id}` }
        type="button"
      >
        -
      </button>
      <button
        data-testid={ `customer-button-card-add-item-${id}` }
        type="button"
      >
        +
      </button>
    </div>
  );
}

export default ProductCard;
