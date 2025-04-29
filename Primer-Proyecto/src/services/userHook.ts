import { useEffect, useState } from 'react';
import { getUsers, createUser } from './userService';
import { UserAPI } from '../types/userTypes';

export const userServiceHook = () => {
  const [users, setUsers] = useState<UserAPI[]>([]); 

  useEffect(() => {
    (async () => {
      const usersResponse = await getUsers();
      if (usersResponse) {
        setUsers(usersResponse);
      }
    })();
  }, []);

  const registerUser = async (user: {
    name: string;
    email: string;
    password: string;
    role: string;
    address: string;
    phone: string;
    birthdate: string;
  }) => {
    const newUser = await createUser(user);
    return newUser;
  };

  return { users, registerUser };
};