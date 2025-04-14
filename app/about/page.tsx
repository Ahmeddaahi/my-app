export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About ShopNext</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-lg">
          <p className="text-lg mb-4">
            ShopNext is a modern e-commerce platform built with the latest web technologies, 
            providing a seamless shopping experience for our customers.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p className="mb-4">
            Our mission is to provide high-quality products at affordable prices, while 
            ensuring an exceptional shopping experience. We believe in putting our customers 
            first and continuously improving our services.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2023, ShopNext started as a small online store with a handful of products. 
            Today, we've grown to offer hundreds of items across multiple categories, serving 
            customers nationwide. Our journey is just beginning, and we're excited about what 
            the future holds.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Customer satisfaction is our top priority</li>
            <li className="mb-2">Quality products at reasonable prices</li>
            <li className="mb-2">Honesty and transparency in all our dealings</li>
            <li className="mb-2">Continuous improvement of our services</li>
            <li className="mb-2">Supporting sustainable and ethical business practices</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 