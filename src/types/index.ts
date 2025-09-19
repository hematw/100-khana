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

export type TListingType = { label: string; value: string };

export interface IPropertyForm {
  numOfLivingRooms: string;
  numOfBedRooms: string;
  numOfKitchens: string;
  numOfBaths: string;
  images: (string | File)[];
  price: string;
  area: string;
  category: string[];
  facilities: string[];
  listingType: string[];
  city: string;
  district: string;
  road: string;
  street: string;
  lng: string;
  lat: string;
  floor: string;
  totalFloors: string;
  description: string[];
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

export interface IProfile {
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

export interface IUser {
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

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
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

export interface IProfile {
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

export type TFacility = {
  _id: string;
  name: string;
  description: string;
  icon: string;
};
