
const API_URL = "http://localhost:3000/users";

export async function getUsers() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al cargar usuarios");
  return await res.json();
}

export async function getUserById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Usuario no encontrado");
  return await res.json();
}

export async function createUser(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
  const users = await res.json();
  return users.length > 0 ? users[0] : null;
}
