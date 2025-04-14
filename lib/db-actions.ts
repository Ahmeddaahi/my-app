'use server';

// Temporary in-memory user storage for authentication during development
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$XLpEk6yI.DJfOaZ4e2mMXuSYNJ3KtH0Zyjj2kgbT3GKB1.AcBYy6K", // "password123"
    image: null,
    role: "ADMIN"
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    password: "$2a$10$XLpEk6yI.DJfOaZ4e2mMXuSYNJ3KtH0Zyjj2kgbT3GKB1.AcBYy6K", // "password123"
    image: null,
    role: "USER"
  }
];

export const getUserByEmail = async (email: string) => {
  return users.find(user => user.email === email) || null;
};

export const getUserById = async (id: string) => {
  return users.find(user => user.id === id) || null;
}; 