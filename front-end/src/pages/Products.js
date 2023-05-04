import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

function Products() {
  return (
    <div>
      <Header />
      <ProductCard />
      <button type="button">Ver Carrinho: R$ total</button>
    </div>
  );
}

export default Products;
