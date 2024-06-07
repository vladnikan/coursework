import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Product } from '../types';
import '../pics/logo.png';
import ProductCard from '../components/ProductCard';
import LoginButton from '../components/LoginButton';
import SearchBar from '../components/SearchBar';
import ShoppingCart from '../components/ShoppingCart';
import { fetchGuitars, fetchStrings } from '../api';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredGuitars, setFilteredGuitars] = useState<Product[]>([]);
  const [filteredStrings, setFilteredStrings] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([fetchGuitars(), fetchStrings()])
      .then(([guitars, strings]) => {
        const allProducts: Product[] = [...guitars, ...strings];
        setProducts(allProducts);
        setFilteredGuitars(guitars);
        setFilteredStrings(strings);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prevCartItems => [...prevCartItems, product]);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.guitar_id !== id));
  };

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filteredGuitars = products.filter(product =>
      product.guitar_name.toLowerCase().includes(lowercasedQuery) && product.category === 'guitar'
    );
    setFilteredGuitars(filteredGuitars);

    const filteredStrings = products.filter(product =>
      product.guitar_name.toLowerCase().includes(lowercasedQuery) && product.category === 'string'
    );
    setFilteredStrings(filteredStrings);
  };

  const { isAuth } = useAuth();

  return isAuth ? (
    <div>
      <div className="headerStyle">
        <div className="logoStyle">
          <img src="https://cdn4.iconfinder.com/data/icons/miscellaneous-icons-3/200/music_guitar-1024.png" alt="Guitar" />
          <h1>Guitar shop</h1>
          <div className="searchBarStyle">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="shoppingCartStyle">
            <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />
          </div>
          <LoginButton />
        </div>
      </div>

      <div className="bodyStyle">
        <h1 className="productName">Электрогитары</h1>
        <div className="productContainer">
          {filteredGuitars.map(product => (
            <ProductCard
              key={product.guitar_id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        <h1 className="productName">Струны</h1>
        <div className="productContainer">
          {filteredStrings.map(product => (
            <ProductCard
              key={product.guitar_id}
              product={product}
              addToCart={addToCart}
              cardClassName="string-card" // Применим класс для карточки струн
              imgClassName="string-img" // Применим класс для изображения струн
            />
          ))}
        </div>
      </div>
      <div className='footer'></div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default HomePage;
