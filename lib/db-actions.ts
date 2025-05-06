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
  },
  {
    id: "3",
    name: "New User",
    email: "newuser@example.com",
    password: "$2a$10$XLpEk6yI.DJfOaZ4e2mMXuSYNJ3KtH0Zyjj2kgbT3GKB1.AcBYy6K", // "password123"
    image: null,
    role: "USER"
  }
];

export const getUserByEmail = async (email: string) => {
  console.log('Attempting to find user with email:', email);
  const user = users.find(user => user.email === email);
  console.log('Found user:', user ? 'Yes' : 'No');
  return user || null;
};

export const getUserById = async (id: string) => {
  return users.find(user => user.id === id) || null;
}; 