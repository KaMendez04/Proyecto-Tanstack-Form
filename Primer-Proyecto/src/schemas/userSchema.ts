import { z } from 'zod';

export const userFieldsSchema = z.object({
  name: z.string().min(3, 'Name must have at least 3 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(10, 'Address must have at least 10 characters'),
  phone: z.string().min(8, 'Phone number must have at least 8 digits'),
  birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Birthdate is not valid',
  }),
  password: z.string().min(6, 'Password must have at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password confirmation must have at least 6 characters'),
  rol: z.enum(['customer', 'admin'], { required_error: 'Role is required' }),
});

export const userSchema = userFieldsSchema.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords do not match",
});
