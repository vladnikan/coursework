export interface Product {
  guitar_id: number;
  guitar_name: string;
  guitar_price: number;
  guitar_img: string;
  category: string; // Добавляем свойство category
}

  
  // В файле types.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

// Дополнительные свойства для гитар
export interface Guitar extends Product {
  guitar_id: number;
}

// Дополнительные свойства для струн
export interface String extends Product {
  string_id: number;
}

export interface String {
  string_id: number;
  string_name: string;
  string_price: number;
  string_img: string;
}
