import { Product } from "./types";

export async function fetchGuitars(): Promise<Product[]> {
  try {
    const response = await fetch('https://localhost:7259/');
    const data = await response.json();
  
    const guitars: Product[] = data.map((guitar: any) => ({
      guitar_id: guitar.guitar_id,
      guitar_name: guitar.guitar_name,
      guitar_price: guitar.guitar_price,
      guitar_img: guitar.guitar_img,
    }));

    return guitars;
  } catch (error) {
    console.error('Error fetching guitars:', error);
    throw error;
  }
}

export async function fetchStrings(): Promise<Product[]> {
  try {
    const response = await fetch('https://localhost:7259/strings');
    const data = await response.json();
  
    const strings: Product[] = data.map((string: any) => ({
      guitar_id: string.string_id,
      guitar_name: string.string_name,
      guitar_price: string.string_price,
      guitar_img: string.string_img,
    }));

    return strings;
  } catch (error) {
    console.error('Error fetching strings:', error);
    throw error;
  }
}
