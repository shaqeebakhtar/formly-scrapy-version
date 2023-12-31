import * as z from 'zod';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string = '') => {
  const words = name.split(' ');

  const initialsArray = words.map((word) => word.charAt(0));

  const initials = initialsArray.join('').toUpperCase();

  return initials;
};

export const camelizeText = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

export const createSchema = (question: string, type: string) => {
  const camelCaseQuestion = camelizeText(question);

  const zodType =
    type === 'number'
      ? z.number()
      : type === 'email'
      ? z.string().email()
      : z.string();

  const obj = {
    [camelCaseQuestion]: zodType,
  };

  return z.object(obj);
};

export const generateHash = (input: string) => {
  return crypto
    .createHmac('sha256', process.env.HASH_SECRET as string)
    .update(input)
    .digest('hex');
};
