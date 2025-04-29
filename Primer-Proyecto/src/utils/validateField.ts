import { userFieldsSchema } from '../schemas/userSchema';
import { z } from 'zod';
import { getUsers } from '../services/userService';

export const validateField = async (fieldName: string, value: string, formValues: any) => {
  if (fieldName === 'rol') {
    return value ? '' : 'Role is required';
  }

  const partialSchema = z.object({
    [fieldName]: userFieldsSchema.shape[fieldName as keyof typeof userFieldsSchema.shape],
  });

  const result = partialSchema.safeParse({ [fieldName]: value });
  let error = result.success ? '' : result.error.errors[0].message;

  if (fieldName === 'confirmPassword' && value !== formValues.password) {
    error = "Passwords don't match";
  }

  if (!error && fieldName === 'email') {
    const users = await getUsers();

    if (users) {
      const emailExists = users.some(
        (user: { email: string }) => user.email?.toLowerCase() === value.toLowerCase()
      );
      if (emailExists) {
        error = 'Email already taken';
      }
    } else {
      console.error('Failed to fetch users to check email duplicates');
    }
  }

  return error;
};