import { useParams, useNavigate } from "react-router-dom";
import { CategoryBreadcrumb } from "@/components/navigation/Breadcrumb";
import { TranslationsGrid } from "@/components/index/TranslationsGrid";
import { QuickFilters } from "@/components/filtering/QuickFilters";
import { useToast } from "@/hooks/use-toast";
import { useState, useCallback } from "react";
import { useCategories } from "@/hooks/useCategories";
import { HorizontalCategoryList } from "@/components/navigation/category/HorizontalCategoryList";
import { useCategoryTranslations } from "@/hooks/useCategoryTranslations";
import { Header } from "@/components/index/Header";
import { Translation } from "@/types/translation";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();
  
  const { 
    categories, 
    loading: categoriesLoading,
    handleDelete: handleCategoryDelete 
  } = useCategories();

  const {
    translations,
    loading: translationsLoading,
    error: translationsError,
    handleDelete: handleTranslationDelete
  } = useCategoryTranslations(categoryId);

  const handleCategorySelect = useCallback((selectedCategoryId: string | null) => {
    if (selectedCategoryId) {
      navigate(`/category/${selectedCategoryId}`);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  }, []);

  // Filter translations based on active quick filters
  const filteredTranslations = translations.filter(translation => {
    if (activeFilters.length === 0) return true;
    
    return activeFilters.some(filter => {
      switch (filter) {
        case 'featured':
          return translation.featured === true;
        case 'recent':
          return new Date(translation.created_at || '').getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000);
        case 'most-viewed':
          return (translation.view_count || 0) > 100;
        default:
          return true;
      }
    });
  });

  return (
    <div className="space-y-6">
      <Header />
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-4 border-b">
        <HorizontalCategoryList
          categories={categories}
          selectedCategory={categoryId || null}
          onCategorySelect={handleCategorySelect}
          isLoading={categoriesLoading}
        />
      </div>
      <CategoryBreadcrumb />
      <QuickFilters 
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />
      <TranslationsGrid 
        translations={filteredTranslations}
        onDelete={handleTranslationDelete}
        isLoading={translationsLoading}
        error={translationsError ? new Error(translationsError) : undefined}
        activeCategory={categoryId}
      />
    </div>
  );
};

export default CategoryPage;