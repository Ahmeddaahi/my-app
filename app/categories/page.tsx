import { getAllCategories } from "@/lib/data";
import { CategoryCard } from "@/components/ui/category-card";

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No categories available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
} 