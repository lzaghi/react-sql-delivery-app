import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsList = await requestProducts('/products');
        setProducts(productsList);
      } catch (e) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  // const { products } = useSelector((state) => state.products);

  if (error) {
    return (
      <h2>Algo deu errado!</h2>
    );
  }

  return (
    <div>
      <Header />
      { products.length && (
        products.map((product) => (
          <ProductCard
            key={ product.id }
            props={ product }
          />
        ))
      )}
      {/* { (
        products.map((product) => (
          <ProductCard
            key={ product.id }
            props={ product }
          />
        ))
      )} */}
      <button type="button">Ver Carrinho: R$ total</button>
    </div>
  );
}

export default Products;
