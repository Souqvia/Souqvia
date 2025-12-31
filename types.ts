export type Language = 'en' | 'fr' | 'ar';

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  store: 'Jumia' | 'Ouedkniss' | 'Facebook Marketplace' | 'Uno' | 'Generic';
  imageUrl: string;
  rating: number; // 1-5
  condition: 'New' | 'Used' | 'Refurbished';
  location: string;
  category: string;
  trending?: boolean;
  externalLink?: string; // Link to real store
  sellerName?: string;
  sellerPhone?: string; // Mock phone for contact
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  store?: string;
  location?: string; // Wilaya
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type Page = 'home' | 'search' | 'details' | 'bizplan';

export interface Translation {
  searchPlaceholder: string;
  trending: string;
  newArrivals: string;
  price: string;
  condition: string;
  store: string;
  search: string;
  filters: string;
  details: string;
  buyNow: string;
  techPlan: string;
  monetization: string;
  architecture: string;
  language: string;
  login: string;
  logout: string;
  wilaya: string;
  safetyTip: string;
  seller: string;
  description: string;
  similarItems: string;
  callSeller: string;
}
