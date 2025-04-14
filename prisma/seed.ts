import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seeding...');

    // Clean up existing data
    await prisma.wishlistItem.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    console.log('Cleaned up existing data');

    // Create users
    const adminPassword = await hash('admin123', 10);
    const userPassword = await hash('user123', 10);

    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      }
    });
    
    const user = await prisma.user.create({
      data: {
        name: 'Regular User',
        email: 'user@example.com',
        password: userPassword,
        role: 'USER',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      }
    });

    console.log('Created users');

    // Create categories
    const tshirts = await prisma.category.create({
      data: {
        name: 'T-Shirts',
        description: 'Comfortable t-shirts for all occasions',
        image: '/images/c-tshirts.jpg',
      }
    });

    const jeans = await prisma.category.create({
      data: {
        name: 'Jeans',
        description: 'Stylish and durable jeans for everyday wear',
        image: '/images/c-jeans.jpg',
      }
    });

    const shoes = await prisma.category.create({
      data: {
        name: 'Shoes',
        description: 'Footwear for all your needs',
        image: '/images/c-shoes.jpg',
      }
    });

    console.log('Created categories');

    // Create products
    // T-shirts
    const tshirt1 = await prisma.product.create({
      data: {
        name: 'Classic White T-Shirt',
        description: 'A timeless white t-shirt made from 100% cotton for ultimate comfort and breathability. Perfect for everyday wear.',
        price: 19.99,
        images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
        stock: 100,
        sku: 'T-SHIRT-001',
        categoryId: tshirts.id,
        featured: true,
      }
    });

    const tshirt2 = await prisma.product.create({
      data: {
        name: 'Graphic Print T-Shirt',
        description: 'Express your style with this unique graphic print t-shirt. Made from soft cotton blend with a modern fit.',
        price: 24.99,
        images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
        stock: 75,
        sku: 'T-SHIRT-002',
        categoryId: tshirts.id,
        featured: false,
      }
    });

    // Jeans
    const jeans1 = await prisma.product.create({
      data: {
        name: 'Slim Fit Jeans',
        description: 'Classic slim fit jeans with a modern touch. Made from high-quality denim that offers comfort and durability.',
        price: 49.99,
        images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
        stock: 50,
        sku: 'JEANS-001',
        categoryId: jeans.id,
        featured: true,
      }
    });

    const jeans2 = await prisma.product.create({
      data: {
        name: 'Relaxed Fit Jeans',
        description: 'Comfortable relaxed fit jeans perfect for casual wear. Features a straight leg design and classic five-pocket styling.',
        price: 44.99,
        images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
        stock: 60,
        sku: 'JEANS-002',
        categoryId: jeans.id,
        featured: false,
      }
    });

    // Shoes
    const shoes1 = await prisma.product.create({
      data: {
        name: 'Running Sneakers',
        description: 'Lightweight running sneakers with cushioned insoles for maximum comfort. Perfect for jogging, running, or everyday wear.',
        price: 79.99,
        images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
        stock: 40,
        sku: 'SHOES-001',
        categoryId: shoes.id,
        featured: true,
      }
    });

    const shoes2 = await prisma.product.create({
      data: {
        name: 'Casual Loafers',
        description: 'Stylish casual loafers made from premium materials. Combines comfort and elegance for any occasion.',
        price: 89.99,
        images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
        stock: 35,
        sku: 'SHOES-002',
        categoryId: shoes.id,
        featured: false,
      }
    });

    console.log('Created products');

    // Create some reviews
    await prisma.review.createMany({
      data: [
        {
          userId: user.id,
          productId: tshirt1.id,
          rating: 5,
          comment: 'Great quality t-shirt, very comfortable!'
        },
        {
          userId: user.id,
          productId: jeans1.id,
          rating: 4,
          comment: 'Good fit and nice material.'
        },
        {
          userId: user.id,
          productId: shoes1.id,
          rating: 5,
          comment: 'Very comfortable for running, highly recommend!'
        }
      ]
    });

    console.log('Created reviews');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 