import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { CategoryManager } from "./CategoryManager";
import { CategoryList } from "./category/CategoryList";
import { ChevronRight, PanelLeftClose, BookOpen, Home, Search } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function CategorySidebar() {
  const {
    categories,
    isAdmin,
    fetchCategories,
    checkAdminStatus,
    handleDelete
  } = useCategories();

  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchCategories();
    checkAdminStatus();
  }, []);

  return (
    <>
      <Sidebar className="border-r border-tibetan-brown/10 bg-gradient-to-br from-white via-tibetan-gold/5 to-tibetan-maroon/5">
        <SidebarHeader className="p-4 border-b border-tibetan-brown/10">
          <div className="flex items-center justify-between">
            <Link
              to="/categories"
              className="font-tibetan text-lg text-tibetan-maroon flex items-center hover:text-tibetan-maroon/80 transition-colors group"
            >
              <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
              {!isCollapsed && "Translation Categories"}
            </Link>
            <SidebarTrigger className="hover:bg-tibetan-gold/10">
              <PanelLeftClose className="h-4 w-4" />
            </SidebarTrigger>
          </div>

          {!isCollapsed && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{categories.length} Categories</span>
                <Badge variant="secondary" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="px-2">
          {/* Quick Navigation */}
          {!isCollapsed && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Quick Access
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-1">
                  <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-tibetan-gold/10 transition-colors duration-200 group">
                    <Home className="h-4 w-4 text-tibetan-brown group-hover:text-tibetan-maroon transition-colors" />
                    <span className="text-sm">Home</span>
                  </Link>
                  <Link to="/search" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-tibetan-gold/10 transition-colors duration-200 group">
                    <Search className="h-4 w-4 text-tibetan-brown group-hover:text-tibetan-maroon transition-colors" />
                    <span className="text-sm">Search</span>
                  </Link>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          <Separator className="my-4" />

          {/* Categories */}
          <SidebarGroup>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Browse by Category
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <CategoryList
                categories={categories}
                isAdmin={isAdmin}
                onDelete={handleDelete}
              />
              {isAdmin && !isCollapsed && (
                <>
                  <Separator className="my-4" />
                  <CategoryManager onCategoryChange={fetchCategories} />
                </>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Expand Button - Only visible when sidebar is collapsed */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed left-0 top-1/2 -translate-y-1/2 z-50",
          "transition-all duration-300 ease-in-out",
          "bg-background/90 backdrop-blur-md hover:bg-tibetan-gold/10",
          "border border-tibetan-brown/20 rounded-r-lg rounded-l-none",
          "shadow-lg hover:shadow-xl",
          "opacity-0 translate-x-full",
          isCollapsed && "opacity-100 translate-x-0"
        )}
        onClick={toggleSidebar}
        aria-label="Expand sidebar"
      >
        <ChevronRight className="h-4 w-4 text-tibetan-brown" />
      </Button>
    </>
  );
}
