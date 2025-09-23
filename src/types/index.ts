export type TCategory = {
  name: string;
  _id: string;
};

export interface ISearchForm {
  listingType: string[];
  city: string;
  min_price: string;
  max_price: string;
}

export type ListingType = { label: string; value: string };

export interface PropertyForm {
  numOfLivingRooms: string;
  numOfBedRooms: string;
  numOfKitchens: string;
  numOfBaths: string;
  images: (string | File)[];
  price: string;
  area: string;
  category: string[];
  facilities: string[] | Facility[];
  listingType: string[];
  city: string | {name: string};
  district: string;
  road: string;
  street: string;
  lng: string;
  lat: string;
  floor: string;
  totalFloors: string;
  description: string[];
  views: number;
  saved: number;
}

export interface HomeCardProps {
  image: string;
  title: string;
  description: string;
  className?: string;
}

export interface PropertyCardProps {
  address: string;
  price: number;
  listingType: string;
  // rating: number;
  images: string[];
  onAddWishlist?: () => void;
  className?: string;
}

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  govId?: number;
  profile?: string;
  background?: string;
  bio?: string;
  userId?: string;
  username?: string;
}

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  govId: string;
  profile: string;
  background: string;
  email: string;
  password: string;
  bio: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export type ServerError = {
  message: string;
  duplicateField: string;
};

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  govId?: number;
  profile?: string;
  background?: string;
  bio?: string;
  userId?: string;
  username?: string;
}

export type Facility = {
  _id: string;
  name: string;
  description: string;
  icon: string;
};
