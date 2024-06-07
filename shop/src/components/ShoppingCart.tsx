import React, { useState } from 'react';
import { Product } from '../types';

interface ShoppingCartProps {
  cartItems: Product[];
  removeFromCart: (id: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, removeFromCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const groupedItems: { [id: number]: number } = {};

  cartItems.forEach(item => {
    groupedItems[item.guitar_id] = (groupedItems[item.guitar_id] || 0) + 1;
  });

  const totalCost = cartItems.reduce((total, item) => total + item.guitar_price, 0);

  return (
    <div className='shoppingCart' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <button className='shoppingCartButton' >Корзина</button>
        {isHovered && cartItems.length > 0 && (
            <div className="cartItemsPopup">
                {Object.keys(groupedItems).map((itemId, index) => {
                    const id = parseInt(itemId);
                    const itemCount = groupedItems[id];
                    const item = cartItems.find(item => item.guitar_id === id);
                    if (!item) return null;
                    return (
                        <div key={index}>
                            <img src={item.guitar_img} alt="ProductImage" style={{ width: '150px', height: '50px', marginRight: '10px' }} />
                            <div>
                                <div>
                                    <span>Название: </span>
                                    <span>{item.guitar_name}</span>
                                </div>
                                <div>
                                    <span>Цена: </span>
                                    <span>{item.guitar_price} ₽</span>
                                </div>
                                <div>
                                    <span>Количество: </span>
                                    <span>{itemCount} шт</span>
                                </div>
                                <button onClick={() => removeFromCart(id)}>Удалить</button>
                            </div>
                            {index !== Object.keys(groupedItems).length - 1 && <hr style={{ margin: '5px 0' }} />}
                        </div>
                    );
                })}
                
                <div>
                    <button className='buttonCart'>Купить за {totalCost} ₽</button>
                </div>
                <div>
                </div>
            </div>
        )}
    </div>
  );
}

export default ShoppingCart;
