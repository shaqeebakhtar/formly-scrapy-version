import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string = "") => {
  const words = name.split(" ");

  const initialsArray = words.map((word) => word.charAt(0));

  const initials = initialsArray.join("").toUpperCase();

  return initials;
};
