"use client";

import { useState, useEffect } from "react";
import { getAllProducts, getAllCategories, type Category } from "@/lib/data";
import { ProductCard } from "@/components/ui/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState(getAllProducts());
  const [categories, setCategories] = useState<Category[]>(getAllCategories());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: {} as Record<string, boolean>,
    priceRange: {
      min: "",
      max: ""
    }
  });
  const [sortBy, setSortBy] = useState("newest");

  // Initialize category filters
  useEffect(() => {
    const initialCategories = categories.reduce((acc, category) => {
      acc[category.id] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setFilters(prev => ({
      ...prev,
      categories: initialCategories
    }));
  }, [categories]);

  // Apply filters and search
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    const activeCategories = Object.entries(filters.categories)
      .filter(([_, isChecked]) => isChecked)
      .map(([categoryId]) => categoryId);

    if (activeCategories.length > 0) {
      result = result.filter(product => 
        activeCategories.includes(product.categoryId)
      );
    }

    // Apply price range filter
    if (filters.priceRange.min !== "") {
      result = result.filter(product => 
        product.price >= parseFloat(filters.priceRange.min)
      );
    }
    if (filters.priceRange.max !== "") {
      result = result.filter(product => 
        product.price <= parseFloat(filters.priceRange.max)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        // Sort by ID as a proxy for newest (higher ID = newer)
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, filters, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [categoryId]: !prev.categories[categoryId]
      }
    }));
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const clearFilters = () => {
    setFilters({
      categories: Object.keys(filters.categories).reduce((acc, categoryId) => {
        acc[categoryId] = false;
        return acc;
      }, {} as Record<string, boolean>),
      priceRange: {
        min: "",
        max: ""
      }
    });
    setSearchQuery("");
    setSortBy("newest");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Filter className="h-5 w-5" />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.categories[category.id] || false}
                      onChange={() => handleCategoryChange(category.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="newest">Newest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>

            <Button
              onClick={clearFilters}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {/* Search Bar */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 