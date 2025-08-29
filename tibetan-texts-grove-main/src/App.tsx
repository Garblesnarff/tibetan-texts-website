import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { CategorySidebar } from "@/components/navigation/CategorySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import TranslationDetail from "./pages/TranslationDetail";
import SearchResults from "./pages/SearchResults";

function App() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background to-tibetan-gold/5">
        <CategorySidebar />
        <main className="flex-1 p-4 md:p-8 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/translation/:id" element={<TranslationDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}

export default App;
