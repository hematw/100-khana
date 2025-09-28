import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveOrRemoveToWishlist<T extends { _id: string }>(key: string, value: T) {
  const savedData = localStorage.getItem(key);

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    const foundItem = parsedData.find((item: T) => item._id === value._id);
    if (foundItem) {
      parsedData.splice(parsedData.indexOf(foundItem), 1);
      localStorage.setItem(key, JSON.stringify(parsedData));
    } else {
      parsedData.push(value);
      localStorage.setItem(key, JSON.stringify(parsedData));
    }
  } else {
    localStorage.setItem(key, JSON.stringify([value]));
  }
}

export function removeFromWishlist<T extends { _id: string }>(key: string, value: T) {
  const savedData = localStorage.getItem(key);

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    const updatedData = parsedData.filter(
      (item: T) => JSON.stringify(item) !== JSON.stringify(value)
    );
    localStorage.setItem(key, JSON.stringify(updatedData));
  }
}
