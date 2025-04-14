export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  sku: string;
  categoryId: string;
  featured: boolean;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

// Mock data for development
export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "A timeless white t-shirt made from 100% cotton for ultimate comfort and breathability. Perfect for everyday wear.",
    price: 19.99,
    images: ["https://placehold.co/400x400/white/lightgray?text=T-Shirt"],
    stock: 100,
    sku: "T-SHIRT-001",
    categoryId: "1",
    featured: true,
  },
  {
    id: "2",
    name: "Graphic Print T-Shirt",
    description: "Express your style with this unique graphic print t-shirt. Made from soft cotton blend with a modern fit.",
    price: 24.99,
    images: ["https://placehold.co/400x400/EAEAEA/lightgray?text=Graphic+Tee"],
    stock: 75,
    sku: "T-SHIRT-002",
    categoryId: "1",
    featured: false,
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    description: "Classic slim fit jeans with a modern touch. Made from high-quality denim that offers comfort and durability.",
    price: 49.99,
    images: ["https://placehold.co/400x400/5881B0/white?text=Jeans"],
    stock: 50,
    sku: "JEANS-001",
    categoryId: "2",
    featured: true,
  },
  {
    id: "4",
    name: "Relaxed Fit Jeans",
    description: "Comfortable relaxed fit jeans perfect for casual wear. Features a straight leg design and classic five-pocket styling.",
    price: 44.99,
    images: ["https://placehold.co/400x400/4A6B99/white?text=Relaxed+Jeans"],
    stock: 60,
    sku: "JEANS-002",
    categoryId: "2",
    featured: false,
  },
  {
    id: "5",
    name: "Running Sneakers",
    description: "Lightweight running sneakers with cushioned insoles for maximum comfort. Perfect for jogging, running, or everyday wear.",
    price: 79.99,
    images: ["https://placehold.co/400x400/FF6B6B/white?text=Sneakers"],
    stock: 40,
    sku: "SHOES-001",
    categoryId: "3",
    featured: true,
  },
  {
    id: "6",
    name: "Casual Loafers",
    description: "Stylish casual loafers made from premium materials. Combines comfort and elegance for any occasion.",
    price: 89.99,
    images: ["https://placehold.co/400x400/4D5057/white?text=Loafers"],
    stock: 35,
    sku: "SHOES-002",
    categoryId: "3",
    featured: true,
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "T-Shirts",
    description: "Comfortable t-shirts for all occasions",
    image: "https://placehold.co/600x600/EEEEEE/778899?text=T-Shirts",
  },
  {
    id: "2",
    name: "Jeans",
    description: "Stylish and durable jeans for everyday wear",
    image: "https://placehold.co/600x600/6C8FC8/FFFFFF?text=Jeans",
  },
  {
    id: "3",
    name: "Shoes",
    description: "Footwear for all your needs",
    image: "https://placehold.co/600x600/8B4513/FFFFFF?text=Shoes",
  },
];

// Utility functions for data access
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getAllCategories = (): Category[] => {
  return categories;
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
}; 