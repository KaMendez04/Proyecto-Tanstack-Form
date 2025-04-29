import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = ({ type = 'button', isLoading = false, children }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isLoading}
    >
      {isLoading ? 'Submitting...' : children}
    </button>
  );
};
