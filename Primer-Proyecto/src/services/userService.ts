import { API_URL } from "../api/apiConfig";

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();
  return users;
}

export async function createUser(user: {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  phone: string;
  birthdate: string;
}) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      address: user.address,
      phone: user.phone,
      birthdate: user.birthdate,
      avatar: 'https://api.lorem.space/image/face?w=640&h=480', // requerido por la API
    }),
  });

  const newUser = await response.json();
  return newUser;
}