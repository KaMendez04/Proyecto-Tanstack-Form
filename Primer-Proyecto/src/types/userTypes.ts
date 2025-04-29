export interface UserFormValues {
    name: string;
    email: string;
    address: string;
    password: string;
    confirmPassword: string;
    rol: string;
    phone: string;
    birthdate: string;
  }
  
  export interface UserAPI {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
  }
  