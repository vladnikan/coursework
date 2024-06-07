import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  cardClassName?: string; // Дополнительный класс для карточки
  imgClassName?: string; // Дополнительный класс для изображения
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, cardClassName, imgClassName }) => {
  const { guitar_img, guitar_name, guitar_price } = product;

  return (
    <div className={`card ${cardClassName || ''}`}> {/* Применим переданный класс для карточки */}
      <img src={guitar_img} className={`card-img-top ${imgClassName || ''}`} alt="ProductImage" /> {/* Применим переданный класс для изображения */}
      <div className="card-body">
        <h5 className="card-title">{guitar_name}</h5>
        <p className="card-text">Цена: {guitar_price} ₽</p>
        <button onClick={() => addToCart(product)} className="btn btn-primary">Купить</button>
      </div>
    </div>
  );
}

export default ProductCard;
