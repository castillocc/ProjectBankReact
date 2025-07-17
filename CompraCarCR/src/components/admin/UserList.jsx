
import React from "react";
import { Link } from "react-router-dom";

const mockUsers = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "admin" },
  { id: 2, name: "Ana Gómez", email: "ana@example.com", role: "cliente" },
];

const UserList = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      <Link to="/admin/users/new" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Agregar Usuario
      </Link>
      <ul className="space-y-4">
        {mockUsers.map(user => (
          <li key={user.id} className="border p-4 rounded flex justify-between">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">Rol: {user.role}</p>
            </div>
            <Link to={`/admin/users/${user.id}`} className="text-blue-600 hover:underline">Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
