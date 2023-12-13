import * as z from 'zod';

export const authSchema = z.object({
  email: z
    .string({ required_error: 'Email cannot be empty' })
    .email({ message: 'Please use a valid email' }),
  password: z
    .string({ required_error: 'Password cannot be empty' })
    .min(8, { message: 'Password must be atleast 8 characters' })
    .max(16, { message: 'Password maximum can be of 16 characters' }),
});
