import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { FormField } from './FormField';
import { userSchema } from '../schemas/userSchema';
import { validateField } from '../utils/validateField';
import { userServiceHook } from '../services/userHook';
import { Button } from './Button';

export default function RegistroForm() {
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [registeredRole, setRegisteredRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { registerUser } = userServiceHook(); 

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      birthdate: '',
      password: '',
      confirmPassword: '',
      rol: '',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setFormErrors({});

      const validation = userSchema.safeParse(value);

      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setFormErrors(fieldErrors);
        setIsLoading(false);
        return;
      }

      const createdUser = await registerUser({
        name: value.name,
        email: value.email,
        address: value.address,
        phone: value.phone,
        birthdate: value.birthdate,
        password: value.password,
        role: value.rol,
      });

      if (!createdUser) {
        setMessage({ text: 'Failed to create user.', type: 'error' });
        setIsLoading(false);
        return;
      }

      console.log('User registered successfully:', value);
      setMessage({ text: 'User registered successfully!', type: 'success' });
      setRegisteredRole(value.rol);
      setTimeout(() => {
        setMessage(null);
        setRegisteredRole(null);
      }, 4000);

      form.reset();
      setIsLoading(false);
    },
  });

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          <h1>Register</h1>
          <p>Please fill in the form to create an account.</p>
        </div>

        {message && (
          <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
            {message.text}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {(['name', 'email', 'address', 'phone', 'birthdate', 'password', 'confirmPassword', 'rol'] as const).map(
            (fieldName) => (
              <form.Field key={fieldName} name={fieldName}>
                {(field) => (
                  <FormField
                    label={
                      fieldName === 'confirmPassword'
                        ? 'Confirm Password'
                        : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                    }
                    name={field.name}
                    type={
                      fieldName === 'password' || fieldName === 'confirmPassword'
                        ? 'password'
                        : fieldName === 'email'
                        ? 'email'
                        : fieldName === 'birthdate'
                        ? 'date'
                        : fieldName === 'rol'
                        ? 'select'
                        : 'text'
                    }
                    value={field.state.value}
                    options={
                      fieldName === 'rol'
                        ? [
                            { value: 'customer', label: 'Customer' },
                            { value: 'admin', label: 'Admin' },
                          ]
                        : undefined
                    }
                    error={formErrors[fieldName]}
                    onChange={async (value) => {
                      field.handleChange(value);
                      const error = await validateField(fieldName, value, form.state.values);
                      setFormErrors((prev) => ({ ...prev, [fieldName]: error }));
                    }}
                  />
                )}
              </form.Field>
            )
          )}

          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}